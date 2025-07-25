import clsx from 'clsx'
import * as React from 'react'
import {useLocation, useNavigate} from 'react-router'
import deleteBin from '../../../assets/delete-bin.svg'
import infoOctagon from '../../../assets/info-octagon.svg'
import {AsyncImage} from '../../../asyncImage'
import {Badge, BADGE_HIGHLIGHT, BADGE_STATUS} from '../../../badge'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../../button'
import {getFileTypeIcon} from '../../../upload/helper'
import {UserChip} from '../../../user-chip'
import getStatus, {TASK_STATUS} from '../../helper'
import {ITask, ITaskDetails, ITaskObjectValue, MODULES} from '../../types'
import classes from './task-card.module.css'
import {
  getDefaultFormattedDateTime,
  getUsername,
  isArrayOfString,
  isDatePassed,
  isExactISODateFormat,
  isObject,
} from '../../../../utils'

const HIDE_DETAILS = [MODULES.PROFILE]
const HIDE_CANCEL_REQUEST = [
  MODULES.PROFILE,
  MODULES.ATTENDANCE,
  MODULES.IT_REQUEST,
  MODULES.WORKFLOW,
  MODULES.DEVICES,
]

export default function TaskCard({
  data,
  onClicks,
}: {
  data: ITask
  onClicks?: ((data: ITask) => void)[]
}) {
  const dropDownRef = React.useRef<{blur: () => void}>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = getTaskMenuItems(data, onClicks, navigate, location)

  const hideActionHandler = () => {
    dropDownRef.current?.blur()
  }

  return (
    <div
      className={clsx(classes.card, !!menuItems?.length && classes.pointerCard)}
      onMouseLeave={hideActionHandler}
      onClick={() => {
        menuItems?.[0]?.onClick(data)
      }}
    >
      <div className={classes.taskSection}>
        <div className={clsx(classes.taskName, 'zap-content-semibold')}>{data.name}</div>
        <div className={clsx(classes.dateAndTime, 'zap-caption-medium')}>
          {isExactISODateFormat(data.date) ? getDefaultFormattedDateTime(data.date) : data.date}
        </div>
        <Badge
          highlight={BADGE_HIGHLIGHT.ICON}
          icon={data.icon_url}
          status={moduleStatusMap[data.module_reference] || BADGE_STATUS.DEFAULT}
          customSvgStyles={{width: '16px', height: '16px'}}
        >
          {data.module_name}
        </Badge>
      </div>
      <div className={classes.detailsSection}>
        {data.details?.map((detail: ITaskDetails, i: number) => (
          <div key={i} className={classes.detail}>
            <div className={clsx(classes.detailKey, 'zap-subcontent-medium')}>
              {`${detail.key}: `}
            </div>
            {Array.isArray(detail.value) && detail.value.length > 0 ? (
              isArrayOfString(detail.value) ? (
                <div className={clsx(classes.detailValue, 'zap-subcontent-medium')}>
                  {(detail.value as string[]).join(', ')}
                </div>
              ) : (
                <div className={classes.detailValueAttachments}>
                  {detail.value[0].file_name ? (
                    detail.value?.map((value, index: React.Key) => {
                      return (
                        <div
                          key={index}
                          className={classes.detailValueAttachment}
                          onClick={e => e.stopPropagation()}
                        >
                          <div>
                            <AsyncImage
                              src={getFileTypeIcon(value.details?.type || value.details?.ext)}
                              alt={value.file_name}
                              className={classes.fileIcon}
                            />
                          </div>
                          <div>
                            <a
                              href={value.doc_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={classes.attachmentName}
                            >
                              {value.file_name}
                            </a>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className={clsx(classes.detailValueNA, 'zap-subcontent-medium')}>N/A</div>
                  )}
                </div>
              )
            ) : detail.value && isObject(detail.value) && Object.keys(detail.value).length ? (
              <UserChip
                username={getUsername(detail.value)}
                profileImgUrl={(detail.value as ITaskObjectValue).profile_img_url}
              />
            ) : typeof detail.value === 'string' && !!detail.value?.length ? (
              <div className={clsx(classes.detailValue, 'zap-subcontent-medium')}>
                {detail.value as string}
              </div>
            ) : typeof detail.value === 'number' ? (
              <div className={clsx(classes.detailValue, 'zap-subcontent-medium')}>
                {detail.value as number}
              </div>
            ) : (
              <div className={clsx(classes.detailValueNA, 'zap-subcontent-medium')}>N/A</div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.statusSection}>
        <Badge highlight={BADGE_HIGHLIGHT.DOT} status={statusMap[data.status]}>
          {getStatus(data.status)}
        </Badge>
      </div>
      <div className={classes.actionSection} onClick={e => e.stopPropagation()}>
        {!!menuItems?.length && (
          <Button.ActionsDropdown
            menuItems={menuItems}
            variant={BUTTON_VARIANT.TERTIARY}
            size={BUTTON_SIZE.SMALL}
            customData={data}
            ref={dropDownRef}
            hideDivider
          />
        )}
      </div>
    </div>
  )
}

const moduleStatusMap: {[key: string]: BADGE_STATUS} = {
  profile: BADGE_STATUS.DEFAULT,
  leave: BADGE_STATUS.DEFAULT,
  it_request: BADGE_STATUS.NEGATIVE,
  attendance: BADGE_STATUS.HIGHLIGHT,
  reimbursement: BADGE_STATUS.DEFAULT,
  document: BADGE_STATUS.HIGHLIGHT,
}

const statusMap: {[key: string]: BADGE_STATUS} = {
  [TASK_STATUS.PENDING]: BADGE_STATUS.WARNING,
  [TASK_STATUS.DECLINED]: BADGE_STATUS.NEGATIVE,
  [TASK_STATUS.PENDING_SECOND_APPROVER]: BADGE_STATUS.WARNING,
  [TASK_STATUS.PENDING_CANCELLATION]: BADGE_STATUS.WARNING,
  [TASK_STATUS.APPROVED]: BADGE_STATUS.POSITIVE,
  [TASK_STATUS.CANCELLED]: BADGE_STATUS.NEGATIVE,
  [TASK_STATUS.CLOSED]: BADGE_STATUS.NEUTRAL,
}

export function getTaskMenuItems(
  data: ITask,
  onClicks: ((data: ITask) => void)[] | undefined,
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>,
) {
  return [
    {
      label: 'See details',
      onClick: (data: ITask) => {
        if (onClicks?.[0]) {
          onClicks[0](data)
          return
        }
        if (data.module_reference === 'it_support') {
          navigate(`/it-support/${data.task_details_id}`)
          return
        }
        if (data.module_reference === 'attendance') {
          navigate(`/attendance/approve/${data.task_details_id}`)
          return
        }
        navigate(`/${data.module_reference}/${data.task_details_id}`, {
          state: {source: location.pathname},
        })
      },
      iconSrc: infoOctagon,
      hidden:
        (data.module_reference === MODULES.LEAVE && !data.task_details_id) ||
        HIDE_DETAILS.includes(data.module_reference as MODULES),
    },
    {
      label: 'Cancel request',
      onClick: (data: ITask) => {
        if (onClicks?.[1]) {
          onClicks[1](data)
          return
        }
        navigate(`/${data.module_reference}/${data.task_details_id}?cancel=true`, {
          state: {source: location.pathname},
        })
      },
      iconSrc: deleteBin,
      customStyles: {color: 'var(--status-error-e50)'},
      customSvgClassName: classes.logoutIcon,
      hidden:
        (data.module_reference === MODULES.LEAVE && !data.task_details_id) ||
        HIDE_CANCEL_REQUEST.includes(data.module_reference as MODULES) ||
        data.status === TASK_STATUS.CANCELLED ||
        data.status === TASK_STATUS.DECLINED ||
        data.status === TASK_STATUS.PENDING_CANCELLATION ||
        (data.module_reference === 'leave' &&
          isDatePassed(data?.leaveFrom) &&
          !(
            data.status === TASK_STATUS.PENDING ||
            data.status === TASK_STATUS.PENDING_SECOND_APPROVER
          )),
    },
  ].filter(action => !action.hidden)
}

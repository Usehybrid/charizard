import * as React from 'react'
import clsx from 'clsx'
import classes from './task-card.module.css'
import {UserChip} from '../../../user-chip'
import {Badge, BADGE_HIGHLIGHT, BADGE_STATUS} from '../../../badge'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2, MenuItemV2} from '../../../button-v2'
import {ITask, ITaskDetails, ITaskObjectValue} from '../../types'
import {isObject, isString} from '../../../../utils'
import getStatus from '../../helper'

export default function TaskCard({data, menuItems}: {data: ITask; menuItems: MenuItemV2[]}) {
  return (
    <div className={classes.card}>
      <div className={classes.taskSection}>
        <div className={clsx(classes.taskName, 'zap-content-semibold')}>{data.name}</div>
        <div className={clsx(classes.dateAndTime, 'zap-caption-medium')}>{data.date}</div>
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
        {data.details.map((detail: ITaskDetails, i: number) => (
          <div key={i} className={classes.detail}>
            <div className={clsx(classes.detailKey, 'zap-subcontent-medium')}>{detail.key}</div>
            {Array.isArray(detail.value) && detail.value.length > 0 ? (
              <div className={classes.detailValueAttachments}>
                {detail.value.map((value, index: React.Key) => (
                  <div key={index} className={classes.detailValueAttachment}>
                    <div>
                      <img src={value.details.icon} width={20} alt={`${value.details.type}`} />
                    </div>
                    <div>
                      <a href={value.doc_link} target="_blank" className={classes.attachmentName}>
                        {value.file_name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : detail.value && isObject(detail.value) && Object.keys(detail.value).length ? (
              <UserChip
                username={(detail.value as ITaskObjectValue).first_name}
                profileImgUrl={(detail.value as ITaskObjectValue).profile_img_url}
              />
            ) : isString(detail.value) ? (
              <div className={clsx(classes.detailValue, 'zap-subcontent-medium')}>
                {detail.value as string}
              </div>
            ) : (
              <div className={clsx(classes.detailValueNA, 'zap-subcontent-medium')}>N/A</div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.statusSection}>
        <Badge highlight={BADGE_HIGHLIGHT.DOT} status={statusMap[getStatus(data.status)]}>
          {data.status}
        </Badge>
      </div>
      <div className={classes.actionSection}>
        <ButtonV2.ActionsDropdown
          menuItems={menuItems}
          variant={BUTTON_V2_VARIANT.TERTIARY}
          size={BUTTON_V2_SIZE.SMALL}
        />
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
  pending: BADGE_STATUS.WARNING,
  declined: BADGE_STATUS.NEGATIVE,
  pending_second_approver: BADGE_STATUS.WARNING,
  cancelled: BADGE_STATUS.NEUTRAL,
  approved: BADGE_STATUS.POSITIVE,
}

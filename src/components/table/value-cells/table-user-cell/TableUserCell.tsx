import clsx from 'clsx'
import TableBoxEllipses from '../table-box-ellipses'
import fileMultiple from '../../../assets/files/file-multiple.svg'
import classes from './table-user-cell.module.css'
import {SVG} from '../../../svg'
import {clipboard, getUsername} from '../../../../utils'

interface TableUserCellProps {
  user: any
  onClick: any
  showCopy?: boolean
  isMobile?: boolean
}

export function TableUserCell({
  user,
  onClick,
  showCopy = true,
  isMobile = false,
}: TableUserCellProps): React.ReactElement | null {
  return (
    <div className={classes.box}>
      <img src={user.profile_img_url} alt="User Profile" className={classes.userImage} />
      <div className={classes.userDetails}>
        <div className={classes.usernameContainer} onClick={onClick}>
          <TableBoxEllipses
            data={getUsername(user)}
            customStyle={{maxWidth: isMobile ? '190px' : '160px'}}
          />
        </div>
        <div className={classes.emailBox}>
          <div className={clsx(classes.userEmail, 'zap-subcontent-medium')}>{user.work_email}</div>
          {user.work_email && showCopy && (
            <SVG
              path={fileMultiple}
              svgClassName={classes.icon}
              customSpanStyles={{cursor: 'pointer', flexShrink: 0}}
              handleClick={e => {
                e.stopPropagation()
                clipboard(user.work_email)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

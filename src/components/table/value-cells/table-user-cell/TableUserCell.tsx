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
}

export function TableUserCell({
  user,
  onClick,
  showCopy = true,
}: TableUserCellProps): React.ReactElement | null {
  return (
    <div className={classes.box}>
      <img src={user.profile_img_url} alt="User Profile" className={classes.userImage} />

      <div className={classes.userDetails}>
        <div className={classes.usernameContainer} onClick={onClick}>
          <TableBoxEllipses data={getUsername(user)} customStyle={{maxWidth: '190px'}} />

          {/* // todo @sohhamm confirm on the event chip */}
          {/* <EventChips user={user} events={user?.eventType ?? []} /> */}
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

// interface EventChipsProps {
//   user: any
//   events: string[]
// }

// export function EventChips({user, events}: EventChipsProps) {
//   const wrapEvent = useMediaQuery('(max-width: 1400px)')

//   return (
//     <div className={classes.eventBox}>
//       {events?.map(event => {
//         return user[eventMap[event]?.key] || event === TEAMS_EVENT.NEVER_LOGGED_IN ? (
//           <div
//             key={event}
//             className={clsx(classes.badge, classes[eventMap[event]?.variant])}
//             title={`${wrapEvent && event !== TEAMS_EVENT.NEVER_LOGGED_IN ? '' : eventMap[event]?.message}`}
//           >
//             <div className={classes.emoji}>{eventMap[event]?.emoji}</div>
//             <div className={classes.emoji}>
//               <SVG path={eventMap[event]?.to} svgClassName={classes.emoji} />
//             </div>
//           </div>
//         ) : null
//       })}
//     </div>
//   )
// }

import clsx from 'clsx'
import classes from './table-device-cell.module.css'
import fileMultiple from '../../../assets/files/file-multiple.svg'
import remote from '../../../assets/devices/remote.svg'
import laptop2 from '../../../assets/devices/laptop-2.svg'
import monitor from '../../../assets/devices/monitor.svg'
import smartphone from '../../../assets/devices/smartphone.svg'
import iphoneOld from '../../../assets/smartphones/iphone-old.svg'
import usbSymbol from '../../../assets/devices/usb-symbol.svg'
import headset from '../../../assets/devices/headset.svg'
import thunderbolt from '../../../assets/devices/thunderbolt.svg'
import keyboard from '../../../assets/devices/keyboard.svg'
import mouse from '../../../assets/devices/mouse.svg'
import webcam from '../../../assets/devices/webcam.svg'
import browser from '../../../assets/development/browser.svg'
import microphone from '../../../assets/user-interface/microphone.svg'
import serverSignal from '../../../assets/devices/server-signal.svg'
import printer from '../../../assets/devices/printer.svg'
import hardDrive2 from '../../../assets/devices/hard-drive-2.svg'
import TableBoxEllipses from '../table-box-ellipses'
import {SVG} from '../../../svg'
import {clipboard} from '../../../../utils/text'
import {TooltipV2} from '../../../tooltip-v2'

interface TableDeviceCellProps {
  device: any
  onClick: any
  customStyle?: React.CSSProperties
}

export function TableDeviceCell({device, onClick, customStyle}: TableDeviceCellProps) {
  return (
    <div className={classes.box}>
      <div className={classes.device}>
        <SVG path={getProductIconFromType(device.type)} svgClassName={classes.image} />
      </div>

      <div className={classes.details}>
        <div className={classes.titleContainer} onClick={onClick}>
          <TableBoxEllipses
            data={device.name || device.model}
            customStyle={{maxWidth: '190px', ...customStyle}}
          />
        </div>
        <div className={classes.subTitleBox}>
          {device.serial_number && (
            <div className={clsx(classes.subTitle, 'zap-subcontent-medium')}>
              {device.serial_number}
            </div>
          )}
          {device.isMdmConnected && (
            <TooltipV2
              id={'id'}
              trigger={
                <SVG
                  path={remote}
                  spanClassName={classes.mdmStatus}
                  svgClassName={classes.mdmStatusIcon}
                />
              }
              content="This device is also connected with MDM"
              portalId="root"
            />
          )}
          {device.serial_number && (
            <SVG
              path={fileMultiple}
              svgClassName={classes.icon}
              customSpanStyles={{cursor: 'pointer', flexShrink: 0}}
              handleClick={e => {
                e.stopPropagation()
                clipboard(device.serial_number)
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

export const getProductIconFromType = (type?: string) => {
  switch (type) {
    case 'Laptops':
      return laptop2
    case 'Monitors':
      return monitor
    case 'Smartphones':
      return smartphone
    case 'Tablets':
      return iphoneOld
    case 'Peripheral devices':
      return usbSymbol
    case 'Headsets':
      return headset
    case 'Cables':
      return thunderbolt
    case 'Keyboards':
      return keyboard
    case 'Mouses':
      return mouse
    case 'Webcams':
      return webcam
    case 'Storage':
      return hardDrive2
    case 'Trackpads':
      return browser
    case 'Microphones':
      return microphone
    case 'Routers':
      return serverSignal
    case 'Printers':
      return printer
    default:
      return laptop2
  }
}

import { ButtonV2, BUTTON_V2_SIZE, BUTTON_V2_TYPE, BUTTON_V2_VARIANT, SVG} from '../components'
import closeIcon from '../components/assets/close.svg'
import calender from '../components/assets/calender.svg'

export const menuItems = [
  {
    label: 'Apply leave',
    onClick: (data: any) => {
      console.log('apply leave', data)
    },
    filterFn: (data: any) => {
      return true
    },
    iconSrc: calender
  },

  {
    label: 'Apply Reimbursement',
    onClick: (data: any) => {},
    filterFn: (data: any) => {
      // return false
      return true
    },
    iconSrc: calender,
    customStyles: {color: 'red'},
  },
  {
    label: 'Archive',
    onClick: (data: any) => {},
    disabled: true,
  },
]

export function ButtonDemo() {
  return (
    <div>
      <div style={{display: 'flex', gap: 150}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2 size={BUTTON_V2_SIZE.SMALL}>Button</ButtonV2>
          <ButtonV2 size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.SECONDARY}>
            Button
          </ButtonV2>
          <ButtonV2 size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.TERTIARY}>
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2 disabled size={BUTTON_V2_SIZE.SMALL}>
            Button
          </ButtonV2>
          <ButtonV2 disabled size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.SECONDARY}>
            Button
          </ButtonV2>
          <ButtonV2 disabled size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.TERTIARY}>
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2>Button</ButtonV2>
          <ButtonV2 variant={BUTTON_V2_VARIANT.SECONDARY}>Button</ButtonV2>
          <ButtonV2 variant={BUTTON_V2_VARIANT.TERTIARY}>Tertiary</ButtonV2>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.GroupAction size={BUTTON_V2_SIZE.SMALL} menuItems={menuItems}>
            Button
          </ButtonV2.GroupAction>
          <ButtonV2.GroupAction
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          >
            Button
          </ButtonV2.GroupAction>
          <ButtonV2.GroupAction
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          >
            Tertiary
          </ButtonV2.GroupAction>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.GroupAction disabled size={BUTTON_V2_SIZE.SMALL} menuItems={menuItems}>
            Button
          </ButtonV2.GroupAction>
          <ButtonV2.GroupAction
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          >
            Button
          </ButtonV2.GroupAction>
          <ButtonV2.GroupAction
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          >
            Tertiary
          </ButtonV2.GroupAction>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.GroupAction menuItems={menuItems}>Button</ButtonV2.GroupAction>
          <ButtonV2.GroupAction variant={BUTTON_V2_VARIANT.SECONDARY} menuItems={menuItems}>
            Button
          </ButtonV2.GroupAction>
          <ButtonV2.GroupAction variant={BUTTON_V2_VARIANT.TERTIARY} menuItems={menuItems}>
            Button
          </ButtonV2.GroupAction>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.SECONDARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </ButtonV2>
          <ButtonV2
            variant={BUTTON_V2_VARIANT.TERTIARY}
            type={BUTTON_V2_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </ButtonV2>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.ActionsDropdown size={BUTTON_V2_SIZE.SMALL} menuItems={menuItems} />
          <ButtonV2.ActionsDropdown
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.ActionsDropdown disabled size={BUTTON_V2_SIZE.SMALL} menuItems={menuItems} />
          <ButtonV2.ActionsDropdown
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.ActionsDropdown menuItems={menuItems} />
          <ButtonV2.ActionsDropdown variant={BUTTON_V2_VARIANT.SECONDARY} menuItems={menuItems} />
          <ButtonV2.ActionsDropdown variant={BUTTON_V2_VARIANT.TERTIARY} menuItems={menuItems} />
        </div>
      </div>
    </div>
  )
}

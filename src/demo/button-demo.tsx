import {ButtonV2, BUTTON_V2_SIZE, BUTTON_V2_VARIANT, BUTTON_V2_TYPE, SVG} from '../components'
import calender from '../components/assets/calender.svg'
import closeIcon from '../components/assets/close.svg'

export const menuItems = [
  {
    label: 'Apply leave',
    onClick: (data: any) => {
      console.log('apply leave', data)
    },
    filterFn: () => {
      return true
    },
    iconSrc: calender,
  },

  {
    label: 'Apply Reimbursement',
    onClick: () => {
      console.log('clicked apply rim')
    },
    filterFn: () => {
      // return false
      return true
    },
    iconSrc: calender,
    customStyles: {color: 'red'},
  },
  {
    label: 'Archive',
    onClick: () => {
      console.log('clicked archive')
    },
    disabled: true,
  },
]

export function ButtonDemo() {
  return (
    <div>
      <div style={{display: 'flex', marginBottom: '25px'}}>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2 size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.LINK}>
            Link
          </ButtonV2>
          <ButtonV2 disabled size={BUTTON_V2_SIZE.SMALL} variant={BUTTON_V2_VARIANT.LINK}>
            Link
          </ButtonV2>
          <ButtonV2 variant={BUTTON_V2_VARIANT.LINK}>Link</ButtonV2>
          <ButtonV2 variant={BUTTON_V2_VARIANT.LINK} disabled>
            Link
          </ButtonV2>
        </div>
      </div>
      <div style={{display: 'flex', gap: 150, flexWrap: 'wrap'}}>
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
          <ButtonV2.ActionsDropdown isTable={true} size={BUTTON_V2_SIZE.SMALL} menuItems={[]} />
          <ButtonV2.ActionsDropdown
            isTable={true}
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            isTable={true}
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.ActionsDropdown
            isTable={true}
            disabled
            size={BUTTON_V2_SIZE.SMALL}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            disabled
            isTable={true}
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            disabled
            isTable={true}
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <ButtonV2.ActionsDropdown isTable={true} menuItems={menuItems} />
          <ButtonV2.ActionsDropdown
            isTable={true}
            variant={BUTTON_V2_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <ButtonV2.ActionsDropdown
            isTable={true}
            variant={BUTTON_V2_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
      </div>
    </div>
  )
}

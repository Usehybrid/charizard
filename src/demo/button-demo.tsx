import {Button, BUTTON_SIZE, BUTTON_VARIANT, BUTTON_TYPE, SVG} from '../components'
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
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.LINK}>
            Link
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.LINK}>
            Link
          </Button>
          <Button variant={BUTTON_VARIANT.LINK}>Link</Button>
          <Button variant={BUTTON_VARIANT.LINK} disabled>
            Link
          </Button>
        </div>
      </div>
      <div style={{display: 'flex', gap: 150, flexWrap: 'wrap'}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button size={BUTTON_SIZE.SMALL}>Button</Button>
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.SECONDARY}>
            Button
          </Button>
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.TERTIARY}>
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button disabled size={BUTTON_SIZE.SMALL}>
            Button
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.SECONDARY}>
            Button
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.TERTIARY}>
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button>Button</Button>
          <Button variant={BUTTON_VARIANT.SECONDARY}>Button</Button>
          <Button variant={BUTTON_VARIANT.TERTIARY}>Tertiary</Button>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_LEFT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_RIGHT}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button.GroupAction size={BUTTON_SIZE.SMALL} menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          >
            Button
          </Button.GroupAction>
          <Button.GroupAction
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          >
            Tertiary
          </Button.GroupAction>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button.GroupAction disabled size={BUTTON_SIZE.SMALL} menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          >
            Button
          </Button.GroupAction>
          <Button.GroupAction
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          >
            Tertiary
          </Button.GroupAction>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button.GroupAction menuItems={menuItems}>Button</Button.GroupAction>
          <Button.GroupAction variant={BUTTON_VARIANT.SECONDARY} menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction variant={BUTTON_VARIANT.TERTIARY} menuItems={menuItems}>
            Button
          </Button.GroupAction>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Button
          </Button>
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            type={BUTTON_TYPE.ICON_ONLY}
            icon={<SVG path={closeIcon} width={16} height={16} />}
          >
            Tertiary
          </Button>
        </div>
      </div>

      <div style={{display: 'flex', gap: 150, marginTop: 20}}>
        <div style={{display: 'flex', gap: 10}}>
          <Button.ActionsDropdown isTable={true} size={BUTTON_SIZE.SMALL} menuItems={[]} />
          <Button.ActionsDropdown
            isTable={true}
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            isTable={true}
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button.ActionsDropdown
            isTable={true}
            disabled
            size={BUTTON_SIZE.SMALL}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            disabled
            isTable={true}
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            disabled
            isTable={true}
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <Button.ActionsDropdown isTable={true} menuItems={menuItems} />
          <Button.ActionsDropdown
            isTable={true}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            isTable={true}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </div>
      </div>
    </div>
  )
}

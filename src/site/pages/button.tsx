import {Button, BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT, SVG} from '../../components'
import type {MenuItem} from '../../components'
import calender from '../../components/assets/calender.svg'
import closeIcon from '../../components/assets/close.svg'
import {DemoSection} from '../showcase/DemoSection'
import {DemoItem, DemoRow} from '../showcase/DemoRow'

const menuItems: MenuItem[] = [
  {
    label: 'Apply leave',
    onClick: (data: any) => console.log('apply leave', data),
    filterFn: () => true,
    iconSrc: calender,
  },
  {
    label: 'Apply Reimbursement',
    onClick: () => console.log('clicked apply reimbursement'),
    filterFn: () => true,
    iconSrc: calender,
    customStyles: {color: 'red'},
  },
  {
    label: 'Archive',
    onClick: () => console.log('clicked archive'),
    disabled: true,
  },
]

const icon = <SVG path={closeIcon} width={16} height={16} />

export default function ButtonPage() {
  return (
    <div>
      <h1>Button</h1>
      <p>Primary, secondary and tertiary buttons, icon buttons and grouped actions with menus.</p>

      <DemoSection
        title="Variants"
        description="Four visual variants: primary, secondary, tertiary and link."
        code={`import {Button, BUTTON_VARIANT} from '@hybr1d-tech/charizard'

<Button>Primary</Button>
<Button variant={BUTTON_VARIANT.SECONDARY}>Secondary</Button>
<Button variant={BUTTON_VARIANT.TERTIARY}>Tertiary</Button>
<Button variant={BUTTON_VARIANT.LINK}>Link</Button>`}
      >
        <DemoRow>
          <DemoItem label="primary">
            <Button>Button</Button>
          </DemoItem>
          <DemoItem label="secondary">
            <Button variant={BUTTON_VARIANT.SECONDARY}>Button</Button>
          </DemoItem>
          <DemoItem label="tertiary">
            <Button variant={BUTTON_VARIANT.TERTIARY}>Tertiary</Button>
          </DemoItem>
          <DemoItem label="link">
            <Button variant={BUTTON_VARIANT.LINK}>Link</Button>
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Sizes" description="Two sizes: small and default.">
        <DemoRow label="Small">
          <Button size={BUTTON_SIZE.SMALL}>Button</Button>
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.SECONDARY}>
            Button
          </Button>
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.TERTIARY}>
            Tertiary
          </Button>
          <Button size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.LINK}>
            Link
          </Button>
        </DemoRow>
        <DemoRow label="Default">
          <Button>Button</Button>
          <Button variant={BUTTON_VARIANT.SECONDARY}>Button</Button>
          <Button variant={BUTTON_VARIANT.TERTIARY}>Tertiary</Button>
          <Button variant={BUTTON_VARIANT.LINK}>Link</Button>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Disabled" description="Every variant supports the disabled state.">
        <DemoRow label="Small">
          <Button disabled size={BUTTON_SIZE.SMALL}>
            Button
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.SECONDARY}>
            Button
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.TERTIARY}>
            Tertiary
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} variant={BUTTON_VARIANT.LINK}>
            Link
          </Button>
        </DemoRow>
        <DemoRow label="Default">
          <Button disabled>Button</Button>
          <Button disabled variant={BUTTON_VARIANT.SECONDARY}>
            Button
          </Button>
          <Button disabled variant={BUTTON_VARIANT.TERTIARY}>
            Tertiary
          </Button>
          <Button disabled variant={BUTTON_VARIANT.LINK}>
            Link
          </Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Icon buttons"
        description="Icons can be placed left or right of the label, or used on their own via BUTTON_TYPE.ICON_ONLY."
      >
        <DemoRow label="Icon left">
          <Button type={BUTTON_TYPE.ICON_LEFT} icon={icon}>
            Button
          </Button>
          <Button variant={BUTTON_VARIANT.SECONDARY} type={BUTTON_TYPE.ICON_LEFT} icon={icon}>
            Button
          </Button>
          <Button variant={BUTTON_VARIANT.TERTIARY} type={BUTTON_TYPE.ICON_LEFT} icon={icon}>
            Tertiary
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.ICON_LEFT} icon={icon}>
            Disabled
          </Button>
        </DemoRow>
        <DemoRow label="Icon right">
          <Button type={BUTTON_TYPE.ICON_RIGHT} icon={icon}>
            Button
          </Button>
          <Button variant={BUTTON_VARIANT.SECONDARY} type={BUTTON_TYPE.ICON_RIGHT} icon={icon}>
            Button
          </Button>
          <Button variant={BUTTON_VARIANT.TERTIARY} type={BUTTON_TYPE.ICON_RIGHT} icon={icon}>
            Tertiary
          </Button>
          <Button disabled size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.ICON_RIGHT} icon={icon}>
            Disabled
          </Button>
        </DemoRow>
        <DemoRow label="Icon only">
          <Button type={BUTTON_TYPE.ICON_ONLY} icon={icon} />
          <Button variant={BUTTON_VARIANT.SECONDARY} type={BUTTON_TYPE.ICON_ONLY} icon={icon} />
          <Button variant={BUTTON_VARIANT.TERTIARY} type={BUTTON_TYPE.ICON_ONLY} icon={icon} />
          <Button disabled size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.ICON_ONLY} icon={icon} />
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Group actions"
        description="Button.GroupAction is a split button: the left half is a normal action, the chevron opens a menu."
        code={`import {Button, BUTTON_VARIANT} from '@hybr1d-tech/charizard'

<Button.GroupAction
  variant={BUTTON_VARIANT.SECONDARY}
  menuItems={[
    {label: 'Item 1', onClick: () => console.log('Item 1 clicked')},
    {label: 'Disabled Item', onClick: () => {}, disabled: true},
  ]}
>
  Click me
</Button.GroupAction>`}
      >
        <DemoRow label="Variants">
          <Button.GroupAction menuItems={menuItems}>Button</Button.GroupAction>
          <Button.GroupAction variant={BUTTON_VARIANT.SECONDARY} menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction variant={BUTTON_VARIANT.TERTIARY} menuItems={menuItems}>
            Button
          </Button.GroupAction>
        </DemoRow>
        <DemoRow label="Small">
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
        </DemoRow>
        <DemoRow label="Disabled">
          <Button.GroupAction disabled menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction disabled variant={BUTTON_VARIANT.SECONDARY} menuItems={menuItems}>
            Button
          </Button.GroupAction>
          <Button.GroupAction disabled variant={BUTTON_VARIANT.TERTIARY} menuItems={menuItems}>
            Tertiary
          </Button.GroupAction>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Actions dropdown"
        description="Button.ActionsDropdown renders a compact 'more' trigger that opens the same menu. Commonly used inside table rows."
      >
        <DemoRow label="Variants">
          <Button.ActionsDropdown menuItems={menuItems} />
          <Button.ActionsDropdown variant={BUTTON_VARIANT.SECONDARY} menuItems={menuItems} />
          <Button.ActionsDropdown variant={BUTTON_VARIANT.TERTIARY} menuItems={menuItems} />
        </DemoRow>
        <DemoRow label="Small">
          <Button.ActionsDropdown size={BUTTON_SIZE.SMALL} menuItems={menuItems} />
          <Button.ActionsDropdown
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </DemoRow>
        <DemoRow label="Disabled">
          <Button.ActionsDropdown disabled size={BUTTON_SIZE.SMALL} menuItems={menuItems} />
          <Button.ActionsDropdown
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.SECONDARY}
            menuItems={menuItems}
          />
          <Button.ActionsDropdown
            disabled
            size={BUTTON_SIZE.SMALL}
            variant={BUTTON_VARIANT.TERTIARY}
            menuItems={menuItems}
          />
        </DemoRow>
      </DemoSection>
    </div>
  )
}

// Pure data — also consumed by scripts/generate-manifest.mts in Node.
// Page wiring happens via import.meta.glob in page-modules.ts.
export interface ComponentEntry {
  slug: string
  title: string
  description: string
}

export interface Category {
  name: string
  entries: ComponentEntry[]
}

export const CATEGORIES: Category[] = [
  {
    name: 'Actions',
    entries: [
      {
        slug: 'button',
        title: 'Button',
        description: 'Primary, secondary and tertiary buttons, icon-only buttons and grouped actions with menus.',
      },
      {
        slug: 'segmented-control',
        title: 'SegmentedControl',
        description: 'Mutually exclusive option switcher rendered as connected segments.',
      },
    ],
  },
  {
    name: 'Forms & inputs',
    entries: [
      {slug: 'input', title: 'Input', description: 'Text input with label, error and helper states.'},
      {slug: 'input-v2', title: 'InputV2', description: 'Second-generation text input with refreshed styling.'},
      {slug: 'checkbox', title: 'Checkbox', description: 'Checkbox with label, indeterminate and disabled states.'},
      {slug: 'checkbox-v2', title: 'CheckboxV2', description: 'Zag.js-powered checkbox, the preferred generation.'},
      {slug: 'radio-group', title: 'RadioGroup', description: 'Single-choice radio group.'},
      {slug: 'radio-group-v2', title: 'RadioGroupV2', description: 'Zag.js-powered radio group, the preferred generation.'},
      {slug: 'switch', title: 'Switch', description: 'On/off toggle switch.'},
      {slug: 'switch-v2', title: 'SwitchV2', description: 'Zag.js-powered switch, the preferred generation.'},
      {slug: 'select', title: 'Select', description: 'Dropdown select built on react-select.'},
      {slug: 'select-v2', title: 'SelectV2', description: 'Zag.js-powered select, the preferred generation.'},
      {slug: 'selectors', title: 'Selectors', description: 'Multi-select option picker.'},
      {slug: 'selectors-v2', title: 'SelectorsV2', description: 'Second-generation option picker with custom rendering.'},
      {slug: 'search', title: 'Search', description: 'Search input with clear and overflow handling.'},
      {slug: 'search-v2', title: 'SearchV2', description: 'Second-generation search input.'},
      {slug: 'date-picker', title: 'DatePicker', description: 'Date and date-range picker built on react-day-picker.'},
      {slug: 'time-picker', title: 'TimePicker', description: 'Time-of-day picker.'},
      {slug: 'color-picker', title: 'ColorPicker', description: 'Zag.js-powered color picker with swatches.'},
      {slug: 'upload', title: 'Upload', description: 'File upload dropzone with progress and file management.'},
    ],
  },
  {
    name: 'Data display',
    entries: [
      {
        slug: 'table',
        title: 'Table',
        description: 'Batteries-included data table on TanStack Table v8: filters, sorting, search, pagination, row selection, column reordering and export.',
      },
      {slug: 'task-cards', title: 'TaskCards', description: 'Card list for task-style records with headers and pagination.'},
      {slug: 'badge', title: 'Badge', description: 'Small count or status badge.'},
      {slug: 'pill', title: 'Pill', description: 'Rounded pill label.'},
      {slug: 'tag', title: 'Tag', description: 'Removable tag chip.'},
      {slug: 'status', title: 'Status', description: 'Colored status indicator with label.'},
      {slug: 'avatar', title: 'Avatar', description: 'User avatar with image fallback.'},
      {slug: 'user-chip', title: 'UserChip', description: 'Compact user identity chip (avatar + name).'},
      {slug: 'users-chip', title: 'UsersChip', description: 'Overflow-aware chip for a set of users.'},
      {slug: 'accordion', title: 'Accordion', description: 'Zag.js-powered expandable content sections.'},
      {slug: 'progress', title: 'Progress', description: 'Progress bar.'},
      {slug: 'async-image', title: 'AsyncImage', description: 'Image with async loading state and fallback.'},
      {slug: 'svg', title: 'SVG', description: 'Inline SVG renderer with CSS-filter coloring.'},
    ],
  },
  {
    name: 'Overlays & feedback',
    entries: [
      {slug: 'modal', title: 'Modal', description: 'Dialog modal with header, footer and size variants.'},
      {slug: 'modal-v2', title: 'ModalV2', description: 'Zag.js-powered dialog, the preferred generation.'},
      {slug: 'drawer', title: 'Drawer', description: 'Slide-in side panel.'},
      {slug: 'drawer-v2', title: 'DrawerV2', description: 'Zag.js-powered drawer, the preferred generation.'},
      {slug: 'popover', title: 'Popover', description: 'Zag.js-powered anchored popover.'},
      {slug: 'tooltip', title: 'Tooltip', description: 'Hover tooltip.'},
      {slug: 'tooltip-v2', title: 'TooltipV2', description: 'Zag.js-powered tooltip, the preferred generation.'},
      {slug: 'alert', title: 'Alert', description: 'Inline alert banner in info, success, warning and error intents.'},
      {slug: 'toasts', title: 'Toasts', description: 'Toast notifications (success, error, info, warning) on react-toastify.'},
      {slug: 'loader', title: 'Loader', description: 'Loading spinners in multiple styles.'},
      {slug: 'skeleton', title: 'Skeleton', description: 'Skeleton loading placeholders.'},
    ],
  },
  {
    name: 'Navigation & layout',
    entries: [
      {slug: 'tabs', title: 'Tabs', description: 'Zag.js-powered tab switcher.'},
      {slug: 'layout-tabs', title: 'LayoutTabs', description: 'Route-level tab navigation.'},
      {slug: 'breadcrumbs', title: 'Breadcrumbs', description: 'Router-aware breadcrumb trail.'},
      {slug: 'empty-state', title: 'EmptyState', description: 'Empty-state placeholder with illustration and actions.'},
      {slug: 'error', title: 'Error', description: 'Full-page error layouts (404, 500).'},
      {slug: 'helmet', title: 'Helmet', description: 'Document head / page title manager.'},
    ],
  },
]

export const ALL_COMPONENTS: ComponentEntry[] = CATEGORIES.flatMap(c => c.entries)

// Pure data — also consumed by scripts/generate-manifest.mts in Node.
// Page wiring happens via import.meta.glob in page-modules.ts.
//
// One entry per component: the docs describe the CURRENT generation only.
// Where the library still exports a V2-suffixed symbol, the entry keeps the
// plain name and lists the real import names in `exports` — versions are an
// implementation detail of the package, not of the design system.
export interface ComponentEntry {
  slug: string
  title: string
  description: string
  /** Symbols to import from the package, when they differ from the title. */
  exports?: string[]
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
        description:
          'Primary, secondary and tertiary buttons, icon-only buttons and grouped actions with menus.',
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
      {
        slug: 'input',
        title: 'Input',
        description: 'Text input and textarea with labels, error handling, icons and adornments.',
        exports: ['InputV2', 'TextareaV2', 'InputControlV2', 'LabelV2'],
      },
      {
        slug: 'checkbox',
        title: 'Checkbox',
        description: 'Checkbox with label, indeterminate and disabled states.',
        exports: ['CheckboxV2'],
      },
      {
        slug: 'radio-group',
        title: 'RadioGroup',
        description: 'Single-choice radio group with horizontal and vertical layouts.',
        exports: ['RadioGroupV2'],
      },
      {
        slug: 'switch',
        title: 'Switch',
        description: 'On/off toggle switch.',
        exports: ['SwitchV2'],
      },
      {
        slug: 'select',
        title: 'Select',
        description:
          'Single and multi-select dropdown with search, sub-labels and creatable options.',
        exports: ['SelectV2', 'CreatableSelectV2'],
      },
      {
        slug: 'selectors',
        title: 'Selectors',
        description: 'Multi-select option picker with custom option rendering.',
        exports: ['SelectorsV2'],
      },
      {
        slug: 'search',
        title: 'Search',
        description: 'Debounced search input with clear button and overflow handling.',
        exports: ['SearchV2'],
      },
      {
        slug: 'date-picker',
        title: 'DatePicker',
        description:
          'Date and date-range picker built on react-day-picker, with quick-select presets.',
      },
      {slug: 'time-picker', title: 'TimePicker', description: 'Time-of-day picker.'},
      {
        slug: 'color-picker',
        title: 'ColorPicker',
        description: 'Color picker with a preset palette.',
      },
      {
        slug: 'upload',
        title: 'Upload',
        description: 'File upload dropzone with progress and file management.',
      },
    ],
  },
  {
    name: 'Data display',
    entries: [
      {
        slug: 'table',
        title: 'Table',
        description:
          'Batteries-included data table on TanStack Table v8: filters, sorting, search, pagination, row selection, expansion, column reordering and export.',
      },
      {
        slug: 'task-cards',
        title: 'TaskCards',
        description: 'Card list for task-style records with headers and pagination.',
      },
      {slug: 'badge', title: 'Badge', description: 'Small count or status badge.'},
      {slug: 'pill', title: 'Pill', description: 'Rounded pill label.'},
      {slug: 'tag', title: 'Tag', description: 'Removable tag chip.'},
      {slug: 'status', title: 'Status', description: 'Colored status indicator with label.'},
      {slug: 'avatar', title: 'Avatar', description: 'User avatar with image fallback.'},
      {
        slug: 'user-chip',
        title: 'UserChip',
        description: 'Compact user identity chip (avatar + name).',
      },
      {
        slug: 'users-chip',
        title: 'UsersChip',
        description: 'Overflow-aware chip for a set of users.',
      },
      {slug: 'accordion', title: 'Accordion', description: 'Expandable content sections.'},
      {slug: 'progress', title: 'Progress', description: 'Progress bar.'},
      {
        slug: 'async-image',
        title: 'AsyncImage',
        description: 'Image with async loading state and fallback.',
      },
      {slug: 'svg', title: 'SVG', description: 'Inline SVG renderer with CSS-filter coloring.'},
    ],
  },
  {
    name: 'Overlays & feedback',
    entries: [
      {
        slug: 'modal',
        title: 'Modal',
        description: 'Dialog with header, scrollable body, footer buttons and size variants.',
        exports: ['ModalV2'],
      },
      {
        slug: 'drawer',
        title: 'Drawer',
        description: 'Slide-in side panel that locks body scroll while open.',
        exports: ['DrawerV2'],
      },
      {
        slug: 'popover',
        title: 'Popover',
        description: 'Anchored popover with trigger and content.',
      },
      {
        slug: 'tooltip',
        title: 'Tooltip',
        description: 'Hover tooltip with placement and delay controls.',
        exports: ['TooltipV2'],
      },
      {
        slug: 'alert',
        title: 'Alert',
        description: 'Inline alert banner in info, success, warning and error intents.',
      },
      {
        slug: 'toasts',
        title: 'Toasts',
        description: 'Toast notifications (success, error, info, warning) on react-toastify.',
      },
      {slug: 'loader', title: 'Loader', description: 'Loading spinners in multiple styles.'},
      {slug: 'skeleton', title: 'Skeleton', description: 'Skeleton loading placeholders.'},
    ],
  },
  {
    name: 'Navigation & layout',
    entries: [
      {slug: 'tabs', title: 'Tabs', description: 'Tab switcher with panels.'},
      {slug: 'layout-tabs', title: 'LayoutTabs', description: 'Route-level tab navigation.'},
      {slug: 'breadcrumbs', title: 'Breadcrumbs', description: 'Router-aware breadcrumb trail.'},
      {
        slug: 'empty-state',
        title: 'EmptyState',
        description: 'Empty-state placeholder with illustration and actions.',
      },
      {slug: 'error', title: 'Error', description: 'Full-page error layouts (404, 500).'},
      {slug: 'helmet', title: 'Helmet', description: 'Document head / page title manager.'},
    ],
  },
]

export const ALL_COMPONENTS: ComponentEntry[] = CATEGORIES.flatMap(c => c.entries)

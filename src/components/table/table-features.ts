import {
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from '@tanstack/react-table'

/**
 * The feature set every table in this library is built from.
 *
 * Table v9 no longer bundles every feature into the hook — each one has to be registered
 * here, and only what is registered gets bundled by the consumer. That is the point of the
 * upgrade, so this list is deliberately the minimum the components below actually call:
 * registering `stockFeatures` instead would restore v8's everything-included bundle and
 * throw away the tree-shaking.
 *
 * The core row model is implicit in v9 (there is no `getCoreRowModel()` to pass), and the
 * expanded row model is the only processing model we need — sorting, filtering and
 * pagination are all server-driven here via the `manual*` options.
 */
export const tableFeatureSet = tableFeatures({
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
})

/**
 * `TFeatures` — the first type argument every v9 table type now takes. Exported so the
 * satellite components (checkbox, radio, expander, custom columns, meta header) describe
 * the same table the `Table` component actually builds, rather than each guessing.
 */
export type TableFeatureSet = typeof tableFeatureSet

/**
 * The nested table an expanded row reveals. It is deliberately plain — no sorting, pinning,
 * selection or pagination — so it registers only what its markup reads: `getSize()` for the
 * column widths and `getVisibleCells()` for the body. Keeping it separate from
 * {@link tableFeatureSet} is the whole point of v9's registration model: a consumer that
 * only renders sub-rows does not pull in selection or pinning code.
 */
export const subTableFeatureSet = tableFeatures({
  columnSizingFeature,
  columnVisibilityFeature,
})

export type SubTableFeatureSet = typeof subTableFeatureSet

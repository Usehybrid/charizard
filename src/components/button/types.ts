export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  // Added this variant for backward compatibility; can be removed in the future when old dependencies are updated
  GHOST = 'tertiary',
  DANGER = 'primary',
  LINK = 'link',
  MINIMAL = 'tertiary',
}

export enum BUTTON_SIZE {
  SMALL = 'small',
  DEFAULT = 'default',
}

export enum BUTTON_TYPE {
  BASIC = 'basic',
  ICON_LEFT = 'iconLeft',
  ICON_RIGHT = 'iconRight',
  ICON_ONLY = 'iconOnly',
  // can be removed in the future
  BUTTON = 'button',
  RESET = 'reset',
}

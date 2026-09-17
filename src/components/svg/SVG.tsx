import {default as ReactInlineSVG} from 'react-inlinesvg'
import {themeSvg} from './theme-svg'

export type SVGProps = {
  path: string
  width?: number
  height?: number
  spanClassName?: string
  svgClassName?: string
  customSvgStyles?: React.CSSProperties
  customSpanStyles?: React.CSSProperties
  handleClick?: (e: any) => void
  /** Preserve original colours for a logo or artwork passed through the icon component. */
  preserveColors?: boolean
}

export function SVG({
  path,
  width,
  height,
  spanClassName = '',
  svgClassName = '',
  customSpanStyles = {},
  customSvgStyles = {},
  handleClick,
  preserveColors = false,
}: SVGProps) {
  return (
    <span className={`${spanClassName}`} style={{...customSpanStyles}} onClick={handleClick}>
      <ReactInlineSVG
        src={path}
        preProcessor={preserveColors ? undefined : themeSvg}
        className={svgClassName}
        style={{...customSvgStyles}}
        // loader={<span>Loading...</span>}
        onError={error => console.log(error.message)}
        width={width}
        height={height}
      />
    </span>
  )
}

import {default as ReactInlineSVG} from 'react-inlinesvg'

interface SVGProps {
  path: string
  width?: number
  height?: number
  spanClassName?: string
  svgClassName?: string
  customSvgStyles?: React.CSSProperties
  customSpanStyles?: React.CSSProperties
  handleClick?: (e: any) => void
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
}: SVGProps) {
  return (
    <span className={`${spanClassName}`} style={{...customSpanStyles}} onClick={handleClick}>
      <ReactInlineSVG
        src={path}
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

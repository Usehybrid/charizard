import * as React from 'react'
import {Skeleton} from '../skeleton'
import {ImageProps} from './types'

/**
 * AsyncImage component that displays an image asynchronously.
 * While the image is loading, it shows a skeleton loader.
 *
 * @param {Object} props - The image properties object.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} [props.className] - Additional CSS classes for styling the image and skelton.
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} props - Additional props for the img element.
 * @returns {JSX.Element} The rendered component.
 */
export function AsyncImage({src, alt, className, ...props}: ImageProps) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement | null>(null)

  React.useEffect(() => {
    const image = new Image()
    image.onload = () => {
      setIsImageLoaded(true)
    }
    image.src = src
    imageRef.current = image

    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null
      }
    }
  }, [src])
  return (
    <>
      {isImageLoaded ? (
        <img src={src} alt={alt} className={className} loading="lazy" {...props} />
      ) : (
        <Skeleton className={className} />
      )}
    </>
  )
}

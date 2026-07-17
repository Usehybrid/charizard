import {AsyncImage} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow, DemoItem} from '../showcase/DemoRow'
import classes from './async-image.module.css'

/** Inline SVG product shots so the showcase works offline. */
const deviceImg = (label: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="180"><rect width="240" height="180" fill="${bg}"/><rect x="60" y="45" width="120" height="76" rx="6" fill="#1f2937" stroke="#e5e7eb" stroke-width="3"/><rect x="48" y="121" width="144" height="10" rx="5" fill="#9ca3af"/><text x="120" y="158" font-family="Arial, sans-serif" font-size="14" fill="#111827" text-anchor="middle">${label}</text></svg>`,
  )}`

const macbook = deviceImg('MacBook Pro 14"', '#e8edfb')
const latitude = deviceImg('Dell Latitude 7450', '#e6f4f1')

export default function AsyncImagePage() {
  return (
    <div>
      <h1>AsyncImage</h1>
      <p>Drop-in img replacement that shows a Skeleton placeholder until the image has loaded.</p>

      <DemoSection
        title="Loaded image"
        description="Preloads src off-screen and swaps the Skeleton for the real img once it fires onload. className is applied to both, so the placeholder occupies the exact same box."
        code={`
import {AsyncImage} from '@hybr1d-tech/charizard'

<AsyncImage
  src={product.image_url}
  alt='MacBook Pro 14" M4'
  className={classes.thumb}
/>
`}
      >
        <DemoRow>
          <DemoItem label={'MacBook Pro 14"'}>
            <AsyncImage src={macbook} alt={'MacBook Pro 14" M4'} className={classes.thumb} />
          </DemoItem>
          <DemoItem label="Dell Latitude 7450">
            <AsyncImage src={latitude} alt="Dell Latitude 7450" className={classes.thumb} />
          </DemoItem>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Loading state"
        description="While the image has not loaded (slow network, missing file), the Skeleton keeps pulsing in place. This example points at a URL that never resolves so the placeholder stays visible."
        code={`
<AsyncImage
  src="/cdn/product-shots/still-uploading.png"
  alt="Product shot"
  className={classes.banner}
/>
`}
      >
        <DemoRow>
          <DemoItem label="skeleton placeholder">
            <AsyncImage
              src="/cdn/product-shots/still-uploading.png"
              alt="Product shot"
              className={classes.banner}
            />
          </DemoItem>
        </DemoRow>
      </DemoSection>
    </div>
  )
}

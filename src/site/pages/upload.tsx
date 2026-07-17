import {DOCS_TYPE, Upload} from '../../components'
import type {UploadFileType} from '../../components'
import {DemoSection} from '../showcase/DemoSection'

// NOTE: in the real product, handleImageUpload requests a presigned S3 URL from the
// backend (`POST /users/document`) and PUTs the file blob to that URL. This showcase
// simulates the round-trip with a timeout so the page works fully offline — files never
// leave the browser.
async function simulateImageUpload(images: any[]): Promise<{uploadedFiles: UploadFileType[]; isUploaded: boolean}> {
  // let the built-in progress animation run for a bit before "completing" the upload
  await new Promise(resolve => setTimeout(resolve, 2500))

  const uploadedFiles: UploadFileType[] = images.map(image => {
    // stop the progress-bar interval that Upload attached to the file
    clearInterval(image.setIntervalFunction)
    return {
      ...image,
      ext: typeof image.type === 'string' && image.type.includes('/') ? image.type.split('/')[1] : image.ext,
      isUploaded: true,
    }
  })

  return {uploadedFiles, isUploaded: true}
}

export default function UploadPage() {
  return (
    <div>
      <h1>Upload</h1>
      <p>File upload dropzone with progress bars, per-file management and size/count limits (upload simulated offline here).</p>

      <DemoSection
        title="Basic upload (simulated)"
        description="Drop files or click to browse. Progress is animated by the component; this page resolves the upload locally after a short delay instead of hitting S3."
        code={`import {DOCS_TYPE, Upload} from '@hybr1d-tech/charizard'

<Upload
  type={DOCS_TYPE.LEAVE_DOCS}
  getUploadDoc={files => console.log(files)}
  handleImageUpload={handleImageUpload} // presigned-URL flow in the real app
  acceptedFileTypes="image/png, image/jpeg, image/webp, application/pdf"
  addDocumentSubtitle="PDF, PNG, WEBP and JPEG."
  fileUploadLimit={2}
  uploadFileLimit={5}
/>`}
      >
        <div style={{width: '100%'}}>
          <Upload
            type={DOCS_TYPE.LEAVE_DOCS}
            getUploadDoc={files => console.log('uploaded docs', files)}
            handleImageUpload={simulateImageUpload}
            acceptedFileTypes={
              'image/png, image/jpeg, image/jpeg, image/webp, application/pdf, .doc, .docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            }
            addDocumentSubtitle={'PDF, Doc, Docx, PNG, WEBP, Xls, Xlsx and JPEG.'}
            fileUploadLimit={2}
            uploadFileLimit={5}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Single file"
        description="isMultiple={false} with fileUploadLimit={1} restricts the dropzone to one file; picking again replaces it."
      >
        <div style={{width: '100%'}}>
          <Upload
            type={DOCS_TYPE.COMMENT_DOCS}
            getUploadDoc={files => console.log('uploaded doc', files)}
            handleImageUpload={simulateImageUpload}
            isMultiple={false}
            fileUploadLimit={1}
            uploadFileLimit={5}
            acceptedFileTypes="image/png, image/jpeg, application/pdf"
            addDocumentSubtitle="PDF, PNG and JPEG."
          />
        </div>
      </DemoSection>

      <DemoSection title="Disabled" description="The disabled dropzone blocks browsing and drag-and-drop.">
        <div style={{width: '100%'}}>
          <Upload
            type={DOCS_TYPE.COMMENT_DOCS}
            disabled
            getUploadDoc={() => {}}
            handleImageUpload={simulateImageUpload}
            addDocumentSubtitle="PDF, PNG and JPEG."
          />
        </div>
      </DemoSection>
    </div>
  )
}

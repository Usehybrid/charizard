import {DOCS_TYPE, Upload, UploadFileType} from '../components'
import axios from 'axios'

export function UploadDemo() {
  const apiAxios = axios.create({
    baseURL: '' as string | undefined,
    timeout: 120000,
    adapter: 'xhr',
  })

  async function uploadObjectDoc(presignedUrlData: any, uri: string, image: UploadFileType) {
    try {
      const {data: url} = presignedUrlData
      const doc = await fetch(uri)
      const blob = await doc.blob()
      const awsAxios = axios.create({})
      delete awsAxios.defaults.headers.common['Authorization']
      const resp = await awsAxios.put(url.signedUrl || url, blob, {
        headers: {
          'Content-Type': image.type,
        },
        // onUploadProgress: data => {
        //   console.log({ data: Math.round((100 * data.loaded) / (data.total || 1)) })

        //   //Set the progress value to show the progress bar
        //   // setProgress(Math.round((100 * data.loaded) / data.total))
        // },
      })
      clearInterval(image.setIntervalFunction)
      if (resp && resp.status >= 200 && resp.status <= 299) {
        console.log('uploadImage() uploaded image to S3 successfully')
        return {
          ...image,
          ext: image.type.split('/')[1],
          url: (url.signedUrl || url).split('?')[0],
          metaData: presignedUrlData.meta_data,
          isUploaded: true,
        }
      }
    } catch (e) {
      throw new Error(e as string)
    }
  }

  async function requestDocUploadPermission(
    fileName: string,
    target: string,
    ext: string,
    fileSize: number,
    keyName?: string,
    value?: string,
    customUrl?: string,
    inventoryId?: string | null,
    softwareId?: string | null,
  ) {
    try {
      const url = customUrl ? customUrl : '/users/document'
      let fileExtension = 'jpeg'
      if (ext.includes('/')) {
        ;[, fileExtension] = ext.split('/')
      }
      return await apiAxios.post(
        url,
        keyName
          ? {
              fileName,
              type: target,
              ext: fileExtension,
              size: fileSize,
              [keyName]: value,
              inventoryId: inventoryId || undefined,
              softwareId: softwareId || undefined,
            }
          : {
              fileName,
              type: target,
              ext: fileExtension,
              size: fileSize,
              inventoryId: inventoryId || undefined,
              softwareId: softwareId || undefined,
            },
      )
    } catch (e) {
      throw new Error(e as string)
    }
  }

  async function handleImageUpload(
    images: any[],
    type: DOCS_TYPE,
    key?: string,
    value?: string,
    customUrl?: string,
    inventoryId?: string | null,
    softwareId?: string | null,
  ): Promise<any[]> {
    const payloadImages: any[] = [...images]
    const s3Target = type

    const uploadPromises = await images.map(
      image =>
        new Promise<{url: string | undefined; id: string; metaData: any}>(resolve => {
          if (image.url?.includes('blob') || image.docLink?.includes('blob')) {
            requestDocUploadPermission(
              image.fileName,
              s3Target,
              image.type,
              image.fileSize,
              key,
              value,
              customUrl,
              inventoryId,
              softwareId,
            )
              .then(response => {
                if (response?.data?.data) {
                  return uploadObjectDoc(response.data, image.url, image)
                }
              })
              .then(data => {
                resolve({
                  ...data,
                  url: data?.url,
                  id: image.id,
                  metaData: data?.metaData,
                })
              })
          } else {
            resolve({...image})
          }
        }),
    )
    try {
      const uploadedImages = await Promise.all(uploadPromises)
      uploadedImages.forEach((imageObj, index) => {
        if (imageObj && imageObj.url) {
          payloadImages[index] = {
            ...imageObj,
            url: imageObj.url,
            id: imageObj.id,
            metaData: imageObj.metaData,
          }
        }
      })
    } catch (error) {
      console.error('handleImageUpload e()', error)
    }
    return payloadImages
  }

  return (
    <Upload
      getUploadDoc={file => console.log(file[0])}
      type={DOCS_TYPE.LEAVE_DOCS}
      acceptedFileTypes={
        'image/png, image/jpeg, image/jpeg, image/webp, application/pdf, .doc, .docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      }
      addDocumentSubtitle={`PDF, Doc, Docx, PNG, WEBP,Xls, Xlsx and JPEG. Max ${1} file can be attached.`}
      handleImageUpload={handleImageUpload}
      fileUploadLimit={2}
      uploadFileLimit={5}
    />
  )
}

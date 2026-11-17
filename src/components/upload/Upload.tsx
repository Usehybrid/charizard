import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {formatBytes, getFileTypeIcon, renderFileTypes} from './helper'
import {SVG} from '../svg'
import close from '../assets/close.svg'
import fileUpload from '../assets/file-upload.svg'
import deleteOutline from '../assets/delete-bin.svg'
import {pluralize} from '../../utils'
import {DOCS_TYPE} from '../../types'
import {Button, BUTTON_VARIANT} from '../button'
import {TooltipV2} from '../tooltip-v2'
import {Alert, ALERT_ACTION_TYPES, ALERT_TYPES} from '../alert'
export type UploadFileType = {
  id?: string
  ext: string
  type: string
  url: string
  metaData?: {
    fileName: string
    key: string
  }
  key: string
  fileName: string
  isUploaded: boolean
  size: string
  fileSize?: number
  uploadStatus?: 'pending' | 'uploaded' | 'failed' | 'cancelled'
  setIntervalFunction?: any
}

export type UploadRequestOptions = {
  signals?: Record<string, AbortSignal>
}

export enum UPLOAD_ALIGN_BTN_CONTENT {
  LEFT = 'flex-start',
  CENTER = 'center',
  RIGHT = 'flex-end',
}
interface UploadProps {
  type: DOCS_TYPE
  disabled?: boolean
  getUploadDoc: (arg: any) => void
  setIsUploading?: (arg: any) => void
  customComponent?: React.ReactNode
  fileUploadLimit?: number
  isMultiple?: boolean
  singleFileClassName?: string
  fileContainerClassName?: string
  uploadFileLimit?: number //its in MB
  uploadBtnClassName?: string
  alignContent?: UPLOAD_ALIGN_BTN_CONTENT
  showUploadIcon?: boolean
  additionalNode?: React.ReactElement
  addDocumentText?: string
  customUrl?: string
  beforeUploadHandler?: () => void
  inventoryId?: string | null
  softwareId?: string | null
  preLoadedFiles?: Array<UploadFileType>
  showFileList?: boolean
  acceptedFileTypes?: string
  extraSubtitleText?: string
  error?: string | null
  addDocumentSubtitle?: string
  handleImageUpload: (
    images: any[],
    type: DOCS_TYPE,
    key?: string,
    value?: string,
    customUrl?: string,
    inventoryId?: string | null,
    softwareId?: string | null,
    options?: UploadRequestOptions,
  ) => Promise<{uploadedFiles: UploadFileType[]; isUploaded: boolean}>
  variant?: string
}

interface progressBarType {
  name: string
  progress: number
}

const areUploadFilesEqual = (left: UploadFileType, right: UploadFileType) =>
  left.id === right.id &&
  left.ext === right.ext &&
  left.type === right.type &&
  left.url === right.url &&
  left.key === right.key &&
  left.fileName === right.fileName &&
  left.size === right.size &&
  left.fileSize === right.fileSize &&
  left.isUploaded === right.isUploaded &&
  left.uploadStatus === right.uploadStatus &&
  left.metaData?.fileName === right.metaData?.fileName &&
  left.metaData?.key === right.metaData?.key

const EMPTY_PRELOADED_FILES: UploadFileType[] = []

export function Upload({
  getUploadDoc,
  setIsUploading,
  customComponent,
  fileUploadLimit = 10,
  type,
  isMultiple = true,
  uploadFileLimit = 5,
  singleFileClassName,
  fileContainerClassName,
  uploadBtnClassName,
  alignContent,
  showUploadIcon = true,
  additionalNode,
  disabled = false,
  addDocumentText = 'Upload file',
  customUrl,
  beforeUploadHandler,
  extraSubtitleText,
  inventoryId = undefined,
  softwareId,
  preLoadedFiles = EMPTY_PRELOADED_FILES,
  showFileList = true,
  acceptedFileTypes = 'image/png, image/jpeg, image/jpeg, image/webp, application/pdf, .doc, .docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  error,
  addDocumentSubtitle,
  handleImageUpload,
}: // variant = 'normal',
UploadProps) {
  const [files, setFiles] = React.useState<UploadFileType[]>(() =>
    preLoadedFiles.map(file => ({...file, isUploaded: true, uploadStatus: 'uploaded'})),
  )
  const filesRef = React.useRef(files)
  const [uploadingKeys, setUploadingKeys] = React.useState<Set<string>>(() => new Set())
  const [fileUploadProgress, setFileUploadProgress] = React.useState<progressBarType[]>([])
  const [fileUploadLimitError, setFileUploadLimitError] = React.useState<string | null>(null)
  const [uploadLimitError, setUploadLimitError] = React.useState('')
  const [uploadError, setUploadError] = React.useState<string | null>(null)
  const [hide, setHide] = React.useState(true)
  const fileInputRef = React.useRef<any>(null)
  const abortControllersRef = React.useRef(new Map<string, AbortController>())
  const progressIntervalsRef = React.useRef(new Map<string, ReturnType<typeof setInterval>>())
  const isUploading = uploadingKeys.size > 0
  const isInputDisabled = disabled || (!!fileUploadLimit && files.length >= fileUploadLimit)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (uploadLimitError.length) {
        setUploadLimitError('')
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [uploadLimitError])

  React.useEffect(() => {
    const preloaded = preLoadedFiles.map(file => ({
      ...file,
      isUploaded: true,
      uploadStatus: 'uploaded' as const,
    }))
    setFiles(current => {
      const preloadedKeys = new Set(preloaded.map(file => file.key))
      const pending = current.filter(file => !file.isUploaded && !preloadedKeys.has(file.key))
      const next = [...preloaded, ...pending]
      if (
        next.length === current.length &&
        next.every((file, index) => areUploadFilesEqual(file, current[index]))
      ) {
        return current
      }
      current.forEach(file => {
        if (
          file.url.startsWith('blob:') &&
          !next.some(nextFile => nextFile.url === file.url)
        ) {
          URL.revokeObjectURL(file.url)
        }
      })
      filesRef.current = next
      return next
    })
  }, [preLoadedFiles])

  React.useEffect(() => {
    getUploadDoc(files.filter(file => file.isUploaded))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  React.useEffect(() => {
    setIsUploading?.(isUploading)
    return () => {
      if (isUploading) setIsUploading?.(false)
    }
  }, [isUploading, setIsUploading])

  React.useEffect(
    () => () => {
      abortControllersRef.current.forEach(controller => controller.abort())
      progressIntervalsRef.current.forEach(interval => clearInterval(interval))
      filesRef.current.forEach(file => {
        if (file.url.startsWith('blob:')) URL.revokeObjectURL(file.url)
      })
    },
    [],
  )

  const clearProgress = (key: string) => {
    const interval = progressIntervalsRef.current.get(key)
    if (interval) clearInterval(interval)
    progressIntervalsRef.current.delete(key)
    setFileUploadProgress(current => current.filter(item => item.name !== key))
  }

  const removeFiles = (keys: Set<string>) => {
    setFiles(current => {
      const next = current.filter(file => !keys.has(file.key))
      filesRef.current = next
      return next
    })
  }

  const uploadFiles = async (batch: UploadFileType[]) => {
    const signals: Record<string, AbortSignal> = {}
    const retainedBlobUrls = new Set<string>()
    batch.forEach(file => {
      const controller = new AbortController()
      abortControllersRef.current.set(file.key, controller)
      signals[file.key] = controller.signal
    })
    setUploadingKeys(current => new Set([...current, ...batch.map(file => file.key)]))

    try {
      const result = await handleImageUpload(
        batch.map(file => ({...file})),
        type,
        undefined,
        undefined,
        customUrl,
        inventoryId,
        softwareId,
        {signals},
      )
      const resultByKey = new Map(result.uploadedFiles.map(file => [file.key, file]))
      const failedKeys = new Set<string>()

      batch.forEach(file => {
        const controller = abortControllersRef.current.get(file.key)
        if (controller?.signal.aborted) return
        const uploadedFile = resultByKey.get(file.key)
        if (!uploadedFile?.isUploaded) failedKeys.add(file.key)
        if (uploadedFile?.isUploaded && uploadedFile.url === file.url) {
          retainedBlobUrls.add(file.url)
        }
      })

      setFiles(current => {
        const next = current.flatMap(file => {
          if (!batch.some(item => item.key === file.key)) return [file]
          const controller = abortControllersRef.current.get(file.key)
          if (controller?.signal.aborted || failedKeys.has(file.key)) return []
          const uploadedFile = resultByKey.get(file.key)
          return uploadedFile
            ? [{...file, ...uploadedFile, isUploaded: true, uploadStatus: 'uploaded' as const}]
            : []
        })
        filesRef.current = next
        return next
      })

      if (failedKeys.size) {
        setUploadError(
          `${failedKeys.size} ${pluralize(
            failedKeys.size,
            'file failed',
            'files failed',
          )} to upload. Please try again.`,
        )
      }
    } catch {
      const failedKeys = new Set(
        batch
          .filter(file => !abortControllersRef.current.get(file.key)?.signal.aborted)
          .map(file => file.key),
      )
      removeFiles(failedKeys)
      if (failedKeys.size) {
        setUploadError(
          `${failedKeys.size} ${pluralize(
            failedKeys.size,
            'file failed',
            'files failed',
          )} to upload. Please try again.`,
        )
      }
    } finally {
      batch.forEach(file => {
        clearProgress(file.key)
        abortControllersRef.current.delete(file.key)
        if (file.url.startsWith('blob:') && !retainedBlobUrls.has(file.url)) {
          URL.revokeObjectURL(file.url)
        }
      })
      setUploadingKeys(current => {
        const next = new Set(current)
        batch.forEach(file => next.delete(file.key))
        return next
      })
    }
  }

  async function handleFileChange(e: any) {
    const selectedFiles = Array.from(e.target.files as FileList)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setFileUploadLimitError(null)
    setUploadLimitError('')
    setUploadError(null)
    let allFiles: UploadFileType[] = []
    const existingCount = isMultiple ? filesRef.current.length : 0
    if (fileUploadLimit && selectedFiles.length + existingCount > fileUploadLimit) {
      setFileUploadLimitError(
        `You are only allowed to upload ${fileUploadLimit} ${pluralize(
          fileUploadLimit,
          'file',
          'files',
        )}`,
      )
      return
    }
    let flag = false
    for (const uploadedFile of selectedFiles) {
      if ((uploadFileLimit || 5) >= Number((uploadedFile.size / (1024 * 1024)).toFixed(2))) {
        allFiles.push({
          ext: uploadedFile.type.split('/')[1] || '',
          type: uploadedFile.type,
          url: URL.createObjectURL(uploadedFile),
          fileName: uploadedFile.name,
          isUploaded: false,
          uploadStatus: 'pending',
          size: formatBytes(uploadedFile.size),
          fileSize: uploadedFile.size,
          key: '',
        })
      }
      if (
        uploadedFile.size &&
        (uploadFileLimit || 5) < Number((uploadedFile.size / (1024 * 1024)).toFixed(2))
      ) {
        flag = true
      }
    }

    if (flag) {
      allFiles.forEach(file => {
        URL.revokeObjectURL(file.url)
      })
      setUploadLimitError(`Maximum file size allowed is  ${uploadFileLimit || 5}MB.`)
      return
    }
    if (selectedFiles.length > allFiles.length) {
      setUploadLimitError(
        `Few files were not uploaded as they are bigger than maximum size allowed ${
          uploadFileLimit || 5
        }MB.`,
      )
      // return
    }
    if (!isMultiple) {
      abortControllersRef.current.forEach(controller => controller.abort())
      Array.from(progressIntervalsRef.current.keys()).forEach(clearProgress)
      filesRef.current.forEach(file => {
        if (file.url.startsWith('blob:')) URL.revokeObjectURL(file.url)
      })
    }
    allFiles = allFiles.map((file: UploadFileType) => {
      const key = crypto.randomUUID()
      const interval = addProgressToImageUpload(key)
      return {...file, setIntervalFunction: interval, key}
    })
    const nextFiles = isMultiple ? [...filesRef.current, ...allFiles] : allFiles
    filesRef.current = nextFiles
    setFiles(nextFiles)
    if (allFiles.length) void uploadFiles(allFiles)
  }

  function handleFileDelete(key: string) {
    const file = filesRef.current.find(item => item.key === key)
    if (file?.url.startsWith('blob:')) URL.revokeObjectURL(file.url)
    removeFiles(new Set([key]))
  }

  const addProgressToImageUpload = (name: string) => {
    let step = 0.5
    let currentProgress = 0
    const interval = setInterval(function () {
      currentProgress += step
      let progress = Math.round((Math.atan(currentProgress) / (Math.PI / 2)) * 100 * 1000) / 1000
      if (progress >= 70) {
        step = 0.2
      }
      setFileUploadProgress(previous => {
        const existingProgress = previous.find(item => item.name === name)
        if (existingProgress) {
          return previous.map(item => {
            if (item.name !== name) return item
            return {name, progress}
          })
        } else {
          return [...previous, {name, progress}]
        }
      })
    }, 100)
    progressIntervalsRef.current.set(name, interval)
    return interval
  }
  const getFileUploadProgress = (name: string) => {
    return fileUploadProgress.findLast(progress => progress.name === name)?.progress
  }
  return (
    <>
      <input
        ref={fileInputRef}
        onClick={event => {
          event.currentTarget.value = ''
        }}
        onChange={handleFileChange}
        type="file"
        accept={acceptedFileTypes}
        style={{display: 'none'}}
        multiple={isMultiple}
        max={10}
        disabled={isInputDisabled}
      />
      <div style={{width: '100%'}}>
        {isUploading && isInputDisabled ? (
          <TooltipV2
            trigger={
              <div
                className={
                  customComponent
                    ? ''
                    : clsx(
                        classes.uploadBtn,
                        uploadBtnClassName,
                        disabled || isInputDisabled ? classes.disabledUploadBtn : '',
                      )
                }
                style={{
                  background: isInputDisabled ? '#F4F4F4' : '',
                  cursor: disabled || isInputDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                {customComponent ? (
                  customComponent
                ) : (
                  <>
                    <div
                      className={clsx(classes.parentContainer)}
                      style={{justifyContent: alignContent}}
                    >
                      {showUploadIcon && <SVG path={fileUpload} height={28} width={28} />}
                      <div className={clsx(classes.title, disabled ? classes.disabledTitle : '')}>
                        {addDocumentText}
                      </div>
                      <div
                        className={clsx(classes.subTitle, disabled ? classes.disabledSubTitle : '')}
                      >
                        <span>File Type: </span>
                        <b>{addDocumentSubtitle}</b>
                        <b> {renderFileTypes(acceptedFileTypes)}.</b>
                        <div className={classes.divider}></div>
                        Max size per file: <b>{`${uploadFileLimit || 5} MB`}</b>
                        <div className={classes.divider}></div>
                        Upload allowed: <b>{fileUploadLimit}</b>
                      </div>
                      {extraSubtitleText && (
                        <div
                          className={clsx(
                            classes.subTitle,
                            disabled ? classes.disabledSubTitle : '',
                          )}
                        >
                          {extraSubtitleText}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            }
            content={'Please wait till all the files are uploaded.'}
          />
        ) : (
          <div
            onClick={() => {
              if (!isInputDisabled) {
                beforeUploadHandler?.()
                fileInputRef.current.click()
              }
            }}
            onDrop={e => {
              if (!isInputDisabled) {
                e.preventDefault()
                e.persist()
                handleFileChange({target: {files: e.dataTransfer.files}})
              }
            }}
            className={
              customComponent
                ? ''
                : clsx(
                    classes.uploadBtn,
                    uploadBtnClassName,
                    disabled || isInputDisabled ? classes.disabledUploadBtn : '',
                  )
            }
            onDragOver={e => {
              e.preventDefault()
            }}
            onDragLeave={e => {
              e.preventDefault()
            }}
            style={{
              background: isInputDisabled ? '#F4F4F4' : '',
              cursor: disabled || isInputDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            {customComponent ? (
              customComponent
            ) : (
              <>
                <div
                  className={clsx(classes.parentContainer)}
                  style={{justifyContent: alignContent}}
                >
                  {showUploadIcon && (
                    <SVG
                      path={fileUpload}
                      // variant={disabled ? 'secondary' : 'primary'}
                      height={28}
                      width={28}
                      // customSpanStyles={{marginBottom: '10px'}}
                    />
                  )}
                  {/* <div className={clsx(classes.uploadContainer)} style={{alignItems: alignContent}}> */}
                  <div className={clsx(classes.title, disabled ? classes.disabledTitle : '')}>
                    {addDocumentText}
                  </div>
                  {/* <div className={clsx(classes.subTitle, disabled ? classes.disabledSubTitle : '')}>
                  Choose file or drag and drop here
                </div> */}
                  <div className={clsx(classes.subTitle, disabled ? classes.disabledSubTitle : '')}>
                    <span>File Type: </span>
                    <b>{addDocumentSubtitle}</b>
                    <b> {renderFileTypes(acceptedFileTypes)}.</b>
                    <div className={classes.divider}></div>
                    Max size per file: <b>{`${uploadFileLimit || 5} MB`}</b>
                    <div className={classes.divider}></div>
                    Upload allowed: <b>{fileUploadLimit}</b>
                  </div>
                  {extraSubtitleText && (
                    <div
                      className={clsx(classes.subTitle, disabled ? classes.disabledSubTitle : '')}
                    >
                      {extraSubtitleText}
                    </div>
                  )}
                  {/* </div> */}
                </div>
              </>
            )}
          </div>
        )}
        {(fileUploadLimitError || !!uploadLimitError) && (
          <p className={classes.fileUploadLimitError}>{fileUploadLimitError || uploadLimitError}</p>
        )}
        {(error || uploadError) && <p className={classes.errorMsg}>{error || uploadError}</p>}
        {additionalNode}
        {showFileList && (
          <div className={clsx(classes.fileContainer, fileContainerClassName)}>
            {!!files.length &&
              files.map((file: UploadFileType, index) => (
                <div key={file.key + file.fileName}>
                  {file.isUploaded ? (
                    <div
                      className={clsx(
                        classes.singleDoc,
                        singleFileClassName,
                        disabled ? classes.uploadedFileDisabled : '',
                      )}
                      key={file.fileName ?? index}
                    >
                      <div className={classes.contentContainer}>
                        <div className={classes.dFlex}>
                          <img
                            className={classes.uploadingImg}
                            src={getFileTypeIcon(file.type || file.ext)}
                            alt="upload"
                          />
                          <div className={classes.detailsContainer}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              className={classes.fileName}
                            >
                              {file.fileName}
                            </a>
                            <div className={classes.subTitle2}>
                              {(file.ext || file.type) && (
                                <div className={classes.fileType}>
                                  {file.ext || file.type?.split('/')[1]}{' '}
                                </div>
                              )}
                              {file.size && <div className={classes.divider}></div>}
                              {file.size && (
                                <div>
                                  {Number(file.size?.split(' ')[0]).toFixed(2) +
                                    ' ' +
                                    file.size?.split(' ')[1]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={BUTTON_VARIANT.TERTIARY}
                          onClick={() => handleFileDelete(file.key)}
                        >
                          <img className={classes.deleteIcon} src={deleteOutline} alt="delete" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={clsx(classes.singleDoc, singleFileClassName)}
                      key={file.fileName ?? index}
                    >
                      <div
                        className={classes.progressBar}
                        style={{width: `${getFileUploadProgress(file.key)}%`}}
                      ></div>

                      <div className={classes.contentContainer}>
                        <div className={classes.dFlex}>
                          <img
                            className={classes.uploadingImg}
                            src={getFileTypeIcon(file.type || file.ext)}
                            alt="upload"
                          />
                          <div className={classes.detailsContainer}>
                            <div className={classes.fileName}>Uploading file</div>
                            <div className={classes.subTitle2}>
                              <div className={classes.fileType}>
                                {getFileUploadProgress(file.key)?.toFixed(0)} %{' '}
                              </div>
                              <div className={classes.divider}></div>
                              <div>
                                {file?.size?.split(' ')[0] &&
                                getFileUploadProgress(file.key)?.toFixed(0) &&
                                typeof Number(file?.size?.split(' ')[0]) === 'number'
                                  ? (
                                      +file?.size?.split(' ')[0] *
                                      ((Number(getFileUploadProgress(file.key)?.toFixed(0)) || 1) /
                                        100)
                                    ).toFixed(2)
                                  : ''}{' '}
                                of {file?.size}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={BUTTON_VARIANT.TERTIARY}
                          onClick={() => {
                            setHide(false)
                            abortControllersRef.current.get(file.key)?.abort()
                            clearProgress(file.key)
                            removeFiles(new Set([file.key]))
                            if (file.url.startsWith('blob:')) URL.revokeObjectURL(file.url)
                          }}
                        >
                          <SVG path={close} height={16} width={16} />
                        </Button>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
        {isUploading && !hide && (
          <Alert
            header={<div>Cancelling file upload.</div>}
            alertType={ALERT_TYPES.HIGHLIGHT}
            actionType={ALERT_ACTION_TYPES.CLOSE}
            hide={hide}
            setHide={setHide}
          />
        )}
      </div>
    </>
  )
}

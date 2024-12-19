import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import checkIcon from '../assets/check.svg'
import {ButtonV2, BUTTON_V2_VARIANT} from '../button-v2'
import {SVG} from '../svg'

type ProgressProps = {
  /**
   * steps to show
   * if there isError is true, user won't be able to click on Continue or finish button
   */
  steps: {
    label: string
    component: React.ReactNode
    isError: boolean
    onContinueClick?: Function
  }[]
  /**
   * handle cancel click
   */
  onCancelClick: () => void
  /**
   * handle final step click
   */
  onFinalStepClick: () => void
  /**
   * text to show on footer continue button when the step is last step
   */
  lastStepFooterContinueBtnText: string
  /**
   * show skip button or not
   */
  showSkipBtn?: boolean
  /**
   * show buttons on header
   */
  showHeaderBtns?: boolean
  /**
   * show footer
   */
  showFooter?: boolean
  /**
   * text to show on header continue button when the step is last step
   */
  lastStepHeaderContinueBtnText?: string
  /**
   * allow navigation of steps when user click on certain step
   */
  allowNavigationOnStepClick?: boolean
  /**
   * step to show skip button (counting starts from zero)
   */
  stepToShowSkipBtn?: number
  /**
   * skip button text
   */
  skipBtnText?: string
  /**
   * directly jump to particular step (index starts from 0)
   */
  jumpToStep?: number
  /**
   * on skip click
   */
  onSkipClick?: () => void
}

export function Progress({
  steps,
  onCancelClick,
  onFinalStepClick,
  stepToShowSkipBtn = 0,
  lastStepFooterContinueBtnText = 'Confirm',
  showSkipBtn = false,
  showHeaderBtns = false,
  showFooter = true,
  lastStepHeaderContinueBtnText = 'Finish',
  allowNavigationOnStepClick = true,
  skipBtnText = 'Skip and continue',
  jumpToStep = 0,
  onSkipClick = () => {},
}: ProgressProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [finalStepClicked, setFinalStepClicked] = React.useState(false)

  const isFinalStep = currentStep === steps.length - 1
  const isError = steps[currentStep].isError

  React.useEffect(() => {
    setCurrentStep(jumpToStep)
  }, [jumpToStep])

  const onContinueClick = async () => {
    const onClick = steps[currentStep].onContinueClick

    try {
      if (onClick) {
        if (onClick.constructor && onClick.constructor.name === 'AsyncFunction') {
          await onClick()
          handleNextStepClick()
        } else {
          onClick()
          handleNextStepClick()
        }
      } else if (isFinalStep) {
        onFinalStepClick()
        setFinalStepClicked(true)
      }
    } catch (error) {
      return
    }
  }

  const handleNextStepClick = () => {
    if (isFinalStep && !isError) {
      onFinalStepClick()
      setFinalStepClicked(true)
    } else if (currentStep < steps.length - 1 && !isError) {
      setCurrentStep(currentStep + 1)
    }
  }

  const onBackClick = () => {
    setCurrentStep(currentStep - 1)
    setFinalStepClicked(false)
  }

  const navigateOnClick = (step: number) => {
    if (allowNavigationOnStepClick && step < currentStep) setCurrentStep(step)
  }

  const handleOnSkipClick = () => {
    onSkipClick()
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className={classes.progressContainer}>
      <div className={classes.header}>
        <div className={classes.steps}>
          {steps.map((step, idx) => (
            <div key={idx} className={classes.step} onClick={() => navigateOnClick(idx)}>
              {idx > 0 && <div className={classes.line}></div>}
              <div className={classes.labelContainer}>
                <div
                  className={clsx(
                    classes.circle,
                    currentStep === idx && !finalStepClicked && classes.active,
                    (idx < currentStep || finalStepClicked) && classes.completed,
                  )}
                >
                  {idx < currentStep || finalStepClicked ? (
                    <SVG path={checkIcon} width={20} />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className={clsx(classes.label, currentStep === idx && classes.active)}>
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showHeaderBtns && (
          <div className={classes.btnsFlex}>
            <ButtonV2 variant={BUTTON_V2_VARIANT.SECONDARY} onClick={onCancelClick}>
              Cancel
            </ButtonV2>
            {showSkipBtn && currentStep === stepToShowSkipBtn && (
              <ButtonV2 onClick={handleOnSkipClick} variant={BUTTON_V2_VARIANT.GHOST}>
                {skipBtnText}
              </ButtonV2>
            )}
            <ButtonV2 onClick={onContinueClick}>
              {isFinalStep ? lastStepHeaderContinueBtnText : 'Continue'}
            </ButtonV2>
          </div>
        )}
      </div>
      <div className={classes.body}>{steps[currentStep].component}</div>
      {showFooter && (
        <div className={classes.footer}>
          <ButtonV2 variant={BUTTON_V2_VARIANT.SECONDARY} onClick={onCancelClick}>
            Cancel
          </ButtonV2>
          <div className={classes.btnsFlex}>
            {currentStep > 0 && (
              <ButtonV2 variant={BUTTON_V2_VARIANT.SECONDARY} onClick={onBackClick}>
                Back
              </ButtonV2>
            )}
            {showSkipBtn && currentStep === stepToShowSkipBtn && (
              <ButtonV2 onClick={handleOnSkipClick} variant={BUTTON_V2_VARIANT.GHOST}>
                {skipBtnText}
              </ButtonV2>
            )}
            <ButtonV2 onClick={onContinueClick}>
              {isFinalStep ? lastStepFooterContinueBtnText : 'Continue'}
            </ButtonV2>
          </div>
        </div>
      )}
    </div>
  )
}

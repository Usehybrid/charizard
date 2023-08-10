/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import checkIcon from '../assets/check.svg'
import {Button, ButtonVariant} from '../button'
import {SVG} from '../svg'

interface ProgressProps {
  /**
   * steps to show
   * if there isError is true, user won't be able to click on Continue or finish button
   */
  steps: {
    label: string
    component: React.ReactNode
    isError: boolean
    onContinueClick?: () => void
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
  const [currentStep, setCurrentStep] = React.useState(jumpToStep)

  const isFinalStep = currentStep === steps.length - 1
  const isError = steps[currentStep].isError

  const onContinueClick = () => {
    // onClick = formik.handlesubmit
    const onClick = steps[currentStep].onContinueClick
    onClick && onClick()

    if (currentStep < steps.length - 1 && !isError) {
      setCurrentStep(currentStep + 1)
    }
  }

  const onBackClick = () => {
    setCurrentStep(currentStep - 1)
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
                    currentStep === idx && classes.active,
                    idx < currentStep && classes.completed,
                  )}
                >
                  {idx < currentStep ? <SVG path={checkIcon} width={20} /> : idx + 1}
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
            <Button variant={ButtonVariant.SECONDARY} onClick={onCancelClick}>
              Cancel
            </Button>
            <Button onClick={isFinalStep ? onFinalStepClick : onContinueClick}>
              {isFinalStep ? lastStepHeaderContinueBtnText : 'Continue'}
            </Button>
          </div>
        )}
      </div>
      <div className={classes.body}>{steps[currentStep].component}</div>
      {showFooter && (
        <div className={classes.footer}>
          <Button variant={ButtonVariant.SECONDARY} onClick={onCancelClick}>
            Cancel
          </Button>
          <div className={classes.btnsFlex}>
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={onBackClick}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            {showSkipBtn && currentStep === stepToShowSkipBtn && (
              <Button onClick={handleOnSkipClick}>{skipBtnText}</Button>
            )}
            <Button onClick={isFinalStep ? onFinalStepClick : onContinueClick}>
              {isFinalStep ? lastStepFooterContinueBtnText : 'Continue'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

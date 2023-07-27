import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import checkIcon from '../assets/check.svg'
import {Button, ButtonVariant} from '../button'
import {SVG} from '../svg'

interface ProgressProps {
  /**
   * steps to show
   */
  steps: {label: string; component: React.ReactNode}[]
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
  allowNavigationOnStepClick?: boolean
}

export function Progress({
  steps,
  onCancelClick,
  onFinalStepClick,
  lastStepFooterContinueBtnText = 'Confirm',
  showSkipBtn = false,
  showHeaderBtns = false,
  showFooter = true,
  lastStepHeaderContinueBtnText = 'Finish',
  allowNavigationOnStepClick = true,
}: ProgressProps) {
  const [currentStep, setCurrentStep] = React.useState(0)

  const isFinalStep = currentStep === steps.length - 1

  const onContinueClick = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const onBackClick = () => {
    setCurrentStep(currentStep - 1)
  }

  const navigateOnClick = (step: number) => {
    if (allowNavigationOnStepClick && step < currentStep) setCurrentStep(step)
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
            {showSkipBtn && (
              <Button onClick={isFinalStep ? onFinalStepClick : onContinueClick}>
                Skip and continue
              </Button>
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

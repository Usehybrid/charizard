import {RadioGroupV2} from '../components'

export function RadioGroupDemo() {
  return (
    <div>
      <RadioGroupV2
        label="Sample Radio Heading"
        items={radioOptions}
        // defaultValue={formik.values.some_value}
        onChange={() => {
          //   formik.setFieldValue('some_value', value)
        }}
        // key={formik.values.some_value}

        // errorMsg={
        //   formik.touched.policy_applicable?.applicable_to
        //     ? formik.errors.policy_applicable?.applicable_to
        //     : ''
        // }
        disabled
      />
    </div>
  )
}

const radioOptions = [
  {
    label: {
      heading: 'Option 1',
    },
    value: 'Value 1',
  },
  {
    label: {
      heading: 'Option 2',
    },
    value: 'Value 2',
  },
  {
    label: {
      heading: 'Option 3',
    },
    value: 'Value 3',
  },
]

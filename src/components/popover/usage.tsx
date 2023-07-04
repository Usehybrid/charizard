import Popover from './Popover'
import PopoverCloseButton from './PopoverCloseButton'
import PopoverContent from './PopoverContent'
import PopoverDescription from './PopoverDescription'
import PopoverTitle from './PopoverTitle'
import PopoverTrigger from './PopoverTrigger'

export default function Example() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger openOnHover={false}>click me</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>popover title</PopoverTitle>
        <PopoverDescription>popover description</PopoverDescription>
        <PopoverCloseButton>x</PopoverCloseButton>
      </PopoverContent>
    </Popover>
  )
}

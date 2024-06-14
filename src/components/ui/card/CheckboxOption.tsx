import { MenuItemOption } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface CheckboxOptionProps extends PropsWithChildren {
	value: string
	isChecked?: boolean
}
const CheckboxOption = ({
	value,
	children,
	isChecked
}: CheckboxOptionProps) => {
	return (
		<MenuItemOption
			isChecked={isChecked}
			value={value}
			display='flex'
			flexDirection='row-reverse'
			_checked={{ bg: '#0000000A', rounded: '10px' }}
			mb='2px'
			gap='20px'

			// as={Checkbox}
			// justifyContent='space-between'
			// pl='0'
			// textAlign='start'
			// w='100%'
			// colorScheme='blackAlpha'
			// variant='none'
		>
			{children}
		</MenuItemOption>
	)
}

export default CheckboxOption

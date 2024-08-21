import { Tab } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { IconType } from 'react-icons/lib'

interface TabButtonProps extends PropsWithChildren {
	selectedBg: string
	isActive: boolean
	Icon: IconType
	columns?: number
}
export default function TabButton({
	Icon,
	isActive,
	children,
	selectedBg,
	columns = 3
}: TabButtonProps) {
	return (
		<Tab
			bg='#FFFFFF'
			rounded='10px'
			color='#1C1C1C'
			fontSize='14px'
			fontWeight='400'
			lineHeight='16px'
			px='4'
			py='11px'
			w={columns === 2 ? '45%' : '30%'}
			gap='10px'
			whiteSpace='nowrap'
			alignItems='center'
			_selected={{
				bg: selectedBg,
				fontWeight: '700',
				color: '#FFFFFF',
				width: columns === 2 ? '55%' : '40%'
			}}
		>
			{isActive && (
				<Icon
					color='#FFFFFF'
					fontSize='16px'
				/>
			)}
			{children}
		</Tab>
	)
}

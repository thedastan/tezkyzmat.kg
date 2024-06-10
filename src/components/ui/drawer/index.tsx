import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Heading,
	Progress
} from '@chakra-ui/react'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

interface DrawerComponentProps {
	isOpen: boolean
	onClose: () => void
	children: JSX.Element
	title: string
	isLoading?: boolean
}

function DrawerComponent({
	isOpen,
	onClose,
	children,
	title,
	isLoading = false
}: DrawerComponentProps) {
	return (
		<Drawer
			placement={'bottom'}
			onClose={onClose}
			isOpen={isOpen}
		>
			<DrawerHeader></DrawerHeader>
			<DrawerOverlay bg='#000000B2' />
			<DrawerContent
				w={INTERFACE_WIDTH}
				maxH='80vh'
				mx='auto'
				bg='transparent'
				borderTopRadius='24px'
				className='unscroll'
				overflow='auto'
			>
				<DrawerCloseButton
					color='#00000080'
					mx='10px'
					fontSize='14px'
					mt={2}
				/>
				<Box
					borderTopRadius='24px'
					w={'100%'}
					h='100%'
					pb='30px'
					pt='14px'
					bg='#FFFFFF'
				>
					<Heading
						fontSize='18px'
						fontWeight='600'
						lineHeight='24.59px'
						color='#252525'
						mt='2'
						fontFamily='Manrope'
						textAlign='center'
					>
						{title}
					</Heading>
					<DrawerBody
						className='unscroll'
						px={4}
						mt='30px'
						overflow='auto'
						maxH='420px'
					>
						<Box
							h='4px'
							mb='10px'
						>
							{isLoading && (
								<Progress
									size='xs'
									bg='none'
									isIndeterminate
								/>
							)}
						</Box>
						{children}
					</DrawerBody>
				</Box>
			</DrawerContent>
		</Drawer>
	)
}

export default DrawerComponent

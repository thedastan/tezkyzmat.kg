import {
	Button,
	Flex,
	Modal,
	ModalContent,
	ModalOverlay,
	Spinner
} from '@chakra-ui/react'

import Description from '../texts/Description'

interface DeleteModalProps {
	isOpen: boolean
	onClose: () => void
	onDelete: () => void
	children: string
	isLoading?: boolean
}

const DeleteModal = ({
	isOpen,
	onClose,
	onDelete,
	children,
	isLoading
}: DeleteModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='sm'
			isCentered={true}
		>
			<ModalOverlay />
			<ModalContent
				px='64px'
				py='32px'
				textAlign='center'
				rounded='24px'
			>
				<Description color='#000000B2'>{children}</Description>
				{isLoading ? (
					<Spinner
						mx='auto'
						my='4'
					/>
				) : (
					<Flex
						gap='1'
						mt='3'
					>
						<Button
							onClick={onClose}
							color='#1C1C1C'
							w='100%'
							variant='none'
						>
							Нет
						</Button>
						<Button
							onClick={onDelete}
							color='#F9BD15'
							w='100%'
							variant='none'
						>
							Да
						</Button>
					</Flex>
				)}
			</ModalContent>
		</Modal>
	)
}

export default DeleteModal

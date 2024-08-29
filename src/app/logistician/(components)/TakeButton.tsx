import { Button, useDisclosure } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import DeleteModal from '@/components/ui/modal/DeleteModal'

import { useLogistOrderUpdateStatus } from '@/hooks/useLogist'

import { ILogistItem } from '@/models/logist.model'

interface TakeButtonProps {
	el: ILogistItem
}
const TakeButton = ({ el }: TakeButtonProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { isPending, mutate } = useLogistOrderUpdateStatus(onClose)

	const onSubmit = () => {
		mutate({
			id: el.id,
			is_sent: el.is_sent,
			is_taken: true
		})
	}
	return (
		<>
			<Button
				onClick={() => {
					if (!el.is_taken) onOpen()
				}}
				variant='none'
				w='100%'
				
				h='46px'
				rounded='10px'
				color='#FFFFFF'
				fontSize='16px'
				fontWeight='600'
				px='2'
				lineHeight='20px'
				bg={el.is_taken ? '#06B217' : '#1C1C1C'}
				_hover={{ bg: el.is_taken ? '#06B217' : '#1C1C1C' }}
				gap='4'
			>
				{el.is_taken && <FaCheck />}
				{el.is_taken ? 'Забрал' : 'Забрать'}
			</Button>

			<DeleteModal
				isLoading={isPending}
				isOpen={isOpen}
				onClose={onClose}
				onDelete={onSubmit}
			>
				Вы уверены, что забрали запчасть?
			</DeleteModal>
		</>
	)
}

export default TakeButton

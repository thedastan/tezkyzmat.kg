import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

import UploadPhotos from '@/components/forms/upload-photos'
import FixButton from '@/components/ui/buttons/FixButton'
import DrawerModal from '@/components/ui/drawer'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import DeleteModal from '@/components/ui/modal/DeleteModal'

import { NAVBAR_HEIGHT } from '@/config/_variables.config'

import { useLogistOrderUpdateStatus } from '@/hooks/useLogist'

import { ILogistItem } from '@/models/logist.model'

interface SentButtonProps {
	el: ILogistItem
}
const SentButton = ({ el }: SentButtonProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const {
		isOpen: isOpenModel,
		onClose: onCloseModal,
		onOpen: onOpenModal
	} = useDisclosure()

	const [images, setImages] = useState<string[]>([])
	const [value, setValue] = useState({
		courier_name: '',
		courier_phone: '',
		courier_payment: ''
	})

	const { isPending, mutate } = useLogistOrderUpdateStatus(() => {
		onCloseModal()
		onClose()
	})
	// order_seller_images
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onOpenModal()
	}

	const onSent = () => {
		mutate({
			id: el.id,
			is_taken: el.is_taken,
			is_sent: true,
			order_seller_images: images,
			...value
		})
	}

	return (
		<>
			<Button
				onClick={() => {
					if (!el.is_sent) onOpen()
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
				isDisabled={!el.is_taken}
				bg={el.is_sent ? '#06B217' : '#1C1C1C'}
				_hover={{ bg: el.is_sent ? '#06B217' : '#1C1C1C' }}
				gap='4'
			>
				{el.is_sent && <FaCheck />}
				{el.is_sent ? 'Отправил' : 'Отправить'}
			</Button>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Данные курьера'
			>
				<Box pb={NAVBAR_HEIGHT}>
					<form onSubmit={onSubmit}>
						<InputComponent
							handleChange={handleChange}
							value={value.courier_name}
							name='courier_name'
							placeholder='Имя курьера'
							title='Имя'
						/>
						<PhoneInputComponent
							placeholder='Контакты'
							handleChange={courier_phone =>
								setValue({ ...value, courier_phone })
							}
							title='Номер курьера'
							value={value.courier_phone}
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.courier_payment}
							name='courier_payment'
							placeholder='XXX'
							title='Стоимость доставки'
						/>
						<UploadPhotos
							images={images}
							setImages={setImages}
							text='Фото отчет'
						/>

						<FixButton type='submit'>Отправить запчасть</FixButton>
					</form>
				</Box>
			</DrawerModal>

			<DeleteModal
				isOpen={isOpenModel}
				onClose={onCloseModal}
				onDelete={onSent}
				isLoading={isPending}
				withoutOverlay={true}
			>
				Вы убедились, что отправили запчасть?
			</DeleteModal>
		</>
	)
}

export default SentButton

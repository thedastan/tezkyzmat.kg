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
		full_name: '',
		phone: '',
		price: '',
		images: []
	})

	const { isPending, mutate } = useLogistOrderUpdateStatus(onCloseModal)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onOpenModal()
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
							value={value.full_name}
							name='full_name'
							placeholder='Имя курьера'
							title='Имя'
						/>
						<PhoneInputComponent
							placeholder='Контакты'
							handleChange={phone => setValue({ ...value, phone })}
							title='Номер курьера'
							value={value.phone}
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.price}
							name='price'
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
				onDelete={() => {}}
				isLoading={isPending}
			>
				Вы убедились, что отправили запчасть?
			</DeleteModal>
		</>
	)
}

export default SentButton

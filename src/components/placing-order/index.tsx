import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AGREED_SELLER_DATA_KEY } from '@/config/_variables.config'

import { usePlacingOrder } from '@/hooks/useRequest'

import Spinner from '../loader/spinner'
import DefButton from '../ui/buttons/DefButton'
import DrawerModal from '../ui/drawer'
import InputComponent from '../ui/inputs/InputComponent'
import SelectComponent from '../ui/inputs/SelectComponent'
import DeleteModal from '../ui/modal/DeleteModal'

import { ILocaleOrderSeller } from '@/models/request.model'

const regions = [
	'Бишкек',
	'Чуй',
	'Ош',
	'Жалал-Абад',
	'Ысык-Кол',
	'Баткен',
	'Нарын',
	'Талас'
]

const PlacingAnOrder = () => {
	const [seller, setSeller] = useState<ILocaleOrderSeller | undefined>(
		undefined
	)
	const { isOpen, onClose, onOpen } = useDisclosure()
	const {
		isOpen: isOpenModel,
		onClose: onCloseModal,
		onOpen: onOpenModal
	} = useDisclosure()

	const [value, setValue] = useState({
		region: '',
		district: '',
		street: ''
	})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	function removeLocalSeller() {
		localStorage.removeItem(AGREED_SELLER_DATA_KEY)
	}

	const onSuccess = () => {
		removeLocalSeller()
		onClose()
		onCloseModal()
	}

	const { isPending, mutate } = usePlacingOrder(onSuccess)
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!!seller) {
			mutate({
				order_id: seller.order_id,
				address: { ...value, order_sellers: String(seller.id) }
			})
		}
	}

	useEffect(() => {
		const handleVisibilityChange = () => {
			const agreed_seller = JSON.parse(
				localStorage.getItem(AGREED_SELLER_DATA_KEY) as any
			) as ILocaleOrderSeller | undefined
			setSeller(agreed_seller)
			if (!document.hidden && !!agreed_seller?.id) {
				onOpenModal()
			}
		}
		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])
	return (
		<>
			<DeleteModal
				isOpen={isOpenModel}
				onClose={() => {
					onCloseModal()
					removeLocalSeller()
				}}
				onDelete={onOpen}
				withoutOverlay={true}
			>
				{`Вы договорились с продавцом (${seller?.seller})? Вам оформить заказ?`}
			</DeleteModal>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Оформить заказ'
			>
				<form onSubmit={onSubmit}>
					{isPending && <Spinner />}
					<SelectComponent
						handleChange={handleChange}
						name='region'
						placeholder='Область'
						value={value.region}
					>
						{regions.map((el, idx) => (
							<option
								value={el}
								key={idx}
							>
								{el}
							</option>
						))}
					</SelectComponent>
					<InputComponent
						handleChange={handleChange}
						name='district'
						placeholder='Район и село'
						title='Район и село'
						value={value.district}
					/>
					<InputComponent
						handleChange={handleChange}
						name='street'
						placeholder='Улица, дом'
						title='Адрес дома'
						value={value.street}
					/>

					<DefButton
						type='submit'
						mt='50px'
					>
						Оформить
					</DefButton>
				</form>
			</DrawerModal>
		</>
	)
}

export default PlacingAnOrder

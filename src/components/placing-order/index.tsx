import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

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

interface PlacingAnOrderProps {
	isOpen: boolean
	onClose: () => void
	seller: ILocaleOrderSeller | undefined
}

const PlacingAnOrder = ({ isOpen, onClose, seller }: PlacingAnOrderProps) => {
	const {
		isOpen: isOpenDrawer,
		onClose: onCloseDrawer,
		onOpen: onOpenDrawer
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
		onCloseDrawer()
		onClose()
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

	return (
		<>
			<DeleteModal
				isOpen={isOpen}
				onClose={() => {
					onClose()
					removeLocalSeller()
				}}
				onDelete={onOpenDrawer}
				withoutOverlay={true}
			>
				{`Вы договорились с продавцом (${seller?.seller})? Вам оформить заказ?`}
			</DeleteModal>

			<DrawerModal
				isOpen={isOpenDrawer}
				onClose={onCloseDrawer}
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

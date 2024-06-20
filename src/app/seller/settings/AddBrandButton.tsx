'use client'

import { Box, Divider, useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import SelectCheckbox from '@/components/ui/inputs/SelectCheckbox'
import SelectComponent from '@/components/ui/inputs/SelectComponent'

import { useSellerSpareAdd } from '@/hooks/useSettings'
import { useVehicle, useVehicleById } from '@/hooks/useVehicle'

import { ISpareData } from '@/models/spares.model'

const AddBrandButton = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState({
		model: '',
		brand: '',
		year: []
	})
	const { data, isLoading } = useVehicle()
	const { data: vehicle, isLoading2 } = useVehicleById(value.brand || 0)
	const model: ISpareData[] | undefined = vehicle?.models
		.find(el => String(el.id) === value?.model)
		?.year.map(el => {
			return { id: el.id, name: el.year }
		})
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const handleCheckbox = (name: string, valueList: string[] | string) => {
		setValue({ ...value, [name]: valueList } as any)
	}
	const queryClient = useQueryClient()
	const { isPending, mutate } = useSellerSpareAdd(() => {
		queryClient.invalidateQueries({ queryKey: ['seller-spares'] })
		setValue({ brand: '', model: '', year: [] })
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate({
			brand: +value.brand,
			model: +value.model,
			year: value.year.map(el => +el)
		})
	}
	return (
		<Box mt='32px'>
			<DefButton
				fontWeight='400'
				isTransparent={isOpen}
				onClick={() => (isOpen ? onClose() : onOpen())}
			>
				{isOpen ? 'Закрыть' : 'Добавить ещё одну марку'}
			</DefButton>
			{(isLoading || isLoading2 || isPending) && <Spinner />}
			{isOpen && (
				<Box mt='30px'>
					<Divider
						h='1px'
						bg='#1C1C1C'
						mb='30px'
						opacity='.3'
					/>
					<form onSubmit={onSubmit}>
						<SelectComponent
							handleChange={handleChange}
							value={value?.brand}
							name='brand'
							placeholder='Марка автомобиля*'
							required={false}
						>
							{data?.map(el => (
								<option
									value={el.id}
									key={el.id}
								>
									{el.brand}
								</option>
							))}
						</SelectComponent>

						<SelectComponent
							handleChange={handleChange}
							value={value?.model}
							name='model'
							placeholder='Модель*'
							disabled={!value?.brand}
							required={false}
						>
							{vehicle?.models?.map(el => (
								<option
									value={el.id}
									key={el.id}
								>
									{el.model}
								</option>
							))}
						</SelectComponent>

						<SelectCheckbox
							list={model}
							handleChange={handleCheckbox}
							name='year'
							placeholder='Год выпуска*'
							disabled={!model?.length}
							value={value.year}
						/>
						<DefButton type='submit'>Добавить</DefButton>
					</form>
				</Box>
			)}
		</Box>
	)
}

export default AddBrandButton

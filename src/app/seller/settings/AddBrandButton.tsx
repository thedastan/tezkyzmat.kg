'use client'

import { Box, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import FixButton from '@/components/ui/buttons/FixButton'
import DrawerModal from '@/components/ui/drawer'
import SelectCheckbox from '@/components/ui/inputs/SelectCheckbox'
import SelectComponent from '@/components/ui/inputs/SelectComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import { useSellerSpareAdd } from '@/hooks/useSettings'
import { useVehicle, useVehicleById } from '@/hooks/useVehicle'

import { ISpareData } from '@/models/spares.model'

const AddBrandButton = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState({
		brand: '',
		model: [] as ISpareData[],
		year: [] as ISpareData[]
	})
	const { data, isLoading } = useVehicle()
	const { data: vehicle, isLoading2 } = useVehicleById(value.brand)
	// const model: ISpareData[] | undefined = vehicle?.models
	// 	.find(el => String(el.id) === value?.model)
	// 	?.year.map(el => {
	// 		return { id: el.id, name: el.year }
	// 	})

	const model_list: ISpareData[] | undefined = vehicle?.models.map(el => {
		return {
			id: el.id,
			name: el.model
		}
	})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const handleCheckbox = (name: string, valueList: string[]) => {
		setValue({ ...value, [name]: valueList.map(el => JSON.parse(el)) } as any)
	}

	const { isPending, mutate } = useSellerSpareAdd(() => {
		setValue({ brand: '', model: [], year: [] })
		onClose()
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate({
			brand: +value.brand,
			// model: +value.model,
			model: value.model.map(el => el.id),
			year: []
			// year: value.year.map(el => el.id)
		})
	}
	return (
		<Box mt='32px'>
			<FixButton onClick={onOpen}>
				<Flex
					alignItems='center'
					gap='2'
				>
					<AiOutlinePlus fontSize='20px' /> Добавить автомобиль
				</Flex>
			</FixButton>

			{(isLoading || isLoading2 || isPending) && <Spinner />}

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Добавить марку'
			>
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
					<Flex
						justifyContent='space-between'
						alignItems='center'
						gap='3'
						my='20px'
					>
						<Divider
							h='1px'
							bg='#1C1C1C'
							opacity='.3'
						/>
						<Text>необязательно</Text>
						<Divider
							h='1px'
							bg='#1C1C1C'
							opacity='.3'
						/>
					</Flex>

					<SelectCheckbox
						list={model_list}
						handleChange={handleCheckbox}
						name='model'
						placeholder='Модель*'
						disabled={!value?.brand}
						value={value.model.map(el => el.name)}
					/>

					{/* <SelectComponent
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
					</SelectComponent> */}

					{/* <SelectCheckbox
						list={model}
						handleChange={handleCheckbox}
						name='year'
						placeholder='Год выпуска*'
						disabled={!model?.length}
						value={value.year.map(el => el.name)}
					/> */}
					<DefButton
						type='submit'
						mt='50px'
					>
						Сохранить
					</DefButton>
				</form>
			</DrawerModal>
		</Box>
	)
}

export default AddBrandButton

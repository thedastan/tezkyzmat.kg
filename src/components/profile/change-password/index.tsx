import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { toast } from 'sonner'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import DrawerModal from '@/components/ui/drawer'
import InputComponent from '@/components/ui/inputs/InputComponent'

import { ToastError } from '@/config/helpers'

import { ChangePasswordPayload } from '@/models/auth.model'
import { profileService } from '@/services/profile.service'

const ChangePassword = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()

	const [value, setValue] = useState<ChangePasswordPayload>({
		password: '',
		old_password: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value.toLocaleLowerCase() })
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ['change-password'],
		mutationFn: (payload: ChangePasswordPayload) =>
			profileService.changePassword(payload),
		onSuccess() {
			toast.success('Вы поменяли пароль!')
			onClose()
			setValue({
				password: '',
				old_password: ''
			})
		},
		onError(e) {
			ToastError(e)
		}
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate(value)
	}
	return (
		<>
			<Flex
				onClick={onOpen}
				alignItems='center'
				bg='#F4F5F7'
				px='4'
				py='17px'
				gap='3'
				rounded='14px'
				cursor='pointer'
				h='58px'
			>
				<RiLockPasswordFill
					color='#292D32'
					fontSize='22px'
				/>
				<Text color='#1C1C1C'>Изменить пароль</Text>
			</Flex>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Изменить пароль'
			>
				<form onSubmit={onSubmit}>
					{isPending && <Spinner />}
					<InputComponent
						handleChange={handleChange}
						value={value.old_password}
						name='old_password'
						placeholder='Введите ваш старый пароль'
						title='Старый пароль'
						type='password'
					/>
					<InputComponent
						handleChange={handleChange}
						value={value.password}
						name='password'
						placeholder='Введите новый пароль'
						title='Новый пароль'
						type='password'
					/>
					<DefButton
						mt='30px'
						type='submit'
					>
						Сохранить
					</DefButton>
				</form>
			</DrawerModal>
		</>
	)
}

export default ChangePassword

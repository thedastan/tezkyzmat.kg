import {
	Box,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	PinInput,
	PinInputField
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import UserLayoutComponent from '@/components/layouts/user.layout'
import Spinner from '@/components/loader/spinner'
import StepperComponent from '@/components/ui/stepper'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { CLIENT_PAGES, SELLER_PAGES } from '@/config/pages-url.config'
import { EnumRole } from '@/config/role'

import { useOtpSent, useVerify } from '@/hooks/useRegister'
import { useRoles } from '@/hooks/useRoles'

import { EnumOtpCode } from '@/models/auth.enum'

interface PinInputModalProps {
	activeStep: number
	setActiveStep: (index: number) => void
	phone: string
	isOpen: boolean
}

const countdown_count = 30

const PinInputModal = ({
	activeStep,
	setActiveStep,
	phone,
	isOpen
}: PinInputModalProps) => {
	const [code, setCode] = useState('')
	const [countdown, setCountdown] = useState(countdown_count)
	const [isAgain, setAgain] = useState(false)
	const { replace } = useRouter()
	const { role } = useRoles()
	const { isPending: isLoading, mutate: verify } = useVerify(
		() => {
			if (role === EnumRole.CLIENT) replace(CLIENT_PAGES.MAIN)
			else if (role === EnumRole.SELLER) replace(SELLER_PAGES.HOME)
		},
		() => setCode('')
	)

	const countdownStart = () => setAgain(true)
	const countdownStop = () => {
		setAgain(false)
		setCountdown(countdown_count)
	}

	const { isPending, mutate } = useOtpSent(() => countdownStart())

	const sendOtpCode = () => {
		mutate({ phone, type: EnumOtpCode.REGISTER })
	}

	const timer = `00:${
		String(countdown).length > 1 ? countdown : '0' + countdown
	}`

	useEffect(() => {
		setTimeout(() => {
			if (isAgain) {
				setCountdown(countdown - 1)
				if (countdown < 1) countdownStop()
			}
		}, 1000)

		// if (!isAgain) clearInterval(interval)
	}, [countdown, isAgain])

	useEffect(() => {
		if (isOpen) countdownStart()
		else countdownStop()
	}, [isOpen])

	useEffect(() => {
		if (code.length === 5) {
			verify(code)
		}
	}, [code])
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setActiveStep(1)}
			size='full'
		>
			<ModalContent
				justifyContent='center'
				transition='0'
			>
				{(isPending || isLoading) && <Spinner />}
				<ModalBody
					maxW={INTERFACE_WIDTH}
					w='100%'
					mx='auto'
					padding='0'
				>
					<UserLayoutComponent
						question={isAgain ? 'Отправить код снова' : 'Я не получил код'}
						onClick={() => !isAgain && sendOtpCode()}
						action={isAgain ? timer : 'Запросить'}
						backFn={() => setActiveStep(1)}
					>
						<Box>
							<TitleComponent mb='26px'>Введите код</TitleComponent>
							<StepperComponent
								activeStep={activeStep}
								setActiveStep={setActiveStep}
							/>
							<Box
								textAlign='center'
								mb='5'
							>
								<Description>Мы отправили код на ваш телефон</Description>
								<Description fontWeight='500'>{phone}</Description>
							</Box>
							<HStack
								mx='auto'
								my={5}
								justifyContent='center'
							>
								<PinInput
									type='number'
									size='lg'
									onChange={setCode}
									value={code}
									placeholder=''
									variant='none'

									// isDisabled={isDisabled}
								>
									{[1, 2, 3, 4, 5].map(el => (
										<PinInputField
											w='63px'
											h='72px'
											rounded='15px'
											key={el}
											bg='white'
											border='1px solid #D8DADC'
											_focus={{ border: '1px solid #1C1C1C' }}
										/>
									))}
								</PinInput>
							</HStack>
							{!true && (
								<Description
									color='#F54135'
									mt='26px'
									textAlign='center'
								>
									Неправильный код, попробуйте еще раз
								</Description>
							)}
						</Box>
					</UserLayoutComponent>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default PinInputModal

import {
	Box,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	PinInput,
	PinInputField
} from '@chakra-ui/react'

import UserLayoutComponent from '@/components/layouts/user.layout'
import StepperComponent from '@/components/ui/stepper'
import Description from '@/components/ui/texts/Description'
import TitleComponent from '@/components/ui/texts/TitleComponent'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

interface PinInputModalProps {
	activeStep: number
	setActiveStep: (index: number) => void
	phone: string
	code: string
	setCode: (code: string) => void
}

const PinInputModal = ({
	activeStep,
	setActiveStep,
	phone,
	code,
	setCode
}: PinInputModalProps) => {
	return (
		<Modal
			isOpen={activeStep === 2}
			onClose={() => setActiveStep(1)}
			size='full'
		>
			<ModalContent
				justifyContent='center'
				transition='0'
			>
				<ModalBody
					maxW={INTERFACE_WIDTH}
					w='100%'
					mx='auto'
					padding='0'
				>
					<UserLayoutComponent
						question='Я не получил код'
						onClick={() => {}}
						action='Запросить'
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

import {
	Box,
	Flex,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	Stepper,
	Text
} from '@chakra-ui/react'

const steps = [1, 2, 3]

interface StepperComponentProps {
	activeStep: number
	setActiveStep: (index: number) => void
	withText?: boolean
}

const StepperComponent = ({
	activeStep,
	setActiveStep,
	withText
}: StepperComponentProps) => {
	return (
		<>
			{!!withText && (
				<Flex
					justifyContent='center'
					fontWeight='400'
					fontSize='12px'
					lineHeight='14.02px'
					textAlign='center'
					flexWrap='nowrap'
					color='#00000080'
					mb='10px'
					gap='1'
					mt='6px'
				>
					<Text>Выполните шаг</Text>
					<Text color='#06B217'>{steps[activeStep]}</Text>
					<Text>из {steps.length}</Text>
				</Flex>
			)}
			<Box
				w='155px'
				mx='auto'
				mb='23px'
			>
				<Stepper
					size='sm'
					index={activeStep}
					colorScheme='green'
				>
					{steps.map((step, index) => (
						<Step
							key={index}
							onClick={() => setActiveStep(index)}
						>
							<StepIndicator>
								<StepStatus
									complete={<StepIcon />}
									incomplete={<StepNumber />}
									active={<StepNumber />}
								/>
							</StepIndicator>

							<StepSeparator />
						</Step>
					))}
				</Stepper>
			</Box>
		</>
	)
}

export default StepperComponent

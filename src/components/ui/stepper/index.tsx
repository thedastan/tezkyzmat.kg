import {
	Box,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	Stepper
} from '@chakra-ui/react'

interface StepperComponentProps {
	activeStep: number
	setActiveStep: (index: number) => void
}

const StepperComponent = ({
	activeStep,
	setActiveStep
}: StepperComponentProps) => {
	return (
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
				{[1, 2, 3].map((step, index) => (
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
	)
}

export default StepperComponent

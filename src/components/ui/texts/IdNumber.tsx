import { Box } from '@chakra-ui/react'

const IdNumber = ({ id }: { id: number }) => {
	return (
		<Box
			bg='#F4F5F7'
			padding='1'
			fontSize='10px'
			color='#1C1C1C'
			rounded='6px'
		>
			№ {id}
		</Box>
	)
}

export default IdNumber

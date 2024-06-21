import { Box } from '@chakra-ui/react'

import Spinner from './spinner'

const PageLoader = () => {
	return (
		<Box bg='white'>
			<Spinner />
		</Box>
	)
}

export default PageLoader

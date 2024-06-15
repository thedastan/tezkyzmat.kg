import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { BiSolidMessageSquareDetail } from 'react-icons/bi'

import { SELLER_PAGES } from '@/config/pages-url.config'

const ConfirmedRequestButton = () => {
	const { push } = useRouter()
	return (
		<Button
			onClick={() => push(SELLER_PAGES.CONFIRMED)}
			w='100%'
			rounded='14px'
			bg='#383838'
			h='58px'
			px='6'
			fontSize='16px'
			fontWeight='500'
			color='#FFFFFF'
			variant='none'
			gap='5'
			py='4'
			justifyContent='start'
		>
			<BiSolidMessageSquareDetail fontSize='20px' />
			Подтвержденные заявки
		</Button>
	)
}

export default ConfirmedRequestButton

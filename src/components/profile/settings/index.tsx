import { Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'

import { SELLER_PAGES } from '@/config/pages-url.config'

const Settings = () => {
	return (
		<Link href={SELLER_PAGES.SETTINGS}>
			<Flex
				justifyContent='center'
				alignItems='center'
				transition='.5s'
				w='34px'
				h='34px'
				bg='#383838'
				rounded='50%'
				padding='7px'
				_active={{ opacity: '.7' }}
			>
				<AiOutlinePlus fontSize='20px' />
			</Flex>
		</Link>
	)
}

export default Settings

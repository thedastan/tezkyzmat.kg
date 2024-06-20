import { Box, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { IoSettingsOutline } from 'react-icons/io5'

import { SELLER_PAGES } from '@/config/pages-url.config'

const Settings = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<Link href={SELLER_PAGES.SETTINGS}>
			<Box
				onClick={onOpen}
				transform={isOpen ? 'rotate(0)' : 'rotate(-90deg)'}
				transition='.5s'
			>
				<IoSettingsOutline fontSize='27px' />
			</Box>
		</Link>
	)
}

export default Settings

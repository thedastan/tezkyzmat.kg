import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

import UserRoutesFooter from '@/components/ui/texts/UserRoutesFooter'

import {
	MAIN_PADDING,
	STANDARD_BOTTOM_PADDING
} from '@/config/_variables.config'
import { PUBLIC_PAGES } from '@/config/pages-url.config'

import { IUserRoutesProps } from '../ui/texts/UserRoutesFooter'

interface UserLayoutProps extends IUserRoutesProps {
	backPath?: string
	backFn?: () => void
}

const UserLayoutComponent: FC<PropsWithChildren<UserLayoutProps>> = ({
	action,
	backPath = PUBLIC_PAGES.HOME,
	question,
	children,
	onClick,
	backFn,
	path
}) => {
	return (
		<Flex
			pt='3'
			flexDirection='column'
			justifyContent='space-between'
			w='100%'
			pb={STANDARD_BOTTOM_PADDING}
			px={MAIN_PADDING}
			minH='100vh'
		>
			<Flex justifyContent='start'>
				<Box
					w='30px'
					h='30px'
				>
					{!!backPath ? (
						<Link href={backPath}>
							<BsChevronLeft
								fontSize='26px'
								color='#000000'
							/>
						</Link>
					) : (
						<BsChevronLeft
							onClick={backFn}
							fontSize='26px'
							color='#000000'
						/>
					)}
				</Box>
			</Flex>
			{children}
			<UserRoutesFooter
				question={question}
				path={path}
				action={action}
				onClick={onClick}
			/>
		</Flex>
	)
}

export default UserLayoutComponent

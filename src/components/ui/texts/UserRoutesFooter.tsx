import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

import Description from './Description'

export interface IUserRoutesProps {
	question: string
	action: string
	path?: string
	onClick?: () => void
}

const UserRoutesFooter = ({
	action,
	path,
	question,
	onClick
}: IUserRoutesProps) => {
	return (
		<Flex
			justifyContent='center'
			gap='1'
			mt='6'
		>
			<Description
				fontSize='14px'
				lineHeight='17.5px'
			>
				{question}
			</Description>
			<Box
				onClick={onClick}
				cursor='pointer'
				fontWeight='600'
				fontSize='14px'
				lineHeight='17.5px'
				color='#000000'
			>
				{!!path ? (
					<Link href={path}>{action}</Link>
				) : (
					<Text _active={{ opacity: '.7' }}>{action}</Text>
				)}
			</Box>
		</Flex>
	)
}

export default UserRoutesFooter

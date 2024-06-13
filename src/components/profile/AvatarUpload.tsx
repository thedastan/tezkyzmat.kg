import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react'
import { IoCamera } from 'react-icons/io5'

import FileInput from '../ui/inputs/FileInput'

const AvatarUpload = () => {
	const handleFileChange = (e: React.ChangeEvent<any>) => {
		if (!!e.target?.files) console.log(e.target?.files[0])
	}
	return (
		<Box position='relative'>
			<Avatar
				w='80px'
				h='80px'
				bg='#F4F5F7'
				mb='36px'
			/>

			<Box
				position='absolute'
				right='-1px'
				bottom='24px'
				zIndex='3'
			>
				<Stack
					as='label'
					mb='22px'
					w='23px'
					rounded='10px'
					h='18px'
					zIndex='2'
					position='relative'
					display='inline-block'
				>
					<FileInput
						handleChange={handleFileChange}
						accept={['.png', '.jpeg', '.jpg']}
						multi={true}
					/>
					<Text
						as='span'
						w='100%'
						h='100%'
						position='relative'
						display='inline-block'
						cursor='pointer'
					>
						<Flex
							flexDirection='column'
							alignItems='center'
							justifyContent='space-between'
							outline='none'
							rounded='10px'
							bg='transparent'
							_active={{ opacity: '.7' }}
						>
							<IoCamera
								color='#000000'
								fontSize='28px'
							/>
						</Flex>
					</Text>
				</Stack>
			</Box>
		</Box>
	)
}

export default AvatarUpload

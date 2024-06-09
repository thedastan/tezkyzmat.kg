import { Flex, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { text } from 'stream/consumers'

import FileInput from '@/components/ui/inputs/FileInput'

import NatureSvg from '@/assets/img/nature.svg'

interface AddPhotoButtonProps {
	handleChange: (files: File[]) => void
	isMini?: boolean
	text?: string
}

const AddPhotoButton = ({
	handleChange,
	isMini = false,
	text
}: AddPhotoButtonProps) => {
	const handleFileChange = (e: React.ChangeEvent<any>) => {
		if (!!e.target?.files) handleChange(Array.from(e.target.files))
	}
	return (
		<>
			{isMini && (
				<Stack
					as='label'
					maxW='80px'
					rounded='6px'
					maxH='80px'
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
							w='100%'
							h='100%'
							outline='none'
							justifyContent='center'
							alignItems='center'
							rounded='6px'
							bg='#F4F5F7'
							_active={{ opacity: '.7' }}
						>
							<AiOutlinePlus
								color='#1C1C1C'
								fontSize='26px'
							/>
						</Flex>
					</Text>
				</Stack>
			)}

			{!isMini && (
				<Stack
					as='label'
					mb='22px'
					w='100%'
					rounded='10px'
					h='105'
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
							w='100%'
							flexDirection='column'
							alignItems='center'
							justifyContent='space-between'
							px='4'
							gap='6px'
							py='15.5px'
							h='105px'
							outline='none'
							rounded='10px'
							bg='transparent'
							border='1px dashed #D8DADC'
							_active={{ opacity: '.7' }}
						>
							<Flex
								justifyContent='center'
								alignItems='center'
								bg='#FFF6DD'
								rounded='50%'
								w='50px'
								h='50px'
							>
								<Image
									src={NatureSvg}
									alt='Add'
								/>
							</Flex>
							<Text
								fontSize='14px'
								fontWeight='400'
								lineHeight='17.5px'
								color='#00000080'
							>
								{text}
							</Text>
						</Flex>
					</Text>
				</Stack>
			)}
		</>
	)
}
export default AddPhotoButton

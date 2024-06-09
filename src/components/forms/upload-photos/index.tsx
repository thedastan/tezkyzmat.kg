import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

import DeleteModal from '@/components/ui/modal/DeleteModal'

import FileShadow from '@/assets/img/file-shadow.svg'

import AddPhotoButton from './AddPhotoButton'

interface UploadPhotosProps {
	setImages: Dispatch<SetStateAction<File[]>>
	images: File[]
	text: string
}
const UploadPhotos = ({ images, setImages, text }: UploadPhotosProps) => {
	const onDelete = (index: number) => {
		setImages(state => state.filter((_, idx) => index !== idx))
	}
	return !images.length ? (
		<AddPhotoButton
			handleChange={setImages}
			text={text}
		/>
	) : (
		<SimpleGrid
			columns={{ sm: 5, base: 4 }}
			mb='22px'
			spacing='11px'
		>
			{images?.map((_, idx) => (
				<ImageCard
					key={idx + 1}
					onDelete={() => onDelete(idx)}
				/>
			))}
			<AddPhotoButton
				handleChange={setImages}
				isMini={true}
			/>
		</SimpleGrid>
	)
}

function ImageCard({ onDelete }: { onDelete: () => void }) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<Box position='relative'>
			<Image
				src={FileShadow}
				width={80}
				height={80}
				alt='Image'
			/>
			<Box
				onClick={onOpen}
				cursor='pointer'
				position='absolute'
				bottom='6px'
				right='10px'
				w='22px'
				h='20px'
			/>
			<DeleteModal
				isOpen={isOpen}
				onClose={onClose}
				onDelete={onDelete}
			>
				Вы уверены, что хотите удалить фото?
			</DeleteModal>
		</Box>
	)
}

export default UploadPhotos

import { Input } from '@chakra-ui/react'
import React from 'react'

interface Props {
	handleChange: (e: React.ChangeEvent) => void
	accept: string[]
	multi: boolean
	id?: string
}

const FileInput = ({ handleChange, multi, id, accept = [] }: Props) => {
	return (
		<Input
			id={id}
			onChange={handleChange}
			type='file'
			name={'file'}
			position='absolute'
			zIndex='-1'
			opacity='0'
			display='block'
			w='0'
			h='0'
			multiple={multi}
			accept={accept.join(',')}
		/>
	)
}

export default FileInput

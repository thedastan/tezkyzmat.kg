'use client'

import { useDisclosure } from '@chakra-ui/react'
import { PropsWithChildren, createContext, useContext } from 'react'

import ApplicationComponent from './ApplicationComponent'

interface ApplicationContextType {
	isOpenModel: boolean
	onCloseModal: () => void
	onOpenModal: () => void
}
export const ApplicationContext = createContext<
	ApplicationContextType | undefined
>(undefined)

export const ApplicationProvider = ({ children }: PropsWithChildren) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<ApplicationContext.Provider
			value={{
				isOpenModel: isOpen,
				onCloseModal: onClose,
				onOpenModal: onOpen
			}}
		>
			{children}
		</ApplicationContext.Provider>
	)
}

export const useApplicationModal = () => {
	const context = useContext(ApplicationContext)
	if (!context) {
		throw new Error('useCounter must be used within a CounterProvider')
	}
	return context
}

'use client'

import { Box, CircularProgress, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const max_pull = 270

const PullToRefresh = () => {
	const [startPoint, setStartPoint] = useState(0)
	const [pullChange, setPullChange] = useState<number>(0)

	const initLoading = () => {
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		}
	}

	const pullStart = (e: any) => {
		const { screenY } = e.targetTouches[0]
		setStartPoint(screenY)
	}

	const pull = (e: any) => {
		// get the current user touch event data
		const touch = e.targetTouches[0]

		const { screenY } = touch

		let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0
		setPullChange(pullLength)
	}

	const endPull = (e: any) => {
		setStartPoint(0)
		setPullChange(0)
		if (pullChange > max_pull) initLoading()
	}

	useEffect(() => {
		window.addEventListener('touchstart', pullStart)
		window.addEventListener('touchmove', pull)
		window.addEventListener('touchend', endPull)
		return () => {
			window.removeEventListener('touchstart', pullStart)
			window.removeEventListener('touchmove', pull)
			window.removeEventListener('touchend', endPull)
		}
	})

	return (
		<Flex
			justifyContent='center'
			mt='-16'
			mx='auto'
			style={{ marginTop: pullChange / 3.118 || '' }}
		>
			<Box p='4'>
				<CircularProgress
					value={pullChange / (max_pull / 100)}
					bg='white'
				/>
			</Box>
		</Flex>
	)
}

export default PullToRefresh

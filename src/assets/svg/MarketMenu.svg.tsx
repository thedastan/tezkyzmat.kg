const MarketMenuSvg = ({ theme = '#292D32' }: { theme: string }) => {
	return (
		<svg
			width='25'
			height='24'
			viewBox='0 0 25 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.75 12.75V22H8.31C4.67 22 2.5 19.83 2.5 16.19V12.75H11.75Z'
				fill={theme}
			/>
			<path
				d='M22.5 7.81V11.25H13.25V2H16.69C20.33 2 22.5 4.17 22.5 7.81Z'
				fill={theme}
			/>
			<path
				d='M11.75 2V11.25H2.5V7.81C2.5 4.17 4.67 2 8.31 2H11.75Z'
				fill={theme}
			/>
			<path
				d='M22.5 12.75V16.19C22.5 19.83 20.33 22 16.69 22H13.25V12.75H22.5Z'
				fill={theme}
			/>
		</svg>
	)
}

export default MarketMenuSvg

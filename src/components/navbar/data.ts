import HomeMenuSvg from '@/assets/svg/HomeMenu.svg'
import MarketMenuSvg from '@/assets/svg/MarketMenu.svg'
import RequestMenuSvg from '@/assets/svg/RequestMenu.svg'

import { CLIENT_PAGES } from '@/config/pages-url.config'

export interface RouteNavbar {
	path: string
	svg: ({ theme }: { theme: string }) => JSX.Element
	name: string
	disabled?: boolean
}

export const client_navbar: RouteNavbar[] = [
	{
		name: 'Главная',
		path: CLIENT_PAGES.MAIN,
		svg: HomeMenuSvg,
		disabled: false
	},
	{
		name: 'Магазин',
		path: CLIENT_PAGES.MARKET,
		svg: MarketMenuSvg,
		disabled: true
	},
	{
		name: 'Заявки',
		path: CLIENT_PAGES.APPLICATION,
		svg: RequestMenuSvg,
		disabled: false
	}
]

import { NextRequest, NextResponse } from 'next/server'

import { USER_PAGES } from './config/pages-url.config'
import { EnumRole, RoleTypes } from './config/role'
import { EnumTokens } from './services/auth-token.services'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	function getRefresh(role: RoleTypes) {
		return cookies.get(EnumTokens.REFRESH_TOKEN + role)?.value
	}
	const refreshTokenClient = getRefresh(EnumRole.CLIENT)
	const refreshTokenSeller = getRefresh(EnumRole.SELLER)
	const refreshTokenLogist = getRefresh(EnumRole.LOGISTICIAN)

	const isAuthPage = url.includes('/user')
	const isClientPage = url.includes('/client')
	const isSellerPage = url.includes('/seller')
	const isLogisticianPage = url.includes('/logistician')

	// if (isAuthPage && refreshTokenClient) {
	// 	return NextResponse.redirect(new URL(CLIENT_PAGES.MAIN, url))
	// }
	// if (isAuthPage && refreshTokenSeller) {
	// 	return NextResponse.redirect(new URL(SELLER_PAGES.HOME, url))
	// }

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isClientPage && !refreshTokenClient) {
		return NextResponse.redirect(
			new URL(USER_PAGES.AUTH(EnumRole.CLIENT), request.url)
		)
	} else if (isSellerPage && !refreshTokenSeller) {
		return NextResponse.redirect(
			new URL(USER_PAGES.AUTH(EnumRole.SELLER), request.url)
		)
	} else if (isLogisticianPage && !refreshTokenLogist) {
		return NextResponse.redirect(
			new URL(USER_PAGES.AUTH(EnumRole.LOGISTICIAN), request.url)
		)
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/user/:path*',
		'/client/:path*',
		'/seller/:path*',
		'/logistician/:path*'
	]
}

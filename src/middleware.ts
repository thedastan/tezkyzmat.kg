import { NextRequest, NextResponse } from 'next/server'

import {
	CLIENT_PAGES,
	SELLER_PAGES,
	USER_PAGES
} from './config/pages-url.config'
import { EnumRole } from './config/role'
import { EnumTokens } from './services/auth-token.services'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshTokenClient = cookies.get(
		EnumTokens.REFRESH_TOKEN + EnumRole.CLIENT
	)?.value
	const refreshTokenSeller = cookies.get(
		EnumTokens.REFRESH_TOKEN + EnumRole.SELLER
	)?.value

	const isAuthPage = url.includes('/user')
	const isClientPage = url.includes('/client')
	const isSellerPage = url.includes('/seller')

	if (isAuthPage && refreshTokenClient) {
		return NextResponse.redirect(new URL(CLIENT_PAGES.MAIN, url))
	}
	if (isAuthPage && refreshTokenSeller) {
		return NextResponse.redirect(new URL(SELLER_PAGES.HOME, url))
	}

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
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/user/:path*', '/client/:path*', '/seller/:path*']
}

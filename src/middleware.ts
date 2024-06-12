import { NextRequest, NextResponse } from 'next/server'

import {
	CLIENT_PAGES,
	PUBLIC_PAGES,
	SELLER_PAGES,
	USER_PAGES
} from './config/pages-url.config'
import { EnumRole } from './config/role'
import { EnumTokens } from './services/auth-token.services'
import { ROLE_KEY, saveUserRole } from './services/role.service'

export async function middleware(request: NextRequest) {
	const response = NextResponse.next()

	const { url, cookies, nextUrl } = request

	const role = cookies.get(ROLE_KEY)?.value
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN + role)?.value

	const isAuthPage = url.includes('/user')
	const isClientPage = url.includes('/client')
	const isSellerPage = url.includes('/seller')
	if (isAuthPage && refreshToken && role) {
		switch (+role) {
			case EnumRole.CLIENT: {
				return NextResponse.redirect(new URL(CLIENT_PAGES.MAIN, url))
			}
			case EnumRole.SELLER: {
				return NextResponse.redirect(new URL(SELLER_PAGES.HOME, url))
			}
		}
	}

	if (isClientPage) {
		response.cookies.set(ROLE_KEY, JSON.stringify(EnumRole.CLIENT), {
			sameSite: 'strict',
			expires: 1,
			secure: true
		})
	} else if (isSellerPage) {
		response.cookies.set(ROLE_KEY, JSON.stringify(EnumRole.SELLER))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		// return NextResponse.redirect(new URL(USER_PAGES.AUTH, request.url))
		return NextResponse.redirect(new URL(PUBLIC_PAGES.HOME, request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/user/:path*', '/client/:path*', '/seller/:path*']
}

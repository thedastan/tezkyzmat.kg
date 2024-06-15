import { RoleTypes } from './role'

// client
class CLIENT_DASHBOARD {
	private root = '/client'

	MAIN = `${this.root}/request`
	SUCCESS = `${this.root}/request/success`
	APPLICATION = `${this.root}/application`
	MARKET = `${this.root}/market`
}

export const CLIENT_PAGES = new CLIENT_DASHBOARD()

// seller
class SELLER_DASHBOARD {
	private root = '/seller'

	HOME = this.root
	SEARCH = `${this.root}/application`
}

export const SELLER_PAGES = new SELLER_DASHBOARD()

// user
class USER {
	private root = '/user'

	SIGN_UP = this.root + '/sign-up'
	RESET_PASSWORD = this.root + '/reset-password'
	LOGIST = this.root + '/logist'

	REQUEST = this.root + '/request'
	AUTH = (role: RoleTypes) => {
		return this.root + `/login/role-${role}`
	}
}

export const USER_PAGES = new USER()

// public
class PUBLIC {
	private root = '/'

	HOME = this.root
	RESET_PASSWORD = this.root + 'password'
}

export const PUBLIC_PAGES = new PUBLIC()

// client
class CLIENT_DASHBOARD {
	private root = '/client'

	MAIN = `${this.root}/request`
	APPLICATION = `${this.root}/application`
	MARKET = `${this.root}/market`
	PROFILE = `${this.root}/profile`
}

export const CLIENT_PAGES = new CLIENT_DASHBOARD()
// seller
class SELLER_DASHBOARD {
	private root = '/i'

	HOME = this.root
	SEARCH = `${this.root}/search`
	NOTIFICATION = `${this.root}/notification`
	PROFILE = `${this.root}/profile`

	NOTIFICATION_DETAIL = (id: string) => {
		return `${this.root}/notification/${id}`
	}
}

export const SELLER_PAGES = new SELLER_DASHBOARD()

// user
class USER {
	private root = '/user'

	AUTH = this.root + '/login'
	SIGN_UP = this.root + '/sign-up'
	RESET_PASSWORD = this.root + '/reset-password'
	LOGIST = this.root + '/logist'
}

export const USER_PAGES = new USER()

// public
class PUBLIC {
	private root = '/'

	HOME = this.root
	RESET_PASSWORD = this.root + 'password'
}

export const PUBLIC_PAGES = new PUBLIC()

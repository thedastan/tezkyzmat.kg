// client
class CLIENT_DASHBOARD {
	private root = '/client'

	MAIN = `${this.root}/request`
	SUCCESS = `${this.root}/request/success`
	MARKET = `${this.root}/market`

	APPLICATION = `${this.root}/application`
	APPLICATION_DETAIL = (slug: number | string) => {
		return `${this.APPLICATION}/${slug}`
	}

	HISTORY = `${this.APPLICATION}/history`
	HISTORY_DETAIL = (slug: number | string) => {
		return `${this.HISTORY}/${slug}`
	}
}

export const CLIENT_PAGES = new CLIENT_DASHBOARD()

// seller
class SELLER_DASHBOARD {
	private root = '/seller'

	HOME = this.root
	REQUESTS = `${this.root}/requests`
	SUCCESS = `${this.root}/requests/success`
	CONFIRMED = `${this.root}/confirmed`
	SETTINGS = `${this.root}/settings`
	SETTINGS_DETAIL = (id: number | string) => {
		return `${this.SETTINGS}/${id}`
	}
	REQUEST_DETAIL = (id: number | string) => {
		return `${this.REQUESTS}/${id}`
	}
}

export const SELLER_PAGES = new SELLER_DASHBOARD()

// user
class USER {
	private root = '/user'

	SIGN_UP = this.root + '/sign-up'
	RESET_PASSWORD = this.root + '/reset-password'

	REQUEST = this.root + '/request'

	AUTH = this.root + `/login`
}

export const USER_PAGES = new USER()

// public
class PUBLIC {
	private root = '/'

	HOME = this.root
	RESET_PASSWORD = this.root + 'password'
}

export const PUBLIC_PAGES = new PUBLIC()

class LOGISTICIAN {
	private root = '/logistician'

	MAIN = this.root
}

export const LOGISTICIAN_PAGES = new LOGISTICIAN()

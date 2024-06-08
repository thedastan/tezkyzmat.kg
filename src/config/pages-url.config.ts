class DASHBOARD {
	private root = '/i'

	HOME = this.root
	SEARCH = `${this.root}/search`
	NOTIFICATION = `${this.root}/notification`
	PROFILE = `${this.root}/profile`

	INSTRUCTION = `${this.root}/instruction`
	FORBIDDEN = `${this.root}/zapretnyie-tovary`
	ABOUT_US = `${this.root}/o-nas`
	TARIFFS = `${this.root}/tariffs`
	CONTACTS = `${this.root}/contacts`
	CHECKOUT = `${this.root}/checkout`
	SEARCH_PACKAGE_DETAIL = (id: number) => {
		return `${this.root}/search/${id}`
	}
	NOTIFICATION_DETAIL = (id: string) => {
		return `${this.root}/notification/${id}`
	}
}

export const DASHBOARD_PAGES = new DASHBOARD()

class USER {
	private root = '/user'

	AUTH = this.root + '/login'
	SIGN_UP = this.root + '/sign-up'
	RESET_PASSWORD = this.root + '/reset-password'
	LOGIST = this.root + '/logist'
}

export const USER_PAGES = new USER()

class PUBLIC {
	private root = '/'

	HOME = this.root
	RESET_PASSWORD = this.root + 'password'
}

export const PUBLIC_PAGES = new PUBLIC()



import { PRIVATE_API, PUBLIC_API } from '@/api/interceptors'

class CompanyService {
	private BASE_URL = 'account/'

	// async getCompanies() {
	// 	const response = await PUBLIC_API.get<ICompany[]>(
	// 		this.BASE_URL + 'company/'
	// 	)

	// 	return response.data
	// }


}

export const companyService = new CompanyService()

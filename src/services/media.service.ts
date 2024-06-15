import { PUBLIC_API } from '@/api/interceptors'

interface IMedia {
	id: number
	image: string
}

class MediaService {
	private BASE_URL = 'account/'

	async getMediaFiles(files: File[]) {
		let images: string[] = []

		const config = {
			headers: { 'content-type': 'multipart/form-data' }
		}
		return Promise.all(
			files.map(async file => {
				let formData = new FormData()
				formData.append('image', file)
				const response = await PUBLIC_API.post<IMedia>(
					this.BASE_URL + 'media/',
					formData,
					config
				)
				return response.data.image
			})
		).then(image => {
			console.log('image', image)

			images = [...image]
			return images
		})

		return images
	}
}

export const mediaService = new MediaService()

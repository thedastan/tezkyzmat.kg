/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['back.tezkyzmat.com.kg', 'api.tezkyzmat.com.kg']
	},
	env: {
		BASE_API_URL: 'https://back.tezkyzmat.com.kg/'
	}
}

export default nextConfig

'use client'

import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { IImage } from '@/models/request.model'

const SliderDetail = ({ images }: { images: IImage[] }) => {
	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
			return `<span class="` + className + `"></span>`
		}
	}

	return !images.length ? null : (
		<Box
			h={{ sm: '244px', base: '194px' }}
			position='relative'
			mt='5'
		>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false
				}}
				modules={[EffectFade, Pagination, Autoplay]}
				pagination={pagination}
				effect='fade'
				loop={true}
				className='swiper-detail'
				style={{ height: '100%' }}
			>
				{images?.map(el => (
					<SwiperSlide key={el.id}>
						<Box
							h={{ sm: '230px', base: '180px' }}
							w='100%'
						>
							<Image
								src={el.image}
								alt='SliderDetail'
								width={600}
								height={230}
								objectFit='cover'
								className='detail-image'
							/>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}

export default SliderDetail

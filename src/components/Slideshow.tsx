import clsx from 'clsx'
import { h } from 'preact' // https://github.com/withastro/astro/issues/3833
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { textSizesStyles } from './Text/styles'

function Slideshow() {
  return (
    <div class='overflow-hidden'>
      <div class='container'>
        <Swiper
          spaceBetween={32}
          slidesPerView={'auto'}
          breakpoints={{
            1024: {
              spaceBetween: 48,
            },
          }}
          className='!overflow-visible'
        >
          <SwiperSlide className='!w-auto'>
            <div class='flex h-[24rem] w-[16rem] flex-col justify-end bg-black p-6 lg:h-[30rem] lg:w-[20rem] lg:p-8'>
              <h3
                className={clsx(textSizesStyles['body-5-bold'], 'text-white')}
              >
                Project{' '}
                <span className={textSizesStyles['body-5']}>x Wild</span>
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto'>
            <div class='h-[24rem] w-[16rem] bg-black lg:h-[30rem] lg:w-[20rem]' />
          </SwiperSlide>
          <SwiperSlide className='!w-auto'>
            <div class='h-[24rem] w-[16rem] bg-black lg:h-[30rem] lg:w-[20rem]' />
          </SwiperSlide>
          <SwiperSlide className='!w-auto'>
            <div class='h-[24rem] w-[16rem] bg-black lg:h-[30rem] lg:w-[20rem]' />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Slideshow

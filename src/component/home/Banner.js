import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { useState } from 'react';

import WOW from 'wowjs';
import 'animate.css'
import { useEffect } from 'react';


const TxtData = [
  {
    title: "제목1",
    desc: "부제목",
    desc2: "하고싶은 말..."

  },
  {
    title: "제목2",
    desc: "부제목",
    desc2: "하고싶은 말..."

  },
  {
    title: "제목3",
    desc: "부제목",
    desc2: "하고싶은 말..."

  },
  {
    title: "제목4",
    desc: "부제목",
    desc2: "하고싶은 말..."

  },
  {
    title: "제목5",
    desc: "부제목",
    desc2: "하고싶은 말..."

  },
]

const StyleSlide = styled(SwiperSlide)`
position: relative;
img{width: 100%; height: auto;}
`

const DescContent = styled.div`
position: absolute;
left: 50%;
top: 50%;
color: #fff;
transform: translate(-50%, -50%);
h3{
  text-align: center;
  font-size: 48px;
  @media screen and (max-width: 768px){
    font-size: 16px;
  }
  @media screen and (min-width: 1280px){
    font-size: 30px;
  }
}
p{
  font-size: 24px;
  text-align: center; font-weight: bold;
  @media screen and (max-width: 768px){
    font-size: 14px;
  }
  @media screen and (min-width: 1280px){
    font-size: 20px;
  }
}
`

function Banner() {

useEffect(()=>{
  new WOW.WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    live: false,
    mobile:true
  }).init();
},[])
  
  return (
    <>

      <Swiper
        autoplay={{
          delay : 3000,
          disableOnInteraction: false
        }}
        loop = {true}
        // 몇개씩 보이게 할건지
        slidesPerView={1}
        navigation= {{clickable: true}}
        pagination= {{clickable: true}}
        modules={[Autoplay, Navigation, Pagination]}

        // onSwiper={()=>{ console.log(Swiper)}}
        onSlideChange={
          ()=>{
            new WOW.WOW({
              live: false
            }).init()
          }}
        >

        {/* {
          Array(5).fill().map((_,i)=>{
            return (
              <StyleSlide key={i}>
                <img src={`./images/${i+1}.jpg`} alt="slide" />
                <DescContent>
                <h3>강조하는 제목{i} </h3>
                 <p>내용</p>
                </DescContent>
              </StyleSlide>
            )
          })
        } */}
        {
          TxtData.map((e,i)=>{
            return (
              <StyleSlide key={i}>
                <img src={`./images/${i+1}.jpg`} alt="slide" />
                <DescContent>
                <h3 className= 'wow animate__wobble'
                 data-wow-duration="1s">{e.title}</h3>
                 <p className='wow animate__wobble' data-wow-duration="1s" data-wow-delay="0.3s">{e.desc}</p>
                 <p className='wow animate__wobble' data-wow-duration="1s"data-wow-delay="0.6s">{e.desc2}</p>
                </DescContent>
              </StyleSlide>
            )
          })
        }
        {/* <SwiperSlide>
          <img src="./images/11.jpg" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/22.jpg" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/33.jpg" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/44.jpg" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/55.jpg" alt="slide" />
        </SwiperSlide> */}
      </Swiper>
      
    </>
  )
}

export default Banner
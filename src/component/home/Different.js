import React from 'react'
import styled from 'styled-components'
import AnimateNumber from 'animated-number-react';
import { useState } from 'react';
import { useEffect } from 'react';



const Container = styled.div`
width: 100%;
padding-bottom: 48px;
text-align: center;
color: #fff;
background: url("https://via.placeholder.com/1920x450/053") 
fixed center;
`
const ContainerWrap = styled.div`
max-width: 1280px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
padding: 0 2%;
`
const ContentTitle = styled.div`
width: 100%;
/* 1280 */
margin-top: 3rem;
text-align: center;
margin-bottom: 1.5rem;

`
const Title = styled.h3`
font-size: 2rem;
font-weight: bold;
margin-bottom: 1rem;
position: relative;
&::after{
    content: "";
    position: absolute;
    width: 10%;
    height: 2px;
    background: #111;
    left: 50%; bottom: 10%; transform: translate(-50%, -50%);
    /* left: 40%; top: 0; */
}
`
const Desc = styled.p`
font-size: 0.875rem;
color: #a0a0a0;
`
const ContentGrid = styled.div`
flex-basis: 100%;
padding: 48px 0;
ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        flex-basis: 100%;
        text-align: center;
        @media screen and (min-width: 640px){
            flex-basis: 50%;
        }
        @media screen and (min-width: 1024px){
            flex-basis: 25%;
        }
        p:first-child{font-size: 1.25rem}
        p:last-child{font-size: 1rem; padding-bottom: 2rem;}
        span{font-size: 60px; padding-top: 20px; display: block;}
    }
}
`

function Different() {

    const [isview, setIsView] = useState(false);
    useEffect(()=>{

        const scrollEvent = ()=>{
            const rect = document.querySelector("#content").getBoundingClientRect();
            console.log(rect);
            // console.log(window.innerHeight);
            if(rect.top <= window.innerHeight && rect.bottom >= 0){
                setIsView(true);
            }
        }
        window.addEventListener("scroll", scrollEvent)
        scrollEvent()

// 언마운트 될떄 실행된다.
        return ()=>{
            window.removeEventListener("scroll", scrollEvent)
        }

    },[])

    const data = [
        {
            "title" : "설립일",
            "number" : "2017",
            "desc" : "Date of Foundation"
        },
        {
            "title" : "직원수",
            "number" : "456",
            "desc" : "Number OF Employees"
        },
        {
            "title" : "계약체결",
            "number" : "2431",
            "desc" : "Contract Conclusion"
        },
        {
            "title" : "견적문의",
            "number" : "5461",
            "desc" : "Request a Quote"
        }
    ]
  return (
    <>
    <Container>
        <ContainerWrap>
            <ContentTitle>
            <Title>Different</Title>
            <Desc>제목에 대한 부가 설명...</Desc>
            </ContentTitle>
                 <ContentGrid>
{/* 스타일 컴포넌트는 아이디가 클래스면 직접줄수 없음 */}
                <ul id="content">
                {
                data.map((e,i)=>{
                    return(
                <li>
                    <p>{e.title}</p>
                    {
                    isview&&
                    <AnimateNumber 
                    value={e.number}
                    duration={5000}
                    formatValue={(value)=> `${value.toFixed(0)}`}
                    />
                    }
                    <p>{e.desc}</p>
                </li>
                        )
                    })
                }
                </ul>
                </ContentGrid>
        </ContainerWrap>
    </Container>
    
    



    </>
  )
}

export default Different
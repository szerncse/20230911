import { faComment, faDesktop, faMobile, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
width: 100%;
padding-bottom: 48px;
text-align: center;
color: #fff;
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
    width: 3%;
    height: 2px;
    background: #111;
    left: 50%; bottom: 45%; transform: translate(-50%, -50%);
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
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

const ContentItem = styled.div`
flex-basis: 100%;
height: 12rem;
border: 1px solid #ddd;
padding: 4rem 1.25rem 4rem 2rem;
cursor: pointer;
text-align: center;
position: relative;
transition: 0.3s;
box-sizing: border-box;
&:not(:nth-child(1)){
    margin-top: 2%;
}
@media screen and (min-width: 640px){
    flex-basis: 49%;
    &:not(:nth-child(1)){
    margin-top: 0%;
}
    &:nth-child(1n+3){
    margin-top: 2%;
    }
}
@media screen and (min-width: 1024px){
    flex-basis: 24%;
    &:not(:nth-child(1)){
    margin-top: 0%;
    }
}   
&:hover{background-color: #e5e7ed;}
p:nth-child(1){
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
}
p:nth-child(2){
    color: #9ca3af;
}
svg{
    position: absolute;
    color: #9ca3af;
    font-size: 2.5rem;
    right: 1rem;
    bottom: 1rem;
}
`


function Management() {
    const data = [
        {
            "title" : "Web/Mobile",
            "desc" : "웹과 모바일 제작 및 사이트 구축",
            "icon" : faDesktop
        },
        {
            "title" : "Hybrid App",
            "desc" : "안드로이드/IOS",
            "icon" : faMobile
        },
        {
            "title" : "Cafe/Blog",
            "desc" : "다음/네이버/티스토리등 블로그 개설",
            "icon" : faComment
        },
        {
            "title" : "광고",
            "desc" : "옥외광고, 지하철광고, 버스광고, ",
            "icon" : faTaxi
        },
    ]
  return (
    <>
    <Container>
        <ContainerWrap>
            <ContentTitle>
                <Title>Management</Title>
                <Desc>운영관련 내용...</Desc>
            </ContentTitle>
            <ContentGrid>
                {
                    data.map((e,i)=>{
                        return(
                <ContentItem key={i}>
                    <p>{e.title}</p>
                    <p>{e.desc}</p>
                    <FontAwesomeIcon icon={e.icon}/>
                </ContentItem>
                        )
                    })
                }

            </ContentGrid>
        </ContainerWrap>
    </Container>
    
    </>
  )
}

export default Management
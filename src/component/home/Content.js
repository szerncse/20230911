import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
width: 100%;
padding-bottom: 48px;
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
margin-bottom: 1.25rem;

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
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
const ContentItem = styled.div`
flex-basis: 100%;
margin-bottom: 0%.75rem;
position: relative;
@media screen and (min-width: 640px){
    flex-basis: 48.5%;
    margin-bottom: 1.25rem;
}
@media screen and (min-width: 1024px){
    flex-basis: 23.5%;
    margin-bottom: 0;
}
img{width: 100%;}
div{
    padding: 1rem 1.25rem;
    background-color: rgba(255,255,255,0.2);
    text-align: center;
    position: absolute; bottom: 0;
h3{
    font-weight: bold;
    margin-bottom: 0.5rem;
}
p{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

}
`


function Content() {

    const data = [
        {
            "img" : "https://via.placeholder.com/280x340",
            "title" : "컨텐츠 제목 1",
            "desc" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum atque distinctio blanditiis vitae fugit reprehenderit exercitationem deserunt eveniet aut!"
        },
        {
            "img" : "https://via.placeholder.com/280x340/70a",
            "title" : "컨텐츠 제목 2",
            "desc" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum atque distinctio blanditiis vitae fugit reprehenderit exercitationem deserunt eveniet aut!"
        },
        {
            "img" : "https://via.placeholder.com/280x340/50b",
            "title" : "컨텐츠 제목 3",
            "desc" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum atque distinctio blanditiis vitae fugit reprehenderit exercitationem deserunt eveniet aut!"
        },
        {
            "img" : "https://via.placeholder.com/280x340/60c",
            "title" : "컨텐츠 제목 4",
            "desc" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum atque distinctio blanditiis vitae fugit reprehenderit exercitationem deserunt eveniet aut!"
        },
    ]

  return (
    <Container>
        <ContainerWrap>
            <ContentTitle>
                <Title>컨텐츠 제목구간</Title>
                <Desc>해당 컨텐츠 설명 구간</Desc>
            </ContentTitle>
            <ContentGrid >
                {
                    data.map((e,i)=>{
                        return(
                <ContentItem key={i}>
                    <img src={e.img} alt={e.title} />
                    <div>
                        <h3>{e.title}</h3>
                        <p>{e.desc}</p>
                    </div>
                </ContentItem>
                        )
                    })
                }
                
            </ContentGrid>
        </ContainerWrap>
    </Container>
  )
}

export default Content
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Boardwrapper = styled.div`
max-width: 1000px;
margin: 50px auto;
`
const Title = styled.div`
padding: 10px 20px; font-weight:bold; font-size: 24px; 
`
const List = styled.ul`
display: flex;
border-bottom: 1px solid #e0e0e0;

`
const Listitem = styled.li`
padding: 10px 20px; text-align: center;
flex-basis: 10%;
&:nth-child(2){flex-basis: 50%;}
&:nth-child(3){flex-basis: 20%;}
&:nth-child(4){flex-basis: 20%;}
`

const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`
const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 0px;
    background-color: rgb(126,34,206);
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color: #fff;
    display: flex; align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:nth-child(1){
        background-color: rgb(29,78,216);
    }
    a{color: #fff;}
    svg{margin-right: 12px;}
`




function Notice() {

  const [posts, setposts] = useState([]);
  const [likes, setLikes] = useState(Array(posts.length).fill(1));
  

  useEffect(()=>{

    const fetchPosts = async () =>{
      try{

        const q = query(collection(getFirestore(), 'notice'), orderBy("timestamp", 'desc'));
        // desc 내림차순  /   asc 오름차순
        const snapshot = await getDocs(q);
        const postArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setposts(postArray);
        console.log(posts)

      }catch(error){
        console.log(error);
      }
    }
    fetchPosts()
  },[])

  const toggleLike = (index) =>{
    // 1. 원래 값을 복사
    // 2. 복사한 배열의 원하는 인덱스 번호의 값을 변경
    // 3. 그 값을 원래 값에 붙여 넣기
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index]
    setLikes(newLikes);
  }

  if(posts.length === 0){
    return <div>로딩중</div>
  }









  return (
    <>

    <Boardwrapper>
      <Title>공지사항</Title>
      <List>
        <Listitem>번호</Listitem>
        <Listitem>제목</Listitem>
        <Listitem>작성자</Listitem>
        <Listitem>작성일</Listitem>
        <Listitem>조회수</Listitem>
        <Listitem>좋아요</Listitem>
      </List>
      {
        posts.map((e,i)=>{
          return (
            <List key={i}>
              <Listitem>{posts.length -i}</Listitem>
              <Listitem><Link to={`/view/notice/${e.id}`}>{e.title}</Link></Listitem>
              <Listitem>{e.nickname}</Listitem>
              <Listitem>{e.timestamp.toDate().toLocaleDateString()}</Listitem>
              <Listitem>{e.view}</Listitem>
              <Listitem onClick={()=>{toggleLike(i) }}>{likes[i] ? '❤' : '🤍'}</Listitem>
            </List>
          )
        })
      }
    <ButtonWrap>
    <Button><Link to="/write/notice"><FontAwesomeIcon icon={faPen} />글쓰기</Link></Button>
    </ButtonWrap>
    </Boardwrapper>

    </>
  )
}

//  <Listitem>{posts.length -i}</Listitem> 글자 순서대로

export default Notice
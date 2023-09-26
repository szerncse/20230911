import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal';
import {  addDoc, collection, deleteDoc, doc, getDoc, getFirestore, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPen, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

// updateDoc 조회수 올리는것

const Container = styled.div`
background-color: #f5f5f5;
height: calc(100vh - 86px);
padding: 50px 0;
`
const ContenWrap = styled.div`
max-width: 1000px;
margin: 0 auto;
padding: 20px;
background-color: #fff;
border: 1px solid rgba(151,157,172,0.28);
border-radius: 10px;
`
const Content = styled.div`
border-bottom: 1px solid rgba(151,157,172,0.28);
padding-bottom: 5px;
> div{
    margin-top: 12px;
    width: 50%;
    display: flex; justify-content: space-between;
}
`
const ButtonContent = styled.div`
display: flex;
justify-content: space-between;
`
const ButtonWrap = styled.div`
margin-top: 50px;
display: flex;
justify-content: space-between;
column-gap: 20px;
&:nth-child(2) > button:nth-child(1){background-color:#115e59;}
&:nth-child(2) > button:nth-child(2){background-color:#901c1c;}
`
const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 0px;
    background-color: #1d4ed8;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color: #fff;
    display: flex; align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:nth-child(2){
        background-color: #7e22ce;
    }
    a{color: #fff;}
    svg{margin-right: 12px;}

`

const CommentWrap = styled.div``
const Comment = styled.div``

function View() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState("");
    const {board, view} = useParams();
    
    const boards = ["notice", "online", "qna", "gallery"];
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [message, setMessage] = useState("");
    const userState = useSelector(state => state.user);
    
        const uid = sessionStorage.getItem("users");
        const [userUid, setUserUid] = useState(uid)


useEffect(()=>{
    const postRef = doc(getFirestore(), board, view);
    const commentRef = collection(postRef, "comments");

    const q = query(commentRef, orderBy("timestamp", "desc"));

    
    const datasnap = onSnapshot(q, (item)=>{
        const fetchComment = item.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        console.log(item.docs)
        setComments(fetchComment)
    })
    return datasnap
},[board, view])
console.log(comments)

    const viewCnt = async(board, view) =>{
        const vieRef = doc(getFirestore(), board, view);
        await updateDoc(vieRef,{
            view : increment(1)
        })
    }

    useEffect(()=>{
        const FetchData = async () =>{
        const postRef = doc(getFirestore(), board, view);
        const postSnapshot = await getDoc(postRef);
        if(postSnapshot.exists()){
                setPost(postSnapshot.data())
                viewCnt(board, view)
                setUserUid(postSnapshot.data().uid);
        }else{
            setIsModal(true)
            setMessage("해당 문서가 존재하지않습니다.")
        }
    }
    FetchData()
}, [board, view])

const addComment = (view) =>{
    const postRef =doc(getFirestore(), board, view);
    const commentRef = collection(postRef, "comments");
    addDoc(commentRef, {
        text: comment,
        nickname : userState&&userState.data.nickname,
        timestamp: serverTimestamp()

    })
    
}


function formatDate(data){
    if(data){
        const date= data.toDate();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`

    }
}


const deletePost = async () =>{
    if(window.confirm("정말로 삭제하시겠습니까?")){
    const docRef = doc(getFirestore(), board, view);
    await deleteDoc(docRef);

    alert("게시물이 삭제 되었습니다.");
    navigate(`/service/${board}`)

    }
}

if(!boards.includes(board)){
return(
<>
    {
        isModal && <Modal error="잘못된 게시판입니다!" onClose={()=>{setIsModal(false); navigate('/')}} />
    }
    </>
)}

if(isModal){
return (
     <Modal error={message} onClose={()=>{setIsModal(false);navigate(`/service/${board}`)}} />
)
}

if(!post){
return(
    <div>로딩중</div>
)}


  return (
    <>
  <Container>
    <ContenWrap>
        <Content>
            <h2>{post.title}</h2>
            <div>
                <span>이름 : {post.nickname}</span>
                <span>작성일 : {post.timestamp.toDate().toLocaleDateString()}</span>
                <span>조회수 : {post.view}</span>
            </div>
        </Content>
        <div dangerouslySetInnerHTML={{ __html: post.content}}></div>
        
        <CommentWrap>
            <ul>
                {
                    comments.map((e,i)=>{
                        return (
                            <li key={i}>{e.text}<span>{formatDate(e.timestamp)}</span></li>
                        )
                    })
                }
            </ul>
            {
                uid && 
            <Comment>
                <textarea value={comment} onChange={(e)=> setComment(e.target.value)} />
                <Button onClick={()=>{addComment(view)}}>댓글달기</Button>
            </Comment>
            }
        </CommentWrap>

        <ButtonContent>
        <ButtonWrap>
            <Button onClick={()=>{navigate(`/service/${board}`)}}><FontAwesomeIcon icon={faList} />목록</Button>

            <Button onClick={()=>{navigate(`/write/${board}`)}}><FontAwesomeIcon icon={faPen} />글쓰기</Button>
            </ButtonWrap>
            {
                uid && uid === userUid &&

        <ButtonWrap>
            <Button onClick={()=>{navigate(`/edit/${board}/${view}`)}}><FontAwesomeIcon icon={faPenSquare} />수정</Button>
            <Button onClick={deletePost}><FontAwesomeIcon icon={faTrash} />삭제</Button>
        </ButtonWrap>
            }
    </ButtonContent>
    </ContenWrap>
  </Container>

  

    </>
  )
}

export default View
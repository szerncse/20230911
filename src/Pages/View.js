import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal';
import {  doc, getDoc, getFirestore } from 'firebase/firestore';




function View() {

    const {board, view} = useParams();
    
    const boards = ["notice", "online", "qna", "gallery"];
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [message, setMessage] = useState("");

    useEffect(()=>{
        const FetchData = async () =>{
        const postRef = doc(getFirestore(), board, view);
        const postSnapshot = await getDoc(postRef);
        console.log(postSnapshot.data())
        if(postSnapshot.exists()){
                setPost(postSnapshot.data())
        }else{
            setIsModal(true)
            setMessage("해당 문서가 존재하지않습니다.")
        }
    }
    FetchData()
}, [board, view])

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
     <Modal error={message} onClose={()=>{setIsModal(false);}} />
)
}

if(!post){
return(
    <div>로딩중</div>
)
}


  return (
    <>
  
    <div>{post.title}</div>
    <div>{post.nickname}</div>
    <div>{post.timestamp.toDate().toLocaleDateString()}</div>
    <div>{post.view}</div>
    <div angerouslySetInnerHTML={{ ___html: post.content}} />
    
    <Link to="/service/notice">목록</Link>
    <Link to="/write/notice">글쓰기</Link>
    </>
  )
}

export default View
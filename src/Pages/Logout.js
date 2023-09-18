import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { logOut } from '../Store'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../firebase'
import Modal from '../Modal/Modal'

// useDispatch
// useNavigate
// firebaseAuth



function Logout() {
    const [isModal, setIsModal] =useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    signOut(firebaseAuth)
    .then(()=>{
        dispatch(logOut());
        // navigate("/");
        sessionStorage.removeItem("users")
    })

    .catch ((error)=>{
        console.log(error)
    })


  return (
    <>
    {
        isModal &&
        <Modal error="로그아웃 되었습니다." onClose={()=>{
            setIsModal(false);
            navigate("/");
        }}></Modal>
    }



    </>
  )
}

export default Logout
import React, { useState } from 'react'
import styled from 'styled-components'
import { firebaseAuth, createUserWithEmailAndPassword } from './../firebase'
import {doc, setDoc, getFirestore} from  'firebase/firestore'
import { useNavigate } from 'react-router-dom'



const Container = styled.div`
display: flex;
background-color: #f5f5f5;
justify-content: center;
height: calc(100vh - 86px);
align-items: center;
`
const SignUp = styled.div`
width: 35vw;
padding: 20px;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
border-color: #fff;
border-radius: 10px;
@media screen and (max-width: 1024px){
width: 60vw;  
}
@media screen and (max-width: 640px){
  width: 70vw;
}
`
const Title = styled.h1`
font-size: 24px;
text-align: center; margin-bottom: 20px;
`
const Input = styled.input`
width: 100%; padding: 10px;
margin-bottom: 10px;
border: 1px solid #ddd;
border-radius: 5px; box-sizing: border-box;
`
const Button = styled.button`
width: 100%;
padding: 10px;
border-radius: 5px;
background-color: #007bff;
border: none;
color: #fff; cursor: pointer;
`






function Member() {
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [nickname, setNickname] = useState();
const [phone, setPhone] = useState();
const [error, setError] = useState();
const navigate = useNavigate ()

const phoneNumber = (e) =>{
const value = e.target.value;
const number = (''+value).replace(/[^0-9]/g, '')
const match = number.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);

if(match){
  return match[1] + '-' + match[2] + '-' + match[3]

}

  return setPhone(value);
}


const errorMsg = (errorCode) =>{
  const firebaseError = {
    'auth/admin-restrcted-operation' : "빈데이터가 있다.",
    'auth/email-already-in-use' : "이미 사용중인 이메일 주소",
    'auth/invild-eamil' : "유효하지 않음 이메일 주소",
    'auth/operat-not-allowed' : "이메일.비밀번호 계정이 비활성화 되어 있습니다.",
    'auth/weak-password' : "너무 짧은 비밀번호를 사용하였습니다.(6자리)"
  }

return firebaseError[errorCode] || '알 수 없는 에러가 발생하였습니다.'}

const signUp = async (e) =>{
  e.preventDefault();

  try{
    const {user} = await createUserWithEmailAndPassword
    (firebaseAuth, email, password);

    const userProfile = {
      name,
      nickname,
      phone
    }

    console.log(userProfile)

    await setDoc(doc(getFirestore(), "users", user.uid), userProfile)

    alert("회원가입이 완료 되었습니다.");
    navigate('/');

  }catch(error){
    setError(errorMsg(error.code));
    console.log(error.code);
  }

}
  return (
    <>
      <Container>

        <SignUp>
          {phone}
          <Title>회원가입</Title>
          <Input defaultValue={name} onChange={(e)=>{
            setName(e.target.value)}} type="text" className='name' placeholder='이름' />

          <Input defaultValue={nickname} onChange={(e)=>{
            setNickname(e.target.value)}} type="text" className='nickname' placeholder='닉네임' />

          <Input value={phone} onChange={phoneNumber}
            maxLength={13}  type="text" className='phone' placeholder='전화번호' />

          <Input  value={email} type='email' onChange={(e) =>{
            setEmail(e.target.value)
          }} className='email' placeholder='이메일' />

          <Input onChange={(e) =>{
            setPassword(e.target.value)}} type="password" className='password' placeholder='비밀번호' />

          <Input type="password" className='confirm_password' placeholder='비밀번호 확인' />
          <Button onClick={signUp}>가입</Button>
          <p>{error}</p>
        </SignUp>

      </Container>


    </>
  )
}

export default Member
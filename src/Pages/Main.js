import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import { useMemo } from 'react'
import Banner from '../component/home/Banner'



const Test = ()=>{
  return (
    <>
    <p>테스트</p>
    </>
    
  )
}


function Main() {
const resuit = useMemo(()=>{
  return Test()
}, [])


  useEffect(()=>{
    console.log("완료!")
    return ()=>{
      console.log("완료가 되기전 실행됨")
    }
  }, [])

 

  


  let [count, setCount] = useState(0)



  return (
    <>
    <Banner />
    {/* <Test />
     {resuit}
     <p>{count}</p>
     <Product />
     <button onClick={()=>{setCount(count + 1)}}>버튼</button> */}
    
    </>
  )
}

export default Main
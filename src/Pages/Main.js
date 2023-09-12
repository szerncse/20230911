import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changName } from '../Store'

function Main() {

  const a = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <>
      <p>{a}</p>
      <p></p>
      <button onClick={()=>{dispatch(changName())}}>변경</button>
    
    </>
  )
}

export default Main
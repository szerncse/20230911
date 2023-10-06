import React, { useEffect, useState } from 'react'

import Banner from '../component/home/Banner'
import Company from '../component/home/Company'
import Management from '../component/home/Management'
import Different from '../component/home/Different'
import Content from '../component/home/Content'





function Main() {
 
  return (
    <>
    <Banner />
    <Company />
    <Content/>
    <Different/>
    <Management/>

    {/* <Test />
     {resuit}
     <p>{count}</p>
     <Product />
     <button onClick={()=>{setCount(count + 1)}}>버튼</button> */}
    
    </>
  )
}

export default Main
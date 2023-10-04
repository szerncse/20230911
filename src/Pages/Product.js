import React from 'react'
import { memo } from 'react'




const Product = memo(function(){



  console.log("product 실행")



  return (
    <div>Product</div>
  )
})

export default Product
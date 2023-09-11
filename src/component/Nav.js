import { faArrowRightFromBracket, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

const NavContent = styled.div`
width: 100%;
position: sticky;
top: 0;
border-bottom: 1px solid rgba 255,255,255,0.3;
background: #fff;
z-index: 40;
`
const NavWrap = styled.div`
max-width: 1280px;
margin: 0 auto; display: flex; justify-content: space-between;
align-items: center; padding: 10px 2%;
`
const NavLogo = styled.div`
img{width:100%;}
`

const NavList = styled.div`
display: flex; 
justify-content: space-between;
 flex-basis: 66.66667%;
@media screen and(max-width:1024px){
display: none;
}
ul{
    display: flex;
    flex-basis: 100%;
    justify-content: space-between;
    li{
        position: relative;
        flex-basis: 25%;
        text-align: center;
    }
}
`

const NavSubmenu = styled.ul`
position: absolute;
background-color: rgb(30,41,59);
transition: 0.5s;
flex-wrap: wrap;
text-align: center;
height: 0; 
width: 100%;
overflow: hidden;
li{
    flex-basis: 100% !important;
    padding: 10px 0;
    a{
        color: #fff;
    }
}
&.on{
    height: 160px;
}
`

const NavMember = styled.div`
ul{
    display: flex;
    column-gap: 20px;
}
`



function Nav() {

    const SubMenuHeight = (e)=>{
        const list = document.querySelectorAll(".sub_list")[e];
        console.log(list);
        const listLength = list.querySelectorAll("li").length;
        const value = listLength * 43+"px";
        console.log(value);

        return value;

    }

    const [isActive, setIsActive] = useState(-1);
    const SubMenu = [
        ["인사말", "연혁", "내부전경", "오시는길"],
        ["사업소개", "사업소개2", "사업소개3"],
        ["제품소개", "제품소개2", "제품소개3"],
        ["공지사항", "온라인 상담", "질문과 답변", "갤러리"],
        
    ]
    const SubMenuLink = [
        ["/company/greeting","/company/history","/company/interior","/company/directions",],
        ["/businss/businss-1", "/businss/businss-2", "/businss/businss-3"],
        ["//product-1", "/product/product-2", "/product/product-3"],
        ["/service/notice", "/service/online", "/service/gallery"]
    ]


    const Nav = [
        ["회사소개", "사업소개", "제품소개", "고객센터"],
        ["/company","/businss","/product","/service"]
    ]

    const Nav2 =[
        {
            title: "회사소개",
            link : "/company"
        },
        {
            title: "사업소개",
            link : "/businss"
        },
        {
            title: "제품소개",
            link : "/product"
        },
        {
            title: "고객센터",
            link : "/service"
        }
    ]

  return (
    <>

    <NavContent>
        <NavWrap>
            <NavLogo>
                <NavLink to="/">
                    <img src="https://via.placeholder.com/120x60" alt="로고" />
                </NavLink>
            </NavLogo>
            <NavList>
                <ul>
                {
                    // Nav[0].map((e,i)=>{
                    //     return (
                    //         <li><NavLink to={Nav[1][i]}>{e}</NavLink></li>
                    //     )
                    // })
                    Nav2.map((e,i)=>{
                        return (
                            <li onMouseOver={()=>{
                                setIsActive(i);
                                SubMenuHeight(i);
                            }} 
                                onMouseOut={()=>{
                                setIsActive(-1);
                            }} key={i}><NavLink to={e.link}>{e.title}</NavLink>
                            <NavSubmenu className={`sub_list ${isActive === i ? 'on' : ''}`}>
                                {
                                    SubMenu[i].map((el,index)=>{
                                        return (
                                            <li key={index}><NavLink to={SubMenuLink[i][index]}>{el}</NavLink></li>
                                        )
                                    })
                                }
                            </NavSubmenu>
                            </li>
                        )
                    })
                }
                </ul>
            </NavList>
            <NavMember>
            <ul>
                <li>
                    <NavLink to="/login">
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        로그인
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/member">
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        회원가입
                    </NavLink>
                </li>
            </ul>
            </NavMember>
        </NavWrap>
    </NavContent>
    
    </>
  )
}

export default Nav
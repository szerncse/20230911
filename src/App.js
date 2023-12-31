import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyle";
import Main from "./Pages/Main";
import Aside from "./component/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./component/Nav";
import Store, { logIn, loggedIn } from "./Store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./Pages/Member";
import Login from "./Pages/Login";
import Example from "./Example/Example";
import Logout from "./Pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./Pages/Modify";
import FindEmail from "./Pages/FindEmail";
import Notice from "./Pages/Service/Notice";
import Write from "./Pages/Write";
import Online from "./Pages/Service/Online";
import Qna from "./Pages/Service/Qna";
import Gallery from "./Pages/Service/Gallery";
import Service from "./Pages/Service";
import View from "./Pages/View";
import Modal from "./Modal/Modal";
import { useState } from "react";
import Notpage from "./Pages/Notpage";



function App() {
  
console.log(process.env)


  return (
    <>
    <Provider store={Store}>
   <Inner/>
   
  </Provider>
</>
  );
}

function Inner(){
  
  const light = {
    colors : {
      Primary : "orange",
      Secondary : "orangered",
      BgColor: "#e9f1f6",
      Color : "#000",
      ContentBg: "#fff"
    }
  }
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary : "#e9e9e9",
      BgColor: "#333",
      Color : "#e9e9e9",
      ContentBg: "#272929"
    }}
  
const theme = useSelector(state => state.dark);
const DarkMode = theme === 'light' ? light : dark;
const dispatch = useDispatch();
const userState = useSelector(state =>state.user);
console.log(userState)
const uid = sessionStorage.getItem("users");



    // 로딩되고 실행되는것 / 대괄호 입력하면 한번만 실행된다./스테이트값 중요
    useEffect(()=>{
      if(uid){
      dispatch(logIn(uid));
  
    }
      const fetchUser = async () =>{
        if(!uid) return;

      const userDoc = doc(collection (getFirestore(), "users"), uid);
        console.log(userDoc)

        try{
          const docsnapshot = await getDoc(userDoc);
          console.log(docsnapshot)
          if(docsnapshot.exists()){
            const userData = docsnapshot.data();
            dispatch(loggedIn(userData))
          }

      }catch(error){
          console.log(error)
        }

      }
fetchUser();
    }, [dispatch, uid])

// fetchUser(); 실행하기 위해입력

    const [isModal, setIsModal] = useState(true);
    const navigate = useNavigate()

  return(

  <ThemeProvider theme={DarkMode}>
  <GlobalStyle/>
  <Aside theme = {theme} />
  <Nav/>
  <Routes>
    <Route path="/" element={<Main/>}></Route>
    <Route path="/Member" element={<Member/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/Logout" element={<Logout/>}></Route>
    <Route path="/Example" element={<Example/>}></Route>
    <Route path="/Modify" element={<Member/>}></Route>
    <Route path="/findemail" element={<FindEmail/>}></Route>

    <Route path="/write/:board" element={<Write/>}></Route>
    <Route path="/view/:board/:view" element={<View />}></Route>
    {/* <Route path="/view/:board" element={isModal && <Modal error="유효하지 않은 경로입니다." onClose={()=>{navigate('/')}} />}></Route> */}
    <Route path="/edit/:board/:view" element={<Write />}></Route>

    <Route path="/service" element={<Service/>}>
      <Route path="notice" element={<Notice/>}></Route>
      <Route path="online" element={<Online />}></Route>
      <Route path="qna" element={<Qna/>}></Route>
      <Route path="gallery" element={<Gallery/>}></Route>
    </Route>
    <Route path="/*" element={<Notpage/>}></Route>
  </Routes>
</ThemeProvider>
)
}

export default App;

import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyle";
import Main from "./Pages/Main";
import Aside from "./component/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./component/Nav";
import Store, { loggedIn } from "./Store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./Pages/Member";
import Login from "./Pages/Login";
import Example from "./Example/Example";
import Logout from "./Pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./Pages/Modify";
import FindEmail from "./Pages/FindEmail";

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
const userState = useSelector(state =>state.user);
console.log(userState)
  

const dispatch = useDispatch();
const uid = sessionStorage.getItem("users");
console.log(uid)

    // 로딩되고 실행되는것 / 대괄호 입력하면 한번만 실행된다./스테이트값 중요
    useEffect(()=>{

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
    <Route path="/Modify" element={<Modify/>}></Route>
    <Route path="/findemail" element={<FindEmail/>}></Route>

  </Routes>
</ThemeProvider>
)
}

export default App;

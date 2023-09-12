import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyle";
import Main from "./Pages/Main";
import Aside from "./component/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Nav from "./component/Nav";
import Store from "./Store";
import { Provider, useSelector } from "react-redux";




function App() {

  




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
  

return(

  <ThemeProvider theme={DarkMode}>
  <GlobalStyle/>
  <Aside/>
  <Nav/>
  <Routes>
    <Route path="/" element={<Main/>}></Route>
  </Routes>
</ThemeProvider>
)
}

export default App;

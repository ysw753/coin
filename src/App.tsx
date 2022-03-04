import React, { useState } from 'react';
import Router from './Router';
import { createGlobalStyle,ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme"
import { QueryClient, QueryClientProvider } from 'react-query'
import styled from "styled-components";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1.2;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  
}
a {
  text-decoration:none;
}
body {
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  transition: all 0.50s linear;
}


`;
const Background=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(20, 20, 20, 0.1) 10%,
    rgba(20, 20, 20, 0.7) 70%,
    rgba(20, 20, 20, 1)
  ),
  url(https://cdn.pixabay.com/photo/2020/06/04/09/34/bitcoin-5258032_960_720.jpg);
background-size: cover;
overflow:hidden;

`
const Btn=styled.button`
  position:absolute;
  color:rgba(255,255,255,0.8);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color:rgb(83, 92, 104,0.8);
  margin:50px;
  font-size:2em;
  border: none;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
  }
`

const queryClient = new QueryClient()
function App() {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
}
  return(
    <Background>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>    
          <GlobalStyle  />
          <Btn onClick={themeToggler}>Switch</Btn>
          <Router/>
        
      </ThemeProvider>
    </QueryClientProvider>
    </Background>
    
  )
  
}

export default App;

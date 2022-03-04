import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {coinFetcher } from "../api";
import Chart from "./Chart";



interface ICoin{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Header=styled.header`
  margin:auto;
  margin-top:30px;
  margin-bottom:20px;
  width:500px;
  text-align:center;
  font-size:30px;
  display:flex;
  justify-content:space-between;
  span{
    color:#c7ecee;
  }

`
const Container= styled.div`
height:600px;
padding:20px;
display:flex;
justify-content:center;
overflow:outo;


`
const CoinList = styled.ul`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
overflow-y:scroll;
&::-webkit-scrollbar {
  width: 10px;
}
&::-webkit-scrollbar-thumb {
  background-color: #2f3542;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
&::-webkit-scrollbar-track {
  background-color: grey;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
`
const Coin = styled.li`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:10px;
  text-align: center;
  margin:10px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius:5px;
  width:200px;
  height:200px; 
`

const Img = styled.img`
margin-left:5px;
  width:1.5em;
  height:1.5em;
`

function Coins() {
 // usequery는 캐시에 데이터까지 저장해 기억해줌
  const {isLoading, data} = useQuery<ICoin[]>('allCoins',coinFetcher);
  const urlPage = useParams()

  const [ currentPage, setCurrent] = useState(1)
  const nextPage=()=>{
    setCurrent((prePage)=>prePage<10?prePage+1:10)
  }
  const prevPage=()=>{
    setCurrent((prePage)=>prePage>1?prePage-1:1)
  }

 
  return (  
    <>
     {isLoading?'loading...':(
      <Header>
        <Link 
            onClick={prevPage}
            to={{
              pathname:`/${currentPage-1}`,
              state:{
                currentPage:currentPage,
              }, 
          }}
         >
           <span>prevpage</span>
        </Link>
        <Link 
            onClick={nextPage}
            to={{
              pathname:`/${currentPage+1}`,
              state:{
                currentPage:currentPage,
              }, 
          }}
         >
           <span>nextpage</span>
        </Link>
       
       
      </Header>
    )}
      {isLoading?'loading...':(
        <Container>
        <CoinList>
          {data?.slice((currentPage-1)*9,currentPage*9).map((coin)=>
            <Coin key={coin.id}> 
              <div>
                {coin.name}
                <Link 
                  to={{
                    pathname:`/${currentPage}/${coin.id}`,
                    state:{
                      name:coin.name,
                      coinId:coin.id,
                      currentPage:currentPage,
                    }
                  }}
                >
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                </Link> 
              </div>
              <Chart coinId={coin.id}/>
            </Coin>  
            
          )}
         

        </CoinList>
      </Container>
      )}
      
    </>
    )
}
export default Coins;
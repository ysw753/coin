import { useEffect, useState } from "react";
import { Link, Route, RouteComponentProps, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart, { IHistorical } from "./Chart";
import { useQuery } from "react-query";
import { infoFetcher, ohlcHistoryFetcher, priceFetcher } from "../api";

interface Param{
  coinId:string;
}
interface currentPageParam{
  currentPage:string;
  
}
export interface CoinId{
  name:string;

}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Outer = styled.div`
background-color:${(props)=>props.theme.bgColor};
height:100%;
margin:0 auto;
  padding-top:20px;
  max-width:500px;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  span{
    font-size:25px;
    font-weight:600;
  }
  &:first-child{
    margin-top:10px;
  }
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
const Title=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:200px;
  font-weight:800;
  padding:5% 0;
  font-size:3em;
`


const Detail = styled.div`
  display:flex;
  justify-content:center;
  width:50%;
  margin-top:20px;
`
const PriceData = styled.div`
  display:flex;
  justify-content:space-between;
  width:50%;
  margin-top:20px;
  padding:10px;

`
const Tabs=styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
margin: 25px 0px;
gap: 100px;
`
const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 5px;
  font-weight: 100;
  padding: 7px 0px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 1 0px;
    display: block;
  }
`;
function Coin() {
  const { coinId } = useParams<Param>();
  const {state}= useLocation<CoinId>();
  const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(['info',coinId], ()=>infoFetcher(coinId));
  const {isLoading:priceLoading, data:priceData} = useQuery<PriceData>(['price',coinId], ()=>priceFetcher(coinId));
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const {currentPage}= useParams<currentPageParam>();
  

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // const [loadiing, setLoading]= useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false)
      
  //   })();
  // }, [coinId]);
  const loading = infoLoading||priceLoading;
 
  
  return (

  <Outer>
    <Link to={`/`}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" className="icon"/></Link>
    <Title>  
    
      <span>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</span>
    </Title>
    {loading?('loading...'
    ):(
    <>
      <span>RANK {infoData?.rank}</span>
      <Detail>
        {infoData?.description}
      </Detail>
      <PriceData>
        <span>MAX {priceData?.max_supply}</span>
        <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
      </PriceData>

      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${currentPage}/${coinId}/chart`}>chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${currentPage}/${coinId}/price`}>price</Link>
        </Tab>
    </Tabs>

    <Switch>
      <Route path={`/${currentPage}/:coinId/price`}>
        <Price coinId={coinId}/>
      </Route>
      <Route path={`/${currentPage}/:coinId/chart`}>
        <Chart coinId={coinId} />
      </Route>
    </Switch>
    </>
    )}
   
  </Outer>

  )
}
export default Coin;
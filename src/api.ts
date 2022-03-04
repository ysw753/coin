import { IHistorical } from './routes/Chart';
import { CoinId } from './routes/Coin';
export function coinFetcher(){
  return fetch('https://api.coinpaprika.com/v1/coins').
          then((response)=>response.json());
}

export function infoFetcher(coinId:string){
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((response)=>response.json());
}
export function priceFetcher(coinId:string){
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((response)=>response.json());
}

export function  ohlcHistoryFetcher(coinId:string){
  const end = Math.floor(Date.now()/1000);
  const start = end-60*60*24*7*2;
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then((response)=>response.json());
}
export function  allohlcHistoryFetcher(coinIds:string[]|undefined){
  const end = Math.floor(Date.now()/1000);
  const start = end-60*60*24*7*2;
  return coinIds?.map(coinId=>fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then((response)=>response.json()));
   
}

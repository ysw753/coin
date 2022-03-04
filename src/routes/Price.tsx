import { useQuery } from "react-query";
import { ohlcHistoryFetcher } from "../api";
import { IHistorical } from "./Chart";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
interface ChartProps{
  coinId:string;
}
const Box = styled.div`
width:100%;
height:100%;
`
function Price({ coinId }: ChartProps){
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => ohlcHistoryFetcher(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return(
    <Box>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              data:data?.map((e)=>{
                return{
                  x:e.time_open,
                  y:[e.open.toFixed(3),e.high.toFixed(3),e.low.toFixed(3),e.close.toFixed(3)],
                };
              }),
            },
          ]}
          options={
            {
              theme:{
                mode:'dark',
              },
              chart:{
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: 'datetime',
                
              }
            }
          }
        />
      )}
    </Box>
  )
}
export default Price;
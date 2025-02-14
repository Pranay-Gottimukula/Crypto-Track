import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './Coin.css'
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

function Coin() {

  const {coinID} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);
  const [days, setDays] = useState(1);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-uWEY5LLGiYpxUbrqKpKnaosp'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistorticalData = async ()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-uWEY5LLGiYpxUbrqKpKnaosp'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=${days}`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

useEffect( ()=> {
  document.title = 'Crpto Track'
}, [])

useEffect(()=>{
  fetchCoinData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency, days])

useEffect(()=>{
  fetchHistorticalData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency, days])

if(coinData && historicalData){
  return (
    <div className="coin flex justify-around">
      <div className="coin-name my-4 flex flex-col items-center border-r-solid border-r-gray-400 border-r-2 text-center">
        <div><img className="w-64 my-4" src={coinData.image.large} alt="coin logo"></img></div>
        <p className="text-4xl"><b>{coinData.name} {coinData.symbol.toUpperCase()}</b></p>
        <p className="my-4">{coinData.description.en.split('.')[0]}</p>
        <p className="my-3 text-2xl"><span className="font-bold">Rank: </span>{coinData.market_cap_rank}</p>
        <p className="my-3 text-2xl"><span className="font-bold">Current Price: </span>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
        <p className="my-3 text-2xl"><span className="font-bold">Market Cap: </span>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString().slice(0, -8)}M</p>
      </div>
      <div className="coin-chart p-6">
        <LineChart historicalData={historicalData.prices} days={days} setDays={setDays} />
      </div>
    </div>
  )
}
else {
  return (
    <div className="spinner grid place-self-center">
      <div className="spin w-16 h-16 place-self-center border-solid border-4 border-gray-200 rounded-full">
        
      </div>
    </div>
  )
}

  
}

export default Coin 
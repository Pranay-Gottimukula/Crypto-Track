import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

const {allCoin, currency} = useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState('');

const inputHandler = (event) => {
  setInput(event.target.value);
  if(event.target.value === ""){
    setDisplayCoin(allCoin);
  }
}

const searchHandler = async () => {
  event.preventDefault();
  const coins = await allCoin.filter((item) => {
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins)
}

useEffect( ()=> {
  document.title = 'Crpto Track'
}, [])

useEffect( ()=> {
  setDisplayCoin(allCoin);
}, [allCoin])

  return (
    <div className='home'>
        <div className='hero flex justify-center flex-col items-center'>
          <div className='text-7xl mt-20 mb-4 font-bold'>Crypto Track</div>
          <div className='text-gray-200 text-xl'><p>Crypto Currency Tracking system</p></div>
          <form onSubmit={searchHandler} className='mt-24 bg-gray-900 rounded-xl border-solid border-gray-400 border-2 outline-none'>
            <input onChange={inputHandler} list='coinlist' value={input} className='px-4 py-2 h-14 w-140 text-left rounded-xl outline-none ' type='text' placeholder='Search Crypto..'></input>

              <datalist id='coinlist'>
                {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
              </datalist>

            <button className='mx-2 py-1.5 px-4.5 bg-gray-200 text-black rounded-lg cursor-pointer' type='submit'>Search</button>
          </form>
          <div className='px-4 py-4 my-10 w-260 border-solid border-gray-400 border-2 bg-gray-800 rounded-xl text-xl'>
            <div className='crypto-table px-2 py-3 border-b-solid border-b-gray-400 border-b-2 content-center'>
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p>24H Change</p>
              <p className='text-right'>Market Cap</p>
            </div>
            {
              displayCoin.slice(0, 10).map((item, index)=>(
                <Link to={`/coin/${item.id}`} key={index} className='crypto-table px-2 py-3  border-b-solid border-b-gray-700 border-b-2'>
                  <p className='content-center'>{item.market_cap_rank}</p>
                  <div className='flex items-center'>
                    <div className='mx-2'><img className='w-9' src={item.image} alt='coin-img'></img></div>
                    <div><span>{item.name + " - " + item.symbol}</span></div>
                  </div>
                  <p className='content-center'>{currency.symbol} {item.current_price.toLocaleString()}</p>
                  <p className={item.price_change_percentage_24h > 0 ? 'text-green-400 content-center' : 'text-red-500 content-center'}>
                    {Math.floor(item.price_change_percentage_24h * 100)/100}
                  </p>
                  <p className='text-right content-center'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Home
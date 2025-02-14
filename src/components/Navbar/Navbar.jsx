//import React from 'react'
import { useContext } from 'react'
import './Navbar.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)
  
  const currencyHandler = (event) => {
    switch(event.target.value){
      case "usd": {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur": {
        setCurrency({name: "eur", symbol: "€"});
        break;
      }
      case "inr": {
        setCurrency({name: "inr", symbol: "₹"});
        break;
      }
      default: {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }

  return (
    <div className='py-3.5 flex justify-between border-b-2 border-gray-700'>
        <ul className="mx-16 flex justify-center items-center">
          <Link to={`/`}>
            <li className='mx-4 text-2xl'>Crypto Track</li>
          </Link>
          <Link to={`/`}>
            <li className='mx-4 text-xl'>Home</li>
          </Link>
        </ul>
        <div className="nav-right">
                <select onChange={currencyHandler} className="mr-32 px-2 py-0.5 text-xl cursor-pointer rounded-lg bg-gray-200 border-solid border-gray-200 border-2 outline-none text-black">
                    <option className="bg-gray-800 cursor-pointer text-xl text-white" value='usd'>USD</option>
                    <option className="bg-gray-800 cursor-pointer text-xl text-white" value='eur'>EUR</option>
                    <option className="bg-gray-800 cursor-pointer text-xl text-white" value='inr'>INR</option>
                </select>
        </div>
    </div>
  ) 
}

export default Navbar
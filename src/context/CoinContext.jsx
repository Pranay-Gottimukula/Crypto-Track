import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    // Fetch the data of the coins available using currency name
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': '	CG-uWEY5LLGiYpxUbrqKpKnaosp'
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }

    // Fetches coins data whenever currency is changed or page is mounted
    useEffect(() => {
        fetchAllCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const contextValue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        // Exporting context of coin data
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
};

CoinContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CoinContextProvider;
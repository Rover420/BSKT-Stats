import styles from '../../styles/Main.module.css';
import { useMoralis, useApiContract } from 'react-moralis';
import { useState, useEffect } from 'react';
import TokenInfo from './TokenInfo';
import BasketValue from './BasketValue';
import Calculator from './Calculator';
import Burn from './Burn';
import Staking from './Staking';
import Links from './Links';
import Footer from './Footer';
import Moralis from 'moralis';


const Main = ({ filteredCoins, ethSupply }) => {

    const [supply, setSupply] = useState('');
    const [timer, setTimer] = useState(0);

    const { isInitialized } = useMoralis();

    const {
        runContractFunction,
        data,
      } = useApiContract({
        address: "0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE",
        functionName: "totalSupply",
        abi: [{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
        chain: 'bsc',
      });

    useEffect(() => {
        runContractFunction();
        setTimeout(() => {
            setTimer(timer + 1);
        }, 30000);
    }, [isInitialized, timer]);

    useEffect(() => {
        if(data) {
            setSupply(Math.round(Moralis.Units.FromWei(data && data)))
        }
    }, [data]);

    const prices = [{"symbol": "BTC", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'btc').map(token => token.current_price)) * 10.75)},
    {"symbol": "ETH", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'eth').map(token => token.current_price)) * 300)},
    {"symbol": "USDC", "value": 245245},
    {"symbol": "DOT", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'dot').map(token => token.current_price)) * 6000)},
    {"symbol": "BSKT", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'bskt').map(token => token.current_price)) * 423736)},
    {"symbol": "YF-DAI", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'yf-dai').map(token => token.current_price)) * 42)},
    {"symbol": "SKEY", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'skey').map(token => token.current_price)) * 850000)},
    {"symbol": "FOUND", "value": 500000 * 0.04},
    {"symbol": "SNP", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'snp').map(token => token.current_price)) * 30000)},
    {"symbol": "ARI10", "value": Math.round((filteredCoins && filteredCoins.filter(ohne => ohne.symbol === 'ari10').map(token => token.current_price)) * 300000)}]

    const result = prices.reduce((total, currentValue) => total = total + currentValue.value,0);


    return ( 
        <div className={styles.MainWrapper}>
            <TokenInfo supply={supply} />
            <BasketValue 
                prices={prices}
                supply={supply}
                result={result}
                filteredCoins={filteredCoins}
            />
            <Calculator 
                supply={supply}
                price={filteredCoins.filter(token => token.symbol === 'bskt').map(ohne => ohne.current_price)} 
                result={result}
            />
            <Burn supply={supply} ethSupply={ethSupply} />
            <Staking 
                price={filteredCoins.filter(token => token.symbol === 'bskt').map(ohne => ohne.current_price)}
                eth={filteredCoins.filter(token => token.symbol === 'eth').map(ohne => ohne.current_price)} 
            />
            <Links />
            <Footer />
        </div>
     );
}
 
export default Main;


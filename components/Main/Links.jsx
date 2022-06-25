import styles from '../../styles/Main.module.css';
import Image from 'next/image';


const Links = () => {
    return ( 
        <div className={styles.links}>
            <a href="https://www.coingecko.com/en/coins/basketcoin" target='_blank'>
                <Image src='/coingecko.png' width={30} height={30} />
                <span>CoinGecko</span>
            </a>
            <a href="https://coinmarketcal.com/en/coin/basketcoin" target='_blank'>
                <Image src='/coinmarketcal.png' width={30} height={30} />
                <span>CoinMarketCal</span>
            </a>
            <a href="https://coinmarketcap.com/currencies/basketcoin/" target='_blank'>
                <Image src='/coinmarketcap.png' width={30} height={30} />
                <span>CoinMarketCap</span>
            </a>
            <a href="https://coinpaprika.com/coin/bskt-basketcoin/" target='_blank'>
                <Image src='/paprika.png' width={30} height={30} />
                <span>CoinPaprika</span>
            </a>
            <a href="https://coinsbit.io/trade/BSKT_USDT" target='_blank'>
                <Image src='/consbit.png' width={30} height={30} />
                <span>CoinsBit</span>
            </a>
            <a href="https://www.dextools.io/app/bnb/pair-explorer/0x4a48063d4d1e32aea2dfa0ca49bda9d2415b6db9" target='_blank'>
                <Image src='/dextools.svg' width={30} height={30} />
                <span>DexTools</span>
            </a>
            <a href="https://bscscan.com/token/0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE" target='_blank'>
                <Image src='/bscscan-logo.png' width={30} height={30} />
                <span>BscScan</span>
            </a>
            <a href="https://pancakeswap.finance/swap?inputCurrency=busd&outputCurrency=0x4dd1984a706e1c2c227bea67ad2f92dbde30afce" target='_blank'>
                <Image src='/pancakeswap.svg' width={30} height={30} />
                <span>PancakeSwap</span>
            </a>
        </div>
     );
}
 
export default Links;
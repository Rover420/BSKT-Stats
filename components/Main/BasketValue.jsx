import styles from '../../styles/Main.module.css';


const BasketValue = ({ result, supply, prices, filteredCoins }) => {


    return ( 
        <div className={styles.valuewrapper}>
            <h2>Basket Value</h2>
            <div className={styles.wrapper}>
                <span>TOTAL</span>
                <span>{(Math.round(result).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))} $</span>
            </div>
            <div className={styles.gridwrapper}>
                {prices && prices.map(token => (
                    <div className={styles.wrapper} key={token.symbol}>
                        <span>{token.symbol}</span>
                        <span>{(token.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $</span>
                    </div>
                ))}
            </div>
            <div className={styles.gridwrapper}>
                <div className={styles.wrapper}>
                    <span>Basket Share Value <br /> (Basket Value / Current Supply)</span>
                    <span>{supply ? supply && (result / supply).toFixed(3) : (result / 14650000).toFixed(3)} $</span>
                </div>
                <div className={styles.wrapper}>
                    <span>Value of 1 BSKT <br /> (Current Price)</span>
                    <span>{filteredCoins.filter(token => token.symbol === 'bskt') ? filteredCoins && parseFloat(filteredCoins.filter(token => token.symbol === 'bskt').map(ohne => ohne.current_price)).toFixed(3) : '0.050'} $</span>
                </div>
                <div className={styles.wrapper}>
                    <span>Basket Share Value <br /> (Basket Value / Final Supply)</span>
                    <span>{(result / 2100000).toFixed(3)} $</span>
                </div>
            </div>
        </div>
     );
}
 
export default BasketValue;

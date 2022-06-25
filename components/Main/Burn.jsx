import styles from '../../styles/Main.module.css';
import react, { useState, useEffect } from 'react';


const Burn = ({ supply, ethSupply }) => {

    const bbburnt = 920205;

    return ( 
        <>
            <h2>Burn Info</h2>
            <div className={`${styles.wrapper} ${styles.burn}`}>
                <p>
                    <span>BSKT Burnt</span>
                    {(ethSupply ? 21000000 - (supply + ethSupply) : 21000000 - supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} BSKT
                </p>
                <p>
                    <span>Percent of Total Supply Burnt</span>
                    {ethSupply ? (((21000000 - (supply + ethSupply)) / 21000000) * 100).toFixed(2) : (((21000000 - supply ) / 21000000) * 100).toFixed(2)} %
                </p>
                <p>
                    <span>Supply Burnt with Buyback & Burn</span>
                    {bbburnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} BSKT
                </p>
                <p>
                    <span>Supply Burnt with Transactions</span>
                    {(ethSupply ? (21000000 - (supply + ethSupply)) - bbburnt : (21000000 - supply) - bbburnt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} BSKT
                </p>
            </div>
        </>
     );
}
 
export default Burn;
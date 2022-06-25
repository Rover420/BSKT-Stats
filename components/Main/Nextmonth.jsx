import styles from '../../styles/Main.module.css';
import { useERC20Balances, useMoralis } from 'react-moralis';
import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';

const Nextmonth = ({ staked }) => {

    const [token, setToken] = useState();

    const { isInitialized } = useMoralis();

    const {fetchERC20Balances, data} = useERC20Balances();

    const oof = async () => {
        await fetchERC20Balances({
        params: {
          chain: 'bsc',
          address: "0x47ce1c44b4e4ef8161d1112bc81a96fca553df18"
        }
        })
    }

    useEffect(() => {
        oof();
    }, [isInitialized]);

    useEffect(() => {
        try {
            if(data && !token) {
                setToken(Math.round(parseFloat(Moralis.Units.FromWei(data[1].balance)*0.67)))
            }
        } catch (err) {
            console.log(err);
        }
        
    }, [data])


    return ( 
        <div className={styles.gridwrapper}>
            <div className={styles.wrapper}>
                <span>Next Month Reward Pool</span>
                <span>{token ? token.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '-'} BSKT</span>
            </div>
            <div className={styles.wrapper}>
                <span>Next Month APR</span>
                <span>{token ? (token / staked * 12 * 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '-'} %</span>
            </div>
        </div>
    );
}
 
export default Nextmonth;
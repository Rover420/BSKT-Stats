import styles from '../../styles/Main.module.css';
import { useApiContract, useMoralis } from 'react-moralis';
import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';

const Staked = ({ price, eth }) => {

    const { isInitialized, isAuthenticated, user } = useMoralis(); 

    const [addr, setAddr] = useState(null);

    const [value, setValue] = useState(null);

    const {
      runContractFunction,
      data
    } = useApiContract({
      address: "0xE0C255a5D89b6D9fedb5C4e43c11341a072e3bcc",
      functionName: "balanceOf",
      abi: [{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],
      chain: 'bsc',
      params: { account: addr }
    });

    useEffect(() => {
      if(isAuthenticated && !addr) {
        setAddr(user.get('ethAddress'))
      } else {
        setAddr();
      }
    }, [isAuthenticated])

      useEffect(() => {
        if(addr && !value) runContractFunction({
          onSuccess: (res) => setValue(parseFloat(Moralis.Units.FromWei(res)).toFixed(2)),
          onError: (err) => console.log(err),
        })
      }, [addr])

      useEffect(() => {
        if(!isAuthenticated) {
          setValue();
        }
      }, [isAuthenticated])

    return ( 
        <div className={styles.gridwrapper}>
            <div className={styles.wrapper}>
                <span>Current Staked BSKT Amount</span>
                <span>{value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' BSKT' : '-'}</span>
            </div>
            <div className={styles.wrapper}>
                <span>Current Staked BSKT Value ($)</span>
                <span>{value ? (value*price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' $' : '-'}</span>
            </div>
            <div className={styles.wrapper}>
                <span>Current Staked BSKT Value (ETH)</span>
                <span>{value ? (value * price / eth).toFixed(6) + ' ETH' : '-'}</span>
            </div>
        </div>
    );
}
 
export default Staked;
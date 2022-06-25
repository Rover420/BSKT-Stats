import styles from '../../styles/Main.module.css';
import { useMoralis, useApiContract } from 'react-moralis';
import { useState, useEffect } from 'react';
import Moralis from 'moralis';
import Nextmonth from './Nextmonth';
import Staked from './Staked';


const Staking = ({ price, eth }) => {

    const [staked, setStaked] = useState();

    const reward = 30000;
    const percent = reward / staked * 12 * 100;

    const { isInitialized } = useMoralis();

    const {
        runContractFunction,
        data,
    } = useApiContract({
        address: "0xE0C255a5D89b6D9fedb5C4e43c11341a072e3bcc",
        functionName: "totalSupply",
        abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],
        chain: 'bsc',
    });

    useEffect(() => {
        if(data && !staked) {
            setStaked(parseFloat(Moralis.Units.FromWei(data && data)).toFixed(2));
        }
    }, [data])

    useEffect(() => {
        runContractFunction();
    }, [isInitialized])

    return ( 
        <>
            <h2>Staking Info</h2>
            <div className={styles.valuewrapper}>
                <div className={styles.gridwrapper}>
                    <div className={styles.wrapper}>
                        <span>Current Month Reward Pool</span>
                        <span>{reward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} BSKT</span>
                    </div>
                    <div className={styles.wrapper}>     
                        <span>Current Month APR</span>
                        <span>{percent.toFixed(2)} %</span>
                    </div>
                </div>
                <Nextmonth staked={staked} />
                <Staked price={price} eth={eth} />
            </div>
        </>
     );
}
 
export default Staking;
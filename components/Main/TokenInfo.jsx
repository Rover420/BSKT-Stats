import styles from '../../styles/Main.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const TokenInfo = ({ supply }) => {

    const [current, setCurrent] = useState('');

    const AddToken = async () => {
        try {
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: '0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE',
                    symbol: 'BSKT',
                    decimals: 18,
                    image: 'https://basketcoin.io/images/media-pack/BasketCoin_logo_light-300x300_wbg.png',
                  },
                },
              });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(`${supply}` && `${supply}`.length == 8) {
            setCurrent(`${supply}` && `${supply}`.slice(0, 2) + ' ' + `${supply}`.slice(2, 5) + ' ' + `${supply}`.slice(5, 8));
        } else {
            if(`${supply}` && `${supply}`.length == 7) {
                setCurrent(`${supply}` && `${supply}`.slice(0, 1) + ' ' + `${supply}`.slice(1, 4) + ' ' + `${supply}`.slice(4, 7));
            }
        }
    }, [supply]);

    return ( 
        <>
            <h2>Token Info</h2>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <p>
                        <span>Token Standard</span>
                        BEP20
                    </p>
                    <p>
                        <span>Token Ticker</span>
                        BSKT
                    </p>
                    <p>
                        <span>Token Address</span>
                        <span className={styles.link}>
                            <a className={styles.tokenaddr} href="https://bscscan.com/address/0x4dd1984a706e1c2c227bea67ad2f92dbde30afce" target='_blank'>
                            0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE
                            </a>
                            <Image src='/link.svg' width={45} height={45} />
                        </span>
                        <button onClick={AddToken}>
                            <Image src='/metamask.svg' alt='MetaMask' height={33} width={33} />
                            Add BSKT Token
                        </button>
                    </p>
                </div>
                <div className={styles.container}>
                    <p>
                        <span>Initial Supply</span>
                        21 000 000
                    </p>
                    <Image src='/arrowdown.svg' width={20} height={20} />
                    <p>
                        <span>Current Supply</span>
                        {current ? current : 0}
                    </p>
                    <Image src='/arrowdown.svg' width={20} height={20} />
                    <p>
                        <span>Final supply</span>
                        2 100 000
                    </p>
                </div>
                <p className={styles.container}>
                    <span>Transaction Fee Breakdown</span>
                    2.5% BSKT Transfer Fee
                    <br />
                    =
                    <br />
                    1% Staking Reward
                    <br />
                    +
                    <br />
                    1% Burn
                    <br />
                    +
                    <br />
                    0.5% Liquidity Funds
                </p>
            </div>
        </>
     );
}
 
export default TokenInfo;
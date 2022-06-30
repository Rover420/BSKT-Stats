import styles from '../../styles/Main.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useChain, useMoralis } from 'react-moralis';

const TokenInfo = ({ supply, ethSupply }) => {

    const [slide, setSlide] = useState();
    const [addr, setAddr] = useState();
    const [check, setCheck] = useState();

    const { switchNetwork, chainId } = useChain();
    const { isInitialized, isWeb3Enabled } = useMoralis();

    const checkBSC = () => {
        if(isInitialized && isWeb3Enabled) {
            if(chainId && chainId === '0x38') {
                AddToken();
            } else {
                setCheck('BSC');
            }
        }
    }

    const checkEth = () => {
        if(isInitialized && isWeb3Enabled) {
            if(chainId && chainId === '0x1') {
                AddToken();
            } else {
                setCheck('ETH');
            }
        }
    }

    const handleSwitch = () => {
        if(isInitialized && isWeb3Enabled ) {
            if(check && check === 'ETH') {
                switchNetwork("0x1")
            } else {
                switchNetwork("0x38")
            }
            setTimeout(() => {
                setCheck('hide');
            }, 100);
        }
    }

    const AddToken = async () => {
        try {
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: addr,
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
        if(chainId && chainId === '0x1') {
            setAddr('0xC03841B5135600312707d39Eb2aF0D2aD5d51A91');
        } else {
            setAddr('0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE');
        }
    }, [chainId])

    return ( 
        <>
            <h2>Token Info</h2>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <p>
                        <span>Initial Supply</span>
                        21 000 000
                    </p>
                    <Image src='/arrowdown.svg' width={20} height={20} />
                    <p>
                        <span>Current Supply</span>
                        {supply && ethSupply ? (supply + ethSupply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : supply ? supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ethSupply ? ethSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : 0}
                    </p>
                    <Image src='/arrowdown.svg' width={20} height={20} />
                    <p>
                        <span>Final Supply</span>
                        2 100 000
                    </p>
                </div>
                <div className={styles.container}>
                    <button className={`${styles.arrow} ${styles.left}`} onClick={() => setSlide(false)}><Image src='/arrowdown.svg' width={35} height={35} /></button>
                    <button className={`${styles.arrow} ${styles.right}`} onClick={() => setSlide(true)}><Image src='/arrowdown.svg' width={35} height={35} /></button>
                    <div className={`${styles.slider} ${slide ? styles.slide : ''}`}>
                        <div className={styles.card}>
                            <p>
                                <span>Token Standard</span>
                                BEP20
                            </p>
                            <p>
                                <span>Token Ticker</span>
                                BSKT
                            </p>
                            <p>
                                <span>Current Supply</span>
                                {supply ? supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' : 0}
                            </p>
                            <p>
                                <span>Token Address</span>
                                <span className={styles.link}>
                                    <a className={styles.tokenaddr} href="https://bscscan.com/address/0x4dd1984a706e1c2c227bea67ad2f92dbde30afce" target='_blank'>
                                    0x4Dd1984a706E1c2C227bea67AD2F92dbdE30AfCE
                                    </a>
                                    <Image src='/link.svg' width={40} height={40} layout="fixed" />
                                </span>
                                <button onClick={checkBSC}>
                                    <Image src='/metamask.svg' alt='MetaMask' height={33} width={33} />
                                    Add BSKT Token
                                </button>
                            </p>
                        </div>
                        <div className={styles.card} style={!slide ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                            <p>
                                <span>Token Standard</span>
                                ERC20
                            </p>
                            <p>
                                <span>Token Ticker</span>
                                BSKT
                            </p>
                            <p>
                                <span>Current Supply</span>
                                {ethSupply ? ethSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' : 0}
                            </p>
                            <p>
                                <span>Token Address</span>
                                <span className={styles.link}>
                                    <a className={styles.tokenaddr} href="https://etherscan.io/token/0xc03841b5135600312707d39eb2af0d2ad5d51a91" target='_blank'>
                                    0xC03841B5135600312707d39Eb2aF0D2aD5d51A91
                                    </a>
                                    <Image src='/link.svg' width={40} height={40} layout="fixed" />
                                </span>
                                <button onClick={checkEth}>
                                    <Image src='/metamask.svg' alt='MetaMask' height={33} width={33} />
                                    Add BSKT Token
                                </button>
                            </p>
                        </div>
                    </div>
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
            {check && isWeb3Enabled ? 
            <div className={`${styles.error} ${styles.wrapper} ${check && check !== 'hide' ? styles.show : check === 'hide' ? styles.hide : ''}`}>
                <span className={styles.close} onClick={() => setCheck('hide')}>x</span>
                <p>Make sure that your MetaMask is connected to the right network</p>
                <button onClick={handleSwitch} className='btn'>Switch</button>
            </div> : ''}
        </>
     );
}
 
export default TokenInfo;

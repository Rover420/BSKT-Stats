import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';


const Navbar = () => {

    const { isAuthenticated, authenticate, isWeb3Enabled, isInitialized, logout, user } = useMoralis();

    const [check, setCheck] = useState(false);
    const [addr, setAddr] = useState();

    useEffect(() => {
        if (typeof window.ethereum !== "undefined" || (typeof window.web3 !== "undefined")) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    }, []);

    useEffect(() => {
        if(!isWeb3Enabled) {
            handleLogout();
        }
    }, [isWeb3Enabled, isInitialized])

    const handleAuth = async () => {
        await authenticate({signingMessage: "Welcome to BasketCoin statistics! :>"});
        await Moralis.enableWeb3();
    }

    const handleLogout = async () => {
        if(isInitialized) {
            await logout();
            await Moralis.User.logOut();
        }
    }

    useEffect(() => {
        if(isAuthenticated){
            const fulladdr = user.get('ethAddress');
            const lngth = fulladdr.length;
            setAddr(fulladdr.slice(0, 6) + '...' + fulladdr.slice(lngth-4, lngth));
        } else {
            setAddr();
        }
    }, [isAuthenticated])

    return ( 
        <nav className={styles.navb}>
            <div className={styles.logowrapper}>
                <a className={styles.alink} href="https://basketcoin.io">
                    <Image className={styles.logo} src={'/logo.png'} width='204' height='43' />
                </a>
                <span className={styles.text}>Stats</span>
            </div>
            <div className={styles.loginwrapper}>
                {!check ? 
                <a className={`${styles.login} ${styles.install}`} href='https://metamask.io' target="_blank">CLICK TO INSTALL METAMASK</a> : 
                !isAuthenticated ? <button className={styles.login} onClick={handleAuth}>CONNECT</button> :
                <div className={styles.useraddr} onClick={handleLogout}>{addr}</div>}
            </div>
        </nav>
     );
}
 
export default Navbar;
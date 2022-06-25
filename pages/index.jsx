import Head from 'next/head';
import { useMoralis, useApiContract } from 'react-moralis';
import Moralis from 'moralis';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Main from '../components/Main/Main';


export default function Home({ filteredCoins }) {

  const [ethSupply, setEthSupply] = useState('');
  const [timer, setTimer] = useState(0);

  const { isInitialized } = useMoralis();

  const {
    runContractFunction,
    data
  } = useApiContract({
    address: "0xC03841B5135600312707d39Eb2aF0D2aD5d51A91",
    functionName: "totalSupply",
    abi: [{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    chain: 'eth',
  });

  useEffect(() => {
      setTimeout(() => {
        runContractFunction();
      }, 5000);
  }, [isInitialized]);

  useEffect(() => {
    if(data) {
        setEthSupply(Math.round(Moralis.Units.FromWei(data && data)))
    }
}, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>BasketCoin statistics</title>
        <meta name="description" content="BasketCoin Statistics" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta charSet="utf-8" />
      </Head>

      <Navbar />

      <Main filteredCoins={filteredCoins} ethSupply={ethSupply} />

    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20polkadot%2C%20yfdai-finance%2C%20basketcoin%2C%20skey-network%2C%20synapse-network%2C%20ari10&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  const filteredCoins = await res.json();

  if (!filteredCoins) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  return {
    props: { filteredCoins },
    revalidate: 30,
  };
}
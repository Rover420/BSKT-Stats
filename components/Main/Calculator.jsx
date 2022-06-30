import styles from '../../styles/Main.module.css';
import react, { useState, useEffect } from 'react';


const Calculator = ({ price, supply, result }) => {

    const [amountValue, setAmountValue] = useState(10000);
    const [priceinp, setPriceinp] = useState(parseFloat(price).toFixed(5));
    const [total, setTotal] = useState(supply);

    const handleSupply = (e) => {
        setTotal(e.target.value);
    }

    const handlePrice = (e) => {
        setPriceinp(e.target.value);
    }

    const handleValue = (e) => {
        setAmountValue(e.target.value);
    }

    useEffect(() => {
        if(supply) {
            setTotal(supply);
        } else {
            setTotal(14650000)
        }
    }, [supply])

    return ( 
        <>
            <h2>Basket Value Calculator</h2>
            <div className={`${styles.wrapper} ${styles.calculator}`}>

                <label htmlFor="amount">BSKT Amount</label>
                <input className={styles.inp} value={amountValue} max={total} onChange={handleValue} type="number" name="amount" id="amount" />
                
                <label htmlFor="inpvalue" >BSKT Value ($)</label>
                <input className={styles.inp} value={(priceinp * amountValue).toFixed(2)} type="number" name="inpvalue" id="inpvalue" readOnly />
                
                <label htmlFor="share" >Basket Value Share ($)</label>
                <input className={styles.inp} value={((amountValue / total) * result).toFixed(2)} type="number" name="share" id="share" readOnly />
                
                <label htmlFor="shareper" >Basket Value Share (%)</label>
                <input className={styles.inp} value={(amountValue / total).toFixed(8)} type="number" name="shareper" id="shareper" readOnly />
                
                
                <label htmlFor="price" >BSKT Price ($)</label>
                
                <div className={styles.rangewrapper}>
                    
                    <input className={styles.range} type="range" value={priceinp} onChange={handlePrice} min='0' max='2' step='0.001' name="price" id="price" />
                    <input className={styles.number} type="number" value={priceinp} onChange={handlePrice} name="pricenum" id="pricenum" />
                
                </div>
                
                
                <label htmlFor="total" >BSKT Total Supply</label>
                
                <div className={styles.rangewrapper}>
                    
                    <input className={styles.range} type="range" value={total ? total : 2110000} onChange={handleSupply} min='2100000' max={supply ? supply : 14650000} name="total" id="total" />
                    <input className={styles.number} type="number" value={total ? total : 2110000} onChange={handleSupply} min='2100000' max={supply ? supply : 14650000} name="totalnum" id="totalnum" />
                
                </div>
                
                <p>Given estimates shall be considered as indicative value only. Values are provided by third-party entity and might differ slightly from actual data.</p>
            
            </div>
        </>
     );
}
 
export default Calculator;

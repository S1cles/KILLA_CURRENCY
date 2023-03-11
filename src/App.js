import { useEffect, useState } from 'react';
import './App.css';
import InputCurrency from './components/InputCurrency';
import axios from 'axios';
// import { response } from 'express';




function App() {
  const [rates, setRates] = useState([]);
  const [dateRates , setDateRates] =useState('')

  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [quantity3, setQuantity3] = useState(1);

  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('UAH');
  const [currency3, setCurrency3] = useState('PLN');


  const handleQuan1 = (quantity1) => {
    setQuantity2(cutNum(quantity1 * rates[currency2] / rates[currency1]))
    setQuantity3(cutNum(quantity1 * rates[currency3] / rates[currency1]))
    setQuantity1(quantity1)
  }
  const handleCurr1 = (currency1) => {
    setQuantity2(cutNum(quantity1 * rates[currency2] / rates[currency1]))
    setQuantity3(cutNum(quantity1 * rates[currency3] / rates[currency1]))
    setCurrency1(currency1)
  }

  const handleQuan2 = (quantity2) => {
    setQuantity1(cutNum(quantity2 * rates[currency1] / rates[currency2]))
    setQuantity3(cutNum(quantity2 * rates[currency3] / rates[currency2]))
    setQuantity2(quantity2)
  }
  const handleCurr2 = (currency2) => {
    setQuantity1(cutNum(quantity2 * rates[currency1] / rates[currency2]))
    setQuantity3(cutNum(quantity2 * rates[currency3] / rates[currency2]))
    setCurrency2(currency2)
  }

  const handleQuan3 = (quantity3) => {
    setQuantity1(cutNum(quantity3 * rates[currency1] / rates[currency3]))
    setQuantity2(cutNum(quantity3 * rates[currency2] / rates[currency3]))
    setQuantity3(quantity3)
  }
  const handleCurr3 = (currency3) => {
    setQuantity1(cutNum(quantity3 * rates[currency1] / rates[currency3]))
    setQuantity2(cutNum(quantity3 * rates[currency2] / rates[currency3]))
    setCurrency3(currency3)
  }


const cutNum = (num) =>{
  return num.toFixed(3)
}



  useEffect(() => {
    axios.get('https://api.exchangerate.host/latest')
      .then(response => {
        setRates(response.data.rates)
        setDateRates(response.data.date)
      })
  },[]);

  useEffect(()=>{
    if(!!rates){
      const init =()=> handleQuan1(1);
      init()
    }
  }, [ rates ])



  // useEffect(()=>{
  //   axios.get('https://api.freecurrencyapi.com/v1/status?apikey=iXsawZKVBpLT6WbyD8jrEBNqKPtxXEdQtAzt7oWD')
  //   .then(response=>{
  //     setStatus(response.data.quotas.month.remaining)
  //   })
  // }, [])

  return (
    <div className="App">
      <img width={100} src="/LOGO.png" alt="" />
      <header className="App-header">
        <InputCurrency
          quantityChange={handleQuan1}
          currencyChange={handleCurr1}
          quantity={quantity1}
          currencies={Object.keys(rates)}
          currency={currency1}
        />
        <InputCurrency
          quantityChange={handleQuan2}
          currencyChange={handleCurr2}
          quantity={quantity2}
          currencies={Object.keys(rates)}
          currency={currency2}
        />
        <InputCurrency
          quantityChange={handleQuan3}
          currencyChange={handleCurr3}
          quantity={quantity3}
          currencies={Object.keys(rates)}
          currency={currency3}
        />
        <h6>{`Rates refreshed: ${dateRates}`}</h6>
      </header>
    </div>
  );
}

export default App;

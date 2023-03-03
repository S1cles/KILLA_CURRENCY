import React from "react";
import PropTypes from 'prop-types'

const InputCurrency = (props) => {
  function moveCursorToEnd(el) {
    el.selectionStart = el.selectionEnd = el.value.length;
  }
  return (
    <div className="customInput">
      <select value={props.currency} onChange={e=>props.currencyChange(e.target.value)}>
        {props.currencies.map((currency => (
          <option value={currency}>
            {currency}
          </option>
        )))}
      </select>
      <input type='tel' onFocus={e => e.target.value = null} value={props.quantity} onChange={e=>{props.quantityChange(e.target.value);moveCursorToEnd(e.target);}} />
      
    </div>
  );
};

InputCurrency.propTypes={
currencyQuantity: PropTypes.number.isRequired,
currency: PropTypes.string.isRequired,
currencies: PropTypes.array,
currencyChange:PropTypes.func,
quantityChange:PropTypes.func
}

export default InputCurrency;

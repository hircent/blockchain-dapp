import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const buyRef = useRef(null);
  const sellRef = useRef(null);

  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const exchange = useSelector((state) => state.exchange.contract);

  const tokens = useSelector((state) => state.tokens.contracts);
  const symbols = useSelector((state) => state.tokens.symbols);
  const tokenBalances = useSelector((state) => state.tokens.balances);

  const tabHandler = (e) => {
    if (e.target.className !== buyRef.current.className) {
      e.target.className = "tab tab--active";
      buyRef.current.className = "tab";
      setIsBuy(false);
    } else {
      e.target.className = "tab tab--active";
      sellRef.current.className = "tab";
      setIsBuy(true);
    }
  };

  const buyHandler = (e) => {
    e.preventDefault();
    console.log(`Buy ${amount} units with price ${price}`);
  };

  const sellHandler = (e) => {
    e.preventDefault();
    console.log(`Sell ${amount} units with price ${price}`);
  };

  return (
    <div className="component exchange__orders">
      <div className="component__header flex-between">
        <h2>New Order</h2>
        <div className="tabs">
          <button onClick={tabHandler} ref={buyRef} className="tab tab--active">
            Buy
          </button>
          <button onClick={tabHandler} ref={sellRef} className="tab">
            Sell
          </button>
        </div>
      </div>

      <form
        onSubmit={
          isBuy
            ? (e) => {
                buyHandler(e);
              }
            : (e) => sellHandler(e)
        }
      >
        {isBuy ? (
          <label htmlFor="amount">Buy Amount</label>
        ) : (
          <label htmlFor="amount">Sell Amount</label>
        )}
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
          id="amount"
          value={amount === 0 ? "" : amount}
          placeholder="0.0000"
        />
        {isBuy ? (
          <label htmlFor="price">Buy Price</label>
        ) : (
          <label htmlFor="price">Sell Price</label>
        )}
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="text"
          id="price"
          value={price === 0 ? "" : price}
          placeholder="0.0000"
        />

        <button className="button button--filled" type="submit">
          {isBuy ? <span>Buy Order</span> : <span>Sell Order</span>}
        </button>
      </form>
    </div>
  );
};

export default Order;

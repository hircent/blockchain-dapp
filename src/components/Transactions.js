import { useSelector } from "react-redux";
import { myOpenOrderSelector } from "../store/selector.js";
import Banner from "./Banner";
import sort from "../assets/sort.svg";

const Transactions = () => {
  const myOpenOrders = useSelector(myOpenOrderSelector);
  const symbols = useSelector((state) => state.tokens.symbols);

  console.log({ opens: myOpenOrders });
  return (
    <div className="component exchange__transactions">
      <div>
        <div className="component__header flex-between">
          <h2>My Orders</h2>

          <div className="tabs">
            <button className="tab tab--active">Orders</button>
            <button className="tab">Trades</button>
          </div>
        </div>

        {!myOpenOrders || myOpenOrders.length === 0 ? (
          <Banner text={`No Open Order...`} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  {symbols && symbols[0]}
                  <img src={sort} alt="Sort" />
                </th>
                <th>
                  {symbols && symbols[0]}/{symbols && symbols[1]}
                  <img src={sort} alt="Sort" />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOpenOrders &&
                myOpenOrders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order.token0Amount}</td>
                      <td style={{ color: order.orderTypeClass }}>
                        {order.tokenPrice}
                      </td>
                      <td>button</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      {/* <div> */}
      {/* <div className='component__header flex-between'> */}
      {/* <h2>My Transactions</h2> */}

      {/* <div className='tabs'> */}
      {/* <button className='tab tab--active'>Orders</button> */}
      {/* <button className='tab'>Trades</button> */}
      {/* </div> */}
      {/* </div> */}

      {/* <table> */}
      {/* <thead> */}
      {/* <tr> */}
      {/* <th></th> */}
      {/* <th></th> */}
      {/* <th></th> */}
      {/* </tr> */}
      {/* </thead> */}
      {/* <tbody> */}

      {/* <tr> */}
      {/* <td></td> */}
      {/* <td></td> */}
      {/* <td></td> */}
      {/* </tr> */}

      {/* </tbody> */}
      {/* </table> */}

      {/* </div> */}
    </div>
  );
};

export default Transactions;

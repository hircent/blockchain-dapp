import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { myEventSelector } from "../store/selector.js";
import config from "../config.json";

const Alert = () => {
  const alertRef = useRef(null);
  const events = useSelector(myEventSelector);
  const network = useSelector((state) => state.provider.chainId);
  const isPending = useSelector(
    (state) => state.exchange.transaction.isPending
  );
  const isError = useSelector((state) => state.exchange.transaction.isError);

  const account = useSelector((state) => state.provider.account);

  useEffect(() => {
    if ((events[0] || isPending || isError) && account) {
      alertRef.current.className = "alert";
    }
  }, [events, isPending, isError, account]);

  const removeHandler = async () => {
    alertRef.current.className = "";
  };

  return (
    <div>
      {isPending ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Pending...</h1>
        </div>
      ) : !isPending && events[0] ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Successful</h1>
          <a
            href={
              config[network]
                ? `${config[network].explorerURL}/tx/${events[0].transactionHash}`
                : "#"
            }
            target="_blank"
            rel="noreferrer"
          >
            {events[0].transactionHash.slice(0, 6) +
              "..." +
              events[0].transactionHash.slice(60, 66)}
          </a>
        </div>
      ) : isError ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Will Fail</h1>
        </div>
      ) : (
        <div className="alert alert--remove"></div>
      )}
    </div>
  );
};

export default Alert;

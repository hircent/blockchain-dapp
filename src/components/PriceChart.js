import { useSelector } from "react-redux";
import Banner from "./Banner";
import Chart from "react-apexcharts";
import { options, series } from "./PriceChart.config";

const PriceChart = () => {
  const account = useSelector((state) => state.provider.account);
  const symbols = useSelector((state) => state.tokens.symbols);

  return (
    <div className="component exchange__chart">
      <div className="component__header flex-between">
        <div className="flex">
          <h2>{symbols && `${symbols[0]}/${symbols[1]}`}</h2>

          <div className="flex">
            {/* <img src="" alt="Arrow down" /> */}
            <span className="up"></span>
          </div>
        </div>
      </div>

      {!account ? (
        <Banner text={`Please connect to Metamask`} />
      ) : (
        <Chart
          type="candlestick"
          options={options}
          series={series}
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default PriceChart;

import React, { Fragment } from "react";
import LineChart from "recharts/es6/chart/LineChart";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import Line from "recharts/es6/cartesian/Line";

import Modal from "../../components/UI/modal/Modal";
import Backdrop from "../../components/UI/backdrop/Backdrop";
import classes from "./lnChart.module.scss";

const LnChart = (props) => {
  const chartData = [];

  let YAxisLeftName = "";
  let YAxisRightName = "";

  if (props.name === "Weight/Calories") {
    YAxisLeftName = "Weight";
    YAxisRightName = "Calories";
    props.data.forEach((el) => {
      const words = el.result.split(" ");
      chartData.push({
        name: `${el.date}`,
        Weight: parseFloat(words[0]),
        Calories: parseFloat(words[2]),
      });
    });
  } else {
    YAxisLeftName = props.name;
    props.data.forEach((el) => {
      chartData.push({
        name: `${el.date}`,
        [props.name]: parseFloat(el.result),
      });
    });
  }

  const chart =
    chartData.length > 1 ? (
      <ResponsiveContainer width="100%" height="50%" className={classes.chart}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickMargin={8} />
          <YAxis dataKey={YAxisLeftName} yAxisId="left" tickMargin={8} domain={["auto", "auto"]} />
          <Tooltip dataKey={YAxisLeftName} />
          <Line type="linear" yAxisId="left" dataKey={YAxisLeftName} stroke="#42ca9d" strokeWidth={2} />
          <YAxis dataKey={YAxisRightName} yAxisId="right" orientation="right" tickMargin={8} domain={["auto", "auto"]} />
          <Tooltip dataKey={YAxisRightName} />
          <Line type="linear" yAxisId="right" dataKey={YAxisRightName} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <p className={classes.noChartInfo}>You need to pass more than one result to see charts.</p>
    );
  return (
    <div>
      <Fragment>
        <Backdrop onClick={props.backdropClick} />
        <Modal>
          <div className={classes.chartContainer}>
            <h1 className={classes.resultName}>{props.name}</h1>
            {chart}
          </div>
        </Modal>
      </Fragment>
    </div>
  );
};

export default LnChart;

import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
	const { day, week, year } = chartData;

	const [dateFormat, setDateFormat] = useState("24h");

	const getDataByTimeFormat = () => {
		switch (dateFormat) {
			case "24h":
				return day;
				break;
			case "7d":
				return week;
				break;
			case "1y":
				return year;
				break;
			default:
				return day;
		}
	};

	const options = {
		title: {
			text: symbol,
			align: "center",
			style: { fontSize: "24px" },
		},
		chart: {
			id: "stock data",
			animations: {
				speed: 1300,
			},
		},
		xaxis: {
			type: "datetime",
			labels: {
				datetimeUTC: false,
			},
		},
		tooltip: {
			x: {
				format: "MMM dd HH:mm",
			},
		},
	};

	const series = [
		{
			name: symbol,
			data: getDataByTimeFormat(),
		},
	];

	return (
		<section
			style={{ width: "100%" }}
			className="mt-5 p-4 shadow-sn bg-white"
		>
			<Chart options={options} series={series} type="area" width="100%" />
			<div>
				<button onClick={() => setDateFormat("24h")}>24h</button>
				<button onClick={() => setDateFormat("7d")}>7d</button>
				<button onClick={() => setDateFormat("1y")}>1y</button>
			</div>
		</section>
	);
};

export default StockChart;

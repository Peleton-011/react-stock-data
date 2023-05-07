import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol, getToggle, type}) => {
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

	const chartColor = (data) => {
		const firstPrice = data[0].y;
		const lastPrice = data[data.length - 1].y;

		const isUpward = firstPrice < lastPrice;

		return isUpward ? "#26C281" : "#ed3419";
	};

	const options = {
		colors: [chartColor(getDataByTimeFormat())],
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

	const getButton = (val) => (
		<button
			key={val}
			className={"btn m-1 " + renderButtonSelect(val)}
			onClick={() => setDateFormat(val)}
		>
			{val}
		</button>
	);

	const renderButtonSelect = (button) => {
		if (button === dateFormat) {
			return "btn-primary";
		}
		return "btn-outline-primary";
	};

	return (
		<section
			style={{ width: "100%", height: "80%" }}
			className="mt-5 p-4 shadow-sn bg-white"
		>
			<Chart
				options={options}
				series={series}
				type={type}
				width="100%"
				height="80%"
				style={{ height: "80vh" }}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div>
					{["24h", "7d", "1y"].map((val) => {
						return getButton(val);
					})}
				</div>
				{getToggle()}
			</div>
		</section>
	);
};

export default StockChart;

import React from "react";

import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
	const { day, week, year } = chartData;

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
			data: day,
		},
	];

	return (
		<section
			style={{ width: "100%" }}
			className="mt-5 p-4 shadow-sn bg-white"
		>
			<Chart options={options} series={series} type="area" width="100%" />
		</section>
	);
};

export default StockChart;

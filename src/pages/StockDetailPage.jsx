import React from "react";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import finnHub from "../apis/finnHub";
import StockChart from "../components/StockChart";

const StockDetailPage = () => {
	const { symbol } = useParams();
	const [chartData, setChartData] = useState();

	const formatData = (data) => {
		const prices = data.c;
		const timestamps = data.t;

		const result = prices.map((price, index) => {
			return {
				x: timestamps[index] * 1000,
				y: Math.floor(price * 100) / 100,
			};
		});
		return result;
	};

	useEffect(() => {
		const fetchData = async () => {
			const date = new Date();
			//API needs it in seconds, getTime returns milliseconds
			let currTime = Math.floor(date.getTime() / 1000);
			const dayInSeconds = 60 * 60 * 24;
			const weekInSeconds = 7 * dayInSeconds;
			const yearInSeconds = 365 * dayInSeconds;

			switch (date.getDay()) {
				case 0:
					currTime -= 2 * dayInSeconds;
					break;
				case 6:
					currTime -= dayInSeconds;
					break;
				default:
					break;
			}

			const getRes = async (span, res) => {
				return finnHub.get("/stock/candle", {
					params: {
						symbol: symbol,
						from: currTime - span,
						to: currTime,
						resolution: res,
					},
				});
			};
			try {
				const responses = await Promise.all([
					getRes(dayInSeconds, 30),
					getRes(weekInSeconds, 60),
					getRes(yearInSeconds, "W"), //(use "D" for daily datapoints)
				]);

				const [day, week, year] = responses.map((res) =>
					formatData(res.data)
				);

				setChartData({
					day,
					week,
					year,
				});
			} catch (error) {
				console.warn(error.message);
			}
		};
		fetchData();
	}, [symbol]);

	return (
		<div style={{ width: "100%" }}>
			{chartData && <StockChart symbol={symbol} chartData={chartData} />}
		</div>
	);
};

export default StockDetailPage;

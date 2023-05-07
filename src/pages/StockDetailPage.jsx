import React from "react";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import finnHub from "../apis/finnHub";
import { BsChatLeftText } from "react-icons/bs";

const StockDetailPage = () => {
	const { symbol } = useParams();
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

			const getRes = (span, res) => {
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

				console.log(responses);
			} catch (error) {
				console.warn(error.message);
			}
		};
		fetchData();
	}, []);

	return <div>stockDetailPage for {symbol}</div>;
};

export default StockDetailPage;

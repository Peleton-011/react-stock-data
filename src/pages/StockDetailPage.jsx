import React from "react";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import finnHub from "../apis/finnHub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

import Loading from "../components/Loading";

const StockDetailPage = () => {
	const { symbol } = useParams();
	const [chartAreaData, setChartAreaData] = useState();
	const [chartCandleData, setChartCandleData] = useState();
	const [isCandleStick, setIsCandleStick] = useState(false);

	const to2decimals = (number) => Math.floor(number * 100) / 100;

	const formatCandleData = (data) => {
		const timestamps = data.t;
		const closingPrices = data.c;

		const openPrices = data.o;
		const highPrices = data.h;
		const lowPrices = data.l;

		const result = timestamps.map((timestamp, index) => ({
			x: timestamp * 1000,
			y: [
				to2decimals(openPrices[index]),
				highPrices[index],
				lowPrices[index],
				to2decimals(closingPrices[index]),
			],
		}));
		return result;
	};

	const formatAreaData = (data) => {
		const timestamps = data.t;
		const closingPrices = data.c;

		const result = closingPrices.map((price, index) => ({
			x: timestamps[index] * 1000,
			y: to2decimals(price),
		}));
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
					formatAreaData(res.data)
				);

				setChartAreaData({
					day,
					week,
					year,
				});
			} catch (error) {
				console.warn(error.message);
			}
		};
		fetchData();
	}, [symbol, isCandleStick]);

	const getToggle = () => {
		return (
			<div
				style={{
					float: "right",
					display: "flex",
					alignItems: "center",
				}}
			>
				<label className="switch">
					<input
						type="checkbox"
						onChange={(e) => {
							setIsCandleStick(e.target.checked);
						}}
					/>
					<span className="slider"></span>
				</label>
				<label>Candlestick view</label>
			</div>
		);
	};

	return (
		<>
			{chartAreaData && isCandleStick ? (
				<div style={{ width: "100%" }}>
					<StockChart
						type="candlestick"
						symbol={symbol}
						chartData={chartAreaData}
						getToggle={getToggle}
					/>
					<StockData symbol={symbol} />
				</div>
			) : chartAreaData && !isCandleStick ? (
				<div style={{ width: "100%" }}>
					<StockChart
						type="area"
						symbol={symbol}
						chartData={chartAreaData}
						getToggle={getToggle}
					/>
					<StockData symbol={symbol} />
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default StockDetailPage;

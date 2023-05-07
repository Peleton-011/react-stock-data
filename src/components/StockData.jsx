import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

import Loading from "./Loading";

const StockData = ({ symbol }) => {
	const [stockData, setStockData] = useState();
	let isMounted = true;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await finnHub.get("/stock/profile2", {
					params: { symbol },
				});

				if (isMounted) setStockData(res.data);
			} catch (error) {
				console.warn(error.message);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [symbol]);

	const dataFormat = [
		[
			["Name", "name"],
			["Country", "country"],
			["Ticker", "ticker"],
		],
		[
			["Exchange", "exchange"],
			["Industry", "finnhubIndustry"],
			["IPO", "ipo"],
		],
		[
			["Market Cap", "marketCapitalization"],
			["Shares Outstanding", "shareOutstanding"],
			["URL", "weburl"],
		],
	];

	return (
		<>
			{stockData ? (
				<div className="row border bg-white rounded shadow-sm p-4 mt-5">
					{dataFormat.map((col, colIndex) => (
						<div className="col" key={colIndex}>
							{col.map((pair, rowIndex) => (
								<div key={rowIndex}>
									<span className="fw-bold">{pair[0]}:</span>
									{pair[0] === "URL" ? (
										<a
											href={stockData[pair[1]]}
											style={{ float: "right" }}
										>
											{stockData[pair[1]]}
										</a>
									) : pair[1] === "shareOutstanding" ||
									  pair[1] === "marketCapitalization" ? (
										<span style={{ float: "right" }}>
											{Math.floor(
												stockData[pair[1]] * 1000
											) / 1000}
											M
										</span>
									) : (
										<span style={{ float: "right" }}>
											{stockData[pair[1]]}
										</span>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default StockData;

import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

import Loading from "./Loading";

const StockData = ({ symbol }) => {
	const [stockData, setStockData] = useState();
	useEffect(() => {
		const fetchData = () => {
			try {
				finnHub
					.get("/stock/profile2", {
						params: { symbol },
					})
					.then((res) => {
						setStockData(res.data);
						console.log(stockData);
					});
			} catch (error) {
				console.warn(error.message);
			}
		};
		fetchData();
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
						<div
							// className="col"
							key={colIndex}
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fill, minmax(150px, 30%))",
                                justifyContent: "space-between",
							}}
						>
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

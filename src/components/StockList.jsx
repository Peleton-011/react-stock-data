import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const fetchData = async (symbol) => {
	return finnHub.get("/quote", {
		params: { symbol },
	});
};
const fetchAllData = async (symbols) => {
	try {
		const res = await Promise.all(
			symbols.map(async (symbol) => await fetchData(symbol))
		);

		const finalRes = res.map((response) => ({
			symbol: response.config.params.symbol,
			data: response.data,
		}));
		console.log(finalRes);
		return finalRes;
	} catch (error) {
		console.warn("Failed to fetch data");
		console.warn(error);
	}
};

const StockList = () => {
	const [stocks, setStocks] = useState([]);
	const [watchList, setWatchList] = useState(["MSFT", "AAPL", "AMZN"]);

	useEffect(() => {
		let isMounted = true;
		isMounted && fetchAllData(watchList).then((res) => setStocks(res));
		return () => {
			isMounted = false;
		};
	}, []);


	// fetchAllData(watchList);
	return (
		<>
			<table className="table hover mt-5">
				<thead style={{ color: "rgb(79, 89, 102)" }}>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Last</th>
						<th scope="col">Change</th>
						<th scope="col">Change%</th>
						<th scope="col">High</th>
						<th scope="col">Low</th>
						<th scope="col">Open</th>
						<th scope="col">Close</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map(({ symbol: stock, data }) => (
						<tr className="table-row" key={stock}>
							<th>{stock}</th>
							<td>{data.c}</td>
							<td className={`text-${data.d < 0 ? "danger" : "success"}`}>{data.d}</td>
							<td className={`text-${data.dp < 0 ? "danger" : "success"}`}>{data.dp}%</td>
							<td>{data.h}</td>
							<td>{data.l}</td>
							<td>{data.o}</td>
							<td>{data.pc}</td>						
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default StockList;

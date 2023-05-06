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
			<table>
				<tbody>
					{stocks.map(({ symbol: stock, data }) => (
						<tr key={stock}>
							<th>{stock}</th>
							<td>{data.c}</td>
							<td>data</td>
							<td>here!</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default StockList;

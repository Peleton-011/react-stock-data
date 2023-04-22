import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const fetchData = async (symbol) => {
	try {
		const res = await finnHub.get("/quote", {
			params: { symbol },
		});
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.warn("Failed to fetch data");
		console.warn(error);
	}
};

const StockList = () => {
	const [watchList, setWatchList] = useState(["MSFT", "AAPL", "AMZN"]);
	useEffect(() => {
		fetchData();
	}, []);
	fetchData("MSFT");
	return (
		<>
			<table>
				<tbody>
					{watchList.map((stock) => (
						<tr key={stock}>
							<th>{stock}</th>
							<td>Some</td>
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

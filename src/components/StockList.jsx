import React from "react";

import { useState, useEffect, useContext } from "react";
import { WatchListContext } from "../context/watchlistContext";
import finnHub from "../apis/finnHub";

import { useNavigate } from "react-router-dom";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const fetchData = async (symbol) => {
	// console.log("Fetching data for symbol ", symbol)

	return finnHub.get("/quote", {
		params: { symbol },
	});
};
const fetchAllData = async (symbols) => {
	try {
		const res = await Promise.all(
			symbols.map(async (symbol) => {
				try {
					const res = await fetchData(symbol);
					return res;
				} catch (error) {
					console.warn("Failed to fetch data for symbol ", symbol);
					console.log(error.message);
					alert("This ticker is unavailable at the moment");
				}
				return { error: true };
			})
		);

		const finalRes = res
			.filter((stock) => !stock.error)
			.map((response) => ({
				symbol: response.config.params.symbol,
				data: response.data,
			}));
		// console.log(JSON.stringify(finalRes, null, 2));
		return finalRes;
	} catch (error) {
		console.warn("Failed to fetch data");
		console.warn(error.message);
	}
};

const StockList = () => {
	const [stocks, setStocks] = useState([]);

	const { watchList } = useContext(WatchListContext);

	const nav = useNavigate();

	useEffect(() => {
		let isMounted = true;
		isMounted && fetchAllData(watchList).then((res) => setStocks(res));
		return () => {
			isMounted = false;
		};
	}, [watchList]);

	const setColor = (condition) =>
		condition < 0 ? "text-danger" : condition > 0 ? "text-success" : "";

	const getIcon = (condition) =>
		condition < 0 ? (
			<BsFillCaretDownFill />
		) : condition > 0 ? (
			<BsFillCaretUpFill />
		) : (
			""
		);

	const handleStockSelect = (symbol) => {
		nav(`detail/${symbol}`);
	};
	// fetchAllData(watchList);

	const getRemoveButton = () => {
		return (
			<button className="btn btn-danger btn-sn ml-3 d-inline-block delete-button">
				Delete
			</button>
		);
	};
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
						<tr
							className="table-row"
							key={stock}
							onClick={() => handleStockSelect(stock)}
							style={{ cursor: "pointer" }}
						>
							<th>{stock}</th>
							<td>{data.c}</td>
							<td className={setColor(data.d)}>
								{data.d} {getIcon(data.d)}
							</td>
							<td className={setColor(data.dp)}>
								{data.dp}% {getIcon(data.dp)}
							</td>
							<td>{data.h}</td>
							<td>{data.l}</td>
							<td>{data.o}</td>
							<td>
								{data.pc}
								{getRemoveButton()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default StockList;

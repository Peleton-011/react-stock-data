import React from "react";

import { useState, useEffect, useContext } from "react";
import { WatchListContext } from "../context/watchlistContext";
import finnHub from "../apis/finnHub";

const Autocomplete = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const { addStock } = useContext(WatchListContext);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const res = await finnHub.get("/search", {
					params: {
						q: search,
					},
				});
				if (isMounted) setResults(res.data.result);
			} catch (err) {
				console.warn("Failed to fetch query results");
				console.warn(err);
			}
		};
		if (search.length > 0) {
			fetchData();
		} else {
			setResults([]);
		}
	}, [search]);

	const getDropdown = () => (
		<ul
			className={`dropdown-menu ${search ? "show" : null}`}
			style={{
				height: "500px",
				width: "100%",
				overflowY: "scroll",
				overflowX: "hidden",
				cursor: "pointer",
			}}
		>
			{results.map((result) => (
				<li
					key={result.symbol}
					className="dropdown-item"
					onClick={() => addStock(result.symbol)}
				>
					{result.description}{" "}
					<span style={{ float: "right" }}>({result.symbol})</span>
				</li>
			))}
		</ul>
	);

	return (
		<div className="w-50% p-5 rounded mx-auto">
			<div className="form-floating dropdown">
				<input
					type="text"
					style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
					id="search"
					className="form-control"
					placeholder="Search"
					autoComplete="off"
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
				<label htmlFor="search">Search</label>
				{getDropdown()}
			</div>
		</div>
	);
};

export default Autocomplete;

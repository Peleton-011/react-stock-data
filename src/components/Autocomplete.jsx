import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const Autocomplete = () => {
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
                const res = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
			} catch (err) {
				console.warn("Failed to fetch query results");
				console.warn(err);
			}
		};
        fetchData()
	}, search);
	return (
		<div className="w-50 p-5 rounded mx-auto">
			<div className="form-floating dropdown">
				<input
					type="text"
					style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
					id="search"
					className="form-control"
					placeholder="Search"
					autoComplete="off"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<label htmlFor="search">Search</label>
				<ul className="dropdown-menu">
					<li>testStoc 1</li>
					<li>test stoc 2</li>
				</ul>
			</div>
		</div>
	);
};

export default Autocomplete;

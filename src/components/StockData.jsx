import React from "react";

import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const StockData = ({ symbol }) => {
	let isMounted = true;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await finnHub.get("/stock/profile2", {
					params: { symbol },
				});
			} catch (error) {
                console.warn(error.message);
            }
		};
		fetchData();
	}, [symbol]);
	return <div>StockData</div>;
};

export default StockData;

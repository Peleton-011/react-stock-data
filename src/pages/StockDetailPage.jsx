import React from "react";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import finnHub from "../apis/finnHub";
import { BsChatLeftText } from "react-icons/bs";

const StockDetailPage = () => {
	const { symbol } = useParams();
	useEffect(() => {
		const fetchData = async () => {
            const date = new Date();
            //API needs it in seconds, getTime returns milliseconds
            let currTime = Math.floor(date.getTime()/1000);
            let dayInSeconds = 60 * 60 * 24

            switch (date.getDay()) {
                case 0: 
                    currTime -= 2*dayInSeconds;
                    break;
                case 6: 
                    currTime -= dayInSeconds;
                    break;
                default:
                    break;
            }

			const res = await finnHub.get("/stock/candle", {
				params: { symbol: symbol, from: currTime - dayInSeconds, to: currTime, resolution: 30 },
			});

            console.log(res)
		};
		try {
			fetchData();
		} catch (error) {
			console.warn(error.message);
		}
	}, []);

	return <div>stockDetailPage for {symbol}</div>;
};

export default StockDetailPage;

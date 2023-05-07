import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
	const [watchList, setWatchList] = useState(["MSFT", "AAPL", "AMZN"]);

	const addStock = (stock) => {
		if (watchList.indexOf(stock) > -1) {
			return;
		}
		setWatchList([...watchList, stock]);
	};

	const removeStock = (stock) => {
		setWatchList(watchList.filter((curr) => curr !== stock));
	};

	return (
		<WatchListContext.Provider value={{ watchList, addStock, removeStock }}>
			{props.children}
		</WatchListContext.Provider>
	);
};

import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
	const [watchList, setWatchList] = useState(
        //null coallescing
		localStorage.getItem("watchList")?.split(",") || ["MSFT", "AAPL", "AMZN"]
	);

	useEffect(() => {
		localStorage.setItem("watchList", watchList);
	}, [watchList]);

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

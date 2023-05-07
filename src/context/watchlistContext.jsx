import { createContext, useState } from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
	const [watchList, setWatchList] = useState(["MSFT", "AAPL", "AMZN"]);

    return <WatchListContext.Provider value={{watchList}}>
        {props.children}
    </WatchListContext.Provider>
}
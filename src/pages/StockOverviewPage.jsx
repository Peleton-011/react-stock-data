import React from "react";

import Autocomplete from "../components/Autocomplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
	return (
		<div style={{marginTop: "6rem"}}>
			<Autocomplete />
			<StockList />
		</div>
	);
};

export default StockOverviewPage;

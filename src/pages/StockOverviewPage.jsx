import React from "react";

import Autocomplete from "../components/Autocomplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
	return (
		<>
			<Autocomplete />
			<div>stockOverviewPage</div>
			<StockList />
		</>
	);
};

export default StockOverviewPage;

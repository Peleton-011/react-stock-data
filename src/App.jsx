import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";

import { WatchListContextProvider } from "./context/watchlistContext";
// import './App.css'

function App() {
	const [count, setCount] = useState(0);

	return (
		<WatchListContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StockOverviewPage />} />
					<Route
						path="/detail/:symbol"
						element={<StockDetailPage />}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</WatchListContextProvider>
	);
}

export default App;

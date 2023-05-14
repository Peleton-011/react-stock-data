import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";

import Header from "./components/Header";

import { WatchListContextProvider } from "./context/watchlistContext";
// import './App.css'

function App() {

	return (
		<WatchListContextProvider>
			<main className="container" style={{ width: "80vw" }}>
				<BrowserRouter>
			<Header />
					<Routes>
						<Route path="/" element={<StockOverviewPage />} />
						<Route
							path="/detail/:symbol"
							element={<StockDetailPage />}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</main>
		</WatchListContextProvider>
	);
}

export default App;

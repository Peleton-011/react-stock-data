import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";
// import './App.css'

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StockOverviewPage />} />
					<Route
						path="/detail/:symbol"
						element={<StockDetailPage />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

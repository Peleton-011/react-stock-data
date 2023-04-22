import React from "react";

import { useState } from "react";

const StockList = () => {
	const [watchList, setWatchList] = useState(["MSFT", "AAPL", "AMZN"]);
	return (
		<>
			<table>
				<tbody>
					{watchList.map((stock) => (
						<tr key={stock}>
							<th>{stock}</th>
							<td>Some</td>
							<td>data</td>
							<td>here!</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default StockList;

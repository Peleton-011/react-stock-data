import React from "react";

import ReactAnimatedEllipsis from "react-animated-ellipsis";

const Loading = () => {
	return (
		<h4 className="section">
			Loading
			<ReactAnimatedEllipsis
				fontSize="2rem"
				marginLeft="5px"
				spacing="0.2rem"
			/>
		</h4>
	);
};

export default Loading;

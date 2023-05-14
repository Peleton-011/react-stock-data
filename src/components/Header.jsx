import React from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../assets/icone.png";

const Header = () => {
	const nav = useNavigate();
	return (
		<header
			className="mt-5"
			style={{
				cursor: "pointer",
				position: "absolute",
				top: "0",
				fontSize: "minmax(50%, 16px)",
			}}
			onClick={(e) => {
				nav("/");
			}}
		>
			<h1
				style={{
					letterSpacing: "-2px",
					fontFamily: "gill sans. sans-seriff",
					fontWeight: "600",
					color: "#0b132b",
				}}
			>
				<img src={Icon} alt="Logo" style={{ width: "6rem" }} />D
				<span
					style={{
						fontSize: "60%",
						fontWeight: "600",
						letterSpacing: "3px",
					}}
				>
					&
				</span>
				A Brokers{" "}
				<span style={{ fontSize: "60%", fontWeight: "600" }}>ltd.</span>
			</h1>
		</header>
	);
};

export default Header;

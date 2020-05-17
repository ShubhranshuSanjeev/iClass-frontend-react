import React from "react";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = () => {
	return (
		<div
			className="container-fluid vh-100 d-flex align-items-center justify-content-center"
			style={{ backgroundColor: "#46455b" }}
		>
			<Spinner type="Grid" color="#f9a826" height={80} width={80} />
		</div>
	);
};

export default Loader;

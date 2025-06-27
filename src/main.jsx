import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ToggleProvider from "./context/ToggleProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<ToggleProvider>
		<App />
	</ToggleProvider>

	// </React.StrictMode>
);

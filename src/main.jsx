import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ToggleProvider from "./context/ToggleProvider.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<ErrorBoundary
		FallbackComponent={ErrorFallback}
		onReset={() => window.location.replace("/")}>
		<ToggleProvider>
			<App />
		</ToggleProvider>
	</ErrorBoundary>

	// </React.StrictMode>
);

import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const toggleContext = createContext();

export default function ToggleProvider({ children }) {
	const [isDark, setIsDark] = useLocalStorageState(
		window.matchMedia("(prefers-color-scheme: dark)").matches,
		"isDark"
	);

	return (
		<toggleContext.Provider value={{ isDark, setIsDark }}>
			{children}
		</toggleContext.Provider>
	);
}

export function useToggle() {
	const context = useContext(toggleContext);
	if (!context)
		throw new Error("context was used outside the scope it was defined");
	return context;
}

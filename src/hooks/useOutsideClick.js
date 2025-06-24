import { useEffect, useRef } from "react";

export function useOutsideClick(callback) {
	const modal = useRef(null);
	useEffect(() => {
		function handleClick(e) {
			if (modal.current && !modal.current.contains(e.target)) {
				callback();
			}
		}
		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, [callback]);

	return { modal };
}

import { useEffect, useRef } from "react";

export function useOutsideClick(callback, listenCapturing = true) {
	const modal = useRef(null);
	useEffect(() => {
		function handleClick(e) {
			if (modal.current && !modal.current.contains(e.target)) {
				callback();
			}
		}
		document.addEventListener("click", handleClick, listenCapturing);
		return () =>
			document.removeEventListener("click", handleClick, listenCapturing);
	}, [callback, listenCapturing]);

	return { modal };
}

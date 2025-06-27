import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useToggle } from "../context/ToggleProvider";

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

export default function HeaderMenu() {
	const ref = useRef(null);
	const { setIsDark, isDark } = useToggle();

	useEffect(() => {
		function toggleTheme(e) {
			if (e.target === ref.current) {
				console.log("clicked");
				setIsDark((prev) => !prev);
			}
		}
		if (isDark) {
			document.getElementById("html").classList.remove("light-mode");
			document.getElementById("html").classList.add("dark-mode");
		} else {
			document.getElementById("html").classList.remove("dark-mode");
			document.getElementById("html").classList.add("light-mode");
		}
		document.addEventListener("click", toggleTheme);
		return () => document.removeEventListener("click", toggleTheme);
	}, [setIsDark, isDark]);
	const navigate = useNavigate();
	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<Logout />
			</li>
			<li>
				<DarkModeToggle ref={ref} />
			</li>
		</StyledHeaderMenu>
	);
}

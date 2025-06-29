import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useEffect } from "react";
import { useToggle } from "../context/ToggleProvider";

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--color-grey-50);
`;

function Login() {
	const { isDark } = useToggle();

	useEffect(() => {
		if (isDark) {
			document.getElementById("html").classList.remove("light-mode");
			document.getElementById("html").classList.add("dark-mode");
		} else {
			document.getElementById("html").classList.remove("dark-mode");
			document.getElementById("html").classList.add("light-mode");
		}
	}, [isDark]);
	return (
		<LoginLayout>
			<Logo />
			<Heading as={"h4"}>Log in to your account</Heading>
			<LoginForm />
			{/* <CabinTable /> */}
		</LoginLayout>
	);
}

export default Login;

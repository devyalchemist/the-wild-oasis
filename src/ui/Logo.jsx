import styled from "styled-components";
import { useToggle } from "../context/ToggleProvider";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo() {
	const { isDark } = useToggle();
	const src = isDark ? "/logo-dark.png" : "/logo-light.png";
	return (
		<StyledLogo>
			<Img src={src} alt="Logo" />
		</StyledLogo>
	);
}

export default Logo;

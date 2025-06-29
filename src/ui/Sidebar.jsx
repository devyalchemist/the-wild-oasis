import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// I removed the uploader component from the import an display on the sidebar
const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100s);
	grid-row: 1/-1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	/* position: absolute;
	top: 0px; */
`;
export default function Sidebar() {
	return (
		<StyledSidebar>
			<Logo /> <MainNav />
		</StyledSidebar>
	);
}

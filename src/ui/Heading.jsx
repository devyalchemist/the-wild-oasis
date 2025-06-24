import styled, { css } from "styled-components";

// const style = css`
// 	text-align: center;
// 	text-decoration: underline;
// `;
const Heading = styled.h1`
	${(s) =>
		s.type === "h1" &&
		css`
			background-color: orange;
			font-size: 30px;
			font-weight: 600;
		`}
	${(s) =>
		s.type === "h2" &&
		css`
			font-size: 25px;
			font-weight: 500;
		`}
    ${(s) =>
		s.type === "h3" &&
		css`
			font-size: 20px;
			font-weight: 400;
		`}
`;
export default Heading;

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
	height: 100dvh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;
export default function ProtectedRoute({ children }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	//1) we need to load the authenticated user

	const { user, isLoadingUser, isAuthenticated } = useUser();

	//3) if there is no authenticated user, redirect to the /login route
	useEffect(() => {
		if (!isAuthenticated && !isLoadingUser) {
			// this line makes sure that the it check if the user is authenticated only when it is no longer loading ie , the full user data has been fetched
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		}
	}, [isAuthenticated, isLoadingUser, navigate]);
	//2) while loading show the spinner
	if (isLoadingUser)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	//4) if there is user, render the app
	if (isAuthenticated) return <>{children}</>;
}

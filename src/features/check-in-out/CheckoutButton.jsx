import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useCheckout } from "./useCheckout";

export default function CheckOutButton({ id }) {
	const { mutate, isPending } = useCheckout();
	return (
		<Button
			size={"small"}
			variation={"primary"}
			as={Link}
			onClick={() => mutate(id)}
			disabled={isPending}>
			Check Out
		</Button>
	);
}

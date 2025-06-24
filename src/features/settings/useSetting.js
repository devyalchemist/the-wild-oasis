import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
	const { isLoading, data, error } = useQuery({
		queryFn: getSettings,
		queryKey: ["settings"],
	});
	return { isLoading, data, error };
}

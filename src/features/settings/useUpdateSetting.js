import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
	const queryClient = useQueryClient();
	const { mutate: editSettings, isPending } = useMutation({
		mutationFn: updateSetting,
		onSuccess: () => {
			toast.success("settings changed");
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			// reset();
		},
		onError: () => {
			toast.error("could not change settings");
		},
	});
	return { editSettings, isPending };
}

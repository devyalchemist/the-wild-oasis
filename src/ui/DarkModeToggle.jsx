import { HiLightBulb, HiOutlineMoon } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { forwardRef } from "react";
import { useToggle } from "../context/ToggleProvider";

const DarkModeToggle = forwardRef(function DarkModeToggle(props, ref) {
	const { isDark } = useToggle();
	return (
		<ButtonIcon ref={ref}>
			{isDark ? <HiLightBulb /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
});
export default DarkModeToggle;
// const DarkModeToggle = forwardRef(function DarkModeToggle({ isDark }, ref) {
//   return (
//     <ButtonIcon ref={ref}>
//       {isDark ? <HiLightBulb /> : <HiOutlineMoon />}
//     </ButtonIcon>
//   );
// });

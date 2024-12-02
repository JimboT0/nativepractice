import React, { useContext } from "react";
import {
  Box,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "../ui";
import HeaderTabs from "./header/HeaderTabs";
import HomestayLogo from "./header/HomestayLogo";
import ToggleMode from "./header/ToggleMode";
import UserProfile from "./header/UserProfile";
import { ThemeContext } from "@/App";

const Header = React.memo(() => {
  const { colorMode } = useContext(ThemeContext);
  return (
    <Box>
      {/* big screen */}
      <Box className="px-16 w-full border-b hidden md:flex border-outline-100 h-20">
        <HStack className="items-center justify-between mx-auto w-full pt-4">
          <HomestayLogo />
          {/* <HeaderTabs /> */}
          <HStack space="lg" className="items-center pr-1.5">
            <ToggleMode />
            <UserProfile />
          </HStack>
        </HStack>
      </Box>
      {/* small screen */}
     
    </Box>
  );
});
export default Header;

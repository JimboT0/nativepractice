import React from "react";
import { Box, Heading, HStack } from "../ui";

import Header from "./Header";
import WebSidebar from "./WebSidebar";
import MainContent from "./main-content/MainContent";
import { ScrollView } from "react-native";
import HomestayLogo from "./header/HomestayLogo";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
  return (
    <>
      <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>

        {/* header */}
        <Header />
      </Box>

      {/* mobile */}
      <ScrollView
        className="h-[1px] md:hidden "
      >

        <Box
          className='pt-4 px-4'
        >
          <HomestayLogo />
        </Box>
        <Box
          className={`${activeTab !== "Profile" ? "flex" : "hidden"} md:hidden`}
        >

          <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
        </Box>
      </ScrollView>

      {/* web */}
      <HStack className="w-full hidden md:flex">
        {/* <WebSidebar /> */}
        {/* <ScrollView style={{ flex: 1 }}> */}

        <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
        {/* </ScrollView> */}
      </HStack>
    </>
  );
};

export default Explorepage;

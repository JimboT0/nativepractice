import React from "react";
import { Box, Heading } from "../../ui";
import HomestayInformationFold from "./HomestayInformationFold";
import NewThisWeekFold from "./NewThisWeekFold";

const MainContent = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">

        <NewThisWeekFold />
        {/* explore page homestay info fold 2 */}
        <HomestayInformationFold />
    </Box>
  );
};
export default MainContent;

import { TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import { TvDashboardTable, MovieDashboardTable } from "@components";
import { TrackableType } from "@types";
import React from "react";

export default function Dashboard() {
  return (
    <Tabs m="4" variant="enclosed">
      <TabList>
        <Tab>TV</Tab>
        <Tab>Movies</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          <TvDashboardTable />
        </TabPanel>
        <TabPanel p="0">
          <MovieDashboardTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

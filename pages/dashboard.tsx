import { TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import { DashboardTable } from "@components";
import { TrackableType } from "@types";

export default function Dashboard() {
  return <Tabs m="4" variant="enclosed">
    <TabList>
      <Tab>TV</Tab>
      <Tab>Movies</Tab>
    </TabList>
    <TabPanels>
      <TabPanel p="0">
        <DashboardTable type={TrackableType.Tv} />
      </TabPanel>
    </TabPanels>
  </Tabs>
}

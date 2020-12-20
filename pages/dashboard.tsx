import { Center, TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import { DashboardTable } from "@components";
import { getOnDashboard, useSelector } from "@store";
import { TrackableType } from "@types";

export default function Dashboard() {
  const trackables = useSelector(getOnDashboard(TrackableType.Tv))
  return <Tabs m="4" variant="enclosed">
    <TabList>
      <Tab>TV</Tab>
      <Tab>Movies</Tab>
    </TabList>
    <TabPanels>
      <TabPanel p="0">
        <DashboardTable type={TrackableType.Tv} trackables={trackables} />
      </TabPanel>
    </TabPanels>
  </Tabs>
}

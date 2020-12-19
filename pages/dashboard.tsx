import { Center, TabList, TabPanels, Tabs, Tab, TabPanel } from "@chakra-ui/react";
import { DashboardTable } from "@components";
import { getOnDashboard, useSelector } from "@store";
import { TrackableType } from "@types";

export default function Dashboard() {
  const trackables = useSelector(getOnDashboard(TrackableType.Tv))
  return <Tabs>
    <TabList>
      <Tab>Shows</Tab>
      <Tab>Movies</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <DashboardTable type={TrackableType.Tv} trackables={trackables} />
      </TabPanel>
    </TabPanels>
  </Tabs>
}

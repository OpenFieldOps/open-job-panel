import { Button, Separator, SimpleGrid } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import SliderWithLabel from "@/components/form/SliderWithLabel";
import SwitchWithLabel from "@/components/form/SwitchWithLabel";
import DashboardFormBlock from "@/features/dashboard/components/DahboardFormBlock";
import { useAdminDashboardSettings } from "../hooks/useAdminDashboardBlock";

function AdminDashboardJobsSettingsBlock() {
  const [settings, setSettings] = useAdminDashboardSettings("jobs");

  return (
    <DashboardFormBlock title="Jobs">
      <SliderWithLabel
        label="Refresh Interval (seconds)"
        onValueChange={({ value }) =>
          setSettings({
            ...settings,
            refreshIntervalInMilliseconds: value[0] * 1000,
          })
        }
        defaultValue={[settings.refreshIntervalInMilliseconds / 1000]}
        step={1}
        min={1}
        max={240}
      />
      <Separator />
      <SwitchWithLabel
        label="Hide Jobs Block"
        defaultChecked={settings.hidden}
        onCheckedChange={({ checked }) =>
          setSettings({
            ...settings,
            hidden: checked,
          })
        }
      />
    </DashboardFormBlock>
  );
}

function AdminDashboardOperatorsNotSeenSettingsBlock() {
  const [settings, setSettings] = useAdminDashboardSettings("operatorsNotSeen");

  return (
    <DashboardFormBlock title="Operators Not Seen">
      <SliderWithLabel
        label="Refresh Interval (seconds)"
        onValueChange={({ value }) =>
          setSettings({
            ...settings,
            refreshIntervalInMilliseconds: value[0] * 1000,
          })
        }
        defaultValue={[settings.refreshIntervalInMilliseconds / 1000]}
        step={1}
        min={1}
        max={240}
      />
      <Separator />
      <SliderWithLabel
        label="Not Seen Threshold (hours)"
        onValueChange={({ value }) =>
          setSettings({
            ...settings,
            notSeenThresholdHours: value[0],
          })
        }
        defaultValue={[settings.notSeenThresholdHours]}
        step={1}
        min={1}
        max={72}
      />
      <Separator />
      <SwitchWithLabel
        label="Hide Operators Not Seen Block"
        defaultChecked={settings.hidden}
        onCheckedChange={({ checked }) =>
          setSettings({
            ...settings,
            hidden: checked,
          })
        }
      />
    </DashboardFormBlock>
  );
}

export default function AdminDashboardSettings() {
  return (
    <PageContainer>
      <PageTitleWithToolbar
        title="Dashboard Settings"
        noTitleOnMobile
        toolbar={
          <NavLink to={"/private/admin/dashboard"}>
            <Button variant="outline">Back to Dashboard</Button>
          </NavLink>
        }
      />
      <SimpleGrid w={"full"} columns={{ base: 1, md: 2 }} gap={4}>
        <AdminDashboardJobsSettingsBlock />
        <AdminDashboardOperatorsNotSeenSettingsBlock />
      </SimpleGrid>
    </PageContainer>
  );
}

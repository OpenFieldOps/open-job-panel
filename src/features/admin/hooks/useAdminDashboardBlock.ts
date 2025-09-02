import { type SetStateAction, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useDebounce } from "@/hooks/useDebounce";

const adminDashboardSettings = {
  jobs: {
    refreshIntervalInMilliseconds: 60000,
    hidden: false,
  },
  operatorsNotSeen: {
    notSeenThresholdHours: 24,
    refreshIntervalInMilliseconds: 60000,
    hidden: false,
  },
};

function fetchAdminDashboardSettingsFromLocalStorage() {
  if (import.meta.env.NODE_ENV === "test") {
    return adminDashboardSettings;
  }
  Object.entries(adminDashboardSettings).forEach(([key, value]) => {
    const storedValue = localStorage.getItem(`adminDashboardSettings.${key}`);
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue) as typeof value;
        if (typeof parsedValue === typeof value) {
          (adminDashboardSettings as Record<string, typeof value>)[key] =
            parsedValue;
        }
      } catch (error) {
        console.error(
          `Error parsing stored value for adminDashboardSettings.${key}:`,
          error
        );
      }
    }
  });
  return adminDashboardSettings;
}

fetchAdminDashboardSettingsFromLocalStorage();

const adminDashboardSettingsAtoms = Object.fromEntries(
  Object.entries(adminDashboardSettings).map(([key, value]) => [
    key,
    atomWithStorage<typeof value>(`adminDashboardSettings.${key}`, value),
  ])
);

type AdminDashboardSettings = typeof adminDashboardSettings;

type AdminDashboardSettingsKey = keyof AdminDashboardSettings;

export function useAdminDashboardSettings<
  Key extends AdminDashboardSettingsKey
>(key: Key) {
  const [settings, setSettings] = useAtom(
    adminDashboardSettingsAtoms[key]
  ) as unknown as [
    AdminDashboardSettings[Key],
    (value: SetStateAction<AdminDashboardSettings[Key]>) => void
  ];
  const setSettingsDebounce = useDebounce(
    (newSettings: AdminDashboardSettings[Key]) => {
      setSettings(newSettings);
      localStorage.setItem(
        `adminDashboardSettings.${key}`,
        JSON.stringify(newSettings)
      );
    },
    300
  );
  return [settings, setSettingsDebounce.debouncedCallback] as const;
}

export function useAdminDashboardSettingsValue<
  Key extends AdminDashboardSettingsKey
>(key: Key) {
  return useAtomValue(
    adminDashboardSettingsAtoms[key]
  ) as AdminDashboardSettings[Key];
}

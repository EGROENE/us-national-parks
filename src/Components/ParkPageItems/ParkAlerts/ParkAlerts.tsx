import { useMainContentContext } from "../../../Hooks/useMainContentContext";
import { TParkAlert } from "../../../types";

export const ParkAlerts = ({ parkCode }: { parkCode: string | undefined }) => {
  const { allNPAlerts, alertsAreLoading } = useMainContentContext();
  const failedToFetchAlerts: boolean = allNPAlerts.length === 0 && !alertsAreLoading;
  const parkAlerts: TParkAlert[] = allNPAlerts.filter(
    (alert) => alert.parkCode === parkCode
  );

  return (
    <>
      {parkAlerts.map((alert) => (
        <p key={alert.id}>{alert.title}</p>
      ))}
      {failedToFetchAlerts && <p>Unable to load alerts. Try reloading the page.</p>}
    </>
  );
};

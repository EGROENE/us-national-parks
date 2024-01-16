import { useMainContentContext } from "../../../Hooks/useMainContentContext";

export const ParkAlerts = ({ parkCode }: { parkCode: string | undefined }) => {
  const { allNPAlerts, didFetchAlerts, alertsAreLoading } = useMainContentContext();
  const failedToFetchAlerts: boolean = !didFetchAlerts && !alertsAreLoading;
  const parkAlerts = allNPAlerts.filter((alert) => alert.parkCode === parkCode);

  return (
    <>
      {parkAlerts.map((alert) => (
        <p key={alert.id}>{alert.title}</p>
      ))}
      {failedToFetchAlerts && <p>Unable to load alerts. Try reloading the page.</p>}
    </>
  );
};

import { useMainContentContext } from "../../../Hooks/useMainContentContext";
import { TParkAlert } from "../../../types";

export const ParkAlerts = ({
  parkCode,
  setShowAlerts,
}: {
  parkCode: string | undefined;
  setShowAlerts: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { allNPAlerts, alertsAreLoading } = useMainContentContext();
  const parkAlerts: TParkAlert[] = allNPAlerts.filter(
    (alert) => alert.parkCode === parkCode
  );
  const areAlerts = parkAlerts.length > 0;

  return (
    <div className="park-alerts-modal">
      <div className="park-alerts-container">
        <i
          onClick={() => setShowAlerts(false)}
          title="Close Alerts"
          className="fas fa-times"
        ></i>
        {parkAlerts.map((alert) => (
          <div key={alert.id} className="park-alert">
            <header>{alert.title}</header>
            <p>{alert.description}</p>
            <p>Last Updated: {alert.lastIndexedDate}</p>
          </div>
        ))}
      </div>
      {!areAlerts && !alertsAreLoading && (
        <p>Unable to load alerts. Try reloading the page.</p>
      )}
    </div>
  );
};

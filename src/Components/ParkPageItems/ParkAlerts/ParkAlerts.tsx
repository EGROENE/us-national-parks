import { useMainContentContext } from "../../../Hooks/useMainContentContext";
import { TParkAlert } from "../../../types";

export const ParkAlerts = ({
  parkCode,
  setShowAlerts,
  parkName,
}: {
  parkCode: string | undefined;
  setShowAlerts: React.Dispatch<React.SetStateAction<boolean>>;
  parkName: string | undefined;
}) => {
  const { allNPAlerts, alertsAreLoading } = useMainContentContext();
  const parkAlerts: TParkAlert[] = allNPAlerts.filter(
    (alert) => alert.parkCode === parkCode
  );
  const areAlerts = parkAlerts.length > 0;

  const currentMoment = new Date();

  // method to convert time to UTC:
  const timeUTCEpoch = (time: Date) => {
    const offset = time.getTimezoneOffset() * 60000; // could be negative or positive
    return time.getTime() + offset;
  };

  const currentMomentUTCEpoch = timeUTCEpoch(currentMoment);

  const daysAgo = (lastIndexed: string) => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);
    return Math.floor((currentMomentUTCEpoch - lastIndexedUTCEpoch) / 86400000);
  };

  const hoursAgo = (lastIndexed: string) => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);
    const fullDaysPassedEpoch = daysAgo(lastIndexed) * 86400000;
    return Math.floor(
      (currentMomentUTCEpoch - (lastIndexedUTCEpoch - fullDaysPassedEpoch)) / 3600000
    );
  };

  const minutesAgo = (lastIndexed: string) => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);
    const fullDaysPassedEpoch = daysAgo(lastIndexed) * 86400000;
    // leftoverMinsEpoch is equal to remaining mins after & full hours have been deducted from currentMomentUTCEpoch
    const leftoverMinsEpoch =
      (currentMomentUTCEpoch - (lastIndexedUTCEpoch - fullDaysPassedEpoch)) / 3600000 -
      Math.floor(
        (currentMomentUTCEpoch - (lastIndexedUTCEpoch - fullDaysPassedEpoch)) / 3600000
      );
    return Math.floor((leftoverMinsEpoch * 3600000) / 60000);
  };

  return (
    <div className="park-alerts-modal">
      <div className="park-alerts-body">
        <i
          onClick={() => setShowAlerts(false)}
          title="Close Alerts"
          className="fas fa-times"
        ></i>
        <header className="park-modal-intro-header">Alerts for</header>
        <header className="park-modal-header">{parkName}</header>
        <div className="park-alerts-container">
          {parkAlerts.map((alert) => (
            <div key={alert.id} className="park-alert">
              <header>{alert.title}</header>
              <p>{alert.description}</p>
              <p>
                Last updated:{" "}
                {daysAgo(alert.lastIndexedDate) === 1 &&
                  `${daysAgo(alert.lastIndexedDate)} day `}
                {daysAgo(alert.lastIndexedDate) > 1 &&
                  `${daysAgo(alert.lastIndexedDate)} days `}
                {hoursAgo(alert.lastIndexedDate) === 1 &&
                  `${hoursAgo(alert.lastIndexedDate)} hour `}
                {hoursAgo(alert.lastIndexedDate) > 1 &&
                  `${hoursAgo(alert.lastIndexedDate)} hours `}
                {minutesAgo(alert.lastIndexedDate) === 1 &&
                  `${minutesAgo(alert.lastIndexedDate)} minute `}
                {minutesAgo(alert.lastIndexedDate) > 1 &&
                  `${minutesAgo(alert.lastIndexedDate)} minutes `}
                {" ago"}
              </p>
            </div>
          ))}
        </div>
      </div>
      {!areAlerts && !alertsAreLoading && (
        <p>Unable to load alerts. Try reloading the page.</p>
      )}
    </div>
  );
};

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
  const areAlerts: boolean = parkAlerts.length > 0;

  const currentMoment: Date = new Date();

  // method to convert time to UTC in epoch form:
  const timeUTCEpoch = (time: Date): number => {
    const offset = time.getTimezoneOffset() * 60000; // could be negative or positive. returns in mins, so multiply by 60k to convert to epoch
    return time.getTime() + offset;
  };

  const currentMomentUTCEpoch: number = timeUTCEpoch(currentMoment);

  const daysAgo = (lastIndexed: string): number => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);
    const exactDaysPassed = (currentMomentUTCEpoch - lastIndexedUTCEpoch) / 86400000;
    // return full days passed:
    return Math.floor(exactDaysPassed);
  };

  const hoursAgo = (lastIndexed: string): number => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);

    const exactDaysPassed = (currentMomentUTCEpoch - lastIndexedUTCEpoch) / 86400000;
    const fullDaysPassed = daysAgo(lastIndexed);
    // leftoverHoursEpoch is equal to hours left over in epoch form after subtracting full days from exact days passed since last indexed:
    const leftoverHoursEpoch = (exactDaysPassed - fullDaysPassed) * 86400000;

    // return full hours passed, accounting for full days passed:
    return Math.floor(leftoverHoursEpoch / 3600000);
  };

  const minutesAgo = (lastIndexed: string): number => {
    const lastIndexedDate = new Date(Date.parse(lastIndexed));
    const lastIndexedUTCEpoch = timeUTCEpoch(lastIndexedDate);

    const exactDaysPassed = (currentMomentUTCEpoch - lastIndexedUTCEpoch) / 86400000;
    const leftoverHoursEpoch = (exactDaysPassed - daysAgo(lastIndexed)) * 86400000;

    const exactHoursPassed = leftoverHoursEpoch / 3600000;
    const fullHoursPassed = hoursAgo(lastIndexed);
    // leftoverMinsEpoch is equal to hours left over in epoch form after subtracting full hours from exact hours passed since last indexed:
    const leftoverMinsEpoch = (exactHoursPassed - fullHoursPassed) * 3600000;

    // return full minutes passed, accounting for full days & full hours passed:
    return Math.floor(leftoverMinsEpoch / 60000);
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

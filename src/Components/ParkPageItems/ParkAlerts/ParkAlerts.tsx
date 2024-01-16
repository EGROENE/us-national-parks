import { DropdownButton } from "../../DropdownButton/DropdownButton";

// Try using parkPageContext so props won't be necessary
// Would also apply to other comps relating to addt'l infos
export const ParkAlerts = ({
  didFetchAlerts,
  alertsAreLoading,
  showAlerts,
  setShowAlerts,
  parkAlerts,
}: {
  //park: TPark;
}) => {
  const failedToFetchAlerts: boolean = !didFetchAlerts && !alertsAreLoading;

  return (
    <>
      <DropdownButton
        text="Alerts"
        action={() => (showAlerts ? setShowAlerts(false) : setShowAlerts(true))}
        title={showAlerts ? "Hide Alerts" : "Show Alerts"}
        showItems={showAlerts}
        numberOfItems={ParkAlerts.length}
      />
      {showAlerts && parkAlerts.map((alert) => <p key={alert.id}>{alert.title}</p>)}
      {failedToFetchAlerts && <p>Unable to load alerts. Try reloading the page.</p>}
    </>
  );
};

import { getObjectArraySortedAlphabeticallyByProperty } from "../../../methods";
import { TPark } from "../../../types";

const ParkActivities = ({
  park,
  showActivities,
}: {
  park: TPark;
  showActivities: boolean;
}) => {
  return (
    <>
      {showActivities && (
        <div className="park-activities-container">
          {getObjectArraySortedAlphabeticallyByProperty(park.activities, "name").map(
            (activity) => (
              <p
                key={park.activities[park.activities.indexOf(activity)].id}
                className="park-activity"
              >
                {activity.name}
              </p>
            )
          )}
        </div>
      )}
    </>
  );
};
export default ParkActivities;

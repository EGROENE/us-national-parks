import { TPark } from "../../../../types";

const ParkEntranceFees = ({
  park,
  showEntranceFees,
}: {
  park: TPark;
  showEntranceFees: boolean;
}) => {
  return (
    <>
      {showEntranceFees && park.entranceFees.length && (
        <div className="entrance-fee-or-passes-container">
          {park.entranceFees.map((entranceFee) => (
            <div
              key={park.entranceFees[park.entranceFees.indexOf(entranceFee)].title}
              className="entrance-fee-or-pass"
            >
              <header>{entranceFee.title}</header>
              <p>{+entranceFee.cost === 0 ? "FREE" : `$${entranceFee.cost}`}</p>
              <p>{entranceFee.description}</p>
            </div>
          ))}
        </div>
      )}
      {!park.entranceFees.length && <span>NONE</span>}
    </>
  );
};
export default ParkEntranceFees;

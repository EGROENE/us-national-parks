import { TPark } from "../../../../types";

const ParkEntrancePasses = ({
  park,
  showEntrancePasses,
}: {
  park: TPark;
  showEntrancePasses: boolean;
}) => {
  return (
    <>
      {showEntrancePasses && park.entrancePasses.length && (
        <div className="entrance-fee-or-passes-container">
          {park.entrancePasses.map((pass) => (
            <div
              key={park.entrancePasses[park.entrancePasses.indexOf(pass)].title}
              className="entrance-fee-or-pass"
            >
              <header>{pass.title}</header>
              <p>{+pass.cost === 0 ? "FREE" : `$${pass.cost}`}</p>
              <p>{pass.description}</p>
            </div>
          ))}
        </div>
      )}
      {!park.entrancePasses.length && <span>NONE</span>}
    </>
  );
};
export default ParkEntrancePasses;

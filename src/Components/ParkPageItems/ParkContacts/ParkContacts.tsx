import { TPark } from "../../../types";
import { formatPhoneNumber } from "../../../methods";

export const ParkContacts = ({
  park,
  showContactInfo,
}: {
  park: TPark;
  showContactInfo: boolean;
}) => {
  return (
    <>
      {showContactInfo && Object.keys(park.contacts).length > 0 && (
        <div className="contact-infos-container">
          <header>
            Phone Numbers:
            {park.contacts.phoneNumbers.map((numberInfo) => (
              <span key={numberInfo.phoneNumber}>
                {`${formatPhoneNumber(numberInfo.phoneNumber)} `}
                {numberInfo.type.toUpperCase() !== "TTY"
                  ? `(${numberInfo.type})`
                  : "(Teletypewriter)"}
              </span>
            ))}
          </header>
          <header>
            E-Mail Address: <span>{park.contacts.emailAddresses[0].emailAddress}</span>
          </header>
        </div>
      )}
      {!Object.keys(park.contacts).length && <p>NONE</p>}
    </>
  );
};

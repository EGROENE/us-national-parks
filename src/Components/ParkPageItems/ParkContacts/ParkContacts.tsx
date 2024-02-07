import { TPark } from "../../../types";
import { formatPhoneNumber } from "../../../methods";

const ParkContacts = ({
  park,
  showContactInfo,
}: {
  park: TPark;
  showContactInfo: boolean;
}) => {
  const phoneNumberIsTTY = (numberInfo: {
    phoneNumber: string;
    description: string;
    extension: string;
    type: string;
  }) => {
    return numberInfo.type.toUpperCase() === "TTY" ? true : false;
  };

  return (
    <>
      {showContactInfo && Object.keys(park.contacts).length > 0 && (
        <div className="contact-infos-container">
          <header>
            {park.contacts.phoneNumbers.length > 1 ? "Phone Numbers:" : "Phone Number:"}
          </header>
          <div className="phone-numbers-container">
            {park.contacts.phoneNumbers.map((numberInfo) => (
              <p key={numberInfo.phoneNumber}>
                {`${formatPhoneNumber(numberInfo.phoneNumber)} `}
                {phoneNumberIsTTY(numberInfo)
                  ? "(teletypewriter)"
                  : `(${numberInfo.type.toLowerCase()})`}
              </p>
            ))}
          </div>
          <header>
            E-Mail Address: <span>{park.contacts.emailAddresses[0].emailAddress}</span>
          </header>
        </div>
      )}
      {!Object.keys(park.contacts).length && <p>NONE</p>}
    </>
  );
};
export default ParkContacts;

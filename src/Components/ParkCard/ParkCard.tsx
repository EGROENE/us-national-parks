import { TPark } from "../../types";

type TParkCardProps = {
  park: TPark;
};

export const ParkCard = ({ park }: TParkCardProps) => {
  return (
    <>
      <h1>{park.fullName}</h1>
    </>
  );
};

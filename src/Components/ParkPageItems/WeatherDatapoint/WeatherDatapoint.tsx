interface WeatherDatapointProps {
  datapoint?: string;
  dataLabel?: string;
  dataIsDisplayed: boolean;
  setDataIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  data: { datumOne: number | undefined; datumTwo: number | undefined };
  units: { unitOne: string; unitTwo: string };
  dataMetric?: string; // symbol of degrees, percentage, etc.
  separator: string; // separates units
  stylingClass: string;
}

export const WeatherDatapoint = ({
  datapoint,
  dataLabel,
  dataIsDisplayed,
  setDataIsDisplayed,
  data,
  units,
  dataMetric,
  separator,
  stylingClass,
}: WeatherDatapointProps) => {
  return (
    <div
      className={
        datapoint === "current-temp" ? "current-temp-container" : "datapoint-container"
      }
    >
      {dataLabel && <span>{dataLabel}</span>}
      <span className={datapoint === "current-temp" ? "current-temp" : "datapoint"}>
        {!dataIsDisplayed
          ? `${data.datumOne}${dataMetric ? dataMetric : ""}`
          : `${data.datumTwo}${dataMetric ? dataMetric : ""}`}
      </span>
      <span
        className={
          datapoint === "current-temp"
            ? "current-temp-units-container"
            : "datapoint-units-container"
        }
      >
        <span
          onClick={() => (!dataIsDisplayed ? undefined : setDataIsDisplayed(false))}
          className={!dataIsDisplayed ? `${stylingClass} weather-unit` : "weather-unit"}
        >{`${units.unitOne}`}</span>
        <span>{`${separator}`}</span>
        <span
          onClick={() => (dataIsDisplayed ? undefined : setDataIsDisplayed(true))}
          className={dataIsDisplayed ? `${stylingClass} weather-unit` : "weather-unit"}
        >{`${units.unitTwo}`}</span>
      </span>
    </div>
  );
};

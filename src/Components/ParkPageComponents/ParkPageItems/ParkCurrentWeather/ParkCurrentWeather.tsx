import { useState } from "react";
import { TCurrentWeather } from "../../../../types";
import WeatherDatapoint from "../WeatherDatapoint/WeatherDatapoint";
import FailFetchMessage from "../../../VersatileComponents/FailFetchMessage/FailFetchMessage";

const ParkCurrentWeather = ({
  parkWeather,
  setShowCurrentWeather,
  parkName,
  wasErrorFetchingWeather,
}: {
  parkWeather: TCurrentWeather | undefined;
  setShowCurrentWeather: React.Dispatch<React.SetStateAction<boolean>>;
  parkName: string;
  wasErrorFetchingWeather: boolean;
}) => {
  // Get park's long/lat as prop from ParkPage:
  const [displayCelsius, setDisplayCelsius] = useState<boolean>(false);
  const [visibilityInKM, setVisibilityKM] = useState<boolean>(false);
  const [windInKM, setWindInKM] = useState<boolean>(false);
  const [precipitationInMetric, setPrecipitationInMetric] = useState<boolean>(false);
  const [pressureInMetric, setPressureInMetric] = useState<boolean>(false);

  let lastUpdatedTime: Date | string | undefined;
  if (parkWeather) {
    lastUpdatedTime = new Date(parkWeather?.current.last_updated_epoch * 1000);
    lastUpdatedTime = `${lastUpdatedTime?.toLocaleDateString()} at ${lastUpdatedTime?.toLocaleTimeString()}`;
  }

  return (
    <div className="current-weather-modal-hero">
      <div className="current-weather-container">
        <i
          onClick={() => setShowCurrentWeather(false)}
          title="Close Current Weather"
          className="fas fa-times"
        ></i>
        <header className="park-modal-intro-header" style={{ color: "white" }}>
          Weather in
        </header>
        <header className="park-modal-header" style={{ color: "white" }}>
          {parkName}
        </header>
        {wasErrorFetchingWeather ? (
          <FailFetchMessage margin="1rem 0" buttonColor="var(--theme-blue-dark)" />
        ) : (
          <>
            {" "}
            <p>Last Updated: {`${lastUpdatedTime}`}</p>
            <div className="weather-info-container">
              <div className="extended-weather-info">
                <p>UV Index: {parkWeather?.current.uv.toFixed(1)}</p>
                <p>Humidity: {parkWeather?.current.humidity}%</p>
                <WeatherDatapoint
                  dataLabel="Visibility: "
                  dataIsDisplayed={visibilityInKM}
                  setDataIsDisplayed={setVisibilityKM}
                  data={{
                    datumOne: parkWeather?.current.vis_miles,
                    datumTwo: parkWeather?.current.vis_km,
                  }}
                  units={{ unitOne: "mi", unitTwo: "km" }}
                  separator=" | "
                  stylingClass="selected-unit"
                />
                <WeatherDatapoint
                  dataLabel="Gust: "
                  dataIsDisplayed={windInKM}
                  setDataIsDisplayed={setWindInKM}
                  data={{
                    datumOne: parkWeather?.current.gust_mph,
                    datumTwo: parkWeather?.current.gust_kph,
                  }}
                  units={{ unitOne: "mph", unitTwo: "km/h" }}
                  separator=" | "
                  stylingClass="selected-unit"
                />
                <WeatherDatapoint
                  dataLabel="Precipitation: "
                  dataIsDisplayed={precipitationInMetric}
                  setDataIsDisplayed={setPrecipitationInMetric}
                  data={{
                    datumOne: parkWeather?.current.precip_in,
                    datumTwo: parkWeather?.current.precip_mm,
                  }}
                  units={{ unitOne: "in", unitTwo: "mm" }}
                  separator=" | "
                  stylingClass="selected-unit"
                />
                <WeatherDatapoint
                  dataLabel="Pressure: "
                  dataIsDisplayed={pressureInMetric}
                  setDataIsDisplayed={setPressureInMetric}
                  data={{
                    datumOne: parkWeather?.current.pressure_in,
                    datumTwo: parkWeather?.current.pressure_mb,
                  }}
                  units={{ unitOne: "in", unitTwo: "mbar" }}
                  separator=" | "
                  stylingClass="selected-unit"
                />
              </div>
              <div className="basic-weather-info-container">
                <div className="weather-img-container">
                  <img src={parkWeather?.current.condition.icon} />
                </div>
                <div className="basic-weather-info-text-container">
                  <WeatherDatapoint
                    datapoint="current-temp"
                    dataIsDisplayed={displayCelsius}
                    setDataIsDisplayed={setDisplayCelsius}
                    data={{
                      datumOne: parkWeather?.current.temp_f,
                      datumTwo: parkWeather?.current.feelslike_c,
                    }}
                    units={{ unitOne: "F", unitTwo: "C" }}
                    dataMetric="°"
                    separator=" | "
                    stylingClass="selected-unit"
                  />
                  <p>{parkWeather?.current.condition.text}</p>
                  <WeatherDatapoint
                    dataLabel="Feels like: "
                    dataIsDisplayed={displayCelsius}
                    setDataIsDisplayed={setDisplayCelsius}
                    data={{
                      datumOne: parkWeather?.current.temp_f,
                      datumTwo: parkWeather?.current.feelslike_c,
                    }}
                    units={{ unitOne: "F", unitTwo: "C" }}
                    dataMetric="°"
                    separator=" | "
                    stylingClass="selected-unit"
                  />
                  <WeatherDatapoint
                    dataLabel="Wind: "
                    dataIsDisplayed={windInKM}
                    setDataIsDisplayed={setWindInKM}
                    data={{
                      datumOne: parkWeather?.current.wind_mph,
                      datumTwo: parkWeather?.current.wind_kph,
                    }}
                    units={{ unitOne: "mph", unitTwo: "km/h" }}
                    separator=" | "
                    stylingClass="selected-unit"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ParkCurrentWeather;
import { useEffect, useState } from "react";
import { getParkCurrentWeather } from "../../../api";
import { TCurrentWeather } from "../../../types";

export const ParkCurrentWeather = ({
  latitude,
  longitude,
  setShowCurrentWeather,
}: {
  latitude: string;
  longitude: string;
  setShowCurrentWeather: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Get park's long/lat as prop from ParkPage:
  const [parkWeather, setParkWeather] = useState<TCurrentWeather | undefined>();
  const [displayCelsius, setDisplayCelsius] = useState<boolean>(false);
  const [visibilityInKM, setVisibilityKM] = useState<boolean>(false);
  useEffect(() => {
    getParkCurrentWeather(latitude, longitude)
      .then((response) => response.text())
      .then((result) => setParkWeather(JSON.parse(result)))
      .catch((error) => console.log(error));
  });

  return (
    <div className="current-weather-modal">
      <div className="current-weather-container">
        <div className="weather-info">
          <i
            onClick={() => setShowCurrentWeather(false)}
            title="Close Current Weather"
            className="fas fa-times"
          ></i>
          <p>
            {!displayCelsius
              ? `${parkWeather?.current.temp_f}°`
              : `${parkWeather?.current.temp_c}°`}
            <span>
              <span
                onClick={() => (!displayCelsius ? undefined : setDisplayCelsius(false))}
                className={!displayCelsius ? "selected-unit" : undefined}
              >
                {"F"}
              </span>
              <span>{" | "}</span>
              <span
                onClick={() => (displayCelsius ? undefined : setDisplayCelsius(true))}
                className={displayCelsius ? "selected-unit" : undefined}
              >
                {"C"}
              </span>
            </span>
          </p>
          <p>{parkWeather?.current.condition.text}</p>
          <p>
            {"Feels like: "}
            {!displayCelsius
              ? `${parkWeather?.current.feelslike_f}°`
              : `${parkWeather?.current.feelslike_c}°`}
            <span>
              <span
                onClick={() => (!displayCelsius ? undefined : setDisplayCelsius(false))}
                className={!displayCelsius ? "selected-unit" : undefined}
              >
                {"F"}
              </span>
              <span>{" | "}</span>
              <span
                onClick={() => (displayCelsius ? undefined : setDisplayCelsius(true))}
                className={displayCelsius ? "selected-unit" : undefined}
              >
                {"C"}
              </span>
            </span>
          </p>
          <p>UV Index: {parkWeather?.current.uv.toFixed(1)}</p>
          <p>Humidity: {parkWeather?.current.humidity}%</p>
          <p>
            {"Visibility: "}
            {!visibilityInKM
              ? `${parkWeather?.current.vis_miles}`
              : `${parkWeather?.current.vis_km}`}
            <span>
              <span
                onClick={() => (!visibilityInKM ? undefined : setVisibilityKM(false))}
                className={!visibilityInKM ? "selected-unit" : undefined}
              >
                {"mi"}
              </span>
              <span>{" / "}</span>
              <span
                onClick={() => (visibilityInKM ? undefined : setVisibilityKM(true))}
                className={visibilityInKM ? "selected-unit" : undefined}
              >
                {"km"}
              </span>
            </span>
          </p>
        </div>
        <div className="weather-img-container">
          <img src={parkWeather?.current.condition.icon} />
        </div>
      </div>
    </div>
  );
};

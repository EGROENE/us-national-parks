import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const Filter = () => {
  const { handleStateFilter, stateOrTerritoryFilter } = useMainContentContext();

  return (
    <div className="filter">
      <header>Filter by state/territory:</header>
      <select onChange={(e) => handleStateFilter(e.target.value)}>
        <option selected={stateOrTerritoryFilter === ""} value="">
          No Filter
        </option>
        <option selected={stateOrTerritoryFilter === "AL"} value="AL">
          Alabama
        </option>
        <option selected={stateOrTerritoryFilter === "AK"} value="AK">
          Alaska
        </option>
        <option selected={stateOrTerritoryFilter === "AR"} value="AR">
          Arkansas
        </option>
        <option selected={stateOrTerritoryFilter === "AS"} value="AS">
          American Samoa
        </option>
        <option selected={stateOrTerritoryFilter === "AZ"} value="AZ">
          Arizona
        </option>
        <option selected={stateOrTerritoryFilter === "CA"} value="CA">
          California
        </option>
        <option selected={stateOrTerritoryFilter === "CO"} value="CO">
          Colorado
        </option>
        <option selected={stateOrTerritoryFilter === "CT"} value="CT">
          Connecticut
        </option>
        <option selected={stateOrTerritoryFilter === "DE"} value="DE">
          Delaware
        </option>
        <option selected={stateOrTerritoryFilter === "FL"} value="FL">
          Florida
        </option>
        <option selected={stateOrTerritoryFilter === "GA"} value="GA">
          Georgia
        </option>
        <option selected={stateOrTerritoryFilter === "GU"} value="GU">
          Guam
        </option>
        <option selected={stateOrTerritoryFilter === "HI"} value="HI">
          Hawaii
        </option>
        <option selected={stateOrTerritoryFilter === "ID"} value="ID">
          Idaho
        </option>
        <option selected={stateOrTerritoryFilter === "IL"} value="IL">
          Illinois
        </option>
        <option selected={stateOrTerritoryFilter === "IN"} value="IN">
          Indiana
        </option>
        <option selected={stateOrTerritoryFilter === "IA"} value="IA">
          Iowa
        </option>
        <option selected={stateOrTerritoryFilter === "KS"} value="KS">
          Kansas
        </option>
        <option selected={stateOrTerritoryFilter === "KY"} value="KY">
          Kentucky
        </option>
        <option selected={stateOrTerritoryFilter === "LA"} value="LA">
          Louisiana
        </option>
        <option selected={stateOrTerritoryFilter === "ME"} value="ME">
          Maine
        </option>
        <option selected={stateOrTerritoryFilter === "MD"} value="MD">
          Maryland
        </option>
        <option selected={stateOrTerritoryFilter === "MA"} value="MA">
          Massachusetts
        </option>
        <option selected={stateOrTerritoryFilter === "MI"} value="MI">
          Michigan
        </option>
        <option selected={stateOrTerritoryFilter === "MN"} value="MN">
          Minnesota
        </option>
        <option selected={stateOrTerritoryFilter === "MS"} value="MS">
          Mississippi
        </option>
        <option selected={stateOrTerritoryFilter === "MO"} value="MO">
          Missouri
        </option>
        <option selected={stateOrTerritoryFilter === "MT"} value="MT">
          Montana
        </option>
        <option selected={stateOrTerritoryFilter === "NE"} value="NE">
          Nebraska
        </option>
        <option selected={stateOrTerritoryFilter === "MP"} value="MP">
          Northern Mariana Islands
        </option>
        <option selected={stateOrTerritoryFilter === "NV"} value="NV">
          Nevada
        </option>
        <option selected={stateOrTerritoryFilter === "NH"} value="NH">
          New Hampshire
        </option>
        <option selected={stateOrTerritoryFilter === "NJ"} value="NJ">
          New Jersey
        </option>
        <option selected={stateOrTerritoryFilter === "NM"} value="NM">
          New Mexico
        </option>
        <option selected={stateOrTerritoryFilter === "NY"} value="NY">
          New York
        </option>
        <option selected={stateOrTerritoryFilter === "NC"} value="NC">
          North Carolina
        </option>
        <option selected={stateOrTerritoryFilter === "ND"} value="ND">
          North Dakota
        </option>
        <option selected={stateOrTerritoryFilter === "OH"} value="OH">
          Ohio
        </option>
        <option selected={stateOrTerritoryFilter === "OK"} value="OK">
          Oklahoma
        </option>
        <option selected={stateOrTerritoryFilter === "OR"} value="OR">
          Oregon
        </option>
        <option selected={stateOrTerritoryFilter === "PA"} value="PA">
          Pennsylvania
        </option>
        <option selected={stateOrTerritoryFilter === "PR"} value="PR">
          Puerto Rico
        </option>
        <option selected={stateOrTerritoryFilter === "RI"} value="RI">
          Rhode Island
        </option>
        <option selected={stateOrTerritoryFilter === "SC"} value="SC">
          South Carolina
        </option>
        <option selected={stateOrTerritoryFilter === "SD"} value="SD">
          South Dakota
        </option>
        <option selected={stateOrTerritoryFilter === "TN"} value="TN">
          Tennessee
        </option>
        <option selected={stateOrTerritoryFilter === "TX"} value="TX">
          Texas
        </option>
        <option selected={stateOrTerritoryFilter === "UT"} value="UT">
          Utah
        </option>
        <option selected={stateOrTerritoryFilter === "VT"} value="VT">
          Vermont
        </option>
        <option selected={stateOrTerritoryFilter === "VA"} value="VA">
          Virginia
        </option>
        <option selected={stateOrTerritoryFilter === "VI"} value="VI">
          Virgin Islands
        </option>
        <option selected={stateOrTerritoryFilter === "WA"} value="WA">
          Washington
        </option>
        <option selected={stateOrTerritoryFilter === "WV"} value="WV">
          West Virginia
        </option>
        <option selected={stateOrTerritoryFilter === "WI"} value="WI">
          Wisconsin
        </option>
        <option selected={stateOrTerritoryFilter === "WY"} value="WY">
          Wyoming
        </option>
      </select>
    </div>
  );
};

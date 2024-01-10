import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const Filter = () => {
  const { handleStateFilter, stateFilter } = useMainContentContext();

  return (
    <div className="filter">
      <header>Filter by state/territory:</header>
      <select onChange={(e) => handleStateFilter(e.target.value)}>
        <option selected={stateFilter === ""} value="">
          No Filter
        </option>
        <option selected={stateFilter === "AL"} value="AL">
          Alabama
        </option>
        <option selected={stateFilter === "AK"} value="AK">
          Alaska
        </option>
        <option selected={stateFilter === "AR"} value="AR">
          Arkansas
        </option>
        <option selected={stateFilter === "AZ"} value="AZ">
          Arizona
        </option>
        <option selected={stateFilter === "CA"} value="CA">
          California
        </option>
        <option selected={stateFilter === "CO"} value="CO">
          Colorado
        </option>
        <option selected={stateFilter === "CT"} value="CT">
          Connecticut
        </option>
        <option selected={stateFilter === "DE"} value="DE">
          Delaware
        </option>
        <option selected={stateFilter === "FL"} value="FL">
          Florida
        </option>
        <option selected={stateFilter === "GA"} value="GA">
          Georgia
        </option>
        <option selected={stateFilter === "HI"} value="HI">
          Hawaii
        </option>
        <option selected={stateFilter === "ID"} value="ID">
          Idaho
        </option>
        <option selected={stateFilter === "IL"} value="IL">
          Illinois
        </option>
        <option selected={stateFilter === "IN"} value="IN">
          Indiana
        </option>
        <option selected={stateFilter === "IA"} value="IA">
          Iowa
        </option>
        <option selected={stateFilter === "KS"} value="KS">
          Kansas
        </option>
        <option selected={stateFilter === "KY"} value="KY">
          Kentucky
        </option>
        <option selected={stateFilter === "LA"} value="LA">
          Louisiana
        </option>
        <option selected={stateFilter === "ME"} value="ME">
          Maine
        </option>
        <option selected={stateFilter === "MD"} value="MD">
          Maryland
        </option>
        <option selected={stateFilter === "MA"} value="MA">
          Massachusetts
        </option>
        <option selected={stateFilter === "MI"} value="MI">
          Michigan
        </option>
        <option selected={stateFilter === "MN"} value="MN">
          Minnesota
        </option>
        <option selected={stateFilter === "MS"} value="MS">
          Mississippi
        </option>
        <option selected={stateFilter === "MO"} value="MO">
          Missouri
        </option>
        <option selected={stateFilter === "MT"} value="MT">
          Montana
        </option>
        <option selected={stateFilter === "NE"} value="NE">
          Nebraska
        </option>
        <option selected={stateFilter === "NV"} value="NV">
          Nevada
        </option>
        <option selected={stateFilter === "NH"} value="NH">
          New Hampshire
        </option>
        <option selected={stateFilter === "NJ"} value="NJ">
          New Jersey
        </option>
        <option selected={stateFilter === "NM"} value="NM">
          New Mexico
        </option>
        <option selected={stateFilter === "NY"} value="NY">
          New York
        </option>
        <option selected={stateFilter === "NC"} value="NC">
          North Carolina
        </option>
        <option selected={stateFilter === "ND"} value="ND">
          North Dakota
        </option>
        <option selected={stateFilter === "OH"} value="OH">
          Ohio
        </option>
        <option selected={stateFilter === "OK"} value="OK">
          Oklahoma
        </option>
        <option selected={stateFilter === "OR"} value="OR">
          Oregon
        </option>
        <option selected={stateFilter === "PA"} value="PA">
          Pennsylvania
        </option>
        <option selected={stateFilter === "RI"} value="RI">
          Rhode Island
        </option>
        <option selected={stateFilter === "SC"} value="SC">
          South Carolina
        </option>
        <option selected={stateFilter === "SD"} value="SD">
          South Dakota
        </option>
        <option selected={stateFilter === "TN"} value="TN">
          Tennessee
        </option>
        <option selected={stateFilter === "TX"} value="TX">
          Texas
        </option>
        <option selected={stateFilter === "UT"} value="UT">
          Utah
        </option>
        <option selected={stateFilter === "VT"} value="VT">
          Vermont
        </option>
        <option selected={stateFilter === "VA"} value="VA">
          Virginia
        </option>
        <option selected={stateFilter === "VI"} value="VI">
          Virgin Islands
        </option>
        <option selected={stateFilter === "WA"} value="WA">
          Washington
        </option>
        <option selected={stateFilter === "WV"} value="WV">
          West Virginia
        </option>
        <option selected={stateFilter === "WI"} value="WI">
          Wisconsin
        </option>
        <option selected={stateFilter === "WY"} value="WY">
          Wyoming
        </option>
      </select>
    </div>
  );
};

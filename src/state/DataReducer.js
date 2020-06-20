export const RECIEVE_WORLD_CURRENT = "RECIEVE_WORLD_CURRENT";
export const RECIEVE_WORLD_HISTORICAL = "RECIEVE_WORLD_HISTORICAL";
export const RECIEVE_COUNTRIES_CURRENT = "RECIEVE_COUNTRIES_CURRENT";
export const RECIEVE_COUNTRIES_HISTORICAL = "RECIEVE_COUNTRIES_HISTORICAL";
export const SET_COUNTRY = "SET_COUNTRY";

export default (state, action) => {
  switch (action.type) {
    case RECIEVE_WORLD_CURRENT:
      const {
        updated,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
        active,
        critical,
      } = action.payload;
      return {
        ...state,
        currentData: [
          ...state.currentData,
          {
            updated,
            name: "World",
            iso2: "",
            iso3: "",
            flag: "",
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            todayRecovered,
            active,
            critical,
          },
        ],
        selectedCountry: {
          updated,
          name: "World",
          iso2: "",
          iso3: "",
          flag: "",
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
          active,
          critical,
        },
      };

    case RECIEVE_WORLD_HISTORICAL:
      return {
        ...state,
        historicalData: [
          ...state.historicalData,
          {
            name: "World",
            timeline: action.payload,
          },
        ],
      };
    case RECIEVE_COUNTRIES_CURRENT:
      return {
        ...state,
        currentData: state.currentData.concat(
          action.payload.map((item) => ({
            updated: item.updated,
            name: item.country,
            iso2: item.countryInfo.iso2,
            iso3: item.countryInfo.iso3,
            flag: item.countryInfo.flag,
            cases: item.cases,
            todayCases: item.todayCases,
            deaths: item.deaths,
            todayDeaths: item.todayDeaths,
            recovered: item.recovered,
            todayRecovered: item.todayRecovered,
            active: item.active,
            critical: item.critical,
          }))
        ),
      };
    case RECIEVE_COUNTRIES_HISTORICAL:
      return {
        ...state,
        historicalData: [
          ...state.historicalData.concat(
            action.payload.map((c) => ({
              name: c.country,
              timeline: c.timeline,
            }))
          ),
        ],
      };

    case SET_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload,
      };

    default:
      return state;
  }
};

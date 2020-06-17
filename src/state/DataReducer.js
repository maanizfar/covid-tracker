export const RECIEVE_WORLD_CURRENT = "RECIEVE_WORLD_CURRENT";
export const RECIEVE_WORLD_HISTORICAL = "RECIEVE_WORLD_HISTORICAL";
export const RECIEVE_COUNTRIES_CURRENT = "RECIEVE_COUNTRIES_CURRENT";
export const RECIEVE_COUNTRIES_HISTORICAL = "RECIEVE_COUNTRIES_HISTORICAL";
export const SET_COUNTRY = "SET_COUNTRY";

export default (state, action) => {
  switch (action.type) {
    case RECIEVE_WORLD_CURRENT:
      return {
        ...state,
        worldCurrentData: action.payload,
      };

    case RECIEVE_WORLD_HISTORICAL:
      return {
        ...state,
        worldHistoricalData: action.payload,
      };
    case RECIEVE_COUNTRIES_CURRENT:
      return {
        ...state,
        countriesCurrentData: action.payload,
      };
    case RECIEVE_COUNTRIES_HISTORICAL:
      return {
        ...state,
        countriesHistoricalData: action.payload,
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

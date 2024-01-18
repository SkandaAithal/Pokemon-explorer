const filterReducerFunction = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ALL_FILTER_DATA":
      return {
        ...state,
        typeArray: action.payload.type.results,
        habitatArray: action.payload.habitat.results,
        colorArray: action.payload.color.results,
      };
    case "END_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    case "CLEAR_DATA_ABILITY":
      return {
        ...state,
        filteredDataArrayABility: [],
      };

    case "FILTER_DATA_ABILITY":
      return {
        ...state,
        filteredDataArrayABility: [
          ...state.filteredDataArrayABility,
          action.payload,
        ],
      };

    case "CLEAR_DATA_TYPE":
      return {
        ...state,
        filteredDataArrayType: [],
      };

    case "FILTER_DATA_TYPE":
      return {
        ...state,
        filteredDataArrayType: [...state.filteredDataArrayType, action.payload],
      };

    case "CLEAR_DATA_HABITAT":
      return {
        ...state,
        filteredDataArrayHabitat: [],
      };
    case "FILTER_DATA_HABITAT":
      return {
        ...state,
        filteredDataArrayHabitat: [
          ...state.filteredDataArrayHabitat,
          action.payload,
        ],
      };
    case "CLEAR_DATA_COLOR":
      return {
        ...state,
        filteredDataArrayColor: [],
      };
    case "FILTER_DATA_COLOR":
      return {
        ...state,
        filteredDataArrayColor: [
          ...state.filteredDataArrayColor,
          action.payload,
        ],
      };

    case "CLEAR_FILTER":
      return {
        ...state,
        filteredDataArrayABility: [],
        filteredDataArrayType: [],
        filteredDataArrayHabitat: [],
        filteredDataArrayColor: [],
        color: "",
        ability: "",
        habitat: "",
        type: "",
      };
    case "ABILITY":
      return {
        ...state,
        ability: action.payload,
      };

    case "TYPE":
      return {
        ...state,
        type: action.payload,
      };

    case "COLOR":
      return {
        ...state,
        color: action.payload,
      };

    case "HABITAT":
      return {
        ...state,
        habitat: action.payload,
      };
  }
};
export default filterReducerFunction;

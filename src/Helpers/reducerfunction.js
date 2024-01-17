const reducerFunction = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "END_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    case "GET_POKEMONS":
      return {
        ...state,
        results: [...state.results, action.payload],
      };

    case "TOTAL_COUNT":
      return {
        ...state,
        count: action.payload,
        offset: state.offset + 10,
      };
  }
};

export default reducerFunction;

import { createContext } from "react";

// query is the state
// SearchHandler is a function for changing the state.
export const SearchContext = createContext()
  
  // Defining a simple HOC component
const SearchContextProvider = ({children}) => {
    const [query, setQuery] = useState({
        category: ''
    });
  
    
  
    return (
      <SearchContext.Provider
        value={{query}}
      >
        {props.children}
      </SearchContext.Provider>
    );
};
  
export default SearchContextProvider;
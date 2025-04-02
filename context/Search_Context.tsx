import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
});

export const useSearch = () => useContext(SearchContext);

interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

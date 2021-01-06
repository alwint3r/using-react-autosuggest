import { useCallback, useState } from "react";
import AutoSuggest from "react-autosuggest";
import "./App.css";

const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        (lang) =>
          lang.name.toLocaleLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionFetchRequested = useCallback(({ value }) => {
    setSuggestions(getSuggestions(value));
  }, []);

  const onSuggestionClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  const onChange = useCallback((event, { newValue }) => {
    setValue(newValue);
  }, []);

  const inputProps = {
    placeholder: "Type a programming language",
    value,
    onChange,
  };

  return (
    <div className="App">
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionFetchRequested}
        onSuggestionsClearRequested={onSuggestionClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
}

export default App;

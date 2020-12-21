import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import classes from "./searchInput.module.scss";

const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={classes.container}>
      <SearchIcon className={classes.icon} />
      <input
        placeholder="Search patient"
        autoComplete="off"
        className={classes.input}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          props.rerenderListHandler(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;

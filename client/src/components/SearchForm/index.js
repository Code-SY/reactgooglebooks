import React from "react";
import "./style.css";

function SearchForm({ q, handleInputChange, handleFormSubmit }) {
  return (
    <form className="form-inline">
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="Title" className="sr-only">
          Search 
        </label>
        <input
          className="form-control heading-subtitle "
          id="Title"
          type="text"
          value={q}
          placeholder="Book ..."
          name="q"
          onChange={handleInputChange}
          size="50"
          required />
          
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg search-button heading-subtitle">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;

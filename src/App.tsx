import React, { FC } from "react";

import "./App.css";

const App: FC = () => {
  return (
    <main>
      <form>
        <div className="form-field">
          <label htmlFor="name">Dish name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-field">
          <label htmlFor="preparation_time">Preparation time:</label>
          <input
            type="time"
            name="preparation_time"
            id="preparation_time"
            step="2"
          />
        </div>
        <div className="form-field">
          <label htmlFor="type">Dish type:</label>

          <select name="type" id="dish-type">
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>
      </form>
    </main>
  );
};

export default App;

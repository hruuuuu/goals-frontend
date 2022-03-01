import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import LogFoodLabel from './LogFoodLabel';
import LogFoodItem from './LogFoodItem';
import LogFoodFieldItem from './LogFoodFieldItem';

function LogFoodFieldList(props) {
  const { editMode, foodFields, setFoodFields, isEmptyFields, dietlogFood } =
    props;

  const isEmptyFood = dietlogFood.length === 0;
  const showLabel = !isEmptyFields || editMode || !isEmptyFood;

  return (
    <>
      <div className="c-dietlog-fields">
        {showLabel && (
          <LogFoodLabel editMode={editMode} isEmptyFields={isEmptyFields} />
        )}
        {!isEmptyFood ||
          (!editMode &&
            dietlogFood.map((food) => {
              return (
                <LogFoodItem
                  key={uuidv4()}
                  data={food}
                  editMode={editMode}
                  foodFields={foodFields}
                  setFoodFields={setFoodFields}
                />
              );
            }))}
        {!isEmptyFood &&
          !editMode &&
          dietlogFood.map((food) => {
            return (
              <LogFoodItem
                key={uuidv4()}
                data={food}
                editMode={editMode}
                fields={foodFields}
                setFields={setFoodFields}
              />
            );
          })}
        {editMode &&
          foodFields.map((food) => {
            return (
              <LogFoodItem
                key={uuidv4()}
                data={food}
                editMode={editMode}
                fields={foodFields}
                setFields={setFoodFields}
              />
            );
          })}
        {editMode && (
          <LogFoodFieldItem
            key={uuidv4()}
            fields={foodFields}
            setFields={setFoodFields}
          />
        )}
      </div>
    </>
  );
}

export default LogFoodFieldList;

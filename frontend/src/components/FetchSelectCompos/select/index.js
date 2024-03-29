import React from "react";

import { Select } from "./styles";

const Selected =({ data = [], action = () => {}, current, next,name }) => {
  return (
    <Select className='form-control w-75' name={name} onChange={action({ current, next,name })}>
      <option value="0">Select Value</option>
      {data.map(({ id = 0, name = 0 }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};


export default Selected;

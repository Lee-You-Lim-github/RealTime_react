import { useEffect, useState } from "react";

function Reviewradio({ name, handleFieldChange }) {
  return (
    <div onChange={handleFieldChange}>
      <input type="radio" name={name} value="매우좋아요" className="mx-1" />
      🥰 매우좋아요
      <input type="radio" name={name} value="좋아요" className="mx-1" />
      😃좋아요
      <input type="radio" name={name} value="보통이에요" className="mx-1" />
      😶보통이에요
      <input type="radio" name={name} value="별로예요" className="mx-1" />
      😕별로예요
      <input type="radio" name={name} value="싫어요" className="mx-1" />
      😣싫어요
    </div>
  );
}

export default Reviewradio;

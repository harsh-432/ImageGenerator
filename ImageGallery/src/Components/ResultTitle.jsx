import React, { useContext } from "react";
import { stateContext } from "../Context/StateContextProvider";

function ResultTitle() {
  const { query } = useContext(stateContext);
  return (
    <div className="py-4 text-xl sm:text-4xl dark:text-white w-full border-b overflow-hidden font-bold sm:text-center px-6">
      <span>RESULT FOR : {query.toUpperCase()}</span>
    </div>
  );
}

export default ResultTitle;

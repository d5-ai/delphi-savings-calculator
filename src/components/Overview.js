import React from "react";

const Overview = (props) => {
  return (
    <div>
      <h3>Overview</h3>
      This is a simple return's calculator for{" "}
      <a
        href="https://delphi.akropolis.io/savings"
        target="_blank"
        rel="noopener noreferrer"
      >
        Delphi
      </a>{" "}
      powered by{" "}
      <a href="https://akropolis.io/" target="_blank" rel="noopener noreferrer">
        Akropolis
      </a>
      <div>There are currently {props.activeMembers} active members</div>
    </div>
  );
};

export default Overview;

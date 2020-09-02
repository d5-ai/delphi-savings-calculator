import React, { Component } from "react";
import Overview from "./Overview";
import PoolList from "./PoolList";
import getPoolAPYDetails from "../api/TheGraphApi";

class App extends Component {
  state = {
    poolStats: [],
  };

  // gets pool stats and sets state
  async updatePoolSats() {
    const poolDetails = await getPoolAPYDetails();
    this.setState({ poolStats: poolDetails.data.savingsPools });
    console.log(poolDetails.data.savingsPools);
  }

  // load pool stats
  async componentDidMount() {
    await this.updatePoolSats();
    // run every 20 seconds
    setInterval(this.updatePoolSats.bind(this), 20000);
  }

  render() {
    return (
      <div
        style={{ fontFamily: '"Fira Code", monospace', textAlign: "center" }}
      >
        <h1>
          <br /> Delphi Akropolis Savings's Calculator
        </h1>
        <hr /> <Overview />
        <hr />
        <PoolList pools={this.state.poolStats} />
      </div>
    );
  }
}
export default App;

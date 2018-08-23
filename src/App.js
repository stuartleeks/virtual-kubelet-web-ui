import React, { Component } from 'react';
import './App.css';

import PodList from './PodList'
import PodDetail from './PodDetail'

class App extends Component {
  state = {
    pods: [],
    selectedPod: null
  };
  componentDidMount() {
    // TODO need to parameterise this/pull from config
    this.refreshPods();

    // TODO - start a refresh timer
  }
  refreshPods() {
    const url = "http://localhost:5000/getPods";
    fetch(url)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        this.setState({ pods: result, selectedPod: null });
      });
  }
  showPod = (namespace, podname) => {
    const selectedPod = this.state.pods.filter((p, i) => p.metadata.namespace === namespace && p.metadata.name === podname)[0];
    this.setState({ selectedPod: selectedPod });
  }
  killPod = (pod) => {
    fetch(
      "http://localhost:5000/deletePod", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pod),
      },
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Virtual Kubelet - Web Provider UI</h1>
        </header>
        <div className="container">
          <h2>Pods</h2>
          <button onClick={() => this.refreshPods()}>Refresh</button>
          <PodList pods={this.state.pods} selectHandler={this.showPod} />
          <h2>Selected pod</h2>
          <PodDetail pod={this.state.selectedPod} killPod={this.killPod} />
        </div>
      </div>
    );
  }
}

export default App;

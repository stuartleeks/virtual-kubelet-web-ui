import React, { Component } from 'react';
import './App.css';

import PodList from './PodList'
import PodDetail from './PodDetail'

// TODO need to parameterise this/pull from config
const baseUrl = "http://localhost:5000"
class App extends Component {
  state = {
    pods: [],
    selectedPod: null
  };
  componentDidMount() {
    this.refreshPods();

    setInterval(() => this.refreshPods(), 1000);

    // TODO - start a refresh timer
  }
  refreshPods() {
    const url = `${baseUrl}/getPods`;
    fetch(url)
      .then(result => result.json())
      .then(result => {
        let newState = { pods: result };
        let selectedPod = this.state.selectedPod;
        if (selectedPod !== null) {
          // check if selectedPod is still in the pod list and clear if not
          var matches = newState.pods.filter((pod, index) => pod.metadata.namespace === selectedPod.metadata.namespace && pod.metadata.name === selectedPod.metadata.name);
          if (matches.length === 0) {
            newState.selectedPod = null;
          }
        }

        this.setState(newState);
      });
  }
  showPod = (namespace, podname) => {
    const selectedPod = this.state.pods.filter((p, i) => p.metadata.namespace === namespace && p.metadata.name === podname)[0];
    this.setState({ selectedPod: selectedPod });
  }
  killPod = (pod) => {
    fetch(
      `${baseUrl}/deletePod`, {
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

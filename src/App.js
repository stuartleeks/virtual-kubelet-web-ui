import React, { Component } from 'react';
import './App.css';

import PodList from './PodList'
import PodDetail from './PodDetail'

// TODO need to parameterise this/pull from config
class App extends Component {
  state = {
    baseUrl : "",
    error: null,
    pods: [],
    selectedPod: null
  };
  componentDidMount() {
    let rootElt = document.getElementById("root");
    let baseUrl = rootElt.attributes["data-api-url"].value;
    this.setState({baseUrl: baseUrl});
    this.refreshPods();

    setInterval(() => this.refreshPods(), 1000); // TODO make interval configurable
  }
  refreshPods() {
    const url = `${this.state.baseUrl}/getPods`;
    fetch(url)
      .then(result => result.json())
      .then(result => {
        let newState = { pods: result,  error: null};
        let selectedPod = this.state.selectedPod;
        if (selectedPod !== null) {
          // check if selectedPod is still in the pod list and clear if not
          var matches = newState.pods.filter((pod, index) => pod.metadata.namespace === selectedPod.metadata.namespace && pod.metadata.name === selectedPod.metadata.name);
          if (matches.length === 0) {
            newState.selectedPod = null;
          }
        }

        this.setState(newState);
      })
      .catch(error =>{
          this.setState({pods: [], error: error.message});
      });
  }
  showPod = (namespace, podname) => {
    const selectedPod = this.state.pods.filter((p, i) => p.metadata.namespace === namespace && p.metadata.name === podname)[0];
    this.setState({ selectedPod: selectedPod });
  }
  killPod = (pod) => {
    fetch(
      `${this.state.baseUrl}/deletePod`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pod),
      },
    );
  }
  updateBaseUrl = event =>{
    this.setState({baseUrl: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Virtual Kubelet - Web Provider UI</h1>
        </header>
        <div className="container">
          <div>API Url: <input type="text" value={this.state.baseUrl} onChange={this.updateBaseUrl} /></div>
          <div className="error">{this.state.error}</div>
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

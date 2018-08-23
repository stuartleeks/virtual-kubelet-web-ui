import React, { Component } from 'react';

const PodSummary = props => {
    const { pod, killPod } = props;
    return (
        <div>
            <div className="pod-summary">
                <div>
                    <span className="title" >namespace</span>
                    <span className="value" >{pod.metadata.namespace}</span>
                </div>
                <div>
                    <span className="title" >podname</span>
                    <span className="value" >{pod.metadata.name}</span>
                </div>
                <div>
                    <span className="title" >phase</span>
                    <span className="value" >{pod.status.phase}</span>
                </div>
                <button onClick={() => killPod(pod)}>Stop pod</button>
            </div>
            <div className="pod-container-list">
                <h3>Containers</h3>
                <ContainerList pod={pod} />
            </div>
        </div>
    )
}
const ContainerList = props => {
    const { pod } = props;
    const containers = pod.spec.containers.map((container, index) => {
        const containerStatuses = pod.status.containerStatuses.filter((c, i) => c.name === container.name);
        const containerStatus = containerStatuses[0];
        return (
            <div key={index}>
                <h4>Container: {container.name} ({container.image})</h4>
                <div>
                    <span className="title" >image</span>
                    <span className="value" >{container.image}</span>
                </div>
                <div>
                    <span className="title" >ports</span>
                    <span className="value" ><ContainerPortList container={container} /></span>
                </div>
                <div>
                    <span className="title" >ready</span>
                    <span className="value" >{containerStatus.ready ? "true" : "false"}</span>
                </div>
                <div>
                    <span className="title" >restart count</span>
                    <span className="value" >{containerStatus.restartCount}</span>
                </div>
                <div>
                    <span className="title" >state</span>
                    <span className="value" >{JSON.stringify(containerStatus.state)}</span>
                </div>
            </div>
        )
    });
    return <div>{containers}</div>
}
const ContainerPortList = props => {
    const { container } = props;
    const ports = container.ports.map((port, index) => {
        let separator = index > 0 ? ", " : ""
        return <span key={index}>{separator}{port.name} ({port.containerPort}/{port.protocol})</span>
    });
    return (<span>{ports}</span>)
}
class PodDetail extends Component {
    render() {
        const { pod, killPod } = this.props;
        const noPod = (<div>no pod selected</div>);
        let gotPod;
        if (pod !== null) {
            gotPod = (
                <div>
                    <PodSummary pod={pod} killPod={killPod} />
                </div>
            );
        }

        let content = pod === null ? noPod : gotPod;
        return (
            <div className="selected-pod">{content}</div>
        );
    }

}

export default PodDetail;
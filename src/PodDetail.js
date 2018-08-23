import React, { Component } from 'react';

class PodDetail extends Component {
    render() {
        const { pod, killPod } = this.props;
        const noPod = (<div>no pod selected</div>);
        let gotPod;
        if (pod !== null) {
            gotPod = (
                <div>
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
                    <button onClick={()=>killPod(pod)}>Stop pod</button>
                </div>
            );
        }

        let content = pod === null ? noPod : gotPod;
        return (
            <div className="selectedPod">{content}</div>
        );
    }

}

export default PodDetail;
import React, { Component } from 'react';


const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Namespace</th>
                <th>Name</th>
                <th>State</th>
                <th>Containers</th>
            </tr>
        </thead>
    );
}
const TableBody = props => {

    const rows = props.pods.map((pod, index) => {
        return (
            <tr key={index}>
                <td>{pod.metadata.namespace}</td>
                <td><button className="link-button" onClick={() => props.selectHandler(pod.metadata.namespace, pod.metadata.name)}>{pod.metadata.name}</button></td>
                <td>{pod.status.phase}</td>
                <td>{pod.spec.containers.length}</td>
            </tr>
        );
    });
    return <tbody>{rows}</tbody>
}
class PodList extends Component{
    render(){
        const {pods, selectHandler} = this.props;

        return(
            <table>
                <TableHeader />
                <TableBody pods={pods} selectHandler={selectHandler}/>
            </table>
        );
    }

}

export default PodList;
import React, { Component } from 'react';
import TigManager from '../../modules/TigManager';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg
} from 'reactstrap';


class TigDetail extends Component {

    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        tungstenSize: "",
        fillerMetal: "",
        amperage: "",
        cupSize: "",
        jobNotes: "",
        uploadedFile: "",
        loadingStatus: false,
    }

    componentDidMount() {
        //get(id) from TigManager and hang on to that data; put it into state
        TigManager.get(this.props.jobId)
            .then((job) => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    tungstenSize: job.tungstenSize,
                    fillerMetal: job.fillerMetal,
                    amperage: job.amperage,
                    cupSize: job.cupSize,
                    jobNotes: job.jobNotes,
                    uploadedFile: job.img,
                    loadingStatus: false
                });
            });
    }

    handleDelete = () => {
        //invoke the delete function in jobManger and re-direct to the job list.
        this.setState({ loadingStatus: true })
        TigManager.delete(this.props.jobId)
            .then(() => this.props.history.push("/"))
    }
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Process: GTAW</CardTitle>
                        <CardText>Date: {this.state.date}</CardText>
                        <CardText>Base Metal:{this.state.baseMetal}</CardText>
                        <CardText>Weld Type:{this.state.weldType}</CardText>
                        <CardText>Tungsten:{this.state.tungstenSize}</CardText>
                        <CardText>Filler Metal:{this.state.fillerMetal}</CardText>
                        <CardText>Amperage:{this.state.amperage}</CardText>
                        <CardText>Cup #:{this.state.cupSize}</CardText>
                        <CardText>Job Notes:{this.state.jobNotes}</CardText>
                        <CardImg src={this.state.uploadedFile}></CardImg>
                    </CardBody>
                    <button className="cancel-button" onClick={() => { this.props.history.push("/") }}>Back To Log</button>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/tigJobs/${this.props.jobId}/edit`) }}>Edit Details</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </Card>
            </div>
        );
    }
}

export default TigDetail;
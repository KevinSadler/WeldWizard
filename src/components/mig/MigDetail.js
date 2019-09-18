import React, { Component } from 'react';
import MigManager from '../../modules/MigManager';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg
} from 'reactstrap';

class MigDetail extends Component {

    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        voltage: "",
        wireSpeed: "",
        wireSize: "",
        jobNotes: "",
        uploadedFile: "",
        loadingStatus: false,
    }

    componentDidMount() {
        //get(id) from MigManager and hang on to that data; put it into state
        MigManager.get(this.props.jobId)
            .then((job) => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    voltage: job.voltage,
                    wireSpeed: job.wireSpeed,
                    wireSize: job.wireSize,
                    jobNotes: job.jobNotes,
                    uploadedFile: job.img,
                    loadingStatus: false
                });
            });
    }

    handleDelete = () => {
        //invoke the delete function in jobManger and re-direct to the job list.
        this.setState({ loadingStatus: true })
        MigManager.delete(this.props.jobId)
            .then(() => this.props.history.push("/"))
    }
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Process: GMAW</CardTitle>
                        <CardText>Date: {this.state.date}</CardText>
                        <CardText>Base Metal:{this.state.baseMetal}</CardText>
                        <CardText>Weld Type:{this.state.weldType}</CardText>
                        <CardText>Voltage:{this.state.voltage}</CardText>
                        <CardText>Wire Size:{this.state.wireSize}</CardText>
                        <CardText>Wire Speed:{this.state.wireSpeed}</CardText>
                        <CardText>Job Notes:{this.state.jobNotes}</CardText>
                        <CardImg src={this.state.uploadedFile}></CardImg>
                    </CardBody>
                    <CardBody>
                        <img width="100%" src={this.state.img} alt="" />
                    </CardBody>
                    <button className="cancel-button" onClick={() => { this.props.history.push("/") }}>Back To Log</button>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/migJobs/${this.props.jobId}/edit`) }}>Edit Details</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </Card>
            </div>
        );
    }
}

export default MigDetail;
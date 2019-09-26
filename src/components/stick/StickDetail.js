import React, { Component } from 'react';
import StickManager from '../../modules/StickManager';
import {
    Card, CardText, CardBody,
    CardTitle, CardImg
} from 'reactstrap';
import '../tig/CardDetail.css'

class StickDetail extends Component {

    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        electrode: "",
        amperage: "",
        jobNotes: "",
        uploadedFile: "",
        loadingStatus: false,
    }

    componentDidMount() {
        //get(id) from StickManager and hang on to that data; put it into state
        StickManager.get(this.props.jobId)
            .then((job) => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    electrode: job.electrode,
                    amperage: job.amperage,
                    jobNotes: job.jobNotes,
                    uploadedFile: job.img,
                    loadingStatus: false
                });
            });
    }

    handleDelete = () => {
        //invoke the delete function in jobManger and re-direct to the job list.
        this.setState({ loadingStatus: true })
        StickManager.delete(this.props.jobId)
            .then(() => this.props.history.push("/"))
    }
    render() {
        return (
            <div>
                <Card className="detailCard">
                    <CardBody >
                        <CardTitle>Process: GTAW</CardTitle>
                        <CardText>Date: {this.state.date}</CardText>
                        <CardText>Base Metal: {this.state.baseMetal}</CardText>
                        <CardText>Weld Type: {this.state.weldType}</CardText>
                        <CardText>Electrode: {this.state.electrode}</CardText>
                        <CardText>Amperage: {this.state.amperage}</CardText>
                        <CardText>Job Notes: {this.state.jobNotes}</CardText>
                        <CardImg className="detailImg" src={this.state.uploadedFile} alt="Stick Weld Image"></CardImg>
                    </CardBody>
                    <div className="buttonsDiv">
                    <button className="cancel-button" onClick={() => { this.props.history.push("/") }}>Back To Log</button>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/stickJobs/${this.props.jobId}/edit`) }}>Edit Details</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default StickDetail;
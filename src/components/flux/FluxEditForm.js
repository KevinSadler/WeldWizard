import React, { Component } from "react"
import FluxManager from "../../modules/FluxManager"

class FluxEditForm extends Component {
    //set the initial state
    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        wireSize: "",
        voltage: "",
        wireSpeed: "",
        jobNotes: "",
        img: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingJob = evt => {
        evt.preventDefault()
        var userInfo = JSON.parse(sessionStorage.getItem("credentials"))
        var activeUserNum = userInfo.activeUserId
        // this.setState({ loadingStatus: true });
        const editedJob = {
            id: this.props.match.params.jobId,
            userId: activeUserNum,
            date: this.state.date,
            baseMetal: this.state.baseMetal,
            weldType: this.state.weldType,
            wireSize: this.state.wireSize,
            voltage: this.state.voltage,
            wireSpeed: this.state.wireSpeed,
            img: this.state.img,
            jobNotes: this.state.jobNotes,
        };

        FluxManager.update(editedJob)
            .then(() => this.props.history.push("/fluxJobs/" + this.props.jobId))
    }

    componentDidMount() {
        FluxManager.get(this.props.match.params.jobId)
            .then(job => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    wireSize: job.wireSize,
                    voltage: job.voltage,
                    wireSpeed: job.wireSpeed,
                    img: job.img,
                    jobNotes: job.jobNotes,
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="date"
                                value={this.state.date}
                            />
                            <label htmlFor="jobDate">Job Date</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="baseMetal"
                                value={this.state.baseMetal}
                            />
                            <label htmlFor="baseMetal">Base Metal</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="weldType"
                                value={this.state.weldType}
                            />
                            <label htmlFor="weldType">Weld Type</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="wireSize"
                                value={this.state.wireSize}
                            />
                            <label htmlFor="wireSize">Wire Size</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="voltage" 
                                value={this.state.voltage}/>
                            <label htmlFor="voltage">Voltage</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="wireSpeed" 
                                value={this.state.wireSpeed}/>
                            <label htmlFor="wireSpeed">Wire Speed</label>
                            <label htmlFor="jobNotes">Job Notes</label>
                            <textarea id="jobNotes" required onChange={this.handleFieldChange} value={this.state.jobNotes}></textarea>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.updateExistingJob}
                            >Update Job</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default FluxEditForm
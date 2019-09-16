import React, { Component } from "react"
import TigManager from "../../modules/TigManager"

class TigEditForm extends Component {
    //set the initial state
    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        tungstenSize: "",
        fillerMetal: "",
        amperage: "",
        cupSize: "",
        jobNotes: "",
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
            tungstenSize: this.state.tungstenSize,
            fillerMetal: this.state.fillerMetal,
            amperage: this.state.amperage,
            cupSize: this.state.cupSize,
            jobNotes: this.state.jobNotes,
        };

        TigManager.update(editedJob)
            .then(() => this.props.history.push("/tigJobs/" + this.props.jobId))
    }

    componentDidMount() {
        TigManager.get(this.props.match.params.jobId)
            .then(job => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    tungstenSize: job.tungstenSize,
                    fillerMetal: job.fillerMetal,
                    amperage: job.amperage,
                    cupSize: job.cupSize,
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
                                id="jobDate"
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
                                id="tungstenSize"
                                value={this.state.tungstenSize}
                            />
                            <label htmlFor="tungstenSize">Tungsten Size</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="fillerMetal"
                                value={this.state.fillerMetal}
                            />
                            <label htmlFor="fillerMetal">Filler Metal</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="amperage" 
                                value={this.state.amperage}/>
                            <label htmlFor="amperage">Amperage</label>
                            <label htmlFor="cupSize">Cup #</label>
                            <br />
                            <select
                                required onChange={this.handleFieldChange}
                                id="cupSize" 
                                value={this.state.cupSize}>
                                <option value="4" label="4"></option>
                                <option value="5" label="5"></option>
                                <option value="6" label="6"></option>
                                <option value="7" label="7"></option>
                                <option value="8" label="8"></option>
                                <option value="10" label="10"></option>
                                <option value="12" label="12"></option>
                            </select>
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

export default TigEditForm
import React, { Component } from 'react';
import Select from "react-select";
import StickManager from '../../modules/StickManager';
import './StickForm.css'

class MigForm extends Component {
    state = {
        jobDate: "",
        baseMetal: "",
        weldType: "",
        electrode: "",
        amperage: "",
        jobNotes: "",
        // userId: sessionStorage.getItem("credentials.activeUserId"),
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    /*  Local method for validation, set weldType, create event      object, invoke the StickManager post method, and redirect to the full event list
    */
    createNewJob = evt => {
        evt.preventDefault();
        if (this.state.jobDate === "" || this.state.baseMetal === "" || this.state.weldType === "" || this.state.amperage === "" || this.state.wireSpeed === "" || this.state.wireSize === "") {
            window.alert("Please fill out all input fields");
        } else {
            var userInfo = JSON.parse(sessionStorage.getItem("credentials"))
            var activeUserNum = userInfo.activeUserId
            this.setState({ loadingStatus: true });
            const newJob = {
                date: this.state.jobDate,
                baseMetal: this.state.baseMetal,
                weldType: this.state.weldType,
                electrode: this.state.electrode,
                amperage: this.state.amperage,
                jobNotes: this.state.jobNotes,
                userId: activeUserNum
            };

            // Create the event and redirect user to event list
            StickManager.post(newJob)
                .then(() => this.props.history.push("/"));
        }
    };

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
                            />
                            <label htmlFor="jobDate">Job Date</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="baseMetal"
                            />
                            <label htmlFor="baseMetal">Base Metal</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="weldType"
                            />
                            <label htmlFor="weldType">Weld Type</label>
                            <label htmlFor="electrode">Electrode</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="electrode" />
                            <br />
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="amperage" />
                            <label htmlFor="amperage">Amperage</label>
                            <br />
                            <textarea id="jobNotes" required onChange={this.handleFieldChange}></textarea>
                            <label htmlFor="jobNotes">Job Notes</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.createNewJob}
                            >Add Event</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default MigForm
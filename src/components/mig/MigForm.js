import React, { Component } from 'react';
import MigManager from '../../modules/MigManager';
import './MigForm.css'

class MigForm extends Component {
    state = {
        jobDate: "",
        baseMetal: "",
        weldType: "",
        voltage: "",
        wireSpeed: 0,
        wireSize: "",
        jobNotes: "",
        img: "",
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    /*  Local method for validation, set weldType, create event      object, invoke the MigManager post method, and redirect to the full event list
    */
    createNewJob = evt => {
        evt.preventDefault();
        if (this.state.jobDate === "" || this.state.baseMetal === "" || this.state.weldType === "" || this.state.voltage === "" || this.state.wireSpeed === "" || this.state.wireSize === "") {
            window.alert("Please fill out all input fields");
        } else {
            var userInfo = JSON.parse(sessionStorage.getItem("credentials"))
            var activeUserNum = userInfo.activeUserId
            this.setState({ loadingStatus: true });
            const newJob = {
                date: this.state.jobDate,
                baseMetal: this.state.baseMetal,
                weldType: this.state.weldType,
                voltage: this.state.voltage,
                wireSpeed: this.state.wireSpeed,
                wireSize: this.state.wireSize,
                jobNotes: this.state.jobNotes,
                img: this.state.img,
                userId: activeUserNum
            };

            // Create the event and redirect user to event list
            MigManager.post(newJob)
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
                            <label htmlFor="wireSize">Wire Size</label>
                            <select
                                required
                                onChange={this.handleFieldChange}
                                id="wireSize">
                                <option value=".024">.024"</option>
                                <option value=".030">.030"</option>
                                <option value=".035">.035"</option>
                                <option value=".045">.045"</option>
                            </select>
                            <br/>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="voltage" />
                            <label htmlFor="voltage">Voltage</label>
                            <br/>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="wireSpeed" />
                            <label htmlFor="wireSpeed">Wire Speed</label>
                            <br/>
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
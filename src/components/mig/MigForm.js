import React, { Component } from 'react';
import MigManager from '../../modules/MigManager';
import Dropzone from "react-dropzone";
import request from 'superagent'
import './MigForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'u9jkksfb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/de3gijcqo/image/upload';


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
        loadingStatus: false,
        uploadedFileCloudinaryUrl: '',
        uploadedFile: '',
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // Code for uploading images to Cloudinary

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

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
                img: this.state.uploadedFileCloudinaryUrl,
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
                    <fieldset className="inputFormFieldset">
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
                            <br />
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="voltage" />
                            <label htmlFor="voltage">Voltage</label>
                            <label htmlFor="wireSpeed">Wire Speed</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="wireSpeed" />
                            <label className="alignLeft" htmlFor="jobNotes">Job Notes</label>
                            <br />
                            <textarea id="jobNotes" required onChange={this.handleFieldChange}></textarea>
                            <div className="FileUpload">
                                <Dropzone
                                    onDrop={this.onImageDrop.bind(this)}
                                    multiple={false}
                                    accept="image/*">
                                    {({ getRootProps, getInputProps }) => {
                                        return (
                                            <div
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />
                                                {
                                                    <p className="addBorder">Click Here To Add An Image</p>
                                                }
                                            </div>
                                        )
                                    }}
                                </Dropzone>
                            </div>

                            <div>
                                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                    <div>
                                        <img src={this.state.uploadedFileCloudinaryUrl} />
                                    </div>}
                            </div>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.createNewJob}
                            >Add To Log</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default MigForm
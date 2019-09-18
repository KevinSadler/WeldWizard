import React, { Component } from 'react';
import TigManager from '../../modules/TigManager';
import Dropzone from "react-dropzone";
import request from 'superagent'
import './TigForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'u9jkksfb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/de3gijcqo/image/upload';

class TigForm extends Component {
    state = {
        jobDate: "",
        baseMetal: "",
        weldType: "",
        amperage: "",
        tungstenSize: "",
        fillerMetal: "",
        cupSize: "",
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

    /*  Local method for validation, set weldType, create event      object, invoke the TigManager post method, and redirect to the full event list
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
                tungstenSize: this.state.tungstenSize,
                fillerMetal: this.state.fillerMetal,
                amperage: this.state.amperage,
                cupSize: this.state.cupSize,
                jobNotes: this.state.jobNotes,
                img: this.state.uploadedFileCloudinaryUrl,
                userId: activeUserNum
            };

            // Create the event and redirect user to event list
            TigManager.post(newJob)
                .then(() => this.props.history.push("/"));
        }
    };

    render() {

        return (
            <>
                <form>
                    <fieldset className="jobFormFieldset">
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
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="tungstenSize"
                            />
                            <label htmlFor="tungstenSize">Tungsten Size</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="fillerMetal"
                            />
                            <label htmlFor="fillerMetal">Filler Metal</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="amperage" />
                            <label htmlFor="amperage">Amperage</label>
                            <label htmlFor="cupSize">Cup #</label>
                            <br />
                            <select
                                required onChange={this.handleFieldChange}
                                id="cupSize" >
                                <option value="4" label="4"></option>
                                <option value="5" label="5"></option>
                                <option value="6" label="6"></option>
                                <option value="7" label="7"></option>
                                <option value="8" label="8"></option>
                                <option value="10" label="10"></option>
                                <option value="12" label="12"></option>
                            </select>
                            <label htmlFor="jobNotes">Job Notes</label>
                            <textarea id="jobNotes" required onChange={this.handleFieldChange}></textarea>
                            <br />
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

export default TigForm
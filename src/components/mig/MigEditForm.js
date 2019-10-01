import React, { Component } from "react"
import MigManager from "../../modules/MigManager"
import Dropzone from "react-dropzone";
import request from 'superagent'
import './MigForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'u9jkksfb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/de3gijcqo/image/upload';


class MigEditForm extends Component {
    //set the initial state
    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        wireSize: "",
        voltage: "",
        wireSpeed: "",
        jobNotes: "",
        loadingStatus: false,
        uploadedFileCloudinaryUrl: '',
        uploadedFile: '',
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

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
            jobNotes: this.state.jobNotes,
            img: this.state.uploadedFileCloudinaryUrl
        };

        MigManager.update(editedJob)
            .then(() => this.props.history.push("/migJobs/" + this.props.jobId))
    }

    componentDidMount() {
        MigManager.get(this.props.match.params.jobId)
            .then(job => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    wireSize: job.wireSize,
                    voltage: job.voltage,
                    wireSpeed: job.wireSpeed,
                    uploadedFileCloudinaryUrl: job.img,
                    jobNotes: job.jobNotes,
                });
            });
    }

    render() {
        return (
            <>
                <form className="form">
                    <fieldset className="inputFormFieldset">
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
                                id="voltage"
                                value={this.state.voltage} />
                            <label htmlFor="voltage">Voltage</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="wireSpeed"
                                value={this.state.wireSpeed} />
                            <label htmlFor="wireSpeed">Wire Speed</label>
                            <label htmlFor="jobNotes">Job Notes</label>
                            <br />
                            <textarea className="jobNotes" id="jobNotes" required onChange={this.handleFieldChange} value={this.state.jobNotes}></textarea>
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
                                className="addButton"
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

export default MigEditForm
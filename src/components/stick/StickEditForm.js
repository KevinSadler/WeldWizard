import React, { Component } from "react"
import StickManager from "../../modules/StickManager"
import Dropzone from "react-dropzone";
import request from 'superagent'
import './StickEditForm.css'

const CLOUDINARY_UPLOAD_PRESET = 'u9jkksfb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/de3gijcqo/image/upload';

class StickEditForm extends Component {
    //set the initial state
    state = {
        date: "",
        baseMetal: "",
        weldType: "",
        electrode: "",
        amperage: "",
        jobNotes: "",
        img: "",
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
            electrode: this.state.electrode,
            amperage: this.state.amperage,
            img: this.state.img,
            jobNotes: this.state.jobNotes,
            img: this.state.uploadedFileCloudinaryUrl
        };

        StickManager.update(editedJob)
            .then(() => this.props.history.push("/stickJobs/" + this.props.jobId))
    }

    componentDidMount() {
        StickManager.get(this.props.match.params.jobId)
            .then(job => {
                this.setState({
                    date: job.date,
                    baseMetal: job.baseMetal,
                    weldType: job.weldType,
                    electrode: job.electrode,
                    amperage: job.amperage,
                    img: job.img,
                    jobNotes: job.jobNotes,
                    uploadedFileCloudinaryUrl: job.img
                });
            });
    }

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
                                id="electrode"
                                value={this.state.electrode}
                            />
                            <label htmlFor="electrode">Electrode</label>
                            <input
                                type="number"
                                required onChange={this.handleFieldChange}
                                id="amperage"
                                value={this.state.amperage} />
                            <label htmlFor="amperage">Amperage</label>
                            <label htmlFor="jobNotes">Job Notes</label>
                            <textarea id="jobNotes" required onChange={this.handleFieldChange} value={this.state.jobNotes}></textarea>
                            <br/>
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
                                                <input  {...getInputProps()} />
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
                                onClick={this.updateExistingJob}
                            >Update Job</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default StickEditForm
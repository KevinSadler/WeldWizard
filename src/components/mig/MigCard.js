import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import '../tig/TigCard.css'

class MigCard extends Component {
    render() {
        return (
            <div className="jobCard">
                <Card>
                    <CardBody>
                        <CardTitle>Process: GMAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="Mig Weld Image" />
                    <CardBody>
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink href={"/migJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default MigCard;
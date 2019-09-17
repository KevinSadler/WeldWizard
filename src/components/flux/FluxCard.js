import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

class FluxCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Process: FCAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="" />
                    <CardBody>
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink href={"/fluxJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default FluxCard;
import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import './MigCard.css'

class MigCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Process: GMAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="" />
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
import React, { Component } from 'react'
import TigCard from '../tig/TigCard'
import StickCard from '../stick/StickCard'
import MigCard from '../mig/MigCard'
import FluxCard from '../flux/FluxCard'
import TigManager from '../../modules/TigManager'
import StickManager from '../../modules/StickManager'
import MigManager from '../../modules/MigManager'
import FluxManager from '../../modules/FluxManager'
// import './job.css'

class CardList extends Component {
  //define what this component needs to render
  state = {
    TigJobs: [],
    StickJobs: [],
    MigJobs: [],
    FluxJobs: []
  }

  componentDidMount() {
    TigManager.getAll()
      .then((TigJobs) => {
        this.setState({
          TigJobs: TigJobs
        })
      })
    StickManager.getAll()
    .then((StickJobs) => {
      this.setState({
        StickJobs: StickJobs
      })
    })  
    MigManager.getAll()
    .then((MigJobs) => {
      this.setState({
        MigJobs: MigJobs
      })
    })  
    FluxManager.getAll()
    .then((FluxJobs) => {
      this.setState({
        FluxJobs: FluxJobs
      })
    })  
  }

  render() {
    return (
      <section className="section-content">
        <div className="container-cards">
          {this.state.TigJobs.map(job =>
            <TigCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          )}
          {this.state.StickJobs.map(job =>
            <StickCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          )}
          {this.state.MigJobs.map(job =>
            <MigCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          )}
          {this.state.FluxJobs.map(job =>
            <FluxCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          )}
        </div>
      </section>
    )
  }
}

export default CardList
import React, { Component } from 'react'
import TigCard from '../tig/TigCard'
import StickCard from '../stick/StickCard'
import MigCard from '../mig/MigCard'
import TigManager from '../../modules/TigManager'
import StickManager from '../../modules/StickManager'
import MigManager from '../../modules/MigManager'
// import './job.css'

class CardList extends Component {
  //define what this component needs to render
  state = {
    TigJobs: [],
    StickJobs: [],
    MigJobs: []
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
        </div>
      </section>
    )
  }
}

export default CardList
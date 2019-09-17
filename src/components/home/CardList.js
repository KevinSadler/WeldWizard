import React, { Component } from 'react'
import TigCard from '../tig/TigCard'
import StickCard from '../stick/StickCard'
import TigManager from '../../modules/TigManager'
import StickManager from '../../modules/StickManager'
// import './job.css'

class CardList extends Component {
  //define what this component needs to render
  state = {
    TigJobs: [],
    StickJobs: []
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
        </div>
      </section>
    )
  }
}

export default CardList
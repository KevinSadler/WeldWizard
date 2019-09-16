import React, { Component } from 'react'
import TigCard from '../tig/TigCard'
import TigManager from '../../modules/TigManager'
// import './job.css'

class CardList extends Component {
  //define what this component needs to render
  state = {
    TigJobs: [],
  }

  componentDidMount() {
    TigManager.getAll()
      .then((TigJobs) => {
        this.setState({
          TigJobs: TigJobs
        })
      })
  }

  render() {
    return (
      <section className="section-content">
        <button type="button"
          className="btn"
          onClick={() => { this.props.history.push("/TigForm") }}>
          Add New Job
         </button>
        <div className="container-cards">
          {this.state.TigJobs.map(job =>
            <TigCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          )}
        </div>
      </section>
    )
  }
}

export default CardList
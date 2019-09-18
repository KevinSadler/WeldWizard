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
    FluxJobs: [],
    allJobs: []
  }

  componentDidMount() {
    TigManager.getAll()
      .then((TigJobs) => {
        const updateJobs = this.state.allJobs
        updateJobs.push(TigJobs)
        this.setState({
          TigJobs: TigJobs,
          allJobs: updateJobs
        })
      })
    StickManager.getAll()
      .then((StickJobs) => {
        const updateJobs = this.state.allJobs
        updateJobs.push(StickJobs)
        this.setState({
          StickJobs: StickJobs,
          allJobs: updateJobs
        })
      })
    MigManager.getAll()
      .then((MigJobs) => {
        const updateJobs = this.state.allJobs
        updateJobs.push(MigJobs)
        this.setState({
          MigJobs: MigJobs,
          allJobs: updateJobs
        })
      })
    FluxManager.getAll()
      .then((FluxJobs) => {
        const updateJobs = this.state.allJobs
        updateJobs.push(FluxJobs)
        this.setState({
          FluxJobs: FluxJobs,
          allJobs: updateJobs
        })
      })
    console.log(this.state.allJobs)
  }

  render() {
    return (
      <section className="section-content">
        <div className="radio-selector-div">
          <fieldset>
            <legend>Filter By Process:</legend>
            <p>
            All:<input type="radio" name="all" value="1" defaultChecked/>
            Mig:<input type="radio" name="mig" value="2" />
            Stick:<input type="radio" name="stick" value="3" />
            Tig:<input type="radio" name="tig" value="4" />
            Flux:<input type="radio" name="flux" value="5" />
            </p>
          </fieldset>
        </div>
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
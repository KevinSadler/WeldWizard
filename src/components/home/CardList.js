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
  constructor(props) {
    super(props)

    this.state = {
      TigJobs: [],
      StickJobs: [],
      MigJobs: [],
      FluxJobs: [],
      selectedOption: "all"
    }
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  handleRadioChange(event) {
    this.setState({
      selectedOption: event.target.value 
    })
  }


  componentDidMount() {
    if (this.state.radioNum === 2) {
      MigManager.getAll()
        .then((MigJobs) => {
          this.setState({
            MigJobs: MigJobs,
          })
        })
    }
    else if (this.state.radioNum === 3) {
      StickManager.getAll()
        .then((StickJobs) => {
          this.setState({
            StickJobs: StickJobs,
          })
        })
    }
    else if (this.state.radioNum === 4) {
      TigManager.getAll()
        .then((TigJobs) => {
          this.setState({
            TigJobs: TigJobs,
          })
        })
    }
    else if (this.state.radioNum === 5) {
      FluxManager.getAll()
        .then((FluxJobs) => {
          this.setState({
            FluxJobs: FluxJobs,
          })
        })
    }
    else {
      MigManager.getAll()
        .then((MigJobs) => {
          this.setState({
            MigJobs: MigJobs,
          })
        })
      StickManager.getAll()
        .then((StickJobs) => {
          this.setState({
            StickJobs: StickJobs,
          })
        })
      TigManager.getAll()
        .then((TigJobs) => {
          this.setState({
            TigJobs: TigJobs,
          })
        })
      FluxManager.getAll()
        .then((FluxJobs) => {
          this.setState({
            FluxJobs: FluxJobs,
          })
        })
    }
  }

  render() {
    return (
      <section className="section-content">
        <div className="radio-selector-div">
          <fieldset>
            <legend>Filter By Process:</legend>
            <p>
              All:<input type="radio" name="selectedOption" value="all"  onChange={this.handleRadioChange}  />
              Mig:<input type="radio" name="selectedOption" value="mig"  onChange={this.handleRadioChange} />
              Stick:<input type="radio" name="selectedOption" value="stick"  onChange={this.handleRadioChange} />
              Tig:<input type="radio" name="selectedOption" value="tig"  onChange={this.handleRadioChange} />
              Flux:<input type="radio" name="selectedOption" value="flux"  onChange={this.handleRadioChange} />
            </p>
          </fieldset>
        </div>
        <div className="container-cards">
          {this.state.selectedOption === "tig" || this.state.selectedOption === "all"? this.state.TigJobs.map(job =>
            <TigCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "stick" || this.state.selectedOption === "all"? this.state.StickJobs.map(job =>
            <StickCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "mig" || this.state.selectedOption === "all"? this.state.MigJobs.map(job =>
            <MigCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "flux" || this.state.selectedOption === "all"? this.state.FluxJobs.map(job =>
            <FluxCard key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
        </div>
      </section>
    )
  }
}


export default CardList
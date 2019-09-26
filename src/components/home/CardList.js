import React, { Component } from 'react'
import TigCard from '../tig/TigCard'
import StickCard from '../stick/StickCard'
import MigCard from '../mig/MigCard'
import FluxCard from '../flux/FluxCard'
import TigManager from '../../modules/TigManager'
import StickManager from '../../modules/StickManager'
import MigManager from '../../modules/MigManager'
import FluxManager from '../../modules/FluxManager'
import './CardList.css'

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
    const activeUser = JSON.parse(sessionStorage.getItem("credentials"))
    const userId = activeUser.activeUserId
      MigManager.getUsersMigJobs(userId)
        .then((MigJobs) => {
          this.setState({
            MigJobs: MigJobs,
          })
        })
    
      StickManager.getUsersStickJobs(userId)
        .then((StickJobs) => {
          this.setState({
            StickJobs: StickJobs,
          })
        })
    
      TigManager.getUsersTigJobs(userId)
        .then((TigJobs) => {
          this.setState({
            TigJobs: TigJobs,
          })
        })
    
      FluxManager.getUsersFluxJobs(userId)
        .then((FluxJobs) => {
          this.setState({
            FluxJobs: FluxJobs,
          })
        })
    }
  

  render() {
    return (
      <section className="section-content">
        <div className="radio-selector-div">
          <fieldset className="radio-selector">
            <legend>Filter By Process:</legend>
            <p>
              All:<input className="radio-option" type="radio" name="selectedOption" value="all"  onChange={this.handleRadioChange}  />
              Mig:<input className="radio-option" type="radio" name="selectedOption" value="mig"  onChange={this.handleRadioChange} />
              Stick:<input className="radio-option" type="radio" name="selectedOption" value="stick"  onChange={this.handleRadioChange} />
              Tig:<input className="radio-option" type="radio" name="selectedOption" value="tig"  onChange={this.handleRadioChange} />
              Flux:<input className="radio-option" type="radio" name="selectedOption" value="flux"  onChange={this.handleRadioChange} />
            </p>
          </fieldset>
        </div>
        <div className="container-cards">
          {this.state.selectedOption === "tig" || this.state.selectedOption === "all"? this.state.TigJobs.map(job =>
            <TigCard  key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "stick" || this.state.selectedOption === "all"? this.state.StickJobs.map(job =>
            <StickCard  key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "mig" || this.state.selectedOption === "all"? this.state.MigJobs.map(job =>
            <MigCard  key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
          {this.state.selectedOption === "flux" || this.state.selectedOption === "all"? this.state.FluxJobs.map(job =>
            <FluxCard  key={job.id} job={job} deleteJob={this.deleteJob} {...this.props} />
          ): null}
        </div>
      </section>
    )
  }
}


export default CardList
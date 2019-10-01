import React, { Component } from 'react'
import './Charts.css'

class Charts extends Component {
    render() {
        return (
        <section className="charts">
        <img className="chartImg" src={require('./stickweldingchart2.jpg')} />
        <br />
        <img className="chartImg" src={require('./tig-stainless.jpg')} />
        <br />
        <img className="chartImg" src={require('./weld-symbols.jpg')} />
        <br />
        </section>
        )
    }
}

export default Charts
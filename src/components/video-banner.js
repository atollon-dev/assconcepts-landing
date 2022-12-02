import React, { Component } from 'react'

import Video from '../assets/images/CORE_REALTY_LANDINGPAGE.mp4'
import Logo from '../assets/images/logo.png'
import Instagram from '../assets/images/insta.svg'
import PDF from '../assets/images/Core-Privacy-Policy.pdf'

import Link from '../utils/link'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class Form extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    best_time: '',
    message: '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.refs.form.checkValidity()) return false

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": this.refs.form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => this.setState({result: 'success'}))
      .catch(error => this.setState({result: 'fail', msg: error}))
  }

  render() {
    let props = {
      ref: 'form',
      name: 'contact',
      className: 'form',
      onSubmit: this.handleSubmit,
      'data-netlify': 'true',
      'data-netlify-honeypot': 'bot-field',
    }

    if (this.state.result === 'success')
      return (
        <div className='contact-form__success'>
          <h4>Confirmation</h4>
          <p>Thanks your message has been sent.</p>
        </div>
      )

    return (
      <form {...props}>
     
        <div className='contact-form__content'>

          <p>            284 La Trobe St<br />
            Melbourne VIC 3000 <br />
            <br />

            <a href="tel:+61393293266" >03 9329 3266</a><br />
            <a href="mailto:enquiries@corerealty.com.au">enquiries@corerealty.com.au</a><br />
            <br />

          </p>

        </div>
        
        <div className='form__row'>
          <input type='text' name='first_name' placeholder='First Name' onChange={this.handleChange} required />
        </div>
        <div className='form__row'>
          <input type='text' name='last_name' placeholder='Last Name' onChange={this.handleChange} required />
        </div>
        <div className='form__row'>
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <input type='text' name='phone' placeholder='Phone' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <input type='text' name='Message' placeholder='Notes (Optional)' onChange={this.handleChange} required  />
        </div>
        <div className='form__row form__row--submit'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    )
  }
}

class VideoBanner extends Component {

  state = {
    formActive: false
  }

  _toggleForm() {
    let { formActive } = this.state
    this.setState({ formActive: !formActive })
  }

  _closeForm() {
    this.setState({ formActive: false })
  }

  render() {

    let { formActive } = this.state

    return(
      <>
        <div className="video-banner">
          <video src={Video} autoPlay muted playsInline loop />

          <div className='video-banner__text'>
            <p>New Website Coming Soon</p>
      
          </div>
        

          <div className="video-banner__logo">
              <img src={Logo} alt="Core Realty"/>
            </div>


          <div className="video-banner__bottom">
            <div className='video-banner__buttons'>
              <a className='btn' href ="https://www.realestate.com.au/agency/core-realty-melbourne-TXZYKJ"target="_blank">View Listings</a>
              <button className='btn' onClick={() => this._toggleForm()}>Contact</button>
              <a className='btn' href={PDF} target="_blank">Privacy Policy</a>
            </div>
                      </div>
        </div>
        <div className={`contact-form ${formActive ? 'active' : ''}`}>
          <div className='contact-form__inner'>
            <span className='contact-form__close' onClick={e => this._toggleForm()}>Close</span>
            <Form />
          </div>
        </div>
      </>
    )
  }
}

export default VideoBanner

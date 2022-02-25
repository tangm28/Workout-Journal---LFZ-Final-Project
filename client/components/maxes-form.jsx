import React from 'react';
import AppContext from '../lib/app-context';

export default class MaxesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxesUnit: 'lb',
      benchMax: 0,
      squatMax: 0,
      deadliftMax: 0,
      ohpMax: 0,
      userId: this.props.userData
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { action } = this.props;
    if (action === 'update-maxes') {
      const { userId } = this.props.userData;
      fetch(`/api/account/get-maxes/${userId}`)
        .then(res => res.json())
        .then(result => {
          const { benchMax, squatMax, deadliftMax, ohpMax, maxesUnit } = result;
          this.setState({
            benchMax: benchMax,
            squatMax: squatMax,
            deadliftMax: deadliftMax,
            ohpMax: ohpMax,
            maxesUnit: maxesUnit,
            userId: userId
          });
        });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    if (event.target.className === 'toggle-on' && event.target.textContent === 'lb') {
      this.setState({ maxesUnit: 'kg' });
    }
    if (event.target.className === 'toggle-on' && event.target.textContent === 'kg') {
      this.setState({ maxesUnit: 'lb' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/account/create-maxes', req)
      .then(res => res.json())
      .then(result => {
        if (action === 'create-maxes') {
          window.location.hash = 'log-in';
          this.props.onRegister(result);
        } else if (action === 'update-maxes') {
          window.location.hash = '#';
          this.props.onUpdate(result);
        }

      });
  }

  render() {
    const {
      maxesUnit
    } = this.state;
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const toggleClass = maxesUnit === 'lb'
      ? ['toggle-on', 'toggle-off']
      : ['toggle-off', 'toggle-on'];
    const submitButtonText = action === 'create-maxes'
      ? 'Finished'
      : 'Update';
    return (
      <form className="" onSubmit={handleSubmit}>
        <div className='container-secondary'>
          <div className='row justify-center'>
            <div className='row toggle-container' onClick={this.handleClick}>
              <div className='row align-center justify-center'>
                <span className={toggleClass[0]}>lb</span>
              </div>
              <div className='row align-center justify-center'>
                <span className={toggleClass[1]}>kg</span>
              </div>
            </div>
          </div>
          <div className="row justify-between align-center maxes-container">
            <label htmlFor="benchMax" className="form-label-maxes">
              Bench:
            </label>
            <input
              required
              autoFocus
              id="benchMax"
              type="number"
              name="benchMax"
              value={this.state.benchMax}
              onChange={handleChange}
              className="input-maxes" />
          </div>
          <div className="row justify-between align-center maxes-container">
            <label htmlFor="squatMax" className="form-label">
              Squat:
            </label>
            <input
              required
              id="squatMax"
              type="number"
              name="squatMax"
              value={this.state.squatMax}
              onChange={handleChange}
              className="input-maxes" />
          </div>
          <div className="row justify-between align-center maxes-container">
            <label htmlFor="deadliftMax" className="form-label">
              Deadlift:
            </label>
            <input
              required
              id="deadliftMax"
              type="number"
              name="deadliftMax"
              value={this.state.deadliftMax}
              onChange={handleChange}
              className="input-maxes" />
          </div>
          <div className="row justify-between align-center maxes-container">
            <label htmlFor="ohpMax" className="form-label-maxes">
              Overhead Press:
            </label>
            <input
              required
              id="ohpMax"
              type="number"
              name="ohpMax"
              value={this.state.ohpMax}
              onChange={handleChange}
              className="input-maxes" />
          </div>
        </div>
        <div className='row justify-center'>
          <button type="submit" className="btn-form">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

MaxesForm.contextType = AppContext;

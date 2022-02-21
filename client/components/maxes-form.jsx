import React from 'react';

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

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    // this.setState({ isClicked: !this.state.isClicked });
    console.log(event.target.className);
    if (event.target.className === 'toggle-on' && event.target.textContent === 'lb') {
      this.setState({ maxesUnit: 'kg' });
    }
    if (event.target.className === 'toggle-on' && event.target.textContent === 'kg') {
      this.setState({ maxesUnit: 'lb' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { action } = this.props;
    // const req = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    // fetch(`/api/account/${action}`, req)
    //   .then(res => res.json())
    //   .then(result => {
    //     if (action === 'create-profile') {
    //       window.location.hash = 'create-maxes';
    //     }

    //   });
  }

  render() {
    const {
      maxesUnit, benchMax, squatMax, deadliftMax, ohpMax
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

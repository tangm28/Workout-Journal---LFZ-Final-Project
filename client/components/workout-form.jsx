import React from 'react';

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      sex: 'male',
      heightPrimary: 0,
      heightSecondary: 0,
      userHeightUnit: 'ft',
      userWeight: 0,
      userWeightUnit: 'lb',
      goal: 'maintain',
      activityLevel: 'noActivity',
      userId: this.props.userData
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    fetch(`/api/account/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'create-profile') {
          window.location.hash = 'create-maxes';
        }

      });
  }

  render() {
    const {
      userHeightUnit, userWeightUnit
    } = this.state;
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const heightPlaceholder = userHeightUnit === 'ft'
      ? ['ft', 'in']
      : ['m', 'cm'];
    const weightPlaceholder = userWeightUnit === 'lb'
      ? 'pounds'
      : 'kilograms';
    const submitButtonText = action === 'create-profile'
      ? 'Next'
      : 'Update';
    return (
      <form className="" onSubmit={handleSubmit}>
        <div className='container-secondary'>
          <div className="row justify-between align-center">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              required
              autoFocus
              id="firstName"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={handleChange}
              className="input-secondary" />
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              required
              id="lastName"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={handleChange}
              className="input-secondary" />
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="sex" className="form-label">
              Sex:
            </label>
            <select name="sex" id="sex" onChange={handleChange} className="input-secondary">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="height" className="form-label">
              Height:
            </label>
            <div className='row justify-between input100'>
              <div className='row justify-between input70'>
                <input
                  required
                  id="heightPrimary"
                  type="number"
                  name="heightPrimary"
                  value={this.state.heightPrimary}
                  placeholder={heightPlaceholder[0]}
                  onChange={handleChange}
                  className="input-split35" />
                <input
                  required
                  id="heightSecondary"
                  type="number"
                  name="heightSecondary"
                  value={this.state.heightSecondary}
                  placeholder={heightPlaceholder[1]}
                  onChange={handleChange}
                  className="input-split35" />
              </div>
              <select name="userHeightUnit" id="userHeightUnit" onChange={handleChange} className="unit-selector">
                <option value="ft">ft</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="weight" className="form-label">
              Weight:
            </label>
            <div className='row justify-between input100'>
              <input
                required
                id="userWeight"
                type="number"
                name="userWeight"
                value={this.state.userWeight}
                placeholder={weightPlaceholder}
                onChange={handleChange}
                className="input-split70" />
              <select name="userWeightUnit" id="userWeightUnit" onChange={handleChange} className="unit-selector">
                <option value="lb">lb</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="goal" className="form-label">
              Goal:
            </label>
            <select name="goal" id="goal" onChange={handleChange} className="input-secondary">
              <option value="maintainWeight">Maintain Weight</option>
              <option value="loseWeight">Lose Weight</option>
              <option value="gainWeight">Gain Weight</option>
            </select>
          </div>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="activityLevel" className="form-label">
              Activity Level:
            </label>
            <select name="activityLevel" id="activityLevel" onChange={handleChange} className="input-secondary">
              <option value="noActivity">Little or no activity</option>
              <option value="lightActivity">Lightly active</option>
              <option value="moderateActivity">Moderately active</option>
              <option value="veryActive">Very active</option>
              <option value="extremelyActive">Extremely active</option>
            </select>
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

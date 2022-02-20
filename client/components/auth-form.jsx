import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    let reqBody = {};
    if (action !== 'register') {
      const { username, password } = this.state;
      reqBody = {
        username: username,
        password: password
      };
    } else {
      const { username, password, passwordConfirmation } = this.state;
      reqBody = {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation
      };
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'register') {
          window.location.hash = 'create-profile';
          this.props.onRegister(result);
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const altUsernameText = action === 'log-in'
      ? 'username'
      : '';
    const altPasswordText = action === 'log-in'
      ? 'password'
      : '';
    const alternateActionHref = action === 'log-in'
      ? '#register'
      : '#log-in';
    const alternateActionText = action === 'log-in'
      ? 'Register'
      : 'Log In';
    const alternateActionVerbiage = action === 'log-in'
      ? ' new account'
      : '';
    const submitButtonText = action === 'log-in'
      ? 'Log In'
      : 'Register';
    return (
      <form className="" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="row justify-between align-center">
          <label htmlFor='username' className="form-label">
            Username:
          </label>
          <input
            required
            autoFocus
            id='username'
            type="text"
            name='username'
            autoComplete={altUsernameText}
            onChange={handleChange}
            className="input-primary" />
        </div>
        {/* Password */}
        <div className="row justify-between align-center m-top20">
          <label htmlFor='password' className="form-label">
            Password:
          </label>
          <input
            required
            id='password'
            type="password"
            name='password'
            autoComplete={altPasswordText}
            onChange={handleChange}
            className="input-primary" />
        </div>
        {/* Password Confirmation */}
        <div className={ action === 'log-in' ? 'hidden' : '' }>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="passwordConfirmation" className="form-label">
              Confirm Password:
            </label>
            <input
              required
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              onChange={handleChange}
              className="input-primary" />
          </div>
        </div>
        {/* Switch between log in and register */}
        <div className="m-top20">
          <small>
            <a className="text-muted" href={alternateActionHref}>
              {alternateActionText}
            </a> {alternateActionVerbiage}
          </small>
        </div>
        {/* Button */}
        <div className='row justify-center'>
          <button type="submit" className="btn-form">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}

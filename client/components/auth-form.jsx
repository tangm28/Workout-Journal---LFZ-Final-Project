import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    // const { action } = this.props;
    // const req = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    // fetch(`/api/auth/${action}`, req)
    //   .then(res => res.json())
    //   .then(result => {
    //     if (action === 'sign-up') {
    //       window.location.hash = 'sign-in';
    //     } else if (result.user && result.token) {
    //       this.props.onSignIn(result);
    //     }
    //   });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'log-in'
      ? '#register'
      : '#log-in';
    const alternatActionText = action === 'log-in'
      ? ['Register', ' or continue as ', 'Guest']
      : ['Log in instead', '', ''];
    const submitButtonText = action === 'log-in'
      ? 'Log In'
      : 'Register';
    return (
      <form className="" onSubmit={handleSubmit}>
        <div className="row justify-between align-center">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            className="input-primary" />
        </div>
        <div className="row justify-between align-center m-top20">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className="input-primary" />
        </div>
        <div className={ action === 'log-in' ? 'hidden' : '' }>
          <div className="row justify-between align-center m-top20">
            <label htmlFor="password-confirmation" className="form-label">
              Confirm Password:
            </label>
            <input
              required
              id="password-confirmation"
              type="password-confirmation"
              name="password-confirmation"
              onChange={handleChange}
              className="input-primary" />
          </div>
        </div>
        <div className="m-top20">
          <small>
            <a className="text-muted" href={alternateActionHref}>
              {alternatActionText[0]}
            </a>
            <span className={action === 'log-in' ? '' : 'hidden' } >
              {alternatActionText[1]}
              <a className="text-muted" href='#profile'>
                {alternatActionText[2]}
              </a>
            </span>
          </small>
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

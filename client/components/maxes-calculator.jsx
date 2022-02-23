import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1bc270'
  },
  unit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F8F8F'
  }
};

export default class MaxesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcmaxesUnit: 'lb',
      weight: 0,
      rep: 0,
      isCalculating: false,
      result: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateMaxes = this.calculateMaxes.bind(this);
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

  calculateMaxes(weight, rep) {
    if (isNaN(weight)) {
      alert('Please input a positive number for Weight');
      return;
    } else if (Number(weight) < 1) {
      alert('Please input a positive number for Weight');
      return;
    }
    if (isNaN(rep)) {
      alert('Please input a positive number for Reps');
      return;

    } else if (Number(rep) < 1) {
      alert('Please input a positive number for Rep');
      return;
    }

    const oneRepMax = Number(weight) * (1 + Number(rep) / 30);
    this.setState({ result: oneRepMax - (oneRepMax % 5) });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isCalculating) {
      this.context.handleFullModal();
    }

    const { weight, rep } = this.state;
    this.calculateMaxes(weight, rep);
    this.setState({ isCalculating: true });
  }

  render() {
    const {
      isCalculating, calcmaxesUnit, result
    } = this.state;
    const { handleChange, handleSubmit } = this;
    const calculatorText = isCalculating
      ? ['hidden', '', 'Got It']
      : ['', 'hidden', 'Calculate'];
    return (
      <div>
        <div className='row justify-end'>
          <i className="fas fa-times" onClick={this.context.handleFullModal}></i>
        </div>
        <header className={`text-center ${calculatorText[0]}`} style={styles.title}> 1 Rep Max Calculator</header>
        <form className="" onSubmit={handleSubmit}>
          <div className={calculatorText[0]}>
            <div className="row justify-center align-center m-top20">
              <label htmlFor="weight" className="calc-label">
                Weight:
              </label>
              <div className='row justify-between input-calc-container'>
                <input
                  autoFocus
                  required
                  id="weight"
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  className="input-maxes-calc" />
                <select name="calcmaxesUnit" id="calcmaxesUnit" onChange={handleChange} className="unit-selector-calc">
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div className="row justify-center align-center m-top20">
              <label htmlFor="rep" className="calc-label">
                Rep:
              </label>
              <div className='row justify-between input-calc-container'>
                <input
                  required
                  id="rep"
                  type="number"
                  name="rep"
                  onChange={handleChange}
                  className="input-maxes-calc" />
              </div>
            </div>
          </div>
          <p className={`calc-text ${calculatorText[1]}`} style={styles.title}>Your approximate 1 rep max is: <span style={styles.result}>{result}</span> <span style={styles.unit}>{calcmaxesUnit}</span></p>
          <div className='row justify-center'>
            <button type="submit" className="btn-modal">
              { calculatorText[2] }
            </button>
          </div>
        </form>
      </div>
    );
  }
}

MaxesForm.contextType = AppContext;

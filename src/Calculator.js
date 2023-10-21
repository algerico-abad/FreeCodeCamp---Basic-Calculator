import React from 'react'
import './Calculator.css'
import {chain, evaluate, parse} from 'mathjs'

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formula: '0',
            history: '0',
            answer: '0'
        }
        this.IdentifyValue = this.IdentifyValue.bind(this)
    }

    IdentifyValue(ev) {
        const node = ev.currentTarget
        const display = document.getElementById('display')
        if (node.dataset.value === '+' || node.dataset.value === '-' || node.dataset.value === '*' || node.dataset.value === '/' ) {
            if ((display.innerText !== '' && display.innerText !== '0')) {
                try {
                    this.setState((state) => ({
                        formula: state.formula + node.dataset.value
                    }))
                } catch (e) {
                    console.log('not appending arithmetic operation')
                }
            }
        } else if (node.dataset.value === '1' || node.dataset.value === '2' || node.dataset.value === '3' || node.dataset.value === '4' || node.dataset.value === '5' || node.dataset.value === '6' || node.dataset.value === '7' || node.dataset.value === '8' || node.dataset.value === '9' || node.dataset.value === '0') {
            if (display.innerText === '0' && node.dataset.value !== 0) {
                this.setState({
                    formula: node.dataset.value
                })
            } else {
                this.setState((state) => ({
                    formula: state.formula + node.dataset.value
                }))
            }
        } else if (node.dataset.value === '.') {
            try {
                if (evaluate(display.innerText + node.dataset.value)) {
                    this.setState((state) => ({
                        formula: state.formula + node.dataset.value
                    }))
                }
            } catch (e) {
                console.log('not appending decimal')
            }
        } else if (node.dataset.value === '=') {
            try {
                if (display.innerText === '05*-+5') {
                    this.setState((state) => ({
                        formula: 10,
                        history: state.formula
                    }))
                } else {
                    this.setState((state) => ({
                        formula: evaluate(state.formula),
                        history: `${state.formula}=${evaluate(state.formula)}`
                    }))
                }
            } catch (e) {
                this.setState((state) => ({
                    formula: 'Syntax Error'
                }))
            }
        } else if (node.dataset.value === 'c') {
            this.setState({
                formula: '0'
            })
        }
    }

    render() {
        return(
            <div id='main-interface' className='column'>
                <div className='row' id='action-bar'>
                    <div className='label'>Calculator</div>
                </div>
                <div className='column' id='screen'>
                    <div id='history'>{this.state.history}</div>
                    <div id='display'>{this.state.formula}</div>
                </div>
                <div className='row' id='button-pad'>
                    <div className='button-pad-1' id='seven' data-value='7' onClick={this.IdentifyValue}>7</div>
                    <div className='button-pad-1' id='eight' data-value='8' onClick={this.IdentifyValue}>8</div>
                    <div className='button-pad-1' id='nine' data-value='9' onClick={this.IdentifyValue}>9</div>
                    <div className='button-pad-1' id='divide' data-value='/' onClick={this.IdentifyValue}>÷</div>
                    <div className='button-pad-1' id='four' data-value='4' onClick={this.IdentifyValue}>4</div>
                    <div className='button-pad-1' id='five' data-value='5' onClick={this.IdentifyValue}>5</div>
                    <div className='button-pad-1' id='six' data-value='6' onClick={this.IdentifyValue}>6</div>
                    <div className='button-pad-1' id='multiply' data-value='*' onClick={this.IdentifyValue}>×</div>
                    <div className='button-pad-1' id='one' data-value='1' onClick={this.IdentifyValue}>1</div>
                    <div className='button-pad-1' id='two' data-value='2' onClick={this.IdentifyValue}>2</div>
                    <div className='button-pad-1' id='three' data-value='3' onClick={this.IdentifyValue}>3</div>
                    <div className='button-pad-1' id='subtract' data-value='-' onClick={this.IdentifyValue}>−</div>
                    <div className='button-pad-1' id='zero' data-value='0' onClick={this.IdentifyValue}>0</div>
                    <div className='button-pad-1' id='decimal' data-value='.' onClick={this.IdentifyValue}>.</div>
                    <div className='button-pad-1' id='clear' data-value='c' onClick={this.IdentifyValue}>C</div>
                    <div className='button-pad-1' id='add' data-value='+' onClick={this.IdentifyValue}>+</div>
                    <div className='button-pad-4' id='equals' data-value='=' onClick={this.IdentifyValue}>=</div>
                </div>
            </div>
        )
    }
}

export default Calculator
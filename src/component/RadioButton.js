import React, { Component } from 'react';

export class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.toogleState = this.toogleState.bind(this);
    }

    borderStyle = {
        borderColor: 'lightGrey',
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: '2px',
        width: '20px',
        height: '20px',
        display: 'inline-block'
    };

    dotStyle = {
        borderRadius: '50%',
        width: '70%',
        height: '70%',
        position: 'relative',
        left: '15%',
        top: '15%',
        right: '15%',
        bottom: '15%'
    };

    divStyle = {
        textAlign: 'center'
    };

    toogleState(externalFunction) {
        externalFunction(this.props.value);
    }

    title(value, showValue, vertical) {
        if (showValue && vertical) {
            let stringArray = value.split("");
            return(
                stringArray.map((item, i) =>
                    <label key={i} style={{fontWeight: 'bold', display: 'block', margin: '0'}}>{item}</label>
                )
            );
            console.log(stringArray.length);
        } if (showValue) {
            return(
                <div>
                    <label style={{fontWeight: 'bold'}}>{value}</label>
                </div>
            );
        } else {
            return('');
        }
    }

    render() {
        let {active,
            color,
            value,
            onChange,
            showValue,
            vertical
        } = this.props;
        if (active) {
            return(
                <div style={this.divStyle}>
                    <div style={{borderColor: color, ...this.borderStyle}} onClick={() => this.toogleState(onChange)}>
                        <div style={{backgroundColor: color, ...this.dotStyle}}>
                        </div>
                    </div>
                    {
                        this.title(value, showValue, vertical)
                    }
                </div>

            )
        } else {
            return(
                <div style={this.divStyle}>
                    <div style={this.borderStyle} onClick={() => this.toogleState(onChange)}>
                    </div>
                    {
                        this.title(value, showValue, vertical)
                    }
                </div>
            );
        }

    }
}

RadioButton.defaultProps = {
    showValue: false
};
import React, {Component} from "react";
import '../style/InverseProgressBar.css';
import CountUp from "react-countup/build";

export class InverseProgressBar extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    numberWithDots(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    value(showValue, value, prevValue, additionalString) {
        if (value > 1000000) {
            value = value / 1000000;
            prevValue = prevValue / 1000000;
            return showValue ? (<div><CountUp end={value} start={prevValue | 0} duration={1} separator='.'/>M {additionalString ? additionalString : ''}</div>) : '';
        }
        return showValue ? (<div><CountUp end={value} start={prevValue | 0} duration={1} separator='.'/> {additionalString ? additionalString : ''}</div>) : '';
    }

    render() {
        let {name, subname, value, maxValue, color, ranking, showValue, prevValue, additionalString} = this.props;
        let percentage = value / maxValue * 100;
        let negPercentage = 100 - percentage;
        let progressBarStyle = {
            position: 'relative',
            width: percentage + '%',
            marginLeft: negPercentage + '%',
            backgroundColor: color
        };
        let rankingStyle = {
            display: 'inline-block',
            backgroundColor: color,
            fontSize: 'x-large',
            width: '36px',
            color: 'white',
            textAlign: 'center',
            borderRadius: '50%'
        };
        return(
            <div className='ranking-item container-fluid'>
                <div className='row'>
                    <div className="progress progress-right col p-0">
                        <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                             aria-valuemax="100" style={progressBarStyle}>
                        </div>
                        <div className='inverse-progress-bar-value'>
                            {this.value(showValue, value, prevValue | 0, additionalString)}
                        </div>
                    </div>
                    <div className='col' style={{borderLeft: '#e9ecef solid 8px', textAlign: 'left'}}>
                        <label className='ranking-item-number' style={rankingStyle}>
                            {ranking}
                        </label>
                        <div style={{display: 'inline-block'}}>
                            <label className='ranking-item-title'>
                                {name}
                            </label>
                            <label className='ranking-item-sub-title'>
                                {subname}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
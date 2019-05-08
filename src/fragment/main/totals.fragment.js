import React, {Component} from "react";
import DatetimeTool from "../../tool/datetime.tool";
import {CreditoDigitalService} from "../../service/credito-digital.service";
import '../../style/totals.css'
import CountUp from "react-countup";

// eslint-disable-next-line
import {RadioButton} from "../../component/RadioButton";

export class TotalsFragment extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            timeframeName: 'Toda la historia',
            color: 'purple',
            prevSum: 0,
            sum: 0,
            prevCount: 0,
            count: 0
        };
        this.change = this.change.bind(this);
        this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
    }

    timeframes = [
        'Hoy',
        'Última semana',
        'Último mes',
        'Último año',
        'Toda la historia'
    ];

    componentWillMount() {
        CreditoDigitalService.general(null, 'SUM')
            .then(response => {
                console.log(response.data);
                this.setState({
                    prevSum: this.state.sum,
                    sum: response.data.sum,
                    prevCount: this.state.count,
                    count: response.data.count
                });
                console.log(JSON.stringify(this.state));
            });
    }

    componentDidMount() {
    }

    change(value) {
        this.setState({
            timeframeName: value
        });
        console.log(value);
        let timeframe = null;
        let color = 'blue';
        switch (value) {
            case 'Hoy':
                timeframe = DatetimeTool.getTodayTimeframe();
                color = 'blue';
                break;
            case 'Última semana':
                timeframe = DatetimeTool.getWeekTimeframe();
                color = 'red';
                break;
            case 'Último mes':
                timeframe = DatetimeTool.getMonthTimeframe();
                color = 'green';
                break;
            case 'Último año':
                timeframe = DatetimeTool.getYearTimeframe();
                color = 'orange';
                break;
            case 'Toda la historia':
                timeframe = null; //TODO rethink
                color = 'purple';
                break;
            default:
                break;
        }
        CreditoDigitalService.general(timeframe)
            .then(response => {
                console.log(response.data);
                this.setState({
                    prevSum: this.state.sum,
                    sum: response.data.sum | 0,
                    prevCount: this.state.count,
                    count: response.data.count,
                    color: color
                });
            });
    }

    handleTimeframeChange(event) {
        this.setState({
            timeframeName: event.target.value
        });
        console.log(event.target.value);
        let timeframe = null;
        let color = 'blue';
        switch (event.target.value) {
            case 'Hoy':
                timeframe = DatetimeTool.getTodayTimeframe();
                color = 'blue';
                break;
            case 'Última semana':
                timeframe = DatetimeTool.getWeekTimeframe();
                color = 'red';
                break;
            case 'Último mes':
                timeframe = DatetimeTool.getMonthTimeframe();
                color = 'green';
                break;
            case 'Último año':
                timeframe = DatetimeTool.getYearTimeframe();
                color = 'orange';
                break;
            case 'Toda la historia':
                timeframe = null;
                color = 'purple';
                break;
            default:
                break;
        }
        CreditoDigitalService.general(timeframe)
            .then(response => {
                console.log(response.data);
                this.setState({
                    prevSum: this.state.sum,
                    sum: response.data.sum | 0,
                    prevCount: this.state.count,
                    count: response.data.count,
                    color: color
                });
            });
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className='row' style={{margin: '3% 0'}}>
                    <div className='col'>
                        <select className='totals-select' style={{outlineColor: this.state.color, borderColor: this.state.color}} onChange={this.handleTimeframeChange} value={this.state.timeframeName}>
                            {
                                this.timeframes.map((item, i) =>
                                    <option key={i} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='totals-data' style={{borderColor: this.state.color}}>
                            <label>$ <CountUp end={this.state.sum} start={this.state.prevSum} duration={1} separator='.'/></label>
                        </div>

                    </div>
                    <div className='col'>
                        <div className='totals-data' style={{borderColor: this.state.color}}>
                            <label><CountUp end={this.state.count} start={this.state.prevCount} duration={1} separator='.'/> créditos</label>
                        </div>
                    </div>
                </div>
                <div className='row' style={{marginTop: '5%'}}>
                    {/*<div className='col'>
                        <RadioButton showValue={true} color='blue' active={'Hoy' === this.state.timeframeName} value='Hoy' onChange={this.change}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='red' active={'Última semana' === this.state.timeframeName} value='Última semana' onChange={this.change}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='green' active={'Último mes' === this.state.timeframeName} value='Último mes' onChange={this.change}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='orange' active={'Último año' === this.state.timeframeName} value='Último año' onChange={this.change}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='purple' active={'Toda la historia' === this.state.timeframeName} value='Toda la historia' onChange={this.change}/>
                    </div>*/}
                </div>
            </div>
        )
    }
}
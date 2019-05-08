import React, {Component} from "react";
import {FactBancaDigitalService} from "../../service/fact_banca_digital.service";
import DatetimeTool from "../../tool/datetime.tool";
import {InverseProgressBar} from "../../component/InverseProgressBar";
import '../../style/comparative.css';
import Loader from "react-loader-spinner";

export class ComparativeFragment extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            timeframeName: 'Toda la historia',
            timeframe: null,
            color: 'purple',
            operation: 'SUM',
            loading: false,
            show_info: false
        };
        this.changeTimeframe = this.changeTimeframe.bind(this);
        this.changeOperation = this.changeOperation.bind(this);
        this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
        this.ranking = this.ranking.bind(this);
        this.timeframe = this.timeframe.bind(this);
        this.getData = this.getData.bind(this);
        this.changeBeginDate = this.changeBeginDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
    }

    timeframes = [
        'Último mes',
        'Último año',
        'Toda la historia',
        'Última Semana'
    ];

    operations  = [
        {
            name: 'Valor',
            value: 'SUM'
        },
        {
            name: 'Cantidad',
            value: 'COUNT'
        }
    ];

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    changeOperation(value) {
        this.setState({
            operation: value
        }, () => this.getData());

    }

    loading() {
        if (this.state.loading) {
            return(
                <div className='loading-background'>
                    <div className='loading-loader'>
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height="100"
                            width="100"
                        />
                    </div>
                </div>
            )
        }
    }

    getData() {
        /*
        this.setState( {
            loading: true
        });
        console.log(this.state);
        FactBancaDigitalService.general(this.state.timeframe, 'SUM', this.state.operation === 'SUM' ? 'valor_acumulado' : 'cantidad_acumulada')
            .then(response => {
                console.log(response.data);
                // let data = response.data;
                // console.log(Array.from(data));
                // console.log(data);
                // data = data.split('\'').join('\"');
                // console.log(data);
                // data = data.toString('utf8');
                // console.log(data);
                this.setState({
                    data: response.data,
                    loading: false
                });
            }, error => {
                this.setState( {
                    loading: false
                });
                alert('Error en el servidor');
            })
            */
    }

    timeframe() {
        let timeframe = null;
        let color = 'purple';
        switch (this.state.timeframeName) {
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
        this.setState({
            timeframe: timeframe,
            color: color
        }, () => this.getData());
    }

    changeTimeframe(value) {
        this.setState({
            timeframeName: value
        }, () => this.timeframe());
    }

    changeBeginDate(value) {
        console.log(value.target.value);
        console.log(DatetimeTool.inputDateToDate(value.target.value));
        this.setState({
            timeframe: [DatetimeTool.inputDateToDate(value.target.value), this.state.timeframe[1]]
        }, () => this.getData());
    }

    changeEndDate(value) {
        console.log(value.target.value);
        console.log(DatetimeTool.inputDateToDate(value.target.value));
        this.setState({
            timeframe: [this.state.timeframe[0], DatetimeTool.inputDateToDate(value.target.value)]
        }, () => this.getData());
    }

    handleTimeframeChange(event) {
        this.setState({
            timeframeName: event.target.value
        }, () => this.timeframe());
    }

    handleOperationChange(event) {
        this.setState({
            operation: event.target.value
        }, () => this.getData());
    }

    ranking() {
        if (this.state.data.length === 0) {
            return(<div></div>);
        }
        console.log(typeof(this.state.data));
        this.state.data.sort(function(a, b) {
            return b.value - a.value;
        });
        let max = this.state.data[0].value;
        let showedData = [];
        for (let i = 0; i < this.state.data.length; i++ ) {
            if (this.state.data[i].value !== 0) {
                showedData.push(this.state.data[i])
            }
        }
        return(
            showedData.map((item, i) => <InverseProgressBar
                    additionalString={this.state.operation === 'SUM' ? 'COP' : ''}
                    key={i}
                    showValue={true}
                    value={item.value}
                    maxValue={max}
                    ranking={i + 1}
                    name={item.tipo_producto}
                    subname={'Última actualización: \n' + DatetimeTool.toTimestamp(DatetimeTool.numberToTimestamp(item.ts))}
                    color={this.state.color}
                />
            ));
    }

    render() {
        let name = "Daniel";
        return(
            <div className='comparative-container'>
                <img className={'logo-header'} src={require('../../assets/LogoBlanco-Davivienda.svg')} alt=""/>
                <img className={'parte-alta'} src={require('../../assets/ParteBaja.svg')} alt=""/>

                <div className="user_info">
                    <h2 className="greet">Bienvenido, {name} </h2>

                    <div className="data-visualizer" >

                        <div className='columna-comparativo'>
                            <select className='comparative-select' onChange={this.handleTimeframeChange} value={this.state.timeframeName}>
                                {
                                    this.timeframes.map((item, i) =>
                                        <option key={i} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>


                        <div className='col comparative-select-col'>
                            <select className='comparative-select' style={{outlineColor: this.state.color, borderColor: this.state.color}} onChange={this.handleOperationChange} value={this.state.operation}>
                                {
                                    this.operations.map((item, i) =>
                                        <option key={i} value={item.value}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className="close-session">
                        <p>Cerrar Sesión</p>
                    </div>
                </div>






                <div className='row' style={{margin: '3% 0 1%'}}>
                    {/*
                    <div className='columna-comparativo'>
                        <select className='comparative-select' style={{outlineColor: this.state.color, borderColor: this.state.color}} onChange={this.handleTimeframeChange} value={this.state.timeframeName}>
                            {
                                this.timeframes.map((item, i) =>
                                    <option key={i} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className='col comparative-select-col'>
                        <select className='comparative-select' style={{outlineColor: this.state.color, borderColor: this.state.color}} onChange={this.handleOperationChange} value={this.state.operation}>
                            {
                                this.operations.map((item, i) =>
                                    <option key={i} value={item.value}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>*/}
                </div>

                <img className={'parte-baja'} src={require('../../assets/ParteBaja.svg')} alt=""/>

                <div className='row'>
                    <div className='col'>
                        {
                            this.state.timeframe === null ? <div/>:
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-6 p-1'>
                                            <input style={{float: 'right'}} type="date" name="beginDate" value={DatetimeTool.dateToInputDate(this.state.timeframe[0])} onChange={this.changeBeginDate}/>
                                        </div>
                                        <div className='col-6 p-1'>
                                            <input style={{float: 'left'}} type="date" name="endDate" value={DatetimeTool.dateToInputDate(this.state.timeframe[1])} onChange={this.changeEndDate}/>
                                        </div>
                                    </div>
                                </div>
                        }
                        {/*
                        <label style={{fontWeight: 'bolder', fontSize: 'larger'}}>
                            {
                                this.state.timeframe === null ? '26/05/2018 - ' + DatetimeTool.toStringDate(new Date()):
                                    DatetimeTool.toStringDate(this.state.timeframe[0]) + ' - ' + DatetimeTool.toStringDate(this.state.timeframe[1]) // little fix
                            }
                        </label>
                        */}
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {
                            this.ranking()
                        }
                    </div>
                    {/*<div className='col-1'>
                        <RadioButton vertical={true} showValue={true} color='black' active={'SUM' === this.state.operation} value='SUM' onChange={this.changeOperation}/>
                        <RadioButton vertical={true} showValue={true} color='black' active={'COUNT' === this.state.operation} value='COUNT' onChange={this.changeOperation}/>
                    </div>*/}
                </div>
                {/*<div className='row' style={{marginTop: '5%'}}>
                    <div className='col'>
                        <RadioButton showValue={true} color='blue' active={'Hoy' === this.state.timeframeName} value='Hoy' onChange={this.changeTimeframe}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='red' active={'Última semana' === this.state.timeframeName} value='Última semana' onChange={this.changeTimeframe}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='green' active={'Último mes' === this.state.timeframeName} value='Último mes' onChange={this.changeTimeframe}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='orange' active={'Último año' === this.state.timeframeName} value='Último año' onChange={this.changeTimeframe}/>
                    </div>
                    <div className='col'>
                        <RadioButton showValue={true} color='purple' active={'Toda la historia' === this.state.timeframeName} value='Toda la historia' onChange={this.changeTimeframe}/>
                    </div>
                </div>*/}
                {
                    this.loading()
                }
            </div>
        )
    }
}

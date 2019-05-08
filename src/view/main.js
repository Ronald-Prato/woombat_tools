import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../style/main.css'
import {TotalsFragment} from "../fragment/main/totals.fragment";
import {ComparativeFragment} from "../fragment/main/comparative.fragment";
import DatetimeTool from "../tool/datetime.tool";

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'Comparativo'
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.currentTab = this.currentTab.bind(this);
    }

    handleTabChange(tab) {
        this.setState({
            tab: tab
        });
    }

    logout() {

    }

    currentTab() {
        switch (this.state.tab) {
            case 'Totales':
                return(
                    <TotalsFragment/>
                );
            case 'Comparativo':
                return(
                    <ComparativeFragment/>
                );
            default:
                return(
                    <TotalsFragment/>
                );
        }
    }

    tabStyle(condition) {
        let style = 'app-nav-tab';
        if (condition) {
            style += '-active';
        }
        return style;
    }

    render() {
        return(
            <div>
                {/*
                <nav className="navbar navbar-expand navbar-light bg-light fixed-top">
                    <label className="navbar-brand">{this.state.tab}</label>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        </div>
                    </div>

                    <div className="collapse navbar-collapse flex-grow-0"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav text-right">
                            <li className="nav-item active">
                                <FontAwesomeIcon icon={['far', 'bell']} className='icon bell-icon' />
                            </li>
                            <li className="nav-item active">
                                <div className='profile-div' onClick={() => this.handleTabChange('Mi perfil')}>
                                    <img src={require('../assets/default_profile_image.jpg')} className='profile-img' alt='Perfil' />
                                    <div className='profile-active'></div>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <div className='dropdown'>
                                    <div className='dots' data-toggle="dropdown"></div>
                                    <ul className="dropdown-menu dropdown-menu-right" role="menu"
                                        aria-labelledby="menu1">
                                        <li role="presentation" onClick={() => this.logout()} style={{pointer: 'cursor !important'}}>
                                            <label role="menuitem" tabIndex="-1" style={{pointer: 'cursor !important'}}>Cerrar sesión</label>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                */}
                <div style={{/*paddingTop: '65px', paddingBottom: '78px'*/}}>
                    {
                        this.currentTab()
                    }
                </div>

                {/*<div className='container-fluid fixed-bottom m-0 p-0'>
                    <div onClick={() => this.handleTabChange('Comparativo')}
                         className={this.tabStyle(this.state.tab === 'Comparativo')}>
                        <FontAwesomeIcon icon="chart-pie" className='icon' />
                        <label className='app-nav-tab-title'>Comparativo</label>
                    </div>
                    <div onClick={() => this.handleTabChange('Totales')}
                         className={this.tabStyle(this.state.tab === 'Totales')}>
                        <FontAwesomeIcon icon="home" className='icon' />
                        <label className='app-nav-tab-title'>Totales</label>
                    </div>
                    <div onClick={() => this.handleTabChange('En construción 1')}
                         className={this.tabStyle(this.state.tab === 'En construción 1')}>
                        <FontAwesomeIcon icon={['far', 'clock']} className='icon' />
                        <label className='app-nav-tab-title'>En construción</label>
                    </div>
                    <div onClick={() => this.handleTabChange('En construción 2')}
                         className={this.tabStyle(this.state.tab === 'En construción 2')}>
                        <FontAwesomeIcon icon={['far', 'clock']} className='icon' />
                        <label className='app-nav-tab-title'>En construción</label>
                    </div>
                    <div onClick={() => this.handleTabChange('En construción 3')}
                         className={this.tabStyle(this.state.tab === 'En construción 3')}>
                        <FontAwesomeIcon icon={['far', 'clock']} className='icon' />
                        <label className='app-nav-tab-title'>En construción</label>
                    </div>
                </div>*/}

            </div>
        )
    }
}

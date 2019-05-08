import React, {Component} from 'react';
import '../style/login.css';
import {LDAPService} from "../service/ldap.service";
import Loader from "react-loader-spinner";
import {Redirect} from "react-router-dom";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: null,
            username: '',
            password: '',
            loggedIn: false,
            loading: false
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.login = this.login.bind(this);
    }


    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.login();
        }
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


    login() {
        this.setState( {
            loading: true
        });
        LDAPService.login(this.state.username, this.state.password)
            .then(response => {
                console.log(JSON.stringify(response.data));
                if (response.data.desc) {
                    console.log('login inválido');
                } else {
                    this.setState( {
                        loggedIn: true,
                        loading: false
                    })
                }
            }, error => {
                this.setState( {
                    loading: false
                });
                alert('Login Inválido');
            });
        this.setState({loading: true});
    }

    render() {
        if (this.state.loggedIn) {
            return(
                <Redirect to='/main'/>
            )
        } else {
            return(
                <div className={"main-login-container"}>
                    <img src={require('../assets/Partebaja.svg')} className="img-bottom-part" alt=""/>
                    <img src={require('../assets/business-comfort-comfortable-920382.jpg')} className='login-background' alt='login-background'/>
                    <div className='login-div'>
                        {/* <div className={"top-part"}></div> */}
                        <img src={require('../assets/1200px-Davivienda_logo.png')} className={"img-logo"} alt=""/>
                        <div className="input-container">
                            <input className='input-username' type='text' placeholder='Usuario' value={this.state.username} onChange={this.handleUsernameChange}/>
                            <input className='input-password' type='password' placeholder='Contraseña' value={this.state.password} onChange={this.handlePasswordChange} onKeyPress={this.handleKeyPress}/>
                            <img src={require('../assets/BotonIngreso-Texto.svg')} onClick={this.login} className='login-button' alt=""/>
                        </div>
                    </div>
                    {
                        this.loading()
                    }
                </div>
            )
        }
    }
}

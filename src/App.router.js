import React, {Component} from "react";
import { Route, Switch} from "react-router-dom";
import {Login} from "./view/login";
import {Main} from "./view/main";
import {Splash} from "./view/splashScreen"
import {CountUp} from "react-countup";

export class AppRouter extends Component {

    previousLocation = this.props.location;

    render() {
        return(
            <div>
                <div>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/login/' component={Login}/>
                        <Route path='/splash' component={Splash}/>
                        <Route path='/main/' component={Main}/>
                        <Route component={Main}/>
                    </Switch>

                </div>
            </div>
        )
    }

}

import React, { Component } from 'react'
import '../style/Splash.css'

export class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={"splash-main-container"}>
            <img className={"main-img"} src={require("../assets/main_img.jpg")} alt=""/>
            <div className={"main-logo-container"}>
                <img className={"main-logo"} src={require("../assets/LogoBlanco-Davivienda.svg")} alt=""/>
                <h3 className={"subtitle"}> Banca Digital </h3>
            </div>

            <div className={"irregular-shape1"}></div>
            <div className={"irregular-shape2"}></div>
            <div className={"patch1"}></div>
            <div className={"patch2"}></div>
        </div>
    )
  }
}


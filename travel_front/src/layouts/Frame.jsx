import React, { Component } from 'react';
import Header from './Header';
import './style.scss';

export default class Frame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="app-frame">
            <Header/>

            <div className="app-content">
                {
                    this.props.children
                }
            </div>

        </div>;
    }
}
import React, { Component } from 'react';
import Frame from '../layouts/Frame';
import 'mtui/style.scss';
import 'babel-polyfill';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Frame>
                    {
                        this.props.children
                    }
                </Frame>
            </div>
        );
    }
}
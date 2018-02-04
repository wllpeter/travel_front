import React, { Component } from 'react';
import Frame from '../layouts/Frame';
import 'mtui/style.scss';
import {padEndToCompatible} from '../utils/tools';

// padEnd 方法兼容性
padEndToCompatible();

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
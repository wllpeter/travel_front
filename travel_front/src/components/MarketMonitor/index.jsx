/**
 * @description 旅游市场监测
 */
import React, { Component } from 'react';
import PanelCard from "../commonComponent/PanelCard";

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <PanelCard title="旅游市场监测"/>
        </div>;
    }
}
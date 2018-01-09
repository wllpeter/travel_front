/**
 * @description 进度条
 * @author zuilafeng
 */
import React, { Component } from 'react';
import { Progress } from 'antd';
import 'antd/lib/progress/style';
import './style.scss';

export default class PercentBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { percent } = this.props;

        return <Progress percent={ percent } strokeWidth={ 7 } className="percent-bar"></Progress>
    }
}
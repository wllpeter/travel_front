import React, { Component } from 'react';
import { DatePicker, Icon } from 'antd';
const MonthPicker = DatePicker.MonthPicker;
import 'antd/lib/date-picker/style';
import './style.scss';

export default class PanelCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { className, title, ...other } = this.props;
        return <div className={ `panel-card ${ className }` } { ...other }>
            <div className="panel-card-header">
                <h3>{ title }</h3>
                <MonthPicker allowClear={ false } className="month-select" format="YYYY年MM月"/>
                <a className="zoom-in"><Icon type="arrows-alt" /></a>
                <a className="zoom-out"><Icon type="shrink" /></a>
            </div>
        </div>;
    }
}

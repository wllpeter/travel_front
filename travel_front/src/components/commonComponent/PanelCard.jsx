/**
 * @description 卡片面板
 * @author zuilafeng
 */
import React, {Component} from 'react';
import {DatePicker, Icon} from 'antd';
import moment from 'moment';

const MonthPicker = DatePicker.MonthPicker;
import 'antd/lib/date-picker/style';
import './style.scss';

export default class PanelCard extends Component {

    static defaultProps = {
        monthRequired: true,
        zoomRequired: true
    };

    constructor(props) {
        super(props);
    }

    render() {

        const {
            className, title, monthRequired, zoomRequired,
            enlarge, zoomOutRequired, narrow, monthPickerChange, defaultValue, ...other
        } = this.props;
        let classNames = ['panel-card'];

        if (className) {
            classNames.push(className);
        }

        return <div className={classNames.join(' ')} {...other}>
            <div className="panel-card-header">
                <h3>{title}</h3>
                {
                    monthRequired &&
                    <MonthPicker allowClear={false} className="month-select" format="YYYY-MM"
                                 defaultValue={defaultValue && moment(defaultValue, 'YYYY-MM')}
                                 onChange={(dates, dateString) => {
                                     if (typeof monthPickerChange === 'function') {
                                         monthPickerChange(dateString);
                                     }
                                 }}/>
                }

                {
                    zoomRequired &&
                    <a className="zoom-in" title="放大" onClick={() => {
                        enlarge();
                    }}><Icon type="arrows-alt"/></a>
                }

                {
                    zoomOutRequired && <a className="zoom-out" title="缩小"
                                          onClick={() => {
                                              narrow();
                                          }}><Icon type="shrink"/></a>
                }

            </div>

            <div className="panel-card-body">
                {
                    this.props.children
                }
            </div>
        </div>;
    }
}

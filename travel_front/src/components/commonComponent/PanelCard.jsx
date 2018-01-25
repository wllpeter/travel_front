/**
 * @description 卡片面板
 * @author zuilafeng
 */
import React, {Component} from 'react';
import {Icon} from 'antd';
import {Select} from 'mtui/index';
import './style.scss';

const Option = Select.Option;
export default class PanelCard extends Component {

    static defaultProps = {
        timeSelectRequired: false,
        zoomRequired: false,
        notTimeSelectRequired: false
    };

    constructor(props) {
        super(props);

        this.state = {
            timeValue: props.defaultValue || ' '    // 日期选择
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                timeValue: nextProps.defaultValue
            });
        }
    }

    // 时间选择改变
    selectChange(e) {
        let value = e.target.value;
        this.setState({
            timeValue: value
        });

        if (value) {
            let timeArr = value.split('-');
            if (timeArr && timeArr.length) {
                this.props.clickBack && this.props.clickBack(timeArr[0], timeArr[1]);
            }
        }
    }

    render() {
        const {
            className,
            title,
            enlarge,
            narrow,
            headerClassName,
            timeSelectRequired,
            defaultValue,
            zoomRequired,
            zoomOutRequired,
            options,
            clickBack
        } = this.props;

        let classNames = ['panel-card'];

        if (className) {
            classNames.push(className);
        }

        return <div className={classNames.join(' ')}>
            <div className={`panel-card-header ${ headerClassName || ''}`}>
                <h3 style={{'fontSize': zoomOutRequired ? '20px' : '16px'}}>{title}</h3>
                {
                    timeSelectRequired &&
                    <Select trigger="click" value={this.state.timeValue} onChange={this.selectChange.bind(this)}>
                        {
                            options
                        }
                    </Select>
                }

                {
                    !zoomOutRequired && zoomRequired &&
                    <a className="zoom-in" title="放大" onClick={() => {
                        enlarge();
                    }}><Icon type="arrows-alt"/></a>
                }

                {
                    zoomOutRequired && <a className="zoom-out" title="缩小" style={{'fontSize': '20px'}}
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

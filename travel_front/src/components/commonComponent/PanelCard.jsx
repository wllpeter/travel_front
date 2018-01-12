/**
 * @description 卡片面板
 * @author zuilafeng
 */
import React, {Component} from 'react';
import { Icon } from 'antd';
import { Select } from 'mtui/index';
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
            ...other
        } = this.props;

        let classNames = ['panel-card'];

        if (className) {
            classNames.push(className);
        }

        return <div className={classNames.join(' ')} {...other}>
            <div className={`panel-card-header ${ headerClassName || ''}`}>
                <h3>{title}</h3>

                {
                    timeSelectRequired && <Select trigger="click" value={ defaultValue || ' '}>
                        {
                            options
                        }
                    </Select>
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

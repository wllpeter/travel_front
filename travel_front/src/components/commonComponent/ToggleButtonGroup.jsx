/**
 * @description 切换按钮组
 * @author zuilafeng
 */
import React, {Component} from 'react';
import './style.scss';

export default class ToggleButtonGroup extends Component {
    constructor(props) {
        super(props);
        let activeIndex = this.props.activeIndex;
        this.state = {
            activeIndex: activeIndex === undefined ? 0 : activeIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeIndex !== this.props.activeIndex) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }

    // 选中某一项
    selectItem(index, item) {
        this.setState({
            activeIndex: index
        });
        if (typeof this.props.clickBack === 'function') {
            this.props.clickBack({
                index: index,
                ...item
            });
        }
    }

    // 重置按钮状态
    resetButtonState() {
        let activeIndex = this.props.activeIndex;
        this.setState({
            activeIndex: activeIndex === undefined ? 0 : activeIndex
        });
    }

    render() {
        let {clickBack, buttons, style} = this.props;
        const {activeIndex} = this.state;
        if (style === undefined) {
            style = {};
        }

        return <div className="toggle-button-group" style={{...style}}>
            {
                (buttons && buttons.length > 0) && <ul>
                    {
                        buttons.map((button, index) => {
                            return <li key={index}>
                                <a data-value={button.value} className={activeIndex === index ? 'active' : ''}
                                   onClick={this.selectItem.bind(this, index, button)}>{button.buttonName}</a>
                            </li>;
                        })
                    }
                </ul>
            }
        </div>;
    }
}
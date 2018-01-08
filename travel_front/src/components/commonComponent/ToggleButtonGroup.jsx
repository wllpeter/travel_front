/**
 * @description 切换按钮组
 * @author zuilafeng
 */
import React, { Component } from 'react';
import './style.scss';

export default class ToggleButtonGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        };
    }

    // 选中某一项
    selectItem(index) {
        this.setState({
            activeIndex: index
        });
    }

    render() {
        const { clickBack, buttons } = this.props;
        const { activeIndex } = this.state;

        return <div className="toggle-button-group">
            {
                (buttons && buttons.length > 0) && <ul>
                    {
                        buttons.map((button, index) => {
                            return <li key={ index }><a data-value={ button.value } className={ activeIndex === index ? 'active' : ''} onClick={ this.selectItem.bind(this, index) }>{ button.buttonName }</a></li>
                        })
                    }
                </ul>
            }
        </div>;
    }
}
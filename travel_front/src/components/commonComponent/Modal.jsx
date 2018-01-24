/**
 * @description 放大弹出框
 * @author zuilafeng
 */
import React, {Component} from 'react';
import $ from 'jquery';
import './style.scss';

export default class PercentBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            boxShow: false
        };
    }

    componentDidMount() {
        let _this = this;
    }

    componentDidUpdate() {
        let {visible} = this.props;
        if (visible === this.state.boxShow) {
            return;
        }
        if (visible) {
            let _this = this;
            $('body').css('overflow', 'hidden');
            setTimeout(() => {
                _this.setState({boxShow: true}, () => {
                    if (typeof _this.props.onOk === 'function') {
                        setTimeout(() => {
                            _this.props.onOk();
                        }, 300);
                    }
                });
            }, 200);
        } else {
            let _this = this;
            $('body').css('overflow', 'auto');
            this.setState({boxShow: false});
        }
    }

    // 关闭模态框
    closeModal() {
        let _this = this;
        this.setState({
            boxShow: false
        });
        $('body').css('overflow', 'auto');
        setTimeout(() => {
            _this.props.onCancel();
        }, 300);
    }

    render() {
        let {visible} = this.props;
        let {modalShow, boxShow} = this.state;
        return visible && <div className="modal-mask">
            <div className={`md-effect-1 ${boxShow ? 'md-show' : ''}`}>
                <div className="modal-box md-content">
                    {
                        this.props.children
                    }
                </div>
            </div>
        </div>;
    }
}
/**
 * @description 放大弹出框
 * @author zuilafeng
 */
import React, {Component} from 'react';
import {Modal, Button} from 'antd';
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
        // setTimeout(() => {
        //     _this.setState({
        //         modalShow: true
        //     });
        //     setTimeout(() => {
        //         _this.setState({
        //             boxShow: true
        //         });
        //     }, 200);
        // }, 1000);

        // setTimeout(() => {
        //     _this.setState({
        //         modalShow: false
        //     });
        // }, 2000);
    }

    componentDidUpdate(){
        let {visible} = this.props;
        if(visible === this.state.boxShow){
            return;
        }
        if (visible) {
            let _this = this;
            setTimeout(() => {
                _this.setState({boxShow: true}, () => {
                    if(typeof _this.props.onOk === 'function'){
                        setTimeout(() => {
                            _this.props.onOk();
                        }, 300);
                    }
                });
            }, 200);
        }else{
            let _this = this;
            this.setState({boxShow: false});
        }
    }

    // 关闭模态框
    closeModal() {
        let _this = this;
        this.setState({
            boxShow: false
        });
        setTimeout(() => {
            _this.this.props.onCancel();
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
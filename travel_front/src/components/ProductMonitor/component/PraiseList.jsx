/**
 * @description 旅游产品好评榜
 */
import React, {Component} from 'react';

export default class PraiseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1
        };
    }

    componentDidMount() {
        this.print();
    }

    print() {

    }

    render() {
        let {type} = this.state;
        return <div className="switch-btn-box">
            <div className="switch-btn">
                <div className={`switch-btn-left ${type === 1 ? 'switch-btn-active' : ''}`}>产品
                </div>
                <div className={`switch-btn-right ${type === 2 ? 'switch-btn-active' : ''}`}>景区
                </div>
            </div>
            <div className="praise">
            </div>
        </div>;
    }
}
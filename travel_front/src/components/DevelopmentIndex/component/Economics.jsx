/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class Economics extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print();
        });
    }

    print() {

    }

    render() {
        return <div id="dev-index-economics" className="dev-down-map">
        </div>;
    }
}
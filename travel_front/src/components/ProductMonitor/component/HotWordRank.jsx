/**
 * @description 产品热词排行榜
 */
import React, {Component} from 'react';
import {getKeyWordRank} from '../../../services/ProductMonitor/ProductData';

export default class HotWordRank extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return <div className="product-down-map" style={{paddingTop: '40px'}}>
            <table className="mt-table col-1-al">
                <thead>
                <tr>
                    <th>排名</th>
                    <th>产品热词</th>
                    <th>搜索指数</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        01
                    </td>
                    <td>九寨沟</td>
                    <td>8756</td>
                </tr>
                <tr>
                    <td>
                        02
                    </td>
                    <td>西双版纳</td>
                    <td>8121</td>
                </tr>
                <tr>
                    <td>
                        03
                    </td>
                    <td>都江堰</td>
                    <td>7890</td>
                </tr>
                <tr>
                    <td>
                        04
                    </td>
                    <td>九寨沟</td>
                    <td>7312</td>
                </tr>
                <tr>
                    <td>
                        05
                    </td>
                    <td>西双版纳</td>
                    <td>6789</td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}
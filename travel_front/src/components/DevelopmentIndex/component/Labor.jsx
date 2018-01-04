/**
 * @description 旅游劳动投入
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class Reputation extends Component {
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
        return <div id="dev-index-labor" className="dev-down-map" style={{padding: '0 20px'}}>
            <table className="mt-table mt-table-noborder col-1-al">
                <thead>
                <tr>
                    <th className="pl-12" className="labor_td">地区</th>
                    <th>活跃指数</th>
                    <th>增速</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="labor_td">四川省</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td className="labor_td">川西北经济生态区</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td className="labor_td">成都平原经济区</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td className="labor_td">川东北经济区</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td className="labor_td">川南经济区</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td className="labor_td">攀西经济区</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}
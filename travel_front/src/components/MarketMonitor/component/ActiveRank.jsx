/**
 * @description 省内活跃度排行榜
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';

export default class ActiveRank extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return <PanelCard title="省内活跃度排行榜" className="bg-grey">
            <table className="mt-table mt-table-noborder" style={{ height: 280 }}>
                <thead>
                <tr>
                    <th>地区</th>
                    <th>活跃度</th>
                    <th>增速</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>成都</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td>德阳</td>
                    <td>93</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>阿坝</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td>成都</td>
                    <td>96.5</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td>德阳</td>
                    <td>93</td>
                    <td>15%</td>
                </tr>
                </tbody>
            </table>
        </PanelCard>;
    }
}
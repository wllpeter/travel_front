/**
 * @description 旅游产品好评榜
 */
import React, {Component} from 'react';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';

export default class PraiseList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.print();
    }

    print() {

    }

    render() {
        let switchProps = {
            buttons: [
                {buttonName: '产品'},
                {buttonName: '景区'}
            ],
            style: {
                top: '-5%',
                right: '50%',
                transform: 'translateX(50%)'
            }
        };
        return <div className="switch-btn-box">
            <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
            <div className="praise">
                <table className="mt-table col-1-al">
                    <thead>
                    <tr>
                        <th>排名</th>
                        <th>名称</th>
                        <th>评分</th>
                        <th>环比</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            01
                            <span className="praise-icon praise-icon-up">
                                <i className="iconfont icon-up"></i>
                                1
                            </span>
                        </td>
                        <td>九寨沟</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            02
                            <span className="praise-icon  praise-icon-down">
                                <i className="iconfont icon-down"></i>
                                 1
                            </span>
                        </td>
                        <td>西双版纳</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            03
                            <span className="praise-icon">
                                &nbsp;&nbsp;
                                <i className="iconfont">-</i>
                                &nbsp;&nbsp;
                            </span>
                        </td>
                        <td>都江堰</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            04
                            <span className="praise-icon praise-icon-up">
                                <i className="iconfont icon-up"></i>
                                1
                            </span>
                        </td>
                        <td>九寨沟</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            02
                            <span className="praise-icon  praise-icon-down">
                                <i className="iconfont icon-down"></i>
                                 1
                            </span>
                        </td>
                        <td>西双版纳</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            05
                            <span className="praise-icon">
                                &nbsp;&nbsp;
                                <i className="iconfont">-</i>
                                &nbsp;&nbsp;
                            </span>
                        </td>
                        <td>都江堰</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            06
                            <span className="praise-icon praise-icon-up">
                                <i className="iconfont icon-up"></i>
                                1
                            </span>
                        </td>
                        <td>九寨沟</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            07
                            <span className="praise-icon praise-icon-up">
                                <i className="iconfont icon-up"></i>
                                1
                            </span>
                        </td>
                        <td>九寨沟</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            08
                            <span className="praise-icon  praise-icon-down">
                                <i className="iconfont icon-down"></i>
                                 1
                            </span>
                        </td>
                        <td>西双版纳</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            09
                            <span className="praise-icon">
                                &nbsp;&nbsp;
                                <i className="iconfont">-</i>
                                &nbsp;&nbsp;
                            </span>
                        </td>
                        <td>都江堰</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>
                            10
                            <span className="praise-icon praise-icon-up">
                               <i className="iconfont icon-up"></i>
                                1
                            </span>
                        </td>
                        <td>九寨沟</td>
                        <td>5</td>
                        <td>15%</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
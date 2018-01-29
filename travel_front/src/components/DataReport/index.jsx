/**
 * @description 旅游大数据报告
 */
import React, {Component} from 'react';
import '../../plugins/pdfjs/pdf';
// import '../../plugins/pdfjs/viewer';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems: [
                {
                    name: '旅游大数据分析报告',
                    selected: true,
                    children: [
                        {
                            name: '2017年第一季度',
                            selected: true
                        },
                        {
                            name: '2017年第二季度',
                            selected: false
                        }
                    ]
                },
                {
                    name: '旅游产业发展报告',
                    selected: false,
                    children: [
                        {
                            name: '2017年第一季度',
                            selected: false
                        },
                        {
                            name: '2017年第二季度',
                            selected: false
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {
        var url = 'http://www.jq22.com/demo/pdfobject-141021092802/sample.pdf';
        PDFJS.workerSrc = '/static/data/pdfjs/pdf.worker.js';
        PDFJS.getDocument(url).then(function getPdf(pdf) {
            pdf.getPage(1).then(function getPage(page) {
                var scale = 2;
                var viewport = page.getViewport(scale);
                var canvas = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        });
    }

    chooseFatherNav(index) {
        let {navItems} = this.state;
        navItems[index].selected = !navItems[index].selected;
        this.setState({navItems: navItems});
    }

    chooseChildrenNav(index, i) {
        let {navItems} = this.state;
        navItems.forEach((item, n) => {
            item.children.forEach((child, m) => {
                if (index === n && i === m) {
                    navItems[n].children[m].selected = true;
                    return;
                }
                navItems[n].children[m].selected = false;
            });
        });
        this.setState({navItems: navItems});
    }

    render() {
        let {navItems} = this.state;
        return <div className="report">
            <div className="nav-left-box">
                <ul className="nav-left">
                    {
                        navItems.map((item, index) => {
                            return <li className="nav-father" key={index}>
                                <a className="nav-father-name" onClick={() => {
                                    this.chooseFatherNav(index);
                                }}>
                                    {item.name}
                                    <i className={`iconfont icon-xiangyou ${item.selected ? 'icon-open' : ''}`}></i>
                                </a>
                                <ul className="nav-children"
                                    style={{height: item.selected ? item.children.length * 60 + 'px' : 0}}>
                                    {
                                        item.children.map((child, i) => {
                                            return <li key={i}
                                                       onClick={() => {
                                                           this.chooseChildrenNav(index, i);
                                                       }}
                                                       className={`nav-children-name ${child.selected ? 'active-nav' : ''}`}>
                                                {child.name}
                                            </li>;
                                        })
                                    }
                                </ul>
                            </li>;
                        })
                    }
                </ul>
            </div>
            <div className="pdf-box" id="my-container">
                <canvas id="the-canvas"></canvas>
                <div className="top-buttons">
                    <i className="iconfont icon-print"></i>
                    <i className="iconfont icon-download-copy"></i>
                    <i className="iconfont icon-shuaxin"></i>
                </div>
                <div className="right-buttons">
                    <i className="iconfont icon-big"></i>
                    <i className="iconfont icon-fangda"></i>
                    <i className="iconfont icon-suoxiao"></i>
                </div>
            </div>
        </div>;
    }
}
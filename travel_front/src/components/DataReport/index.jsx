/**
 * @description 旅游大数据报告
 */
import React, {Component} from 'react';
import '../../plugins/pdfjs/pdf';
import './style.scss';
import $ from 'jquery';

const scaleList = [3, 2, 1.5, 1, .75, .5, .2]; // 可缩放的列表

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
            ],
            numPages: 0, // pdf总页数
            marginLeft: 0,
            scale: 1,
            canvasWidth: null // 记录一倍时canvas的宽度
        };
        this.pdf = null;
        this.boxWidth = null;
        this.boxHeight = null;
    }

    componentDidMount() {
        this.boxWidth = $('.pdf-box').width();
        this.boxHeight = $('.pdf-box').height();
        let _this = this;
        let url = 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
        PDFJS.workerSrc = '/static/data/pdfjs/pdf.worker.js';
        this.setState({scale: 1});
        PDFJS.getDocument(url).then(function getPdf(pdf) {
            _this.pdf = pdf;
            _this.setState({
                numPages: pdf.numPages
            }, () => {
                setTimeout(() => {
                    _this.drawPdf.bind(_this)();
                });
            });
        });
    }

    // 绘制pdf
    drawPdf() {
        let _this = this;
        let fn = (p) => {
            _this.pdf.getPage(p).then(function getPage(page) {
                let scale = _this.state.scale;
                let viewport = page.getViewport(scale);
                let canvas = document.getElementById('the-canvas' + p);
                let context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                if (p === 1) {
                    _this.setState({
                        marginLeft: (_this.boxWidth - viewport.width) / 2,
                        scale: scale,
                        canvasWidth: viewport.width
                    });
                }
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        };
        for (let i = 1; i <= this.pdf.numPages; i++) {
            fn(i);
        }
    }

    // 缩小pdf
    narrowPdf() {
        let index = 0;
        scaleList.forEach((val, i) => {
            if (val === this.state.scale) {
                index = i;
            }
        });
        if (index === scaleList.length - 1) {
            return;
        }
        this.setState({
            scale: scaleList[index + 1]
        }, () => {
            this.drawPdf();
        });
    }

    // 放大pdf
    enlargePdf() {
        let index = 0;
        scaleList.forEach((val, i) => {
            if (val === this.state.scale) {
                index = i;
            }
        });
        if (index === 0) {
            return;
        }
        this.setState({
            scale: scaleList[index - 1]
        }, () => {
            this.drawPdf();
        });
    }

    coverPdf() {
        this.setState({
            scale: this.boxWidth * this.state.scale / this.state.canvasWidth
        }, () => {
            this.drawPdf();
        });
    }

    // 打印pdf
    printPdf() {

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
        let {navItems, marginLeft, scale, numPages} = this.state;
        let canvasNum = [];
        for (let i = 0; i < numPages; i++) {
            canvasNum.push(i + 1);
        }
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
                {
                    canvasNum.length > 0 && canvasNum.map((val, index) => {
                        return <canvas id={'the-canvas' + val} key={index}
                                       className="myCanvas"
                                       style={{marginLeft: marginLeft}}></canvas>;
                    })
                }
                <div className="top-buttons">
                    <i className="iconfont icon-print" onClick={this.printPdf}></i>
                    <i className="iconfont icon-download-copy"></i>
                    <i className="iconfont icon-shuaxin"></i>
                </div>
                <div className="right-buttons">
                    <i id="presentationMode" className="iconfont icon-big" onClick={this.coverPdf.bind(this)}></i>
                    <i className="iconfont icon-fangda" onClick={this.enlargePdf.bind(this)}></i>
                    <i className="iconfont icon-suoxiao" onClick={this.narrowPdf.bind(this)}></i>
                </div>
            </div>
        </div>;
    }
}
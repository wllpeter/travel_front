/**
 * @description 旅游大数据报告
 */
import React, {Component} from 'react';
import {LoadingBox} from 'mtui/index';
import {message} from 'antd';
import devConfig from '../../config/config.dev';
import 'antd/lib/message/style';
import '../../plugins/pdfjs/pdf';
import './style.scss';
import $ from 'jquery';
import {getPdfList, getReport} from '../../services/DataReport/dataReport';

let baseUrl = '/download';
const scaleList = [3, 2, 1.5, 1, .75, .5]; // 可缩放的列表
let timer = null; // 一次性定时器

const canvasTop = 60; // 记录第一个canvas容器距页面顶部的高度
const margin = 4; // canvas之间的margin值

if (__DEV__) {
    baseUrl = devConfig.DEV_API_SERVER + '/download';
}

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdfUrl: '', // 选中的pdf的url
            navItems: [
                {
                    name: '旅游大数据分析报告',
                    selected: true,
                    children: []
                },
                {
                    name: '旅游产业发展报告',
                    selected: false,
                    children: []
                }
            ],
            numPages: 0, // pdf总页数
            marginLeft: 0,
            scale: 1,
            rotate: 0, // 选择角度
            canvasWidth: null, // 记录一倍时canvas的宽度
            canvasHeight: null, // 记录一倍时canvas的高度
            loadingCode: false,
            loadingTitle: '加载pdf解析器',
            bigBtnShow: true, // 显示放大的按钮
            page: 1 // pdf 当前页
        };
        this.pdf = null;
        this.boxWidth = null;
        this.boxHeight = null;
        this.flipPage = this.flipPage.bind(this);
    }

    componentDidMount() {
        this.getPdfList();
        this.boxWidth = $('.pdf-box')[0].clientWidth;
        this.boxHeight = $('.pdf-box')[0].clientHeight;
        this.setState({
            loadingTitle: '加载pdf解析器'
        });
        PDFJS.workerSrc = '/static/data/pdfjs/pdf.worker.min.js';
        this.scrollEvent();

        // 绑定键盘事件
        document.addEventListener('keydown', this.flipPage);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.flipPage);
    }

    // 绑定键盘左右进行翻页
    flipPage(e) {
        let page = this.state.page;
        let numPages = this.state.numPages;
        switch (e.keyCode) {
            case 37:
                if (page > 1) {
                    page--;
                    this.setState({page}, () => {
                        this.positionViewer()
                        this.setFilpTimer(this.drawPdf.bind(this));
                    });
                }
                break;
            case 39:
                if (page < numPages) {
                    page++;
                    this.setState({page}, () => {
                        this.positionViewer()
                        this.setFilpTimer(this.drawPdf.bind(this));
                    });
                }
                break;
            default:
                break;

        }
    }

    // 设置一个定时器优化翻页功能
    setFilpTimer(callback){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=>{
            if(callback){
                callback();
            }
            timer = null;
        }, 200);
    }

    // 获取所有pdf
    getPdfList() {
        let navItems = this.state.navItems;
        getPdfList().then(res => {
            let first = true;
            res.forEach(item => {
                let selected = false;
                if (item.type === 0 && first) {
                    first = false;
                    selected = true;
                    this.getReport(item.id);
                }
                navItems[item.type].children.push({
                    name: item.name,
                    selected: selected,
                    id: item.id
                });
            });
            this.setState({navItems});
        });
    }

    // 更具id获取文件详情
    getReport(id) {
        getReport({id}).then(res => {
            let pdfUrl = baseUrl + res.address;
            this.setState({pdfUrl}, () => {
                this.analysisPdf();
            });
        });
    }

    // 根据pdf的url解析pdf
    analysisPdf() {
        let _this = this;
        let url = this.state.pdfUrl;
        this.setState({
            scale: 1,
            loadingShow: true,
            numPages: 0
        });
        PDFJS.getDocument(url).then(function getPdf(pdf) {
            _this.pdf = pdf;
            _this.setState({
                numPages: pdf.numPages,
                loadingTitle: '报告载入中',
                bigBtnShow: true
            }, () => {
                setTimeout(() => {
                    _this.drawPdf.bind(_this)();
                });
            });
        }).catch(() => {
            message.error('文件无法解析');
            _this.setState({
                loadingShow: false
            });
        });
    }

    // 绘制pdf
    drawPdf() {
        let _this = this;
        var currentPage = this.state.page;
        let fn = (p) => {
            _this.pdf.getPage(p).then(function getPage(page) {
                let scale = _this.state.scale;
                let rotate = _this.state.rotate;
                let viewport = page.getViewport(scale, rotate);
                let canvas = document.getElementById('the-canvas' + p);
                let context = canvas.getContext('2d');
                let canvasHeight = parseInt(viewport.height);
                canvas.height = canvasHeight;
                canvas.width = viewport.width;
                context.clearRect(0, 0, canvas.width, canvasHeight);
                if (p === currentPage) {
                    _this.setState({
                        marginLeft: (_this.boxWidth - viewport.width) / 2,
                        scale: scale,
                        canvasWidth: viewport.width,
                        canvasHeight: canvasHeight
                    });
                }
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                let pageRender = page.render(renderContext);
                if (p === currentPage) {
                    pageRender.promise.then(() => {
                        _this.setState({loadingShow: false});
                    });
                }
                if (p === currentPage + 4) {
                    _this.positionViewer();
                    return;
                }
                if (p === _this.pdf.numPages) {
                    _this.positionViewer();
                }
            });
        };
        for (let i = currentPage; i < currentPage + 5 && i <= this.pdf.numPages; i++) {
            fn(i);
        }
    }

    // 缩小pdf
    narrowPdf() {
        if (this.state.loadingShow) {
            message.warning('请等待报告完全载入完');
            return;
        }
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
            scale: scaleList[index + 1],
            bigBtnShow: true
        }, () => {
            this.drawPdf();
        });
    }

    // 放大pdf
    enlargePdf() {
        if (this.state.loadingShow) {
            message.warning('请等待报告完全载入完');
            return;
        }
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
            scale: scaleList[index - 1],
            bigBtnShow: true
        }, () => {
            this.drawPdf();
        });
    }

    coverPdf() {
        if (this.state.loadingShow) {
            message.warning('请等待报告完全载入完');
            return;
        }
        this.setState({
            scale: this.boxWidth * this.state.scale / this.state.canvasWidth,
            bigBtnShow: false
        }, () => {
            this.drawPdf();
        });
    }

    // 还原大小
    reducePdf() {
        this.setState({
            scale: 1,
            bigBtnShow: true
        }, () => {
            this.drawPdf();
        });
    }

    // 刷新pdf
    refresh() {
        if (this.state.loadingShow) {
            message.warning('请等待报告完全载入完');
            return;
        }
        let page = 1;
        let scale = 1;
        this.setState({page, scale}, () => {
            this.drawPdf();
        });
    }

    // 打印pdf
    printPdf() {
        if (this.state.loadingShow) {
            message.warning('请等待报告完全载入完');
            return;
        }
        $('#printIframe')[0].contentWindow.print();
    }

    // 监听pdf页面滚动事件
    scrollEvent() {
        let _this = this;
        $('#my-pdf').scroll(function (event) {
            let top = 0;
            if ($('#the-canvas1').offset()) {
                top = $('#the-canvas1').offset().top;
            }
            let page = _this.state.page;
            let currentPage = parseInt((canvasTop - top + margin) / (_this.state.canvasHeight + margin)) + 1;
            if (page !== currentPage) {
                _this.setState({page: currentPage}, () => {
                    _this.drawPdf();
                });
            }
        });
    }

    // 当页面重新绘制后，更具当前的page值进行定
    positionViewer() {
        let page = this.state.page;
        let canvasHeight = this.state.canvasHeight;
        let top = (canvasHeight + margin) * (page - 1);
        $('#my-pdf').scrollTop(top);
    }

    chooseFatherNav(index) {
        let {navItems} = this.state;
        navItems[index].selected = !navItems[index].selected;
        this.setState({navItems: navItems});
    }

    chooseChildrenNav(index, i, id) {
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
        this.getReport(id);
    }

    render() {
        let {navItems, marginLeft, canvasWidth, canvasHeight, numPages, loadingShow, loadingTitle, bigBtnShow, page, pdfUrl} = this.state;
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
                                                           this.chooseChildrenNav(index, i, child.id);
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
            <div className="pdf-box" id="my-pdf">
                {
                    canvasNum.length > 0 && canvasNum.map((val, index) => {
                        return <canvas id={'the-canvas' + val} key={index}
                                       className="myCanvas"
                                       width={canvasWidth}
                                       height={canvasHeight}
                                       style={{marginLeft: marginLeft}}/>;
                    })
                }
                <div style={{height: '80vh'}}></div>
                <LoadingBox show={loadingShow} info={loadingTitle} type="loading3"/>
                <div className="top-buttons">
                    <span className="page-count">{page}/{numPages}</span>
                    <i className="iconfont icon-print" title="打印" onClick={this.printPdf.bind(this)}/>
                    <a href={pdfUrl} download>
                        <i className="iconfont icon-download-copy" title="下载"/>
                    </a>
                    <i className="iconfont icon-rotate" onClick={this.refresh.bind(this)} title="刷新"/>
                </div>
                <div className="right-buttons">
                    {
                        !bigBtnShow &&
                        <i className="iconfont icon-small" title="还原大小" onClick={this.reducePdf.bind(this)}/>
                    }
                    {
                        bigBtnShow && <i className="iconfont icon-big" title="适合页宽" onClick={this.coverPdf.bind(this)}/>
                    }
                    <i className="iconfont icon-fangda" title="放大" onClick={this.enlargePdf.bind(this)}/>
                    <i className="iconfont icon-suoxiao" title="缩小" onClick={this.narrowPdf.bind(this)}/>
                </div>

                <iframe style={{display: 'none'}} id="printIframe"
                        src={pdfUrl}/>
            </div>
        </div>;
    }
}
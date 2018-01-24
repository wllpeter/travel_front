/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import AD_CHART from '../../../utils/adCharts';

export default class EnterprisesNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.print();
        });
    }

    print() {
        let {visible} = this.state;
        AD_CHART.barChart({
            chartId: visible ? 'companyBarChart2' : 'companyBarChart',
            barWidth: visible ? 24 : 16,
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: '企业(家)',
            legend: ['存量企业', '增量企业'],
            legendIcon: 'circle',
            legendRight: '22',
            gridBottom: 25,
            gridTop: 80,
            legendSize: visible ? 16 : 12,
            series: [[233, 322, 100, 200], [323, 323, 320, 330]]
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        let {visible} = this.state;
        return <div>
            <PanelCard title="省内涉旅企业数量变更" className="bg-grey" zoomRequired={true}
                       enlarge={this.showModal.bind(this)} timeSelectRequired={true}>
                <div id="companyBarChart" style={{width: '100%', height: 300}}></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.print.bind(this)();
            }}>
                <PanelCard title="省内涉旅企业数量变更" className="bg-grey" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <div id="companyBarChart2" style={{width: '100%', height: 460}}></div>
                </PanelCard>
            </Modal>
        </div>;
    }
}
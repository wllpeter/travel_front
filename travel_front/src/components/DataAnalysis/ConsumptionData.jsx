/**
 * @description 消费大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import { Row, Col } from 'antd';
import 'antd/lib/grid/style';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="consumption-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="全省旅游消费情况">

                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <Row>
                        <Col span={ 12 }>
                            <PanelCard title="外地游客刷卡消费金额分析">

                            </PanelCard>
                        </Col>
                        <Col span={ 12 }>
                            <PanelCard title="外地游客交易笔数分析">

                            </PanelCard>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={ 12 }>
                            <PanelCard title="各地市外地游客刷卡消费金额分析">

                            </PanelCard>
                        </Col>
                        <Col span={ 12 }>
                            <PanelCard title="各地市外地游客交易笔数分析">

                            </PanelCard>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="入川高消费游客来源城市排名">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="入川游客来源地排名">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="旅游消费交易分析">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="各行业刷卡消费商户排名">

                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}
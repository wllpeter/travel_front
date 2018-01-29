/**
 * @description 搜索人群来源地
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import AdCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getHeaderOptions} from '../../../../utils/tools';
import {getSearchPersonSource} from '../../../../services/DataAnalysis/searchData';

var geoCoordMap = {
    '新疆': [87.68, 43.77],
    '甘肃': [103.73, 36.03],
    '青海': [101.74, 36.56],
    '拉萨': [91.11, 29.97],
    '宁夏': [106.27, 38.47],
    '内蒙古': [111.65, 40.82],
    '海南': [110.35, 20.02],
    '上海': [121.48, 31.22],
    '安徽': [117.27, 31.86],
    '江苏': [118.78, 32.04],
    '浙江': [120.19, 30.26],
    '广东': [113.23, 23.16],
    '福建': [119.3, 26.08],
    '广西': [108.33, 22.84],
    '河南': [113.65, 34.76],
    '湖北': [114.31, 30.52],
    '湖南': [113, 28.21],
    '江西': [115.89, 28.68],
    '北京': [116.46, 39.92],
    '吉林': [125.35, 43.88],
    '大连': [121.62, 38.92],
    '辽宁': [123.38, 41.8],
    '黑龙江': [126.63, 45.75],
    '天津': [117.2, 39.13],
    '山东': [117, 36.65],
    '青岛': [120.33, 36.07],
    '山西': [112.53, 37.87],
    '河北': [114.48, 38.03],
    '陕西': [108.95, 34.27],
    '四川': [104.06, 30.67],
    '重庆': [106.54, 29.59],
    '云南': [102.73, 25.04],
    '贵州': [106.63, 26.64]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

export default class SearchPeopleSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            month: null,
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        if (this.state.panelProps) {
            return;
        }
        let times = nextProps.timeRange.month;
        this.getHeaderOptions(times);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                zoomRequired: true,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.fetchSearchPersonSource();
                    });
                }
            }),

            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.fetchSearchPersonSource();
        });
    }

    // 获取人群来源地
    fetchSearchPersonSource() {
        getSearchPersonSource({
            year: this.state.year,
            month: this.state.month
        }).then(data => {
            if (data && data.length) {
                let peopleSourceData = null;

                peopleSourceData = data.map(item => {
                    return {
                        name: item.resourcePlace,
                        value: (Number(item.ratio) * 100).toFixed(2) - 0
                    };
                });

                this.setState({
                    peopleSourceData
                }, () => {
                    this.renderSearchPeopleSource();
                    if(this.state.visible){
                        this.renderSearchPeopleSource(true);
                    }
                });
            }
        });
    }

    // 搜索人群来源地
    renderSearchPeopleSource(visible) {
        const {peopleSourceData} = this.state;

        AdCharts.mapChart({
            chartId: visible ? 'visualMapPiecewise2' : 'visualMapPiecewise',
            mapAddress: '/static/data/map/china.json',
            mapTypeName: 'china',
            geo: {
                show: true,
                roam: true,
                map: 'china',
                scaleLimit: [1, 2],
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#4b617a'
                    }
                }
            },
            seriesOption: [{
                name: '搜索人群来源地',
                type: 'scatter',
                coordinateSystem: 'geo',
                hoverAnimation: true,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsSAAALEgHS3X78AAASAUlEQVRoga2abYht53Xff//17H3Ombl37lVEU8ftle2rK1uWa1kyhUBLHQUS+iGEOIWEFhKTtglVWyuGvkAoLqUvlH5xKAQ54NaE4NalTaGhNqUfmoBC2oamUL3YjV6wdK9tQVNQJd23mTln72f9++HZ+8yZ0fW1JGcPD2dmzzl7P7+znv2stf5ryTbfy/H4b6E8gBxRgBQoEizi+W+//IGaeRkg7Yt2fqxE+d35s/vLvWfu/4FLb8hkBjhxgqPDcRO+8KN8T5PTu4V74vfRaERFCQqIZ6+99Jidj9n+IcMntm82ic9MVAgRwA3Bs1J8tZTyOw+/74FnEjLAFNzdwk/+yLuDfMdwT/w22hwgEimJ57/98uX1OHzG9qeACyQVU0lXmyRJIKfpzTfTzk+REKFC0CFeDcWTB3vnvnT/D1x6XSKjYo348z/8ziDfNtynn0LuUBZkES9865X7j4fN52z/OCapHpyMVMYZbgJNIM/eRidwgShbuKBTUUfQK/TlZdf/kz/1/itXc0Ml8RfeAeDbgvv5/4aiougpr/yfV++9cXTrc7Z/lqRSvXFloHogGUkGJ0m6WbDBjTSrJaBpBNBNcEGoUxAEHUU9hV6FnqLjCH3+kcsf/scS9Z1Y8bvCPf4UYtmWz3OvvPiTNfOLmAOq1x7ZUL2hsnFlpHrEbCStgc00xgkq2V2WDa4APdDbXgCrZj31KnQUFnRaqL2+1Hf9L3z0/Q88DdTuIv78R+4O+B3hTi1DU565+sIv236CyuDRa0avqWw8ekNlAA4lHQFHO2ADogrqneAMBdNNgEtgAezZ3kPsUbRQoafTko6lOq1LF7/0yOUHf72Kurhwd8A7wn36KTQuEWyX4S/b/hlGH3tgzejjrdXMLUm3J6hDxFowW24AzWDfwXKerbe0adaDfWDf9jmCfYoW6ljSaaVeS3X6Fx+//8N/+7sB3hHub/5Xooryyv999d7rhzf/C/Awg488cNzAvKZyKOkmcAu4LU1waMMOnERyYrntfWc4m5jgFs16Xhr2MXvAOeDA9gGFlXot6bSnnpX6+Pcfv//Df/VugG+Be7wtx1DQPXP1hd+y/ec8+IiBowboNeampOvATYnbwG3QEXAszWDaAKPEd7TcBNa14YVNP1luD7xnOIc5PwFeJDinXiv6LeAX72bBU3Cf/gM0vobo6J65+sKv2f6ZyWJHbHzo0Wuh68B14LrELdDtyXLHwBFoLTEAA20zqUhV7RZbOAPY5QSOvi1LL+0t4D5w3uYAuADcY/lAnVYstK+eVSzKZx69/OCvG2q3Pr2Ldrukfh1FoTx97cWfm8COPVts9LHQm8CbwJsSNyewW21J6miy2hppoxOwEUg1sF3LCVEwBegMnfAStADW4I09W9+j3XZdWfZoJGSkVD75tW9+49mP3vfA0+6oO/c4sdwTv43GfeIPvvXyleNh8z+prLzxIRsfevDRBPYG4k3BddC0JDU/b8dbF9DgBkntedN2We4egefnzsXQYy8MC+wlsGezBz5ncx58YHMB+D7gXssXtNAevc5podcunj/4M1fee+m17pCcw7Wt5TZLJBPrYfNFzDmPPpw3D6GbW4vBmxPYLdAtiUOkIzWLrQUbSQNiFBp3wM5uKC06MQXRyXRum9ACGGyPEtVWlZy2LBl7+mwSHhwSxcF7bh7d+kWbf7RZnqwQ2eaJ30frgfL1b774F2rmb3jwERvf9oZDRt+Q9BrwusSboBsSNyaw25KOEEdCxxNUg4MxpJyet0RnlqWRIbBL2gXTGfeYhe2F7ZVhhX3OZv/Ecr5ocw9wr+3vnyy3rwXn9vZXj3zoT97/8rKnPvmDuAPYbFB0qGZ+jsrAyLoNr6ftftdSt3bADpEOBccKrYU2iCEiRokRVCVVwDoDZyPhsBXF7oy7TEZgRNQWcDuNLGxbktr7JRebXtLSozuC4lB/vNl8NsTPj826Lq/92D/UmJTnrr34V2z/7BR9HHnwWugG8MZkqRvTJnJL4nAGC+lYoWNJ6whtokR7jdhExBARtRTV9ho1IqoUGaGUIkEVKUEZUqptq83SnhYwQiDQ5B9VUNuIMD1SryAQj755dOPfff/BvW989UXoRqMQcuanqAxUNoxsSNaI2UnfAm4DhxJHSIeIo5COEUcNLDaSNpKGCI3T5KvahI3kacfEIGzZKCKL7Vqrq+2KM8Nk5rTdJIDDEFJzGza9YGFYSVq5eo+q3pVxPQy/mPC3fABdHdGLr7582fAJp49a6uJxDql2tvmjyVEfCY6FjhDrHbB1hIaIGNtQAwulJjBpdm+W2/Mup2qmi5SZadeKIYmAzJYvkJRpVz0CdZIXtlaSD20OMYeuLFS98Zh/MeDvDCMZCrQZx0+2nIxhO+BwGlMwrGNNMJLWCm2BJG22YCWGKDFGibHrylBKGfu+G7q+G3dHKWUaMZYuhihliIihlBiltgpC2gitJW2Q1khzBHR8Mq8pYG8p1+DK/rPXXvzkEtRFQjo/NeVio5M6fWi6kNYNanbQrCUNQpuQBk1jBivtdX7GsnTFIVkRW+fqTAGMY5UdWWuGlKdCp1oRykAOoKg5+95wDFpIXttaI68xR5gNlSXJmNWfGIPf7Nx0jIedPiQ90pZkA2nf0DY3U/smB8QGMTCBldKWYokYS4kxSqmlRHZdsSIcIccOHBQyU4qQMyVVj+MumpUpEYogSmYOiNHzPPBgt/kJjk1bUU7vKxld889GQvfctZcem/anJGnSwGyldrH1FARPKQyzD6uSxmnUCNUoURWRM1jpSkaEI8JR4pRlsqYys0G0DKGO4/Q8ZkQpjnFUlTy7h0Fu93ZLpQbwPK82T7f5O3nIIjrbj84nMXUGmPzUKFElRqSRCUTb36kRkQpVRdSQsutKncG6rsso4XIGDKCUcK2prDnF1ITtdGY6VO2ICI+1qotQzdr8n/GIT+Zoa5wgB5KcpY3nrr30WAe+OElv6aZRzdH8qche06ClMC3qQCmRITW/FZFRgrNgpZS7ygGR4Qy7dMW1ZspO5bTLStVWRZMmg2oL7VynYHoK06b5TiyYezrDIxhjJ3ZOEcWdxpx0VklGpEQ2P6YZ0CFtl+EuWNedBhzHqvl/WcMRaadcSqQzM0MTYLsPzbGn2uqyv8P8bCyTTn8ssC/SUoN57GbOCdoNfA34xGpKWubRnPS0K57ePN4KdvZclPYZRVjzdU6HbLOPzDuM05CefsAxXf/k1GlInx0tjdremN3fowQRzVG/neX43Y/m62Eb3dx1qMVunniIM1fbDW53z7VbnXx49+/v6Zi/gLPWZopmvpfjBG7Wfzk12HmdVu+Urvgk0Z1yrFNHPdkF73rU2hSIzDPvd1uZ2z/fOp+z82RHMlGDk54788bYeT075HZDMaUtuAXB2MqaZFrzROeJj2N9C+idzjmzxZvb2JMJ0DFNfHduZ+d8cq6dud4J3rR2lPumAhdOdMVoRZwTyLRVcIBlO7ZBsC1PjnnHf1FK8Z1gaq2afV1mKm1lNrDZcjaBTwDcxu48Tw1NaCXiayHFc1u9XoRPK1LzKJ4V4gncJmyK7XA60o5aM8axarbeDDhb8K5g2SzvzMjpek3683zfJknggj3rnVtxiVmanzhKiWtdX8oztdYylZLCTSDtDL3Y5k+dcIfosGadsQk7nqyXDiujBcI1ALqOHDZjnA295udxBhvHGrXWqDUnKIfTJTPDZoJxZzsm+X07rwZLByxatYgguPXQfVeuxUfuu3INcZOgEE2sARaYHtz7RMvvMX1TqtxluoBLprvM7DJdarrUsZY6VtVaYxxrjOMY4zDGsDkZWVPjMLb/TWDtfC1Zs2Tm9MVRbHd5spr6k+H598V2iIIoEfo9mewSUtJXCP+UG2BHsqIVJqbhBWgxmb+Xt5WZCq6ZrlJ2Eq6iBUXNqYZTzrAjTqc0me35HMeqWjOy1lLTJdPFmV0DzB67x9MXi3vbHVvp/WTYXlBUCHUq8d8zoAtwSF+pob80Ff+Kq1v6Dis1eXtps2iiKYNb9abPZIxwb2dmnjjzyU2o1sxSIiU5ymmXmjWZ3hPOjJouWbPLzK5Wl0z3Nn028ah3g1zMc5nU6YW9BVypNOMs+u6rTtwNxo984MH/+L9eef6QoFeh89hKSZgV8nJK6VegdcupvJRbDGrbrVBvQ2KjmGIYTVG+IpKxsiszMO2uaUe256t4ArNzYbvPzN72wumF8dJNrF2BV2xrCuwB+xR6gl6d/sdD77tyVQV30eGspKR/RfEvOOgp6j16X9I+rZx0bLfEVXgAtdSjZYHtMc8kkVp0brlFi9VSkj4J16Zjsm7biJxlC2j3mV5k5sL2ErNs+iUrYGUz1RI8KdLs295XqKOojxL/No2Xwl3cBO3jZdf/ynFu/gaFhYo3ruwD52wOJR+D1uBhyp/mQNWAs7UzNAlWGbbGCI+2itrZBNBc/8DN+WM1KMe08/azxTBLzCrtFfbK9mqS1/dppa1zwHngHMGSQk/hDx/54INf8kg++YM4vvCjmIIfuu/KVYX+jTp6CguKFrbP06os5ybNfn+6+L7tvWm0G6eXmbm0vbRzmZnLcczFONZFHesiay5qrcta63L6vR/Huqg1F5m5dOZq/tx0zb0JbLpPu/c0l+mVc7bPq6in07L05XNZ8WKxUyvobuFxn7ywd/7vXs+bP07HUunByT6t+DDXtqtbPpVqMnAzyE4xMTNLkx6mhFLbpPYtinMLq5hdSpl2xAVmmfZyBmtW8rntlwwH7BQl6Viq8NIjVx78krNZjWlCPPkjOCp+4D2XXo/QP1WnBZ1W6rSwfQBcaDUyz4XAyZqct71v+1za+07vOb2fmXtZc69mrjK958y9zNzL9DRyOue9zFxl9d50nX2n99K532oEc33O51ulhwvAhekLv4A4mOa67JbdZyVysb5DfU734voa9ZHLH/6VZ155/ifc8aeb3Kf06IuSRpuUPIV+FhCSYvI9s/S2kdlMcsRou6olvG4JNFtru9XDC5OznspXC8NkNVYnJSwOwBemMtZF2xfVNyNEr1975AMf+h3V091GW7jPfwQ//hQ4qRf2D376+u2bLzjZk5026eqUWpbTEmXNS6oDdcK9m9S2MQzGg6y2lGmfPb1beu5o6MBdW5L0U21uOW8e07N2flo9F4F7bN9DpxU9K3V849EPPvRLOVK7P3aXsjGcFPu//u1vfHzYDP/ZG/cMPvTgYyq3JL1BKxnfhFZdnYqPsyq9lQEnPWbuQzGzO/D2OZ1l8jm0mp3zZLWdZ+zEYt9H10rGLPT/7rnnwg9f/uOXXtNInu0uOlU2BtCIWVIffv8DTz979cW/Xp1f9pQ1GuPqkFSm4vys2y+BheRVE0u1brLbpDnOesdO3YaTJpviOfA9iTimdg3vnyzJthTnbgZ6Dcu9xc/d/55LrxfjXz0DdkfLQSv8b26gYsozV1/8yznkP/PgRStttT4USTeAG7Sa+FRX0DFNpd5MRf8R2tLkrTXxYH7mWrF/brRZgVdu7RqzL7tgfECnpXpWdBqW+4uf/OgHHnjadyj03xXuLODXvjkt0QZ4zMCxqzcktyXdamDbjoZJgtese+5Kb2fg2In23Rpt5rCPEz9GsKdOS3qt1PGNi/dc+Ikr7730+rtqstkFHK+3Z+P5b718+Xiz+Q0P/uBcdXVlw+hNA9MhJ9WXt7ZrvBVutlrXNpJtpL+itUid27ZIdcy74n+4cOHg793/3kuv8zb6v75rY9vZHrBnr77wD3LIv+bKatv/1ZraBtwKkRPkXFvY3VS29+V0Y1vHSeqyQqwoU3NbpyWFdbfsPvOx+z/0lXfSufe2+y0ff6ol8LGg/O9vvnx5PQx/30P+1NSOuKEyuLUojuRWjt/sKNh3WpbdJGssEH1LmNW1jj0tKPSli39+cHD+Vx/4E5def6c9l++oU/aODaWbzWc95E9PjaRDK4Mxkk3abjL9BLaLNrdqSDHVs8vUa9kRHJUu/uVi2X/5ofddufpuu2XfVY/z2VbgV/7w1XtvHd/+ZI7+Mdf8855LYSbfDtwkb9yOot9Tif/06JUH//UfRZ/zu27ghpMm7jqe7kp/7tpLjzn9Q07fR+Z9mGQnodMccIe+rohvl6787sPvP2ncHvxH06H+/wECvpr4FGu9fAAAAABJRU5ErkJggg==',
                symbolSize: function (value) {
                    if(visible){
                        return Math.min(value[2] * 50, 90);
                    }
                    return Math.min(value[2] * 30, 60);
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }],
            series: [convertData(peopleSourceData)]
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
        let {visible, panelProps} = this.state;
        return <div>
            <PanelCard title="搜索人群来源地"  enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div id="visualMapPiecewise" style={{width: '100%', height: 300}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchSearchPersonSource.bind(this)();
            }}>
                <PanelCard className="map-card" title="搜索人群来源地"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="visualMapPiecewise2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}
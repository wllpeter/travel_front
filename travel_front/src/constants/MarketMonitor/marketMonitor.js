/**
 *  @description 旅游行业活跃度区域地图的大小和位置调整
 * */
const MAP_SIZE_POSITION = {
    '成都平原经济区': {
        top: 180,
        zoom: .7
    },
    '川西北生态经济区': {
        zoom: 1,
        left: '23%'
    },
    '川东北经济区': {
        zoom: .8,
        left: '23%'
    },
    '川南经济区': {
        zoom: 1,
        left: '23%'
    },
    '攀西经济区': {
        top: 200,
        zoom: .017,
        left: '23%'
    }
};

const CITY_SIZE_POSITION = {
    '成都市': {zoom: .0007, left: '25%', top: -20},
    '德阳市': {zoom: .0017, left: '35%'},
    '绵阳市': {zoom: .0005, left: '20%', top: 240},
    '遂宁市': {left: '25%'},
    '资阳市': {zoom: .9},
    '雅安市': {left: '25%'},
    '眉山市': {zoom: .9},
    '乐山市': {left: '25%'},
    '广元市': {zoom: .01, top: -100, left: '35%'},
    '达州市': {zoom: .001, top: 280, left: '5%'},
    '广安市': {zoom: .002, left: '25%'},
    '南充市': {zoom: .0007, top: -100, left: '5%'},
    '巴中市': {zoom: .0013, top: 340},
    '攀枝花市': {zoom: 0.04, left: '35%'},
    '凉山州': {zoom: 0.004, top: 200, left: '25%'},
    '宜宾市': {top: 50},
    '内江市': {zoom: 0.007, top: -100, left: '20%'},
    '自贡市': {zoom: .9},
    '泸州市': {left: '30%'}
};

export {MAP_SIZE_POSITION, CITY_SIZE_POSITION};
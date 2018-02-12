/**
 *  @description 旅游行业活跃度区域地图的大小和位置调整
 * */
const MAP_SIZE_POSITION = {
    '成都平原经济区': {
        top: '26%',
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
        top: '28%',
        zoom: .017,
        left: '23%'
    }
};

const CITY_SIZE_POSITION = {
    '成都市': {zoom: .0006, left: '25%', top: -20},
    '德阳市': {zoom: .0014, left: '35%'},
    '绵阳市': {zoom: .0004, left: '20%', top: 240},
    '遂宁市': {zoom: .8, left: '25%'},
    '资阳市': {zoom: .7},
    '雅安市': {zoom: .7, left: '25%'},
    '眉山市': {zoom: .7},
    '乐山市': {zoom: .7, left: '25%'},
    '广元市': {zoom: .008, top: -100, left: '35%'},
    '达州市': {zoom: .0008, top: 220, left: '5%'},
    '广安市': {zoom: .0016, left: '25%'},
    '南充市': {zoom: .0006, top: -100, left: '5%'},
    '巴中市': {zoom: .0011, top: 280},
    '攀枝花市': {zoom: 0.03, left: '35%'},
    '凉山州': {zoom: 0.003, top: 200, left: '25%'},
    '宜宾市': {zoom: .7, top: 50},
    '内江市': {zoom: 0.006, top: -100, left: '20%'},
    '自贡市': {zoom: .7},
    '泸州市': {zoom: .7, left: '30%'},
    '阿坝州': {zoom: .8},
    '甘孜州': {zoom: .8}
};

export {MAP_SIZE_POSITION, CITY_SIZE_POSITION};
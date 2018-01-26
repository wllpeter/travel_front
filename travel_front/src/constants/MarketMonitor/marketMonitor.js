/**
 *  @description 旅游行业活跃度区域地图的大小和位置调整
 * */
const MAP_SIZE_POSITION = {
    '成都平原经济区': {
        top: 180,
        zoom: .7,
        scaleLimit: {
            min: .7,
            max: .7
        }
    },
    '川西北生态经济区': {
        zoom: 1,
        left: '23%',
        scaleLimit: {
            min: 1,
            max: 1
        }
    },
    '川东北经济区': {
        zoom: .8,
        left: '23%',
        scaleLimit: {
            min: .8,
            max: .8
        }
    },
    '川南经济区': {
        zoom: 1,
        left: '23%',
        scaleLimit: {
            min: 1,
            max: 1
        }
    },
    '攀西经济区': {
        top: 200,
        zoom: .02,
        left: '23%',
        scaleLimit: {
            min: .017,
            max: .017
        }
    }
};

export {MAP_SIZE_POSITION};
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// 使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    routing: routerReducer // 整合路由
});

export default rootReducer;
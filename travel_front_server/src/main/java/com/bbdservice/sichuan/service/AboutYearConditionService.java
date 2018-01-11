package com.bbdservice.sichuan.service;

import java.util.List;
import java.util.Set;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
public interface AboutYearConditionService {
    List<String> getClassifyData();
    List<String> getOpinionRank();
    List<String> getGoodWords();

    //消费大数据
    List<String> getWaiDiShuaKa();
    /**
     * 外地游客交易笔数分析
     * @return
     */
    List<String> getWaiDiJiaoYi();

    /**
     * 各地市外地游客刷卡消费金额分析
     * @return
     */
    List<String> getGeDiShuaKa();

    List<String> getGediJiaoYi();

    /**
     * 高消费游客来源城市排名
     * @return
     */
    List<String> getRuChuanGaoXiaoFei();

    /**
     * 入川游客来源地排名
     * @return
     */
    List<String> getRuChuanSource();

    /**
     * 旅游消费分析
     */
    List<String> getLvYouXiaoFei();

    List<String> getGeHangYe();
}

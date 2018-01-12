package com.bbdservice.sichuan.service;

import org.springframework.data.jpa.repository.Query;

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

    //搜索大数据
    //全省旅游搜索热力图
    List<String> getProvinceHot();

    //热词云
    List<String> getHotWords();

    //搜索人群年龄分布
    List<String> getPersonAge();

    //搜索人来源地
    List<String> getPersonResources();

    //搜索景点偏好地
    List<String> getJingDian();

    /**
     * 客情大数据模块
     */
    //四川省游客性别分布
    List<String> getSiChuanYouKeSex();

    //乡村游客分析-接待
    List<String> getXiangCunYouKeJieDai();

    //乡村游客分析-出行 TODO
    List<String> getXiangCunYouChuXing();

    //五大经济区客游人次
    List<String> getFiveZonePersonTimes();

    //游客停留时长
    List<String> getTouristStayTime();

    //五大经济区游客来源排名
    List<String> getTouristRank();

    //游客交通方式
    List<String> getTrafficType();
}
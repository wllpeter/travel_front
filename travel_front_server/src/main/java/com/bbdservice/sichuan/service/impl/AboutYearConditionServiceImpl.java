package com.bbdservice.sichuan.service.impl;


import com.bbdservice.sichuan.dao.AboutYearConditionDao;
import com.bbdservice.sichuan.service.AboutYearConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@Service
public class AboutYearConditionServiceImpl implements AboutYearConditionService {
    @Autowired
    private AboutYearConditionDao aboutYearConditionDao;
    @Override
    public List<String> getClassifyData() {
        return aboutYearConditionDao.getClassifyData();
    }

    @Override
    public List<String> getOpinionRank() {
        return aboutYearConditionDao.getOpinionRank();
    }

    @Override
    public List<String> getGoodWords() {
        return aboutYearConditionDao.getGoodWords();
    }

    @Override
    public List<String> getWaiDiShuaKa() {
        return aboutYearConditionDao.getWaiDiShuaKa();
    }

    @Override
    public List<String> getWaiDiJiaoYi() {
        return aboutYearConditionDao.getWaiDiJiaoYi();
    }

    @Override
    public List<String> getGeDiShuaKa() {
        return aboutYearConditionDao.getGeDiShuaKa();
    }

    @Override
    public List<String> getGediJiaoYi() {
        return aboutYearConditionDao.getGediJiaoYi();
    }

    @Override
    public List<String> getRuChuanGaoXiaoFei() {
        return aboutYearConditionDao.getRuChuanGaoXiaoFei();
    }

    @Override
    public List<String> getRuChuanSource() {
        return aboutYearConditionDao.getRuChuanSource();
    }

    @Override
    public List<String> getLvYouXiaoFei() {
        return aboutYearConditionDao.getLvYouXiaoFei();
    }

    @Override
    public List<String> getGeHangYe() {
        return aboutYearConditionDao.getGeHangYe();
    }

    @Override
    public List<String> getProvinceHot() {
        return aboutYearConditionDao.getProvinceHot();
    }

    @Override
    public List<String> getHotWords() {
        return aboutYearConditionDao.getHotWords();
    }

    @Override
    public List<String> getPersonAge() {
        return aboutYearConditionDao.getPersonAge();
    }

    @Override
    public List<String> getPersonResources() {
        return aboutYearConditionDao.getPersonResources();
    }

    @Override
    public List<String> getJingDian() {
        return aboutYearConditionDao.getJingDian();
    }

    @Override
    public List<String> getSiChuanYouKeSex() {
        return aboutYearConditionDao.getSiChuanYouKeSex();
    }

    @Override
    public List<String> getXiangCunYouKeJieDai() {
        return aboutYearConditionDao.getXiangCunYouKeJieDai();
    }

    @Override
    public List<String> getXiangCunYouChuXing() {
        return aboutYearConditionDao.getXiangCunYouChuXing();
    }

    @Override
    public List<String> getFiveZonePersonTimes() {
        return aboutYearConditionDao.getFiveZonePersonTimes();
    }

    @Override
    public List<String> getTouristStayTime() {
        return aboutYearConditionDao.getTouristStayTime();
    }

    @Override
    public List<String> getTouristRank() {
        return aboutYearConditionDao.getTouristRank();
    }

    @Override
    public List<String> getTrafficType() {
        return aboutYearConditionDao.getTrafficType();
    }


    @Override
    public List<String> getIndexRadar() {
        return aboutYearConditionDao.getIndexRadar();
    }

    @Override
    public List<String> getCreateNew() {
        return aboutYearConditionDao.getCreateNew();
    }

    @Override
    public List<String> getEconomicScale() {
        return aboutYearConditionDao.getEconomicScale();
    }

    @Override
    public List<String> getLaborInput() {
        return aboutYearConditionDao.getLaborInput();
    }
}

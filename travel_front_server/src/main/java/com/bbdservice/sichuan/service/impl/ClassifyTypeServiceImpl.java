package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.ClassifyDataDao;
import com.bbdservice.sichuan.entity.ClassifyData;
import com.bbdservice.sichuan.service.ClassifyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 */
@Service
public class ClassifyTypeServiceImpl implements ClassifyTypeService {
    @Autowired
    private ClassifyDataDao classifyDataDao;

    @Override
    public List<ClassifyData> getClassifyDataByDataTypeAndYearAndMonthAndProductType(String dataType, Long year, Long month, Long productType) {
        return classifyDataDao.getClassifyDataList(dataType,year,month,productType);
    }
}

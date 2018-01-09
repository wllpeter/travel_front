package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmClassifyDataDao;
import com.bbdservice.sichuan.entity.ClassifyData;
import com.bbdservice.sichuan.service.ClassifyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 */
@Service
public class TpmClassifyTypeServiceImpl implements ClassifyTypeService {
    @Autowired
    private TpmClassifyDataDao tpmClassifyDataDao;

    @Override
    public List<ClassifyData> getClassifyDataByDataTypeAndYearAndMonthAndProductType(String dataType, Long year, Long month, Long productType) {
        return tpmClassifyDataDao.getClassifyDataList(dataType,year,month,productType);
    }

    @Override
    public List<ClassifyData> getWithoutClassifyDataList(Long productType, Long year, Long month) {
        return tpmClassifyDataDao.getWithoutClassifyDataList(productType,year,month);
    }
}

package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ClassifyData;

import java.util.Date;
import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 * 旅游产品监测-旅游产品分类
 */
public interface ClassifyTypeService {
    List<ClassifyData> getClassifyDataByDataTypeAndYearAndMonthAndProductType(String dataType,Long year,Long month,Long productType);
    List<ClassifyData> getWithoutClassifyDataList(Long productType,Long year,Long month);
}

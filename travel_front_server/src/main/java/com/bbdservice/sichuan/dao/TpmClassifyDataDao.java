package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ClassifyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 */
public interface TpmClassifyDataDao extends JpaRepository<ClassifyData,Long>{

    @Query(value = "select c from ClassifyData  c where c.dataType=?1 and c.year=?2 and c.month=?3 and c.productType=?4 and c.modifyId is null")
    List<ClassifyData> getClassifyDataList(String dataType,Long year,Long month,Long productType);

    @Query(value="select c from ClassifyData  c where c.productType=?1 and c.year=?2 and c.month=?3 and c.modifyId is null")
    List<ClassifyData> getWithoutClassifyDataList(Long productType,Long year,Long month);

}

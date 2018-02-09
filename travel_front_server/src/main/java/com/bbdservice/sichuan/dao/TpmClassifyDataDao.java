package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ClassifyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 */
public interface TpmClassifyDataDao extends JpaRepository<ClassifyData,Long>{

    @Query(nativeQuery = true,value = "select * from tpm_classify_data  c where c.data_type=?1 and c.year=?2 and c.month=?3 and c.product_type=?4 and c.modify_id is null and c.deleted=0 limit 0,8")
    List<ClassifyData> getClassifyDataList(String dataType,Long year,Long month,Long productType);

    @Query(nativeQuery = true,value="select * from tpm_classify_data  c where c.product_type=?1 and c.year=?2 and c.month=?3 and c.modify_id is null and c.deleted=0 limit 0,8")
    List<ClassifyData> getWithoutClassifyDataList(Long productType,Long year,Long month);

}

package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.OverallMerit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmOverallMeritDao extends JpaRepository<OverallMerit,Long> {
//    @Query(nativeQuery = true,value = "select * from tpm_overall_merit t where t.deleted=0 and t.product_type=?1 and year in ?2 and t.modify_id is NULL \n" +
//            "ORDER BY year desc,`month` desc")
//    List<OverallMerit> getAllList(Integer productType,int[] years);
    @Query(nativeQuery = true,value = "select DISTINCT* from tpm_overall_merit where 1=1 and modify_id is null and deleted=0 and product_type=?1  order by year desc,month desc ")
    List<OverallMerit> getAllList(Integer productType);
}

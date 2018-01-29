package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SupplyConsumeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmSupplyConsumeCountDao extends JpaRepository<SupplyConsumeCount,Long> {
    @Query(nativeQuery = true,value = "select * from tpm_supply_consume_count t where t.deleted=0 and t.product_type=?1 and t.modify_id is null and data_type=?2 and year=?3\n" +
            "union all \n" +
            "select * from tpm_supply_consume_count t where t.deleted=0 and t.product_type=?1 and t.modify_id is null and data_type=?2 and year=?4\n" +
            "order by year desc,month desc ")
    List<SupplyConsumeCount> getAllList(Integer productType,Integer dataType, Integer year, Integer prevYear);

    @Query(nativeQuery = true,value = "select * from tpm_supply_consume_count t where t.deleted=0 and t.product_type=?1 and t.modify_id is null  and year=?2\n" +
            "union all \n" +
            "select * from tpm_supply_consume_count t where t.product_type=?1 and t.modify_id is null and t.deleted=0 and year=?3\n" +
            "order by year desc,month desc ")
    List<SupplyConsumeCount> getWithOutDataType(Integer productType, Integer year, Integer prevYear);
}

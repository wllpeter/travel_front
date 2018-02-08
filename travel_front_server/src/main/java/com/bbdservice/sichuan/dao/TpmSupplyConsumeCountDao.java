package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SupplyConsumeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmSupplyConsumeCountDao extends JpaRepository<SupplyConsumeCount,Long> {
    @Query(nativeQuery = true,value = "select * from tpm_supply_consume_count where  product_type=?1 and data_type=?2 \n" +
            "and deleted=0 and modify_id is null \n" +
            "order by year desc ,month desc,id desc")
    List<SupplyConsumeCount> getAllList(Integer productType,Integer dataType);

    @Query(nativeQuery = true,value = "select * from tpm_supply_consume_count where  product_type=?1\n" +
            "and deleted=0 and modify_id is null \n" +
            "order by year desc ,month desc,id desc")
    List<SupplyConsumeCount> getWithOutDataType(Integer productType);
}

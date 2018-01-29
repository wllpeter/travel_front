package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.PriceTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmPriceTrendDao extends JpaRepository<PriceTrend,Long> {
    @Query(nativeQuery = true,value = "select * from tpm_price_trend p where p.deleted=0 and p.product_type=?1 and p.year in ?2 and p.modify_id is null ORDER BY \n" +
            "year desc,month desc\n")
    List<PriceTrend> getAllList(Integer productType,int[] a);
}

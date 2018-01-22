package com.bbdservice.sichuan.dao;


import com.bbdservice.sichuan.entity.MarketChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketProvinceChangeDao extends JpaRepository<MarketChange,Long> {
    @Query(nativeQuery = true,value = "select * from market_change where date like concat('%',?1,'%') and modify_id is null and deleted=0")
    List<MarketChange> getMarketChange(String date);
}

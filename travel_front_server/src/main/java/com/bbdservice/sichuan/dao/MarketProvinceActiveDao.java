package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.MarketProvinceActive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketProvinceActiveDao extends JpaRepository<MarketProvinceActive,Long> {
    @Query(nativeQuery = true,value = "select * from market_province_active m where m.modify_id is null and m.date=?1 and m.deleted = 0 order by m.active desc limit 0,5 ")
    List<MarketProvinceActive> getMarketProvinceActive(String date);
}
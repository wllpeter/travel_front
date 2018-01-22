package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.MarketProvinceActive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketProvinceActiveDao extends JpaRepository<MarketProvinceActive,Long> {
    @Query(value = "select m from MarketProvinceActive m where m.modifyId is null and m.date=?1 and m.deleted = 0")
    List<MarketProvinceActive> getMarketProvinceActive(String date);
}
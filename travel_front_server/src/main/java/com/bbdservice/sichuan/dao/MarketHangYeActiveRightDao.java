package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.MarketHangYeActive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketHangYeActiveRightDao extends JpaRepository<MarketHangYeActive,Long> {
    @Query(nativeQuery = true,value = "select * from market_hang_ye_active where date=?1  and modify_id is null and deleted = 0 order by id desc  limit 0,1")
    MarketHangYeActive getMarketHangYe(String date);
}

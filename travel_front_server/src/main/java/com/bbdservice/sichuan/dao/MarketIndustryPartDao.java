package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.MarketIndustryPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketIndustryPartDao extends JpaRepository<MarketIndustryPart,Long>{
    @Query(nativeQuery = true,value = "select * from market_industry_part where date=?1 and modify_id is null and deleted = 0 order by id desc  limit 0,1")
    MarketIndustryPart getMarketIndustryPart(String date);
}

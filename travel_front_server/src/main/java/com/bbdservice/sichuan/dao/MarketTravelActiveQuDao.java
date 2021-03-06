package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.MarketHangYeActiveProvince;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
public interface MarketTravelActiveQuDao extends JpaRepository<MarketHangYeActiveProvince,Long> {

      @Query(nativeQuery = true,value = "select * from market_hang_ye_active_province where area like concat('%',?1,'%') and " +
              " date=?2 and deleted=0 and modify_id is null order by id desc limit 0,1")
      MarketHangYeActiveProvince getOne(String area,String date);

      @Query(nativeQuery = true,value = "select * from market_hang_ye_active_province where area not like '%四川%' and date=?1 and deleted=0 and modify_id is null ")
      List<MarketHangYeActiveProvince> getFiveArea(String date);


}

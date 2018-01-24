package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CityEntity;
import com.bbdservice.sichuan.entity.MarketHangYeActiveCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/23.
 * 旅游市场监测 选择经济区之后的市信息
 */
public interface MarketTravelActiveCityDao extends JpaRepository<MarketHangYeActiveCity,Long> {
  @Query(nativeQuery = true,value = "select * from market_hang_ye_active_city where area like concat('%',?1,'%') and date=?2 and deleted=0 and modify_id is null")
  List<MarketHangYeActiveCity> getList(String area,String date);
  @Query(nativeQuery = true,value = "select * from market_hang_ye_active_city where city like concat('%',?1,'%') and  " +
          "date=?2 and deleted=0 and modify_id is null order by id desc limit 0,1")
  MarketHangYeActiveCity getOne(String area,String date);
}

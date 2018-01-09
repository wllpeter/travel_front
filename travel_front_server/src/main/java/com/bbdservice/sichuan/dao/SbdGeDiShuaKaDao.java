package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CityForeignDealAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 各地市外地游客刷卡消费金额
 */
public interface SbdGeDiShuaKaDao extends JpaRepository<CityForeignDealAmount,Long> {
    @Query(value = "select c from CityForeignDealAmount c where c.year=?1 and c.month=?2 and c.modifyId is null")
    List<CityForeignDealAmount> getAllList(int year, int month);
}

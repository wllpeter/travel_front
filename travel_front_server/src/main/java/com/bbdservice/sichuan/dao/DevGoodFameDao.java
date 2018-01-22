package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelComfort;
import com.bbdservice.sichuan.entity.DevTravelGoodFame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevGoodFameDao extends JpaRepository<DevTravelGoodFame,Long> {
    @Query(value = "select d from DevTravelGoodFame d where  d.modifyId is null and d.deleted = 0 order by d.date desc")
    List<DevTravelGoodFame> getGoodFame();
}

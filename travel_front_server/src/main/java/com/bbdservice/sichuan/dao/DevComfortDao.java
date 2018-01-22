package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelComfort;
import com.bbdservice.sichuan.entity.DevTravelEonomiesScale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevComfortDao extends JpaRepository<DevTravelComfort,Long> {
    @Query(value = "select d from DevTravelComfort d where  d.modifyId is null  order by d.date desc")
    List<DevTravelComfort> getComfort();
}

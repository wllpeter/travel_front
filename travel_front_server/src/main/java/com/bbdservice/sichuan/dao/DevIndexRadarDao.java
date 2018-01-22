package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelIndexRadar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevIndexRadarDao extends JpaRepository<DevTravelIndexRadar,Long> {
    @Query(value = "select d from DevTravelIndexRadar d where d.date=?1 and d.modifyId is null and d.deleted = 0")
    List<DevTravelIndexRadar> getIndexRadar(String date);
}

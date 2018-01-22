package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.entity.DevTravelIndexRadar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevCreateNewDao extends JpaRepository<DevTravelCreateNew,Long> {
    @Query(value = "select d from DevTravelCreateNew d where d.date=?1 and d.modifyId is null and deleted = 0 order by d.createNew desc")
    List<DevTravelCreateNew> getCreateNew(String date);
}

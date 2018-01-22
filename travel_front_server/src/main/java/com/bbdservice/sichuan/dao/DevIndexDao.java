package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevIndexDao extends JpaRepository<DevTravelIndex,Long> {
    @Query(value = "select d from DevTravelIndex d where  d.modifyId is null and d.deleted = 0 order by d.date desc")
    List<DevTravelIndex> getIndex();
}

package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.entity.DevTravelEonomiesScale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevEconomicDao extends JpaRepository<DevTravelEonomiesScale,Long> {
    @Query(value = "select d from DevTravelEonomiesScale d where  d.modifyId is null and d.area like '%省%'  and d.deleted = 0 order by d.date desc")
    List<DevTravelEonomiesScale> getCreateNewProvince();

    @Query(value = "select d from DevTravelEonomiesScale d where  d.modifyId is null and d.area like '%区%' and d.deleted = 0 order by d.date desc")
    List<DevTravelEonomiesScale> getCreateNewQu();

}

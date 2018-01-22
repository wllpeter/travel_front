package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.entity.DevTravelLaborInput;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevLabarInputDao extends JpaRepository<DevTravelLaborInput,Long> {
    @Query(value = "select d from DevTravelLaborInput d where d.date=?1 and d.modifyId is null and d.deleted = 0 order by d.date desc")
    List<DevTravelLaborInput> getLaborInput(String date);
}

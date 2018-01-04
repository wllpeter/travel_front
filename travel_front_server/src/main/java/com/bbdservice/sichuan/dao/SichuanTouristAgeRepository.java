package com.bbdservice.sichuan.dao;


import com.bbdservice.sichuan.entity.SichuanTouristAge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SichuanTouristAgeRepository extends JpaRepository<SichuanTouristAge,Long>{
    @Query("select d from SichuanTouristAge d where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<SichuanTouristAge> getSichuanTouristAgeByQuarter(Integer year, Integer quarter);
}

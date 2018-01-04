package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SichuanTouristGenderRatio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SichuanTouristGenderRatioRepository extends JpaRepository<SichuanTouristGenderRatio,Long>{
    @Query("select d from SichuanTouristGenderRatio d where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<SichuanTouristGenderRatio> getByYearAndQuarter(Integer year, Integer quarter);
}

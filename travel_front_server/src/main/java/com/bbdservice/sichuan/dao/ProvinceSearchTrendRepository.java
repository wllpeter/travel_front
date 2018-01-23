package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ProvinceSearchTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProvinceSearchTrendRepository extends JpaRepository<ProvinceSearchTrend,Long>{
    void deleteByYearAndDeletedFalse(Integer year);
    @Modifying
    @Transactional
    @Query(value = "delete from search_province_trend where year=?1 and deleted=0", nativeQuery = true)
    void deleteBy(Integer year);
    List<ProvinceSearchTrend> findByYearAndDeletedFalse(Integer year);
}

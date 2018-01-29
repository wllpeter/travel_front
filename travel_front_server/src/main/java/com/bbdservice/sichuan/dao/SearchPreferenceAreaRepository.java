package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SearchPreferenceArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchPreferenceAreaRepository extends JpaRepository<SearchPreferenceArea, Long>{
    @Query(nativeQuery = true, value = "select * from search_preference_area  where deleted=0 and year =?1 and month =?2 order by search_count desc limit 5")
    List<SearchPreferenceArea> getMonthData(Integer year, Integer month);
}

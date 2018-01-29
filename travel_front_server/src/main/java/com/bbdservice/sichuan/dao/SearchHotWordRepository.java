package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SearchHotWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchHotWordRepository extends JpaRepository<SearchHotWord,Long>{
    @Query("select s from SearchHotWord s where year =?1 and quarter =?2 and s.deleted=0")
    List<SearchHotWord> getQuarterData(Integer year, Integer quarter);
}

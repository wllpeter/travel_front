package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ComeTouristAreaRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 交易大数据-入川游客来源地排名
 */
public interface SbdComeTouristAreaRankDao extends JpaRepository<ComeTouristAreaRank,Long> {
    @Query(nativeQuery = true,value = "select * from sbd_come_tourist_area_rank c where c.year=?1 and c.quarter=?2 and c.type=?3 and c.deleted=0 and c.modify_id is null order by c.rank limit 0,5")
    List<ComeTouristAreaRank> getAllList(int year,int quarter,String type);
}

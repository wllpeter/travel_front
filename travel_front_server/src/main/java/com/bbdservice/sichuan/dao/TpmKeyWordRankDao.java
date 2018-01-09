package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.KeywordRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmKeyWordRankDao extends JpaRepository<KeywordRank,Long> {
    @Query(nativeQuery = true,value = "select * from tpm_keyword_rank r where r.year=?2 and r.month=?3 and r.modify_id is null \n" +
            "and r.product_type=?1  order by r.rank")
    List<KeywordRank> getAllKeyWordRank(Integer productType,Integer year,Integer month);
}

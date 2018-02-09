package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.OpinionRank;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface TpmOpinionRankDao  extends JpaRepository<OpinionRank,Long>{
    @Query(nativeQuery = true,value = "select * from tpm_opinion_rank o where o.year=?1 and o.month=?2 and o.product_type=?3 and o.deleted=0 and o.modify_id is null order by o.rank  limit 0,10 ")
    List<OpinionRank> getWithOutDataType(Integer year,Integer month,Integer productType);

    @Query(nativeQuery = true,value = "select * from tpm_opinion_rank o where o.year=?1 and o.month=?2 and o.product_type=?3 and o.deleted=0 and o.data_type=?4 and o.modify_id is null order by o.rank  limit 0,10 ")
    List<OpinionRank> getAllOpinion(Integer year,Integer month,Integer productType,Integer dataType);
}

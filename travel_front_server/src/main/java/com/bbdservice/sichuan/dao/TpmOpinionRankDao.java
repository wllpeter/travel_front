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
    @Query(value = "select o from OpinionRank o where o.year=?1 and o.month=?2 and o.productType=?3 and o.deleted=0 and o.modifyId is null order by o.rank ")
    List<OpinionRank> getWithOutDataType(Integer year,Integer month,Integer productType);

    @Query(value = "select o from OpinionRank o where o.year=?1 and o.month=?2 and o.productType=?3 and o.deleted=0 and o.dataType=?4 and o.modifyId is null order by o.rank ")
    List<OpinionRank> getAllOpinion(Integer year,Integer month,Integer productType,Integer dataType);
}

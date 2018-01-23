package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.TpmProductFeeling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Column;
import java.util.List;


/**
 * Created by 陈亚兰 on 2018/1/23.
 */
public interface TpmHotWordDataDao extends JpaRepository<TpmProductFeeling,Long> {
    @Query(nativeQuery = true,value = "select * from tpm_hotword_data where deleted=0 and modify_id is null and year=?1 and month=?2 and product_type=?3")
    List<TpmProductFeeling> getHotWord(Integer year,Integer month,Integer type);
}

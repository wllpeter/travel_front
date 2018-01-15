package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ProvinceTravelConsume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 全省旅游消费情况
 */
public interface SbdProvinceTravelConsumeDao extends JpaRepository<ProvinceTravelConsume,Long> {
    @Query(nativeQuery = true,value = "select p.consume_amount,consume_amount_compare,consume_times,consume_times_compare,swipe_times,swipe_times_compare, FORMAT(consume_amount/consume_times,2) as single,year,month from sbd_province_travel_consume p where p.modify_id is null order by p.year desc , p.month desc")
    List<String> getAllList();
}

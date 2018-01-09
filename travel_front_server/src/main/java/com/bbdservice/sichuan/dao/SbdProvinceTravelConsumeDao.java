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
    @Query(value = "select p from ProvinceTravelConsume p where p.modifyId is null order by p.year desc , p.month desc")
    List<ProvinceTravelConsume> getAllList();
}

package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
public interface SysCityDao extends JpaRepository<CityEntity,Long> {
    @Query(value = "select c.name from CityEntity c where c.belong=?1")
    List<String> getCity(String area);
}

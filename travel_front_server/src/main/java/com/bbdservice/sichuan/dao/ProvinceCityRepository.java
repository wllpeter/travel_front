package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ProvinceCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @Author:WLL
 * @Date:Create on 17:442018/1/11
 */
public interface ProvinceCityRepository extends JpaRepository<ProvinceCity,Long> {
    @Query("select p from ProvinceCity p where parent_id is null ")
    List<ProvinceCity> getProvinceName();

    @Query("select p from ProvinceCity p where parent_id is not null ")
    List<ProvinceCity> getCityName();
}

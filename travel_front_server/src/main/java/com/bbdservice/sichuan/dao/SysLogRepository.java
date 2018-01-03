package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SysLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SysLogRepository extends JpaRepository<SysLog,Long>{
}

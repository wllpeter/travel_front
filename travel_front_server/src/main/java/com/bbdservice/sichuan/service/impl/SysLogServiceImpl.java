package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SysLogRepository;
import com.bbdservice.sichuan.entity.SysLog;
import com.bbdservice.sichuan.service.SysLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SysLogServiceImpl implements SysLogService {
    @Autowired
    SysLogRepository sysLogRepository;

    @Override
    public void saveLog(String userId) {
        SysLog sysLog = new SysLog();
        sysLog.setCreateDate(new Date());
        sysLog.setDeleted(false);
        sysLog.setUserId(userId);
        sysLogRepository.save(sysLog);
    }
}

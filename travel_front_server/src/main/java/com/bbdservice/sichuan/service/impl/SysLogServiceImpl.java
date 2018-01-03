package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SysLogRepository;
import com.bbdservice.sichuan.service.SysLogService;
import org.springframework.beans.factory.annotation.Autowired;

public class SysLogServiceImpl implements SysLogService {
    @Autowired
    SysLogRepository sysLogRepository;
}

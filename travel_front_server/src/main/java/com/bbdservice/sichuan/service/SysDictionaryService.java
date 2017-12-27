package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SysDictionary;

import java.util.List;

/**
 * Created by lixudong on 2017/12/13.
 */
public interface SysDictionaryService {

    List<SysDictionary> findByType(String type);

    SysDictionary findByCode(String caseCode);
}

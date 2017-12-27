package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.entity.SysDictionary;
import com.bbdservice.sichuan.mapper.SysDictionaryMapper;
import com.bbdservice.sichuan.service.SysDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lixudong on 2017/12/13.
 */
@Service
public class SysDictionaryServiceImpl implements SysDictionaryService{
    @Autowired
    private SysDictionaryMapper dictionaryMapper;
    @Override
    public List<SysDictionary> findByType(String type) {
        SysDictionary param = new SysDictionary();
        param.setDataType(type);
        return dictionaryMapper.select(param);
    }

    @Override
    public SysDictionary findByCode(String caseCode) {
        SysDictionary param = new SysDictionary();
        param.setDataCode(caseCode);
        List<SysDictionary> list = dictionaryMapper.select(param);
        if (list != null && list.size() > 0) {
            return list.get(0);
        }
        return new SysDictionary();
    }
}

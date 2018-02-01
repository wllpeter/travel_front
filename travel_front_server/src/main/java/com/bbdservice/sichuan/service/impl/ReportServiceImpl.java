package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.ReportDao;
import com.bbdservice.sichuan.entity.PdfDO;
import com.bbdservice.sichuan.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDao reportDao;
    @Override
    public List<PdfDO> getPdfList() {
        return reportDao.getPdfList();
    }

    @Override
    public PdfDO getPdfLiu(Long id) {
        return reportDao.findOne(id);
    }
}

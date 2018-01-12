package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.PdfDO;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
public interface ReportService {
    List<PdfDO> getPdfList(Integer type);
    PdfDO getPdfLiu(Long id);
}

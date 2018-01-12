package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.PdfDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
public interface ReportDao extends JpaRepository<PdfDO,Long> {
    @Query(value = "select p from PdfDO p where p.type=?1 and p.deleted=0")
    List<PdfDO> getPdfList(Integer type);
}

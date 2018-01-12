package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by 陈亚兰 on 2018/1/10.
 */
@Getter
@Setter
@Entity
@Table(name="pdf_info")
public class PdfDO implements Serializable {
    private static final long serialVersionUID = -8246513819395250558L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 姓名
     */
    @Column(name="name")
    private String name;

    /**
     * 报告类型 0-旅游大数据分析报告 1-旅游产业发展报告
     */
    @Column(name="type")
    private Integer type;

    @Column(name="date")
    private String date;

    @Column(name="address")
    private String address;

    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;

    public PdfDO(){}
    public PdfDO(String name, Integer type, String date, String address){
        this.name=name;
        this.type=type;
        this.date=date;
        this.address=address;
    }

}

package com.bbdservice.sichuan.entity.vo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@Setter
@Getter
public class PdfVO {

    private Long id;

    private String name;

    /**
     * 报告类型 0-旅游大数据分析报告 1-旅游产业发展报告
     */

    private Integer type;


    private String date;


    private String address;


    private Boolean deleted;

    public PdfVO(){}
    public PdfVO(String name, Integer type, String date, String address){
        this.name=name;
        this.type=type;
        this.date=date;
        this.address=address;
    }
}

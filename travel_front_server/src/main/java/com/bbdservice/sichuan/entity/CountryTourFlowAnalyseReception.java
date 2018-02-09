package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "cbd_country_tour_flow_analyse_reception")
@Entity
@Getter
@Setter
public class CountryTourFlowAnalyseReception {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '客情类型'")
    private String customerType;
    @Column(columnDefinition = "varchar(100) comment '人次'")
    private Integer personTime;
    @Column(columnDefinition = "varchar(100) comment '人数'")
    private Integer personCount;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

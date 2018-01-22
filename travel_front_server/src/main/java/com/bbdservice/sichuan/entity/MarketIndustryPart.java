package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 * 省内旅游行业构成
 */
@Setter
@Getter
@Entity
@Table(name="market_industry_part")
public class MarketIndustryPart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '旅游餐饮企业'")
    private String food;
    @Column(columnDefinition = "varchar(40) comment '旅游住宿企业'")
    private String live;
    @Column(columnDefinition = "varchar(40) comment '旅游出行企业'")
    private String go;
    @Column(columnDefinition = "varchar(40) comment '旅游游览企业'")
    private String see;
    @Column(columnDefinition = "varchar(40) comment '旅游购物企业'")
    private String shopping;
    @Column(columnDefinition = "varchar(40) comment '旅游娱乐企业'")
    private String entertainment;
    @Column(columnDefinition = "varchar(40) comment '旅游综合服务企业'")
    private String general;
    @Column(columnDefinition = "varchar(40) comment '旅游其他'")
    private String other;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
}

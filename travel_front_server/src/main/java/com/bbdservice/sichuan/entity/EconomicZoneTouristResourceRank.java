package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "cbd_economic_zone_tourist_resource_rank")
@Entity
@Getter
@Setter
public class EconomicZoneTouristResourceRank {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '经济区'")
    private String economicZone;
    @Column(columnDefinition = "varchar(40) comment '来源省份'")
    private String resourceProvince;
    @Column(columnDefinition = "varchar(40) comment '全网人数'")
    private String personCount;
    @Column(columnDefinition = "int comment '排名'")
    private String rank;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Transient
    private float personCountView;
}

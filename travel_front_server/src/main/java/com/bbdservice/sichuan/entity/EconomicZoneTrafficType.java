package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "cbd_economic_zone_traffic_type")
@Entity
@Getter
@Setter
public class EconomicZoneTrafficType {
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
    @Column(columnDefinition = "varchar(10) comment '交通方式'")
    private String trafficType;
    @Column(columnDefinition = "int comment '人次'")
    private Integer personTime;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

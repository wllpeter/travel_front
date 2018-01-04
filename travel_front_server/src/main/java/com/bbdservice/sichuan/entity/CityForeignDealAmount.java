package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 消费大数据-各地市外地游客刷卡交易金额分析（万元）
 */
@Table(name = "sbd_city_foreign_deal_amount")
@Entity
@Getter
@Setter
public class CityForeignDealAmount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '月份'")
    private int month;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '经济区'")
    private String economicZone;
    @Column(columnDefinition = "varchar(40) comment '城市 '")
    private String city;
    @Column(columnDefinition = "varchar(40) comment '笔数'")
    private String dealAmount;
    @Column(columnDefinition = "bit comment '是否删除'")
    private boolean deleted;
}

package com.bbdservice.sichuan.entity;

import javax.persistence.*;

/**
 * 消费大数据-各地市外地游客交易笔数分析（万笔）
 */
@Table(name = "sbd_city_foreign_deal_time")
public class CityForeignDealTime {
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
    private Integer dealTime;
}

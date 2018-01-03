package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_province_travel_consume")
@Entity
@Getter
@Setter
public class ProvinceTravelConsume {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '月份'")
    private int month;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '交易金额'")
    private String consumeAmount;
    @Column(columnDefinition = "varchar(40) comment '交易金额同比增加'")
    private String consumeAmountCompare;
    @Column(columnDefinition = "varchar(40) comment '交易笔数'")
    private String consumeTimes;
    @Column(columnDefinition = "varchar(40) comment '交易笔数同比增加'")
    private String consumeTimesCompare;
    @Column(columnDefinition = "varchar(40) comment '刷卡人次'")
    private String swipeTimes;
    @Column(columnDefinition = "varchar(40) comment '刷卡人次同比增加'")
    private String swipeTimesCompare;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

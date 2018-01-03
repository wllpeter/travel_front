package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_city_foreign_deal_time")
@Entity
@Getter
@Setter
public class TravelConsumeAnalyse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '行业'")
    private String industry;
    @Column(columnDefinition = "varchar(40) comment '档次'")
    private String level;
    @Column(columnDefinition = "varchar(40) comment '消费金额（万元）'")
    private String consumeAmount;
    @Column(columnDefinition = "varchar(40) comment '消费笔数（万笔）'")
    private String consumeTimes;
    @Column(columnDefinition = "varchar(40) comment '刷卡人次（万人）'")
    private String swipeTimes;
}

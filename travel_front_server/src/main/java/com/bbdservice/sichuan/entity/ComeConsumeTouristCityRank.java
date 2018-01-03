package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_come_consume_tourist_city_rank")
@Entity
@Getter
@Setter
public class ComeConsumeTouristCityRank {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "int comment '排名'")
    private int rank;
    @Column(columnDefinition = "varchar(40) comment '城市'")
    private String city;
    @Column(columnDefinition = "varchar(40) comment '人数（万人）'")
    private String personCount;
    @Column(columnDefinition = "varchar(40) comment '占比'")
    private String ratio;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

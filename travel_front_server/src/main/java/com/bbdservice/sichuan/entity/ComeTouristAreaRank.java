package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_come_tourist_area_rank")
@Entity
@Getter
@Setter
public class ComeTouristAreaRank {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '类型'")
    private String type;
    @Column(columnDefinition = "int comment '排名'")
    private int rank;
    @Column(columnDefinition = "varchar(40) comment '来源地'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '人次（万人）'")
    private String personTimes;
    @Column(columnDefinition = "varchar(40) comment '占比'")
    private String ratio;
}

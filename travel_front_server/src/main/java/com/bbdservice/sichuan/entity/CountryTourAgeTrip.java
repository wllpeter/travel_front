package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "cbd_country_tour_age_trip")
@Entity
@Getter
@Setter
public class CountryTourAgeTrip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '年龄段'")
    private String ageZone;
    @Column(columnDefinition = "varchar(40) comment '比例'")
    private String ratio;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "cbd_sichuan_tourist_gender_ratio")
@Entity
@Getter
@Setter
public class SichuanTouristGenderRatio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "varchar(10) comment '性别'")
    private String gender;
    @Column(columnDefinition = "varchar(10) comment '性别比例'")
    private String genderRatio;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
}

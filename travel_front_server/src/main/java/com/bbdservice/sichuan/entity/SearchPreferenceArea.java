package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
//搜索景点偏好地
@Entity
@Table(name = "search_preference_area")
@Getter
@Setter
public class SearchPreferenceArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private Integer year;
    @Column
    private Integer month;
    @Column(columnDefinition = "varchar(40) comment '名称'")
    private String name;
    @Column(columnDefinition = "int comment '搜索次数'")
    private Integer searchCount;
    @Column(columnDefinition = "varchar(40) comment '搜索占比'")
    private String ratio;
    @Column(columnDefinition = "bit comment'是否删除'")
    private Boolean deleted;
}

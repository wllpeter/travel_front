package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "search_person_age")
@Entity
@Getter
@Setter
public class SearchPersonAge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "varchar(40) comment'年龄分布'")
    private String ageZone;
    @Column(columnDefinition = "varchar(40) comment'占比'")
    private String ratio;
    private Integer year;
    private Integer month;
    @Column(columnDefinition = "bit comment'是否删除'")
    private Boolean deleted;
}
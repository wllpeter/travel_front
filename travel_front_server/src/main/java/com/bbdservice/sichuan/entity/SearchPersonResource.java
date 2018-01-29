package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name ="search_person_resource")
@Getter
@Setter
public class SearchPersonResource {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(columnDefinition = "varchar(40) comment'来源地'")
    private String resourcePlace;
    @Column(columnDefinition = "varchar(40) comment'搜索占比'")
    private String ratio;
    @Column(columnDefinition = "int comment'年份'")
    private Integer year;
    @Column(columnDefinition = "int comment'月份'")
    private Integer month;
    @Column(columnDefinition = "bit comment'是否删除'")
    private Boolean deleted;
}

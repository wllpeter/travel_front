package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "search_hot_word")
@Entity
@Getter
@Setter
public class SearchHotWord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(columnDefinition = "varchar(40) comment '热词'")
    private String hotWord;
    @Column(columnDefinition = "int comment '搜索次数'")
    private Integer searchCount;
    @Column(columnDefinition =  "datetime comment '创建日期'")
    private Date createDate;
    @Column(columnDefinition =  "int comment '年份'")
    private Integer year;
    @Column(columnDefinition = "int comment'季度'")
    private Integer quarter;
    @Column(columnDefinition = "bit comment'是否删除'")
    private Boolean deleted;
}

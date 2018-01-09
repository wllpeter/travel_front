package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

//@Table(name = "search_province_trend")
//@Entity
@Getter
@Setter
public class ProvinceSearchTrend {
    //@Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //@Column(columnDefinition = "int comment '搜索次数'")
    private Integer searchCount;
    //@Column(columnDefinition = "datetime comment '数据日期'")
    private String searchDate;
    //@Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    //@Column(columnDefinition = "datetime comment '创建日期'")
    private Date createDate;
    //@Column(columnDefinition = "bigint comment '修改后数据'")
    private Long modifyId;
}

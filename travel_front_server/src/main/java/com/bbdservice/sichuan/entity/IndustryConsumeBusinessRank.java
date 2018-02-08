package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_industry_consume_business_rank")
@Entity
@Getter
@Setter
public class IndustryConsumeBusinessRank {
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
    @Column(columnDefinition = "int comment '排名'")
    private Integer rank;
    @Column(columnDefinition = "varchar(40) comment '企业名称'")
    private String businessName;

    public String getAvgSingleConsume() {
        return avgSingleConsume;
    }

    public void setAvgSingleConsume(String avgSingleConsume) {
        this.avgSingleConsume = avgSingleConsume;
    }

    public Integer getTotalSwipeTimes() {
        return totalSwipeTimes;
    }

    public void setTotalSwipeTimes(Integer totalSwipeTimes) {
        this.totalSwipeTimes = totalSwipeTimes;
    }

    @Column(columnDefinition = "varchar(40) comment '平均单笔消费'")

    private String avgSingleConsume;
    @Column(columnDefinition = "int comment '刷卡总笔数'")
    private Integer totalSwipeTimes;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

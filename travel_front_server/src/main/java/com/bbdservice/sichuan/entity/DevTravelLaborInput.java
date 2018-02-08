package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/20.
 * 旅游劳动投入
 */
@Table(name = "dev_travel_labor_input")
@Entity
@Getter
@Setter
public class DevTravelLaborInput {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '地区'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '劳动投入'")
    private String laborInput;
    @Column(columnDefinition = "varchar(40) comment '环比增速'")
    private String compare;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;

    public String getLaborInput() {
        return laborInput;
    }

    public void setLaborInput(String laborInput) {
        this.laborInput = laborInput;
    }

    public String getCompare() {
        return compare;
    }

    public void setCompare(String compare) {
        this.compare = compare;
    }
}

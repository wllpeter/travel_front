package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/20.
 * 旅游舒适度
 */
@Table(name = "dev_travel_comfort")
@Entity
@Getter
@Setter
public class DevTravelComfort {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '地区'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '舒适度'")
    private String comfort;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;

    public String getComfort() {
        return comfort;
    }

    public void setComfort(String comfort) {
        this.comfort = comfort;
    }
}

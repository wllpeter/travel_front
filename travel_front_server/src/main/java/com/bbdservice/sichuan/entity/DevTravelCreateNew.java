package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/20.
 * 旅游创新度
 */
@Table(name = "dev_travel_create_new")
@Entity
@Getter
@Setter
public class DevTravelCreateNew {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '地区'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '创新度'")
    private String createNew;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;

    public String getCreateNew() {
        return createNew;
    }

    public void setCreateNew(String createNew) {
        this.createNew = createNew;
    }
}

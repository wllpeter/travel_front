package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 * 省内涉旅企业变更
 */
@Getter
@Setter
@Entity
@Table(name="market_change")
public class MarketChange {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '存量'")
    private String cun;
    @Column(columnDefinition = "varchar(40) comment '增量'")
    private String increase;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
}

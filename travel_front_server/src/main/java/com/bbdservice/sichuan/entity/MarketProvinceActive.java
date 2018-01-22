package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 * 省内活跃度排行榜
 */
@Getter
@Setter
@Entity
@Table(name="market_province_active")
public class MarketProvinceActive {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '城市'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '活跃度'")
    private String active;
    @Column(columnDefinition = "varchar(40) comment '增长速度'")
    private String increase;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
}

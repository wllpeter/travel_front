package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Setter
@Getter
@Entity
@Table(name="market_hang_ye_active")
public class MarketHangYeActive {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '经营状态指标'")
    private String manageState;
    @Column(columnDefinition = "varchar(40) comment '企业变更次数'")
    private String companyChangeTimes;
    @Column(columnDefinition = "varchar(40) comment '企业变更备案类别数'")
    private String companyChangeBeiAnTypeTimes;
    @Column(columnDefinition = "varchar(40) comment '分支机构开设数量'")
    private String branchOrganizationNum;
    @Column(columnDefinition = "varchar(40) comment '搜索新闻结果数'")
    private String searchNewsNum;
    @Column(columnDefinition = "varchar(40) comment '迁移申请次数'")
    private String moveApplyTimes;
    @Column(columnDefinition = "varchar(40) comment '投资次数'")
    private String investTimes;
    @Column(columnDefinition = "varchar(40) comment '投资总额'")
    private String investAmount ;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
}

package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import javax.persistence.*;

@Table(name = "tpm_opinion_rank")
@Entity
@Getter
@Setter
public class OpinionRank {
    /**
     * 序号
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 排名
     */
    private Float rank;

    /**
     * 年份
     */
    private Integer year;

    /**
     * 月份
     */
    private Integer month;

    /**
     * 评分
     */
    private Float score;

    /**
     * 创建日期
     */
    @Column(name = "create_date")
    private Date createDate;

    /**
     * 姓名
     */
    @Column(name="name")
    private String name;

    /**
     * 产品分类
            1-旅游
            2-住宿
            3-餐饮
            4-购物
            5-娱乐
     */
    @Column(name = "product_type")
    private Integer productType;

    /**
     * 1-产品
            2-景区
            3-特产
            4-商场
     */
    @Column(name = "data_type")
    private Integer dataType;

    /**
     * 删除状态
     */
    private Boolean deleted;

    /**
     * 升降
            0-不变
            1-上升
            2-下降
     */
    @Column(name = "up_down")
    private Integer upDown;

    /**
     * 修改后ID
     */
    @Column(name = "modify_id")
    private Long modifyId;

    /**
     * 环比
     */
    private String compared;
}
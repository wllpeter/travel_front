package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import javax.persistence.*;

@Table(name = "tpm_overall_merit")
@Entity
@Getter
@Setter
public class OverallMerit {
    /**
     * 序号
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 数据分类
            1-旅游产品
            2-住宿产品
            3-餐饮产品
            4-购物产品
            5-娱乐产品
     */
    @Column(name = "product_type")
    private Integer productType;

    /**
     * 平均分
     */
    private Float avgscore;

    /**
     * 环比
     */
    private String compared;

    /**
     * 年份
     */
    private Integer year;

    /**
     * 月份
     */
    private Integer month;

    /**
     * 创建日期
     */
    @Column(name = "create_date")
    private Date createDate;

    /**
     * 删除状态
     */
    private Boolean deleted;

    /**
     * 修改后ID
     */
    @Column(name = "modify_id")
    private Long modifyId;
}
package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_foreign_tourist_swipe_amount_analyse")
@Entity
@Getter
@Setter
public class ForeignTouristSwipeAmountAnalyse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '月份'")
    private int month;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '经济区'")
    private String economicZone;
    @Column(columnDefinition = "varchar(40) comment '刷卡金额（万元）'")
    private String swipeAmount;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;

    public String getSwipeAmount() {
        return swipeAmount;
    }

    public void setSwipeAmount(String swipeAmount) {
        this.swipeAmount = swipeAmount;
    }
}

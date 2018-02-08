package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 * 省内旅游行业构成
 */
@Setter
@Getter
@Entity
@Table(name="market_industry_part")
public class MarketIndustryPart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '旅游餐饮企业'")
    private String food;
    @Column(columnDefinition = "varchar(40) comment '旅游住宿企业'")
    private String live;
    @Column(columnDefinition = "varchar(40) comment '旅游出行企业'")
    private String go;
    @Column(columnDefinition = "varchar(40) comment '旅游游览企业'")
    private String see;
    @Column(columnDefinition = "varchar(40) comment '旅游购物企业'")
    private String shopping;
    @Column(columnDefinition = "varchar(40) comment '旅游娱乐企业'")
    private String entertainment;
    @Column(columnDefinition = "varchar(40) comment '旅游综合服务企业'")
    private String general;
    @Column(columnDefinition = "varchar(40) comment '旅游其他'")
    private String other;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public String getLive() {
        return live;
    }

    public void setLive(String live) {
        this.live = live;
    }

    public String getGo() {
        return go;
    }

    public void setGo(String go) {
        this.go = go;
    }

    public String getSee() {
        return see;
    }

    public void setSee(String see) {
        this.see = see;
    }

    public String getShopping() {
        return shopping;
    }

    public void setShopping(String shopping) {
        this.shopping = shopping;
    }

    public String getEntertainment() {
        return entertainment;
    }

    public void setEntertainment(String entertainment) {
        this.entertainment = entertainment;
    }

    public String getGeneral() {
        return general;
    }

    public void setGeneral(String general) {
        this.general = general;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }
}

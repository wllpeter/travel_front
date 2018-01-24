package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/23.
 * 旅游行业活跃度 市
 */
@Setter
@Getter
@Entity
@Table(name="market_hang_ye_active_city")
public class MarketHangYeActiveCity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '经济区'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '城市'")
    private String city;
    @Column(columnDefinition = "varchar(40) comment '活跃度'")
    private String activeDegree;
    @Column(columnDefinition = "varchar(40) comment '环比'")
    private String hb;
    @Column(columnDefinition = "varchar(40) comment '存量企业'")
    private String existedCom;
    @Column(columnDefinition = "varchar(40) comment '增量企业'")
    private String increaseCom;
    ///////
    @Column(columnDefinition = "varchar(40) comment '旅游餐饮活跃度'")
    private String foodDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游餐饮活跃度环比增长'")
    private String foodHB;
    @Column(columnDefinition = "varchar(40) comment '旅游住宿活跃度'")
    private String liveDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游住宿活跃度环比增长'")
    private String liveHB;
    @Column(columnDefinition = "varchar(40) comment '旅游出行活跃度'")
    private String goDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游出行活跃度环比增长'")
    private String goHB;
    @Column(columnDefinition = "varchar(40) comment '旅游游览活跃度'")
    private String seeDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游游览活跃度环比增长'")
    private String seeHB;
    @Column(columnDefinition = "varchar(40) comment '旅游购物活跃度'")
    private String shoppingDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游购物活跃度环比增长'")
    private String shoppingHB;
    @Column(columnDefinition = "varchar(40) comment '旅游娱乐活跃度'")
    private String entertainmentDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游娱乐活跃度环比增长'")
    private String entertainmentHB;
    @Column(columnDefinition = "varchar(40) comment '旅游综合后活跃度'")
    private String generalDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游综合活跃度环比增长'")
    private String generalHB;
    @Column(columnDefinition = "varchar(40) comment '旅游其他活跃度'")
    private String otherDegree;
    @Column(columnDefinition = "varchar(40) comment '旅游其他活跃度环比增长'")
    private String otherHB;

    //////
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getActiveDegree() {
        return activeDegree;
    }

    public void setActiveDegree(String activeDegree) {
        this.activeDegree = activeDegree;
    }

    public String getHb() {
        return hb;
    }

    public void setHb(String hb) {
        this.hb = hb;
    }

    public String getExistedCom() {
        return existedCom;
    }

    public void setExistedCom(String existedCom) {
        this.existedCom = existedCom;
    }

    public String getIncreaseCom() {
        return increaseCom;
    }

    public void setIncreaseCom(String increaseCom) {
        this.increaseCom = increaseCom;
    }

    public String getFoodDegree() {
        return foodDegree;
    }

    public void setFoodDegree(String foodDegree) {
        this.foodDegree = foodDegree;
    }

    public String getFoodHB() {
        return foodHB;
    }

    public void setFoodHB(String foodHB) {
        this.foodHB = foodHB;
    }

    public String getLiveDegree() {
        return liveDegree;
    }

    public void setLiveDegree(String liveDegree) {
        this.liveDegree = liveDegree;
    }

    public String getLiveHB() {
        return liveHB;
    }

    public void setLiveHB(String liveHB) {
        this.liveHB = liveHB;
    }

    public String getGoDegree() {
        return goDegree;
    }

    public void setGoDegree(String goDegree) {
        this.goDegree = goDegree;
    }

    public String getGoHB() {
        return goHB;
    }

    public void setGoHB(String goHB) {
        this.goHB = goHB;
    }

    public String getSeeDegree() {
        return seeDegree;
    }

    public void setSeeDegree(String seeDegree) {
        this.seeDegree = seeDegree;
    }

    public String getSeeHB() {
        return seeHB;
    }

    public void setSeeHB(String seeHB) {
        this.seeHB = seeHB;
    }

    public String getShoppingDegree() {
        return shoppingDegree;
    }

    public void setShoppingDegree(String shoppingDegree) {
        this.shoppingDegree = shoppingDegree;
    }

    public String getShoppingHB() {
        return shoppingHB;
    }

    public void setShoppingHB(String shoppingHB) {
        this.shoppingHB = shoppingHB;
    }

    public String getEntertainmentDegree() {
        return entertainmentDegree;
    }

    public void setEntertainmentDegree(String entertainmentDegree) {
        this.entertainmentDegree = entertainmentDegree;
    }

    public String getEntertainmentHB() {
        return entertainmentHB;
    }

    public void setEntertainmentHB(String entertainmentHB) {
        this.entertainmentHB = entertainmentHB;
    }

    public String getGeneralDegree() {
        return generalDegree;
    }

    public void setGeneralDegree(String generalDegree) {
        this.generalDegree = generalDegree;
    }

    public String getGeneralHB() {
        return generalHB;
    }

    public void setGeneralHB(String generalHB) {
        this.generalHB = generalHB;
    }

    public String getOtherDegree() {
        return otherDegree;
    }

    public void setOtherDegree(String otherDegree) {
        this.otherDegree = otherDegree;
    }

    public String getOtherHB() {
        return otherHB;
    }

    public void setOtherHB(String otherHB) {
        this.otherHB = otherHB;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Long getModifyId() {
        return modifyId;
    }

    public void setModifyId(Long modifyId) {
        this.modifyId = modifyId;
    }
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

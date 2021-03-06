package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "sbd_come_tourist_area_rank")
@Entity
@Getter
@Setter
public class ComeTouristAreaRank {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public Long getModifyId() {
        return modifyId;
    }

    public void setModifyId(Long modifyId) {
        this.modifyId = modifyId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPersonTimes() {
        return personTimes;
    }

    public void setPersonTimes(String personTimes) {
        this.personTimes = personTimes;
    }

    public String getRatio() {
        return ratio;
    }

    public void setRatio(String ratio) {
        this.ratio = ratio;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '年份'")
    private int year;
    @Column(columnDefinition = "int comment '季度'")
    private int quarter;
    @Column(columnDefinition = "bigint comment '修改后ID'")
    private Long modifyId;
    @Column(columnDefinition = "varchar(40) comment '类型'")
    private String type;
    @Column(columnDefinition = "int comment '排名'")
    private int rank;
    @Column(columnDefinition = "varchar(40) comment '来源地'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '人次（万人）'")
    private String personTimes;
    @Column(columnDefinition = "varchar(40) comment '占比'")
    private String ratio;
    @Column(columnDefinition = "bit comment '是否删除'")
    private Boolean deleted;
}

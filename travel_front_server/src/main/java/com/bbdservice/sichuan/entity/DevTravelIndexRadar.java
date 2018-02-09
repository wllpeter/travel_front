package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/20.
 * 旅游指数雷达图
 */
@Table(name = "dev_travel_index_radar")
@Entity
@Getter
@Setter
public class DevTravelIndexRadar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "int comment '主键id'")
    private Long id;
    @Column(columnDefinition = "varchar(40) comment '时间'")
    private String date;
    @Column(columnDefinition = "varchar(40) comment '地区'")
    private String area;
    @Column(columnDefinition = "varchar(40) comment '舒适度'")
    private String comfort;
    @Column(columnDefinition = "varchar(40) comment '创新度'")
    private String createNew;
    @Column(columnDefinition = "varchar(40) comment '美誉度'")
    private String goodFame;
    @Column(columnDefinition = "varchar(40) comment '经济规模'")
    private String economicScale;
    @Column(columnDefinition = "varchar(40) comment '劳动输入'")
    private String laborInput;
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

    public String getComfort() {
        return comfort;
    }

    public void setComfort(String comfort) {
        this.comfort = comfort;
    }

    public String getCreateNew() {
        return createNew;
    }

    public void setCreateNew(String createNew) {
        this.createNew = createNew;
    }

    public String getGoodFame() {
        return goodFame;
    }

    public void setGoodFame(String goodFame) {
        this.goodFame = goodFame;
    }

    public String getEconomicScale() {
        return economicScale;
    }

    public void setEconomicScale(String economicScale) {
        this.economicScale = economicScale;
    }

    public String getLaborInput() {
        return laborInput;
    }

    public void setLaborInput(String laborInput) {
        this.laborInput = laborInput;
    }
}

package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "search_province_hot")
@Entity
@Getter
@Setter
public class ProvinceHostSearch {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String name;
    @Column
    private Integer searchCount;
    @Column
    private Integer year;
    @Column
    private Integer month;
    @Column
    private Long modifyId;
    @Column
    private boolean deleted;
    @Column
    private Date createDate;

    public ProvinceHostSearch() {
    }

    public ProvinceHostSearch(String name, Integer searchCount, Integer year, Integer month) {
        this.name = name;
        this.searchCount = searchCount;
        this.year = year;
        this.month = month;
        this.deleted = false;
        this.modifyId = null;
        this.createDate = new Date();
    }
}

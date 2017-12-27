package com.bbdservice.sichuan.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 基础信息
 *
 * @author liuzh
 * @since 2016-01-31 21:42
 */
public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 56445698003713107L;
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    private Integer page = 1;

    @Transient
    private Integer rows = 10;

    @Transient
    private String orderKey;

    @Transient
    private Date createStart;

    @Transient
    private Date createEnd;

    @Transient
    private Date updateStart;

    @Transient
    private Date updateEnd;

    @Transient
    private String baseName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public String getOrderKey() {
        return orderKey;
    }

    public void setOrderKey(String orderKey) {
        this.orderKey = orderKey;
    }

    public Date getCreateStart() {
        return createStart;
    }

    public void setCreateStart(Date createStart) {
        this.createStart = createStart;
    }

    public Date getCreateEnd() {
        return createEnd;
    }

    public void setCreateEnd(Date createEnd) {
        this.createEnd = createEnd;
    }

    public Date getUpdateStart() {
        return updateStart;
    }

    public void setUpdateStart(Date updateStart) {
        this.updateStart = updateStart;
    }

    public Date getUpdateEnd() {
        return updateEnd;
    }

    public void setUpdateEnd(Date updateEnd) {
        this.updateEnd = updateEnd;
    }

    public String getBaseName() {
        return baseName;
    }

    public void setBaseName(String baseName) {
        this.baseName = baseName;
    }
}

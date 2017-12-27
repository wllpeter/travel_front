package com.bbdservice.sichuan.entity;

import java.io.Serializable;
import javax.persistence.*;

@Table(name = "sys_dictionary")
public class SysDictionary implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 类型
     */
    @Column(name = "data_type")
    private String dataType;

    /**
     * 编码
     */
    @Column(name = "data_code")
    private String dataCode;

    /**
     * 名称
     */
    private String name;

    private String remark;

    private static final long serialVersionUID = 6254170262856385985L;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取类型
     *
     * @return data_type - 类型
     */
    public String getDataType() {
        return dataType;
    }

    /**
     * 设置类型
     *
     * @param dataType 类型
     */
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    /**
     * 获取编码
     *
     * @return data_code - 编码
     */
    public String getDataCode() {
        return dataCode;
    }

    /**
     * 设置编码
     *
     * @param dataCode 编码
     */
    public void setDataCode(String dataCode) {
        this.dataCode = dataCode;
    }

    /**
     * 获取名称
     *
     * @return name - 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置名称
     *
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return remark
     */
    public String getRemark() {
        return remark;
    }

    /**
     * @param remark
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
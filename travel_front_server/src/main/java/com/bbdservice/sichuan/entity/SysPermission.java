package com.bbdservice.sichuan.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sys_permission")
public class SysPermission extends BaseEntity{

    private static final long serialVersionUID = -6248267437487201566L;
    /**
     * 权限id
     */
    @Column(name = "permission_id")
    private String permissionId;

    /**
     * 权限名称
     */
    @Column(name = "permission_name")
    private String permissionName;

    /**
     * 权限编码
     */
    @Column(name = "permission_code")
    private String permissionCode;

    /**
     * 权限类型
     */
    @Column(name = "permission_type")
    private String permissionType;

    /**
     * 等级
     */
    private String level;

    /**
     * 父级权限
     */
    @Column(name = "parent_id")
    private String parentId;

    /**
     * 创建人
     */
    @Column(name = "create_by")
    private String createBy;

    /**
     * 创建时间
     */
    @Column(name = "create_date")
    private Date createDate;

    /**
     * 修改人
     */
    @Column(name = "modify_by")
    private String modifyBy;

    /**
     * 修改时间
     */
    @Column(name = "modify_date")
    private Date modifyDate;

    /**
     * 是否有效
     */
    private Boolean deleted;

    /**
     * 获取权限id
     *
     * @return permission_id - 权限id
     */
    public String getPermissionId() {
        return permissionId;
    }

    /**
     * 设置权限id
     *
     * @param permissionId 权限id
     */
    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    /**
     * 获取权限名称
     *
     * @return permission_name - 权限名称
     */
    public String getPermissionName() {
        return permissionName;
    }

    /**
     * 设置权限名称
     *
     * @param permissionName 权限名称
     */
    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode;
    }
    /**
     * 获取权限类型
     *
     * @return permission_type - 权限类型
     */
    public String getPermissionType() {
        return permissionType;
    }

    /**
     * 设置权限类型
     *
     * @param permissionType 权限类型
     */
    public void setPermissionType(String permissionType) {
        this.permissionType = permissionType;
    }

    /**
     * 获取等级
     *
     * @return level - 等级
     */
    public String getLevel() {
        return level;
    }

    /**
     * 设置等级
     *
     * @param level 等级
     */
    public void setLevel(String level) {
        this.level = level;
    }

    /**
     * 获取父级权限
     *
     * @return parent_id - 父级权限
     */
    public String getParentId() {
        return parentId;
    }

    /**
     * 设置父级权限
     *
     * @param parentId 父级权限
     */
    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取创建人
     *
     * @return create_by - 创建人
     */
    public String getCreateBy() {
        return createBy;
    }

    /**
     * 设置创建人
     *
     * @param createBy 创建人
     */
    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    /**
     * 获取创建时间
     *
     * @return create_date - 创建时间
     */
    public Date getCreateDate() {
        return createDate;
    }

    /**
     * 设置创建时间
     *
     * @param createDate 创建时间
     */
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    /**
     * 获取修改人
     *
     * @return modify_by - 修改人
     */
    public String getModifyBy() {
        return modifyBy;
    }

    /**
     * 设置修改人
     *
     * @param modifyBy 修改人
     */
    public void setModifyBy(String modifyBy) {
        this.modifyBy = modifyBy;
    }

    /**
     * 获取修改时间
     *
     * @return modify_date - 修改时间
     */
    public Date getModifyDate() {
        return modifyDate;
    }

    /**
     * 设置修改时间
     *
     * @param modifyDate 修改时间
     */
    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    /**
     * 获取是否有效
     *
     * @return deleted - 是否有效
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * 设置是否有效
     *
     * @param deleted 是否有效
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
package com.bbdservice.sichuan.entity;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sys_user")
public class SysUser extends BaseEntity{

    private static final long serialVersionUID = -3082444285987215656L;
    @Column(name = "user_id")
    private String userId;

    /**
     * 登录名
     */
    @Column(name = "login_name")
    private String loginName;

    /**
     * 姓名
     */
    @Column(name = "user_name")
    private String userName;

    /**
     * 密码
     */
    private String password;

    /**
     * 有效期
     */
    @Column(name = "valid_date")
    private Date validDate;

    /**
     * 固定电话
     */
    private String telephone;

    /**
     * 移动电话
     */
    @Column(name = "mobile_phone")
    private String mobilePhone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 省份
     */
    private String province;

    /**
     * 地区编码
     */
    @Column(name = "area_code")
    private String areaCode;

    /**
     * 盐值
     */
    private String salt;

    /**
     * 类型
     */
    private String type;


    /**
     * 状态
     */
    private String state;

    /**
     * 说明
     */
    private String remark;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "modify_by")
    private String modifyBy;

    @Column(name = "modify_date")
    private Date modifyDate;

    /**
     * 合并授权
     */
    @Column(name = "merge_authority")
    private Boolean mergeAuthority;

    /**
     * 授权起始时间
     */
    @Column(name = "merge_start")
    private Date mergeStart;

    /**
     * 授权结束时间
     */
    @Column(name = "merge_end")
    private Date mergeEnd;

    /**
     * 是否有效
     */
    private Boolean deleted;

    /**
     * @return user_id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * 获取登录名
     *
     * @return login_name - 登录名
     */
    public String getLoginName() {
        return loginName;
    }

    /**
     * 设置登录名
     *
     * @param loginName 登录名
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    /**
     * 获取姓名
     *
     * @return user_name - 姓名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置姓名
     *
     * @param userName 姓名
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取密码
     *
     * @return password - 密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置密码
     *
     * @param password 密码
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取有效期
     *
     * @return valid_date - 有效期
     */
    public Date getValidDate() {
        return validDate;
    }

    /**
     * 设置有效期
     *
     * @param validDate 有效期
     */
    public void setValidDate(Date validDate) {
        this.validDate = validDate;
    }

    /**
     * 获取固定电话
     *
     * @return telephone - 固定电话
     */
    public String getTelephone() {
        return telephone;
    }

    /**
     * 设置固定电话
     *
     * @param telephone 固定电话
     */
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    /**
     * 获取移动电话
     *
     * @return mobile_phone - 移动电话
     */
    public String getMobilePhone() {
        return mobilePhone;
    }

    /**
     * 设置移动电话
     *
     * @param mobilePhone 移动电话
     */
    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    /**
     * 获取邮箱
     *
     * @return email - 邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置邮箱
     *
     * @param email 邮箱
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取省份
     *
     * @return province - 省份
     */
    public String getProvince() {
        return province;
    }

    /**
     * 设置省份
     *
     * @param province 省份
     */
    public void setProvince(String province) {
        this.province = province;
    }

    /**
     * 获取地区编码
     *
     * @return area_code - 地区编码
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * 设置地区编码
     *
     * @param areaCode 地区编码
     */
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    /**
     * 获取盐值
     *
     * @return salt - 盐值
     */
    public String getSalt() {
        return salt;
    }

    /**
     * 设置盐值
     *
     * @param salt 盐值
     */
    public void setSalt(String salt) {
        this.salt = salt;
    }

    /**
     * 获取类型
     *
     * @return type - 类型
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型
     *
     * @param type 类型
     */
    public void setType(String type) {
        this.type = type;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取说明
     *
     * @return remark - 说明
     */
    public String getRemark() {
        return remark;
    }

    /**
     * 设置说明
     *
     * @param remark 说明
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    /**
     * @return create_by
     */
    public String getCreateBy() {
        return createBy;
    }

    /**
     * @param createBy
     */
    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    /**
     * @return create_date
     */
    public Date getCreateDate() {
        return createDate;
    }

    /**
     * @param createDate
     */
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    /**
     * @return modify_by
     */
    public String getModifyBy() {
        return modifyBy;
    }

    /**
     * @param modifyBy
     */
    public void setModifyBy(String modifyBy) {
        this.modifyBy = modifyBy;
    }

    /**
     * @return modify_date
     */
    public Date getModifyDate() {
        return modifyDate;
    }

    /**
     * @param modifyDate
     */
    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    /**
     * 获取合并授权
     *
     * @return merge_authority - 合并授权
     */
    public Boolean getMergeAuthority() {
        return mergeAuthority;
    }

    /**
     * 设置合并授权
     *
     * @param mergeAuthority 合并授权
     */
    public void setMergeAuthority(Boolean mergeAuthority) {
        this.mergeAuthority = mergeAuthority;
    }

    /**
     * 获取授权起始时间
     *
     * @return merge_start - 授权起始时间
     */
    public Date getMergeStart() {
        return mergeStart;
    }

    /**
     * 设置授权起始时间
     *
     * @param mergeStart 授权起始时间
     */
    public void setMergeStart(Date mergeStart) {
        this.mergeStart = mergeStart;
    }

    /**
     * 获取授权结束时间
     *
     * @return merge_end - 授权结束时间
     */
    public Date getMergeEnd() {
        return mergeEnd;
    }

    /**
     * 设置授权结束时间
     *
     * @param mergeEnd 授权结束时间
     */
    public void setMergeEnd(Date mergeEnd) {
        this.mergeEnd = mergeEnd;
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
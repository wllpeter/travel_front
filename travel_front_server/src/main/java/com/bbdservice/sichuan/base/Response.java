package com.bbdservice.sichuan.base;
import com.bbdservice.sichuan.utils.I18nUtils;

import java.io.Serializable;

/**
 * 接口返回信息的封装类
 * Created by 王凯斌 on 2017/4/25.
 */
public class Response implements Serializable {

    private static final long serialVersionUID = -6940155623903430474L;

    public enum Status {
        SUCCESS,
        UN_LOGIN,
        UN_AUTH,
        ERROR
    }

    private Response.Status status;

    private Object result;

    private String info;

    public Response(Status status, Object result, String info) {
        this.status = status;
        this.result = result;
        this.info = info;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public static Response success(Object result, String info) {

        return new Response(Status.SUCCESS, result, info);
    }

    public static Response success(Object result) {

        return new Response(Status.SUCCESS, result, I18nUtils.getMessage("Common.Response.Success"));
    }

    public static Response success() {

        return new Response(Status.SUCCESS, null, I18nUtils.getMessage("Common.Response.Success"));
    }

    public static Response unAuth(String info) {

        return new Response(Status.UN_AUTH, null, info);
    }

    public static Response error(String info) {

        return new Response(Status.ERROR, null, info);
    }

    public static Response unLogin() {

        return new Response(Status.UN_LOGIN, null, I18nUtils.getMessage("Common.Response.UnLogin"));
    }
}

package com.bbdservice.sichuan.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.http.Consts;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.util.Args;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Map;


/**
 * Created by 王凯斌 on 2017/4/26.
 */
@Component
public class HttpUtils {

    @Value("${data.api.page.url}")
    private String pageUrlInFile;

    private static String pageUrl;

    @PostConstruct
    public void init() {
        pageUrl = pageUrlInFile;
    }

    public static Cookie getCookie(String name, String value, int expiry, String path, boolean isSecure) {
        Cookie cookie = new Cookie(name, value);
       // cookie.setMaxAge(expiry);
        cookie.setPath(path);
        cookie.setSecure(isSecure);
        return cookie;
    }

    public static String get(String url) throws IOException {
        return Request.Get(url)
                .execute().returnContent().asString();
    }

    public static Object getDataPlatformPage(String url, int pageNo, int pageSize) throws IOException {

        url = url + MessageFormat.format(pageUrl, pageNo, pageSize);
        return JSON.parse(get(url));
    }

    public static Object getDataPlatformResult(String url, Map<String, String> parms, String resultKey) throws IOException {

        if (!url.contains("?")) {
            url += "?";
        }
        url = getUrlWithParms(url, parms);
        if (resultKey != null) {
            return JSON.parseObject(get(url)).get(resultKey);
        }
        return JSON.parseObject(get(url));
    }

    public static Object getDataPlatform(String url) throws IOException {
        return JSON.parse(get(url));
    }

    public static Object getDataPlatformWithParams(String url, int page, int pageSize, Map<String, String> map) throws IOException {
        url = url + MessageFormat.format("&page={0}&pageSize={1}", page, pageSize);
        url = getUrlWithParms(url, map);
        return JSON.parse(get(url));
    }

    private static String getUrlWithParms(String url, Map<String, String> parms) {
        StringBuilder sb = null;
        if (null != parms && parms.size() > 0) {
            sb = new StringBuilder();
            for (Map.Entry<String, String> entry : parms.entrySet()) {
                if (null != entry.getValue() && StringUtils.isNotEmpty(entry.getValue().trim())) {
                    sb.append("&").append(entry.getKey()).append("=").append(entry.getValue());
                }
            }
            if (sb.length() > 0) {
                url += sb.toString();
            }
        }
        return url;
    }

    public static JSONObject doPost(String url, String params) {
        Args.notNull(url, "url");
        try {
            Request request = Request.Post(url).bodyString(params,ContentType.APPLICATION_JSON);
            String result = request.execute().returnContent().asString(Consts.UTF_8);
            return JSON.parseObject(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

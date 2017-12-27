package com.bbdservice.sichuan.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Created by 王凯斌 on 2017/4/26.
 */
@Component
public class I18nUtils {

    @Value("${setting.language}")
    private String language;

    @Value("${setting.country}")
    private String country;

    private static ResourceBundle messages;

    /**
     * spring组件初始化的方法
     */
    @PostConstruct
    public void init() {
        messages = ResourceBundle.getBundle("Messages", new Locale(language, country));
    }

    public static String getMessage(String message) {
        return messages.getString(message);
    }

}

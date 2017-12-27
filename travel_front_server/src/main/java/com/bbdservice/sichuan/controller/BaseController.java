package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.utils.I18nUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by lixudong on 2017/12/4.
 */
public class BaseController {
    protected final Logger logger = LoggerFactory.getLogger(BaseController.class);
    /**
     * 获得国际化消息的方法
     *
     * @param messageId
     * @return
     */
    protected String getMessage(String messageId) {
        return I18nUtils.getMessage(messageId);
    }

}

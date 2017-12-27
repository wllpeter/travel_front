package com.bbdservice.sichuan.utils;

import java.util.UUID;

/**
 * Created by lixudong on 2017/12/6.
 */
public class UuidUtils {
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }
}

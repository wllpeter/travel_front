package com.bbdservice.sichuan.utils;

import java.math.BigDecimal;

/**
 * Created by 陈亚兰 on 2018/2/11.
 */
public class JudgeIsNum {
    public static boolean isNum(String str) {

        try {
            new BigDecimal(str);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}

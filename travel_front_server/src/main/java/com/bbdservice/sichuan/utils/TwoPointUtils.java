package com.bbdservice.sichuan.utils;

import org.apache.commons.lang.StringUtils;

import java.text.DecimalFormat;

/**
 * Created by 陈亚兰 on 2018/2/8.
 */
public class TwoPointUtils {

    public static String  getTwo(String value){
        if(StringUtils.isEmpty(value)){
            return "";
        }
        DecimalFormat b = new DecimalFormat("#.00");
        String res=b.format(Double.valueOf(value));
        String[] r=res.split("\\.");
        if(StringUtils.isEmpty(r[0])){
            return 0+res;
        }else if(r[0].equals("-")){
            return "-0."+r[1];
        }

        return b.format(Double.valueOf(value));
    }

    public static String getFour(String value){
        DecimalFormat b = new DecimalFormat("#.0000");
        return b.format(Double.valueOf(value));
    }
}

package com.bbdservice.sichuan.utils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * Created by 陈亚兰 on 2018/1/12.
 * Base64 加密 解密
 */
public class Base64Utils {
    //加密
    public static String getBase64(String str){
        byte[] b=null;
        String s=null;
        try {
            b=str.getBytes("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if(b!=null){
            s=new BASE64Encoder().encode(b);
        }
        return s;
    }

    public static String getFromBased64(String s){
        byte[] b=null;
        String result=null;
        if(s!=null){
            BASE64Decoder decoder=new BASE64Decoder();
            try {
                b=decoder.decodeBuffer(s);
                result=new String(b,"utf-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}

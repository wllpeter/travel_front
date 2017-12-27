package com.bbdservice.sichuan.utils;

public class DateUtils {
    public static String getYear(String date){
        date = date.replace("-","");
        return  date.substring(0, 4);
    }

    public static String getMonth(String date){
        date = date.replace("-","");
        return date.substring(4,6);
    }

    public static String getDay(String date){
        date = date.replace("-","");
        return date.substring(6,8);
    }

    public static String MonthAddZero(String month){
        if(month.length()==1)
        {
            return "0"+month;
        }
        return month;
    }

}

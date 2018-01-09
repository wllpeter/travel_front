package com.bbdservice.sichuan.utils;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Value;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

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

    public static long getFirstDayOfMonth(int year, int month){
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR,year);
        //设置月份
        cal.set(Calendar.MONTH, month-1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        //获取某月最小天数
        int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最小天数
        cal.set(Calendar.DAY_OF_MONTH, firstDay);
        return cal.getTimeInMillis()/1000;
    }

    /**
     * 获得该月最后一天
     * @param year
     * @param month
     * @return
     */
    public static long getLastDayOfMonth(int year,int month){
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR,year);
        //设置月份
        cal.set(Calendar.MONTH, month-1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        return cal.getTimeInMillis()/1000;
    }

    public static long getStartDayOfYear(Integer year) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR,year);
        //设置月份
        cal.set(Calendar.MONTH, 0);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        //获取某月最大天数
        int lastDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        return cal.getTimeInMillis()/1000;
    }

    public static long getEndDayOfYear(Integer year) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR,year);
        //设置月份
        cal.set(Calendar.MONTH, 11);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        return cal.getTimeInMillis()/1000;
    }

    public static long getThreeDaysAgo() {
        Date now = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        cal.add(Calendar.DATE,-3);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTimeInMillis()/1000;
    }

    /**
     * 季度的开始时间，即2012-01-1 00:00:00
     *
     * @return
     */
    public static long getCurrentQuarterStartTime(Integer year, Integer quarter) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.YEAR,year);
        switch (quarter) {
            case 1:
                c.set(Calendar.MONTH, 0);
                break;
            case 2:
                c.set(Calendar.MONTH,3);
                break;
            case 3:
                c.set(Calendar.MONTH,6);
                break;
            case 4:
                c.set(Calendar.MONTH,9);
                break;
        }
        c.set(Calendar.DATE,1);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis()/1000;
    }

    /**
     * 当前季度的结束时间，即2012-03-31 23:59:59
     *
     * @return
     */
    public static long getCurrentQuarterEndTime(Integer year,Integer quarter) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.YEAR,year);
        Date now = null;
        try {
            if (quarter == 1) {
                c.set(Calendar.MONTH, 2);
                c.set(Calendar.DATE, 31);
            } else if (quarter == 2) {
                c.set(Calendar.MONTH, 5);
                c.set(Calendar.DATE, 30);
            } else if (quarter == 3) {
                c.set(Calendar.MONTH,8) ;
                c.set(Calendar.DATE, 30);
            } else if (quarter == 4) {
                c.set(Calendar.MONTH, 11);
                c.set(Calendar.DATE, 31);
            }
            c.set(Calendar.HOUR_OF_DAY, 0);
            c.set(Calendar.SECOND, 0);
            c.set(Calendar.MINUTE, 0);
            c.set(Calendar.MILLISECOND, 0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return c.getTimeInMillis()/1000;
    }
}

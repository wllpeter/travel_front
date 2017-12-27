package com.bbdservice.sichuan.utils;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by cc on 2017/12/11.
 */
public class ObjectUtils {

    /**
     * bean对象转list
     * @param obj bean对象
     * @param outArray 指定要去掉哪些字段的list集合,如:["reportBasicInfoId","xxxx"]
     * */
    public static ArrayList convertObjToList(Object obj,ArrayList<String> outArray){
        ArrayList<String> list=new ArrayList<String>();
        if (obj == null)
            return null;
        Field[] fields = obj.getClass().getDeclaredFields();
        try {
            for(int i=0;i<fields.length;i++){
                try {
                    System.out.println("fields+++"+fields[i].getName());
                    if(!outArray.contains(fields[i].getName())) {
                        Field f = obj.getClass().getDeclaredField(fields[i].getName());
                        f.setAccessible(true);
                        Object o = f.get(obj);
                        if (o.toString().equals("true")) {
                            o = 1;
                        } else if (o.toString().equals("false")) {
                            o = 0;
                        }
                        list.add(o.toString());
                    }
                } catch (NoSuchFieldException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalArgumentException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }

    /**
     * bean对象转list
     * @param obj bean对象
     * */
    public static ArrayList convertObjToList(Object obj){
        ArrayList<String> list=new ArrayList<String>();
        if (obj == null)
            return null;
        Field[] fields = obj.getClass().getDeclaredFields();
        try {
            for(int i=0;i<fields.length;i++){
                try {
                    Field f = obj.getClass().getDeclaredField(fields[i].getName());
                    f.setAccessible(true);
                    Object o = f.get(obj);
                    if (o.toString().equals("true")) {
                        o = 1;
                    } else if (o.toString().equals("false")) {
                        o = 0;
                    }
                    list.add(o.toString());
                } catch (NoSuchFieldException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalArgumentException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }


    /**
     * bean对象转list
     * @param obj bean对象
     * @param outArray 指定要去掉哪些字段的list集合,如:["reportBasicInfoId","xxxx"]
     * @param dateTransMap  指定对应Date字段要做的格式转化的map集合,如:{"findTime":"yyyy.mm","xxx":"xx"}
     * */
    public static ArrayList convertObjToList(Object obj,ArrayList<String> outArray,Map<String,String> dateTransMap,Integer id){
        ArrayList<String> list=new ArrayList<String>();
        if(id!=-1){
            list.add(id.toString());
        }
        if (obj == null)
            return null;
        Field[] fields = obj.getClass().getDeclaredFields();
        try {
            for(int i=0;i<fields.length;i++){

                //实体类中序列化serialVersionUID导入报表不需要  过滤掉
                if(fields[i].getName().equals("serialVersionUID"))
                    continue;

                try {
                    System.out.println("fields+++"+fields[i].getName());
                    if(!outArray.contains(fields[i].getName())) {

                        Field f = obj.getClass().getDeclaredField(fields[i].getName());
                        f.setAccessible(true);
                        Object o = f.get(obj);
                        //根据传入的字段，和指定的时间格式做相应的转化
                        if(null==o){
                            o="";
                        }else{
                            if(dateTransMap.containsKey(fields[i].getName()))
                            {
                                SimpleDateFormat sdf = new SimpleDateFormat(dateTransMap.get(fields[i].getName()));
                                o=sdf.format(o);
                            }
                        }

                        //将true->1,false->0
                        if(null==o){
                            o="";
                        }else{
                            if ( o.toString().equals("true")) {
                                o = 1;
                            } else if (o.toString().equals("false")) {
                                o = 0;
                            }
                        }
                        list.add(o.toString());
                    }
                } catch (NoSuchFieldException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalArgumentException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }

}

package com.bbdservice.sichuan.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

@Component
public class SpringContextUtil implements ApplicationContextAware{
    private final static Logger LOGGER = LoggerFactory.getLogger(SpringContextUtil.class);
    private static ApplicationContext context;

    private final Object getBean(String serviceName)throws BeansException{
        String serviceClass = serviceName;
        Object object = context.getBean(serviceClass);
        return object;
    }

    private final Method getMethod(String serviceName, String methodName,Object...params) throws BeansException{
        Object obj = getBean(serviceName);
        Class[] clazz = new Class[params.length];
        int i = 0;
        for(Object object : params){
            if(object instanceof HashMap){
                clazz[i] = Map.class;
            }
            else {
                clazz[i] = object.getClass();
            }
            i++;
        }
        Method method = ReflectionUtils.findMethod(obj.getClass(), methodName,clazz);
        return method;
    }

    private final Method getMethodByMap(String serviceName, String methodName,Map<String,Object> map) throws BeansException{
        Object obj = getBean(serviceName);
        Class[] clazz = new Class[map.size()];
        int i = 0;
        for(Map.Entry<String,Object> entity:map.entrySet()){
            clazz[i] = entity.getValue().getClass();
            i++;
        }
        Method method = ReflectionUtils.findMethod(obj.getClass(), methodName,clazz);
        return method;
    }

    public Object executeMethod(String serviceName, String methodName, Object... params){
        String serviceBeanName = serviceName.concat("ServiceImpl");
        Method method = getMethod(serviceBeanName, methodName,params);
        Object ret = ReflectionUtils.invokeMethod(method,getBean(serviceBeanName),params);
        LOGGER.info("method execute over", ret.toString());
        return ret;
    }

    public Object executeMethodByMap(String serviceName, String methodName, Map<String, Object> map){
        String serviceBeanName = serviceName.concat("ServiceImpl");
        Method method = getMethodByMap(serviceBeanName, methodName,map);
        Object[] params = new Object[map.size()];
        int i = 0;
        for(Map.Entry<String,Object> entity:map.entrySet()){
            params[i] = entity.getValue();
            i++;
        }
        Object ret = ReflectionUtils.invokeMethod(method,getBean(serviceBeanName),params);
        LOGGER.info("method execute over", ret.toString());
        return ret;
    }
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }
}

package com.bbdservice.sichuan.annotation;

import java.lang.annotation.*;

/**
 * Created by lixudong on 2017/12/4.
 */
@Documented
@Inherited
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Authority {

    /**
     * 需要校验的权限名称
     * @return
     */
    String name() default "";
}

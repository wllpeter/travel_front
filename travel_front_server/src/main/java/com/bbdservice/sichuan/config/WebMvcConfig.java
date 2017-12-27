package com.bbdservice.sichuan.config;

import com.bbdservice.sichuan.interceptor.UserTokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by lixudong on 2017/12/6.
 */
@Configuration
@EnableAutoConfiguration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private UserTokenInterceptor userTokenInterceptor;

    @Value("${setting.unAuthUrls}")
    private String unAuthUrls;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        /**
         * addInterceptor这个方法这里有个坑要注意，自定义的拦截器要依赖注入后再
         * 放入这个方法，否则拦截器里面的属性不会被spring自动注入。
         */
        InterceptorRegistration interceptorRegistration = registry.addInterceptor(userTokenInterceptor)
                .addPathPatterns("/**");

        for (String url : unAuthUrls.split(";")) {
            interceptorRegistration.excludePathPatterns(url);
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}

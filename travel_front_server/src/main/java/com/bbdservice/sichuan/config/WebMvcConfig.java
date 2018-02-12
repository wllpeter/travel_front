package com.bbdservice.sichuan.config;

import com.bbdservice.sichuan.interceptor.UserTokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.File;
import java.io.IOException;

/**
 * Created by lixudong on 2017/12/6.
 */
@Configuration
@EnableAutoConfiguration
@EnableConfigurationProperties({ResourceProperties.class})
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    @Autowired
    private ResourceProperties resourceProperties=new ResourceProperties();


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
        Integer cachePeriod = resourceProperties.getCachePeriod();


        String uploadPath="/root/tomcat_sichuan/pdf";
        File file = new File(uploadPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        registry
                .addResourceHandler("/download/**")
                .addResourceLocations("file:" + uploadPath);

        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/public/static/");

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/public/index.html")
                .setCachePeriod(cachePeriod).resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath,
                                                   Resource location) throws IOException {
                        return location.exists() && location.isReadable() ? location
                                : null;
                    }
                });
//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/public/index.html")
//                .addResourceLocations(new PathResourceResolver(){
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource loaction){
//                        return loaction.exists()&&loaction.isReadable()?loaction:null;
//                    }
//                })));

        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}

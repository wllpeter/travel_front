package com.bbdservice.sichuan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by cc on 2017/11/1.
 */

@Configuration
@EnableSwagger2
@ComponentScan({"com.bbdservice.sichuan.controller"})  //指定被扫描Controller的位置
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("四川旅游前台展示系统API接口")
                .description("四川旅游系统")
                .termsOfServiceUrl("http://sichuan.bbdservice.com")
                .version("1.0")
                .build();
    }

}

package com.bbdservice.sichuan.interceptor;

import com.bbdservice.sichuan.annotation.Authority;
import com.bbdservice.sichuan.entity.redis.UserToken;
import com.bbdservice.sichuan.service.SysUserService;
import com.bbdservice.sichuan.service.UserTokenService;
import com.bbdservice.sichuan.utils.I18nUtils;
import com.bbdservice.sichuan.utils.UserInfo;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * 与权限校验有关的拦截器
 * Created by 王凯斌 on 2017/4/25.
 */
@Component
public class UserTokenInterceptor implements HandlerInterceptor {

    @Autowired
    private UserTokenService userTokenService;
    @Autowired
    private SysUserService userService;

    @Value("${setting.auth.error.url}")
    private String unAuthUrl;

    @Value("${setting.devMode}")
    private Boolean devMode;

    @Value("${setting.loginExpireSeconds}")
    private int loginExpireSeconds;

    @Override
    public void afterCompletion(HttpServletRequest arg0,
                                HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
                           Object arg2, ModelAndView arg3) throws Exception {
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object method) throws Exception {

        if (devMode) {
            Cookie loginNameCookie = WebUtils.getCookie(request, "loginName");
            if (loginNameCookie != null) {
                UserToken userToken = userTokenService.find(loginNameCookie.getValue());
                new UserInfo(userService.findByLoginName(loginNameCookie.getValue()));
            }else{
                new UserInfo(userService.findByLoginName("admin"));
            }
            return true;
        }

        Cookie loginNameCookie = WebUtils.getCookie(request, "loginName");
        Cookie tokenCookie = WebUtils.getCookie(request, "token");
        if (loginNameCookie == null || tokenCookie == null || loginNameCookie.getValue() == null || tokenCookie.getValue() == null) {
            request
                    .getRequestDispatcher(String.format("%s=%s", unAuthUrl, I18nUtils.getMessage("Common.Response.Token.Missing")))
                    .forward(request, response);
            return false;
        }
        UserToken userToken = userTokenService.find(loginNameCookie.getValue());

        if (userToken == null) {
            request
                    .getRequestDispatcher(String.format("%s=%s", unAuthUrl, I18nUtils.getMessage("Common.Response.Token.UserMissing")))
                    .forward(request, response);
            return false;
        }
        if (!tokenCookie.getValue().equals(userToken.getToken())) {
            request
                    .getRequestDispatcher(String.format("%s=%s", unAuthUrl, I18nUtils.getMessage("Common.Response.Token.Invalid")))
                    .forward(request, response);
            return false;
        }
        if (userToken.getExpireDate().before(new Date())) {
            request
                    .getRequestDispatcher(String.format("%s=%s", unAuthUrl, I18nUtils.getMessage("Common.Response.Token.Expired")))
                    .forward(request, response);
            return false;
        }
        userToken.setExpireDate(DateUtils.addSeconds(new Date(), loginExpireSeconds));
        userTokenService.save(userToken);
        new UserInfo(userService.findByLoginName(userToken.getLoginName()));

        if (!hasPermission((HandlerMethod) method, userToken)) {
            request
                    .getRequestDispatcher(String.format("%s=%s", unAuthUrl, I18nUtils.getMessage("Common.Response.Auth.Invalid")))
                    .forward(request, response);
            return false;
        }
        return true;
    }

    /**
     * 根据调度器指向的方法，获得相应的Authority注解，并进行权限比对
     *
     * @param handlerMethod
     * @param userToken
     * @return
     */
    private Boolean hasPermission(HandlerMethod handlerMethod, UserToken userToken) {
        Authority classAuthority = handlerMethod.getBeanType().getAnnotation(
                Authority.class);
        Authority methodAuthority = handlerMethod.getMethodAnnotation(Authority.class);

        //如果类权限和方法权限都为空，那么可访问
        if (classAuthority == null
                && methodAuthority == null) {
            return true;
        }
        //如果类权限和方法权限不都为空，但权限为空，不可访问，这么麻烦的判断是因为redisHash不会保存一个空set
        if (userToken.getPermissions() == null) {
            return false;
        }

        Set<String> permissions = new HashSet<String>();
        if (classAuthority != null) {
            permissions.add(classAuthority.name());
        }

        if (methodAuthority != null) {
            permissions.add(methodAuthority.name());
        }
        return userToken.getPermissions().containsAll(permissions);
    }

}

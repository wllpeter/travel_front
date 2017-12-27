package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.service.SysDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lixudong on 2017/12/13.
 */
@RestController
@RequestMapping("/dictionary")
public class SysDictionaryController {
    @Autowired
    private SysDictionaryService dictionaryService;

    @RequestMapping(value = "/{type}", method = RequestMethod.GET)
    public Response findByType(@PathVariable String type) {
        return Response.success(dictionaryService.findByType(type));
    }
}

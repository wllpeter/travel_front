package com.bbdservice.sichuan.entity.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
@Setter
@Getter
public class SysCityVO {
    private String name;
    private String activeDegree;
    public SysCityVO(){}
    public SysCityVO(String name,String activeDegree){
        this.name=name;
        this.activeDegree=activeDegree;
    }
}

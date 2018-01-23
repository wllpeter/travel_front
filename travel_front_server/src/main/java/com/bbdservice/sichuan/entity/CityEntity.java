package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
@Setter
@Getter
@Entity
@Table(name="sys_city")
public class CityEntity {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long parentId;

    private String belong;

    public CityEntity(){}
    public CityEntity(Long id,String name,Long parentId,String belong){
        this.id=id;
        this.name=name;
        this.parentId=parentId;
        this.belong=belong;
    }
}

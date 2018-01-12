package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @Author:WLL
 * @Date:Create on 17:382018/1/11
 */
@Entity
@Table(name ="province_city")
@Getter
@Setter
public class ProvinceCity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(columnDefinition = "varchar(255) comment'名称'")
    private String name;
    @Column(columnDefinition = "int comment'父id'")
    private Integer parentId;
}

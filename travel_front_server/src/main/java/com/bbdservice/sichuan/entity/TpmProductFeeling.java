package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
@Setter
@Getter
@Entity
@Table(name="tpm_hotword_data")
public class TpmProductFeeling {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "int comment '产品类型1-5'")
    private Integer  productType;
    @Column(columnDefinition = "varchar(255) comment '关键字'")
    private String keyWord;
    @Column(columnDefinition = "int comment '个数")
    private Integer counts;
    @Column(columnDefinition = "int comment '年'")
    private Integer year;
    @Column(columnDefinition = "int comment '月'")
    private Integer month;
    @Column
    private Date createDate;
    @Column
    private boolean deleted;
    @Column
    private Long modifyId;
}

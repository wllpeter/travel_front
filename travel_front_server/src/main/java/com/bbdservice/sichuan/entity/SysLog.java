package com.bbdservice.sichuan.entity;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "sys_log")
@Getter
@Setter
public class SysLog implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String  name;
    @Column
    private Date createDate;
    @Column
    private boolean deleted;
    public SysLog(){}
    public SysLog(String name, Date date, boolean deleted){
        this.name=name;
        this.createDate=date;
        this.deleted=deleted;
    }
}

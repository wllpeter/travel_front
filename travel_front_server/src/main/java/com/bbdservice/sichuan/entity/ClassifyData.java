package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "tpm_classify_data")
@Entity
@Getter
@Setter
public class ClassifyData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String name;
    @Column
    private Long count;
    @Column
    private Long year;
    @Column
    private Long month;
    @Column
    private Long productType;
    @Column
    private String dataType;
    @Column
    private Date createDate;
    @Column
    private String deleted;
    @Column
    private Long modifyId;
}

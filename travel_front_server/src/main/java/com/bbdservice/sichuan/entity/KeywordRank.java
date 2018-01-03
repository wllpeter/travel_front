package com.bbdservice.sichuan.entity;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Table(name = "tpm_keyword_rank")
@Entity
@Getter
@Setter
public class KeywordRank {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private Integer productType;
    @Column
    private Integer wholeIndex;
    @Column
    private Integer rank;
    @Column
    private String keyword;
    @Column
    private Integer year;
    @Column
    private Integer month;
    @Column
    private Date createDate;
    @Column
    private boolean deleted;
    @Column
    private Long modifyId;
}

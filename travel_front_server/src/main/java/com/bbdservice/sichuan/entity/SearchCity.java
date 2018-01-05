package com.bbdservice.sichuan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "search_city")
@Entity
@Getter
@Setter
public class SearchCity {
    @Id
    private int id;
    @Column
    private String name;
    @Column
    private int parentId;
}

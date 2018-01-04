package com.bbdservice.sichuan.entity.enums;

public enum FlowTypeEnums implements BaseEnumType {
    CUSTOMER_COUNT("游客总量",1),
    PROVINCE_OUTSIDE_FLOW("省外游客客流量",2),
    PROVINCE_INSIDE_FLOW("省内游客客流量",3),
    ONE_DAY_FLOW("一日游客流总量",4),
    PROVINCE_OUTSIDE_ONE_DAY_FLOW("省外一日游客流量",5),
    PROVINCE_INSIDE_ONE_DAY_FLOW("省内一日游客流量",6),
    PASS_NIGHT_FLOW("隔夜游客流总量",7),
    PROVINCE_OUTSIDE_PASS_NIGHT_FLOW("省外隔夜游客流量",8),
    PROVINCE_INSIDE_PASS_NIGHT_FLOW("省内隔夜游客流量",9);
    private String name;
    private int index;

    FlowTypeEnums(String name, int index) {
        this.name = name;
        this.index = index;
    }

    @Override
    public int getIndex() {
        return this.index;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getName(int index){
        for(FlowTypeEnums caseTypeEnum: FlowTypeEnums.values()){
            if(caseTypeEnum.index == index){
                return caseTypeEnum.getName(index);
            }
        }
        return null;
    }
    @Override
    public String getIndex(String name){
        for(FlowTypeEnums caseTypeEnum: FlowTypeEnums.values()){
            if(caseTypeEnum.getName() == name){
                return caseTypeEnum.getName();
            }
        }
        return null;
    }
}
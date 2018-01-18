package com.bbdservice.sichuan.entity.enums;

public enum TrafficTypeEnums implements BaseEnumType {
    TRAFFIC_TYPE_AIR("飞机",1),
    TRAFFIC_TYPE_HIGHSPEED("高铁",2),
    TRAFFIC_TYPE_RAILWAY("火车",3),
    TRAFFIC_TYPE_OTHER("其他",4);
    private String name;
    private int index;
    TrafficTypeEnums(String name, int index) {
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
        for(TrafficTypeEnums caseTypeEnum: TrafficTypeEnums.values()){
            if(caseTypeEnum.index == index){
                return caseTypeEnum.getName(index);
            }
        }
        return null;
    }
    @Override
    public String getIndex(String name){
        for(TrafficTypeEnums caseTypeEnum: TrafficTypeEnums.values()){
            if(caseTypeEnum.getName() == name){
                return caseTypeEnum.getName();
            }
        }
        return null;
    }
}

package com.bbdservice.sichuan.entity.enums;

public enum ResidenceZoneEnums implements BaseEnumType {
    REISIDENCE_12("0-12",1),
    REISIDENCE_24("13-24",2),
    REISIDENCE_48("25-48",3),
    REISIDENCE_72("49-72",4),
    REISIDENCE_96("73-96",5),
    REISIDENCE_120("97-120",6),
    REISIDENCE_144("121-144",7),
    REISIDENCE_360("145-360",8),
    REISIDENCE_361("361+",9);
    private String name;
    private int index;
    ResidenceZoneEnums(String name, int index) {
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
        for(ResidenceZoneEnums caseTypeEnum: ResidenceZoneEnums.values()){
            if(caseTypeEnum.index == index){
                return caseTypeEnum.getName(index);
            }
        }
        return null;
    }
    @Override
    public String getIndex(String name){
        for(ResidenceZoneEnums caseTypeEnum: ResidenceZoneEnums.values()){
            if(caseTypeEnum.getName() == name){
                return caseTypeEnum.getName();
            }
        }
        return null;
    }
}

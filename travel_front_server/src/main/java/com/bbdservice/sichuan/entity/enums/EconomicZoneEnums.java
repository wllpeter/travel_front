package com.bbdservice.sichuan.entity.enums;

public enum EconomicZoneEnums implements BaseEnumType {
    CHENG_DU("成都平原经济区",1),
    CHUAN_NAN("川南经济区",2),
    CHUAN_DONG("川东北经济区",3),
    PAN_XI("攀西经济区",4),
    CHUAN_XI("川西北生态经济区",5);
    private String name;
    private int index;

    EconomicZoneEnums(String name, int index) {
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
        for(EconomicZoneEnums caseTypeEnum: EconomicZoneEnums.values()){
            if(caseTypeEnum.index == index){
                return caseTypeEnum.getName(index);
            }
        }
        return null;
    }
    @Override
    public String getIndex(String name){
        for(EconomicZoneEnums caseTypeEnum: EconomicZoneEnums.values()){
            if(caseTypeEnum.getName() == name){
                return caseTypeEnum.getName();
            }
        }
        return null;
    }
}
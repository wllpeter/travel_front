package com.bbdservice.sichuan.entity.enums;

public enum ExcelStatusEnums implements BaseEnumType{
    NOT_GENERATED("未生成",1),GENERATED_NOT_COMMIT("生成未提交",2),AUDIT_FALSE("审核未通过",3),COMMITED("已提交",4);
    private String name;
    private int index;

    ExcelStatusEnums(String name, int index) {
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
        for(ExcelStatusEnums caseTypeEnum:ExcelStatusEnums.values()){
            if(caseTypeEnum.index == index){
                return caseTypeEnum.getName(index);
            }
        }
        return null;
    }
}
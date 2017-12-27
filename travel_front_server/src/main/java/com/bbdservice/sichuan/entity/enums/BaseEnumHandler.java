package com.bbdservice.sichuan.entity.enums;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BaseEnumHandler extends BaseTypeHandler<BaseEnumType>{
    private final BaseEnumType[] enums;

    public BaseEnumHandler(Class<BaseEnumType> type) {
        if(type == null){
            throw  new IllegalArgumentException("type can not be null");
        }
        this.enums = type.getEnumConstants();
        if(this.enums == null){
            throw new IllegalArgumentException(type.getSimpleName() + "does not represent an enum type");
        }
    }

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, BaseEnumType baseEnumType, JdbcType jdbcType) throws SQLException {
        preparedStatement.setInt(i,baseEnumType.getIndex());
    }

    @Override
    public BaseEnumType getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        int i = resultSet.getInt(columnName);
        if(resultSet.wasNull()){
            return null;
        } else {
            return locateEnumStatus(i);
        }
    }

    @Override
    public BaseEnumType getNullableResult(ResultSet resultSet, int columnIndex) throws SQLException {
        int i = resultSet.getInt(columnIndex);
        if(resultSet.wasNull()){
            return null;
        }else{
            return locateEnumStatus(i);
        }
    }

    @Override
    public BaseEnumType getNullableResult(CallableStatement callableStatement, int columnndex) throws SQLException {
        int i = callableStatement.getInt(columnndex);
        if(callableStatement.wasNull()){
            return null;
        }else {
            return locateEnumStatus(i);
        }
    }

    private BaseEnumType locateEnumStatus(int index){
        for(BaseEnumType type : enums){
            if(type.getIndex() == index){
                return type;
            }
        }
        return null;
    }
}

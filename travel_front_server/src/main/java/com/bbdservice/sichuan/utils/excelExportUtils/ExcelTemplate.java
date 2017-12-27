/**
 * Copyright (c) 2008-2013 by DHCC
 * All rights reserved.
 */

package com.bbdservice.sichuan.utils.excelExportUtils;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 该类实现了基于模板的导出
 * 如果要导出序号，需要在excel中定义一个标识为sernums
 * 如果要替换信息，需要传入一个Map，这个map中存储着要替换信息的值，在excel中通过#来开头
 * 要从哪一行那一列开始替换需要定义一个标识为datas
 * 如果要设定相应的样式，可以在该行使用styles完成设定，此时所有此行都使用该样式
 * 如果使用defaultStyls作为表示，表示默认样式，如果没有defaultStyles使用datas行作为默认样式
 * 
 * @author <a href="mailto:zhangyanyu@dhcc.com.cn">zhangyanyu</a>
 * @date 2013-7-18
 */
public class ExcelTemplate {
    /**
     * 数据行标识
     */
    public static final String DATA_LINE = "datas";
    /**
     * 默认样式标识
     */
    public static final String DEFAULT_STYLE = "defaultStyle";  //默认样式
    /**
     * 列样式标识
     */
    public static final String STYLE = "styles";  //样式
    /**
     * 插入序号标识
     */
    public static final String SER_NUM = "sernums";  //序号
    private static ExcelTemplate et = new ExcelTemplate();
    private Workbook wb;
    private Sheet sheet;
    private int initColIndex;//数据的初始化列数 
    private int initRowIndex;//数据的初始化行数
    private int curColIndex;//当前列数
    private int curRowIndex;//当前行数
    private Row curRow;//当前行对象
    private int lastRowIndex;//最后一行的行数
    private CellStyle defaultStyle;//默认样式
    private float rowHeight;//默认行高
    //存储每一列所对应的样式
    private Map<Integer,CellStyle> styles = new HashMap<Integer,CellStyle>();
    
    private int serColIndex;//序号的列
    
    private ExcelTemplate(){
        
    }
    public static ExcelTemplate getInstance(){
        return et;
    }

    public Workbook getWb() {
        return wb;
    }

    /**
     * 从classpath路径下读取相应的模板文件
     * @param path
     * @return
     */
    public ExcelTemplate readTemplateByClasspath(String path){
        try {
            wb = WorkbookFactory.create(ExcelTemplate.class.getResourceAsStream(path));
            initTemplate();
        } catch (InvalidFormatException e) {
            throw new RuntimeException("读取模板格式有错，请检查");
        } catch (IOException e) {
            throw new RuntimeException("读取模板不存在，请检查");
        }
        return this;
    }

    /**
     * 从classpath路径下读取相应的模板文件
     * @param path
     * @return
     */
    public ExcelTemplate readTemplateByClasspath(String path,int sheetNum){
        try {
            wb = WorkbookFactory.create(ExcelTemplate.class.getResourceAsStream(path));
            initTemplate(sheetNum);
        } catch (InvalidFormatException e) {
            throw new RuntimeException("读取模板格式有错，请检查");
        } catch (IOException e) {
            throw new RuntimeException("读取模板不存在，请检查");
        }
        return this;
    }

    /**
     * 从某个路径来读取模板
     * @param path
     * @return
     */
    public ExcelTemplate readTemplateByPath(String path){
        try {
            wb = WorkbookFactory.create(new File(path));
            initTemplate();
        } catch (InvalidFormatException e) {
            throw new RuntimeException("读取模板格式有错，请检查");
        } catch (IOException e) {
            throw new RuntimeException("读取模板不存在，请检查");
        }
        return this;
    }

    /**
     * 从某个路径来读取模板
     * @param path
     * @return
     */
    public ExcelTemplate readTemplateByPath(String path, int sheetNum){
        try {
            wb = WorkbookFactory.create(new File(path));
            initTemplate(sheetNum);
        } catch (InvalidFormatException e) {
            throw new RuntimeException("读取模板格式有错，请检查");
        } catch (IOException e) {
            throw new RuntimeException("读取模板不存在，请检查");
        }
        return this;
    }

    /**
     * 将文件写到相应的路径下
     * @param filePath
     */
    public void writeToFile(String filePath){
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(filePath);
            wb.write(fos);
        } catch (FileNotFoundException e) {
            throw new RuntimeException("写入的文件不存在");
        } catch (IOException e) {
            throw new RuntimeException("写入数据失败"+e.getMessage());
        } finally{
            try {
                if(fos!=null) fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * 创建相应的元素，基于String类型
     * @param value
     */
    public void createCell(String value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue(value);
        curColIndex++;
    }
    public void createCell(int value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue((int)value);
        curColIndex++;
    }
    public void createCell(Date value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue(value);
        curColIndex++;
    }
    public void createCell(double value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue(value);
        curColIndex++;
    }
    public void createCell(boolean value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue(value);
        curColIndex++;
    }
    
    public void createCell(Calendar value) {
        Cell c = curRow.createCell(curColIndex);
        setCellStyle(c);
        c.setCellValue(value);
        curColIndex++;
    }
    
    /**
     * 设置某个元素的样式
     * @param c
     */
    private void setCellStyle(Cell c){
        if(styles.containsKey(curColIndex)) {
            c.setCellStyle(styles.get(curColIndex));
        } else {
            c.setCellStyle(defaultStyle);
        }
    }

    /**
     * 创建新行，在使用时只要添加完一行，需要调用该方法创建
     */
    public void createNewRow(){
        if(lastRowIndex > curRowIndex&&curRowIndex!=initRowIndex){
            sheet.shiftRows(curRowIndex, lastRowIndex, 1, true, true);//从当前行到最后一行往下移一行
            lastRowIndex ++;
        }
        curRow = sheet.createRow(curRowIndex);
        curRow.setHeightInPoints(rowHeight);
        curRowIndex++;
        curColIndex = initColIndex;
    }
    
    /**
     * 插入序号，会自动找相应的序号标识的位置完成插入
     */
    public void insertSer(){
        int index = 1;
        Row row = null;
        Cell c = null;
        for(int i=initRowIndex;i<curRowIndex;i++){
            row = sheet.getRow(i);
            c = row.createCell(serColIndex);
            setCellStyle(c);
            c.setCellValue(index++);
        }
    }
    
    /**
     * 根据map替换相应的常量，通过Map中的值来替换#开头的值
     */
    public void replaceFinalData(Map<String, String> datas){
        if(datas==null) return;
        for(Row row : sheet){
            for(Cell c : row){
                if(c.getCellType()!=Cell.CELL_TYPE_STRING) continue;
                String str = c.getStringCellValue().trim();
                if(str.startsWith("#")){
                    if(datas.containsKey(str.substring(1))){
                        c.setCellValue(datas.get(str.substring(1))); 
                    }
                }
            }
        }
    }

    /**
     * 根据map替换相应的常量，通过Map中的值来替换#开头的值
     */
    public void replaceKeyWord(Map<String, String> datas){
        if(datas==null) return;
        for(Row row : sheet){
            for(Cell c : row){
                if(c.getCellType()!=Cell.CELL_TYPE_STRING) continue;

                String str = c.getStringCellValue().trim();
                if(str.contains("{{")&&str.contains("}}")){
                    for(String key: datas.keySet()){
                        if(str.contains(key)){
                            str= str.replace("{{"+key+"}}",datas.get(key));
                        }
                    }

                    c.setCellValue(str);




                   /* String key = str.substring(str.indexOf("{{")+2,str.lastIndexOf("}}"));
                    if(datas.containsKey(key)){
                        String value = datas.get(key);
                        String ret = str.replace("{{","").replace("}}","").replace(key,value);
                        c.setCellValue(ret);
                    }*/
                }
            }
        }
    }

    /**
     * 初始化模板
     */
    private void initTemplate(){
        sheet = wb.getSheetAt(0);
        initConfigData();
        lastRowIndex = sheet.getLastRowNum();
        curRow = sheet.createRow(curRowIndex);
    }
    /**
     * 初始化模板
     */
    private void initTemplate(int sheetNum){
        sheet = wb.getSheetAt(sheetNum - 1);
        initConfigData();
        lastRowIndex = sheet.getLastRowNum();
        curRow = sheet.createRow(curRowIndex);
    }
    
    /**
     * 初始化数据信息
     */
    private void initConfigData() {
        boolean findData = false;
        boolean findSer = false;
        for(Row row : sheet){
            if(findData) break;
            for(Cell c : row){
                if(c.getCellType()!=Cell.CELL_TYPE_STRING) continue;
                String str = c.getStringCellValue().trim();
                if(str.equals(SER_NUM)){
                    serColIndex = c.getColumnIndex();
                    findSer = true;
                }
                if(str.equals(DATA_LINE)){
                    initColIndex = c.getColumnIndex();
                    initRowIndex = row.getRowNum();
                    curColIndex = initColIndex;
                    curRowIndex = initRowIndex;
                    defaultStyle = c.getCellStyle();
                    rowHeight = row.getHeightInPoints();
                    initStyles();
                    findData = true;
                    break;
                }
            }
            if(!findSer){
                initSer();
            }
        }
        System.out.println(curRowIndex+"行--"+curColIndex+"列");
    }
    
    /**
     * 初始化序号位置
     */
    private void initSer(){
        for(Row row : sheet){
            for(Cell c : row){
                if(c.getCellType()!=Cell.CELL_TYPE_STRING) continue;
                String str = c.getStringCellValue().trim();
                if(str.equals(SER_NUM)){
                    serColIndex = c.getColumnIndex();
                }
            }
        }
    }
    
    /**
     * 初始化样式信息
     */
    private void initStyles() {
        for(Row row : sheet){
            for(Cell c : row){
                if(c.getCellType()!=Cell.CELL_TYPE_STRING) continue;
                String str = c.getStringCellValue().trim();
                if(str.equals(DEFAULT_STYLE)){
                    defaultStyle = c.getCellStyle();
                }
                if(str.equals(STYLE)){
                    styles.put(c.getColumnIndex(), c.getCellStyle());
                }
            }
        }
    }
    
}

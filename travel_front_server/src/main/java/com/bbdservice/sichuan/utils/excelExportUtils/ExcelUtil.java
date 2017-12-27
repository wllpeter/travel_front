/**
 * Copyright (c) 2008-2013 by DHCC
 * All rights reserved.
 */

package com.bbdservice.sichuan.utils.excelExportUtils;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

/**
 * 该类实现了将一组对象转换为Excel表格，并且可以从Excel表格中读取到一组List对象中
 * 该类利用了BeanUtils框架中的反射完成
 * 使用该类的前提，在相应的实体对象上通过ExcelReources来完成相应的注解
 *
 * @author <a href="mailto:zhangyanyu@dhcc.com.cn">zhangyanyu</a>
 * @date 2013-7-18
 */
@Component
public class ExcelUtil {
    @Value("${excel.output.path}")
    private String excelOutputPath;

    @Value("${excel.template.path}")
    private String excelTemplate;


    private static String excelPath;

    private static String excelTemplatePath;

    @PostConstruct
    public void init() {
        excelPath = excelOutputPath;
        excelTemplatePath = excelTemplate;
    }

    private static ExcelUtil eu = new ExcelUtil();

    private ExcelUtil() {
    }

    public static ExcelUtil getInstance() {
        return eu;
    }

    /**
     * 将对象转换为Excel并且导出，该方法是基于模板的导出，导出到一个具体的路径中
     *
     * @param datas        模板中的替换的常量数据
     * @param templateName 模板路径
     * @param fileName     文件名称
     * @param objs         对象列表
     * @param clz          对象的类型
     */
    public void exportObj2ExcelByTemplate(Map<String, String> datas, String templateName, String fileName, List<?> objs, Class<?> clz) throws SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, IllegalAccessException, InvocationTargetException {
        ExcelTemplate et = ExcelTemplate.getInstance();
        String templatePath = excelTemplatePath.concat("/").concat(templateName);
        et.readTemplateByClasspath(templatePath);
        List<ExcelHeader> headers = getHeaderList(clz);
        Collections.sort(headers);
        //输出标题
        et.createNewRow();
        for (ExcelHeader eh : headers) {
            et.createCell(eh.getTitle());
        }
        //输出值
        for (Object obj : objs) {
            et.createNewRow();
            for (ExcelHeader eh : headers) {
                et.createCell(BeanUtils.getProperty(obj, getMethodName(eh)));
            }
        }
        String path = createFile(fileName);
        et.replaceFinalData(datas);
        et.writeToFile(path);
    }

    /**
     * 导出对象到Excel，不是基于模板的，直接新建一个Excel完成导出，基于路径的导出
     *
     * @param objs     对象列表
     * @param clz      指定的类
     * @param isXssf   是否是2007版本
     */
    public Workbook exportObj2Excel(List<?> objs, Class<?> clz, boolean isXssf) throws SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, IllegalAccessException, InvocationTargetException, IOException {
        Workbook wb = null;
        if (isXssf) {
            wb = new XSSFWorkbook();
        } else {
            wb = new HSSFWorkbook();
        }
        Sheet sheet = wb.createSheet();
        Row r = sheet.createRow(0);
        List<ExcelHeader> headers = getHeaderList(clz);
        Collections.sort(headers);
        //写标题
        for (int i = 0; i < headers.size(); i++) {
            r.createCell(i).setCellValue(headers.get(i).getTitle());
        }
        //写数据
        Object obj = null;
        for (int i = 0; i < objs.size(); i++) {
            r = sheet.createRow(i + 1);
            obj = objs.get(i);
            for (int j = 0; j < headers.size(); j++) {
                r.createCell(j).setCellValue(BeanUtils.getProperty(obj, getMethodName(headers.get(j))));
            }
        }
        return wb;
    }

    /**
     * 根据标题获取相应的方法名称
     *
     * @param eh
     * @return
     */
    private String getMethodName(ExcelHeader eh) {
        String mn = eh.getMethodName().substring(3);
        mn = mn.substring(0, 1).toLowerCase() + mn.substring(1);
        return mn;
    }

    /**
     * 得到指定类的ExcelHeader集合
     *
     * @param clz 指定的类
     */
    private List<ExcelHeader> getHeaderList(Class<?> clz) {
        List<ExcelHeader> headers = new ArrayList<ExcelHeader>();
        for (Method m : clz.getDeclaredMethods()) {
            if (m.getName().startsWith("get")) {
                if (m.isAnnotationPresent(ExcelResources.class)) {
                    ExcelResources er = m.getAnnotation(ExcelResources.class);
                    headers.add(new ExcelHeader(er.title(), er.order(), m.getName()));
                }
            }
        }
        return headers;
    }

    /**
     * 从类路径读取相应的Excel文件到对象列表
     *
     * @param path     类路径下的path
     * @param clz      指定类
     * @param readLine 开始行，这里是标题所在行
     * @param tailLine 底部有多少行，在读入对象时，会减去这些行
     * @return
     */
    public List<Object> readExcel2ObjsByClasspath(String path, Class<?> clz, int readLine, int tailLine) throws InvalidFormatException, IOException, InstantiationException, IllegalAccessException, SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, InvocationTargetException {
        Workbook wb = null;
        wb = WorkbookFactory.create(ExcelUtil.class.getResourceAsStream(path));
        return handlerExcel2Objs(wb, clz, readLine, tailLine);
    }

    /**
     * 从文件路径读取相应的Excel文件到对象列表
     *
     * @param path     文件路径下的path
     * @param clz      对象类型
     * @param readLine 开始行，注意是标题所在行
     * @param tailLine 底部有多少行，在读入对象时，会减去这些行
     * @return
     */
    public List<Object> readExcel2ObjsByPath(String path, Class<?> clz, int readLine, int tailLine) throws InvalidFormatException, IOException, InstantiationException, IllegalAccessException, SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, InvocationTargetException {
        Workbook wb = null;
        wb = WorkbookFactory.create(new File(path));
        return handlerExcel2Objs(wb, clz, readLine, tailLine);
    }

    /**
     * 得到Excel里的对象集合
     *
     * @param wb       Excel工作簿对象
     * @param clz      指定对象
     * @param readLine 开始行，注意是标题所在行
     * @param tailLine 底部有多少行，在读入对象时，会减去这些行
     * @return
     */
    public List<Object> handlerExcel2Objs(Workbook wb, Class<?> clz, int readLine, int tailLine) throws InstantiationException, IllegalAccessException, SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, InvocationTargetException {
        Sheet sheet = wb.getSheetAt(0);
        Row row = sheet.getRow(readLine);
        List<Object> objs = new ArrayList<Object>();
        Map<Integer, String> maps = getHeaderMap(row, clz);
        if (maps == null || maps.size() <= 0) {
            throw new RuntimeException("要读取的Excel的格式不正确，检查是否设定了合适的行");
        }
        Object obj = null;
        for (int i = readLine + 1; i <= sheet.getLastRowNum() - tailLine; i++) {
            row = sheet.getRow(i);
            obj = clz.newInstance();
            for (Cell c : row) {
                int ci = c.getColumnIndex();
                String mn = maps.get(ci).substring(3);
                mn = mn.substring(0, 1).toLowerCase() + mn.substring(1);
                BeanUtils.copyProperty(obj, mn, this.getCellValue(c));
            }
            objs.add(obj);
        }
        return objs;
    }

    /**
     * 将数组转换为Excel并且导出，该方法是基于模板的导出，导出到一个具体的路径中
     *
     * @param replaceDatas 模板中的替换的常量数据
     * @param sheetIndex   表单编号
     * @param templateName 模板名称
     * @param rowDatas     对象列表
     */
    public Workbook exportListExcelByTemplate(String templateName, int sheetIndex, Map<String, String> replaceDatas, List<List<Object>> rowDatas) throws SecurityException, IllegalArgumentException, NoSuchMethodException, ClassNotFoundException, IllegalAccessException, InvocationTargetException {
        if (rowDatas.size() > 65500) {
            throw new RuntimeException("row size is too big");
        }
        String templatePath = excelTemplatePath.concat("/").concat(templateName);
        ExcelTemplate et = ExcelTemplate.getInstance();
        et.readTemplateByClasspath(templatePath, sheetIndex);
        int i = 0;
        for (List<Object> colDatas : rowDatas) {
            i++;
            System.out.println(i);
            et.createNewRow();
            for (Object object : colDatas) {
                et.createCell(String.valueOf(object));
                continue;
            }
        }
        et.replaceFinalData(replaceDatas);
        et.replaceKeyWord(replaceDatas);
        return et.getWb();
    }

    /**
     * 得到标题所在列数和对应方法名的Map对象
     *
     * @param titleRow 标题行
     * @param clz      指定类
     */
    private Map<Integer, String> getHeaderMap(Row titleRow, Class<?> clz) {
        List<ExcelHeader> headers = getHeaderList(clz);
        Map<Integer, String> maps = new HashMap<Integer, String>();
        for (Cell c : titleRow) {
            String title = c.getStringCellValue();
            for (ExcelHeader eh : headers) {
                if (eh.getTitle().equals(title)) {
                    maps.put(c.getColumnIndex(), eh.getMethodName().replace("get", "set"));
                    break;
                }
            }
        }
        return maps;
    }

    /**
     * 把单元格中的数据转化为String类型
     *
     * @param c 单元格
     */
    private String getCellValue(Cell c) {
        String o = null;
        switch (c.getCellType()) {
            case Cell.CELL_TYPE_BLANK:
                o = "";
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                o = String.valueOf(c.getBooleanCellValue());
                break;
            case Cell.CELL_TYPE_FORMULA:
                o = String.valueOf(c.getCellFormula());
                break;
            case Cell.CELL_TYPE_NUMERIC:
                o = String.valueOf(c.getNumericCellValue());
                break;
            case Cell.CELL_TYPE_STRING:
                o = c.getStringCellValue();
                break;
            default:
                o = null;
                break;
        }
        return o;
    }

    /**
     * 将byte输出至response
     */
    public void export2Response(Workbook workbook, String fileName, HttpServletResponse response) {
        try {
            response.reset();
            response.setCharacterEncoding("utf-8");
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + new String((fileName + ".xls").getBytes("GBK"), "iso-8859-1"));
            response.setContentType("application/octet-stream");
            OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
            workbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 将excel输出至本地路径
     */
    public void export2Path(Workbook workbook, String fileName) {
        File dir = new File(excelPath);
        //路径不存在则创建
        if (!dir.exists() || !(dir.isDirectory())) {
            dir.mkdir();
        }
        String filePath = excelPath.concat("/").concat(fileName).concat(".xls");
        File file = new File(filePath);
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file);
            workbook.write(out);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            //关闭流
            if (null != out) {
                try {
                    out.flush();
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public String createFile(String fileName) {
        String path = excelPath.concat("/").concat(fileName).concat(".xls");
        File file = new File(path);
        if (!file.exists()) {
            file.getParentFile().mkdirs();
        }
        try {
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }
}

package com.bbdservice.sichuan.utils.excelExportUtils;

import org.apache.poi.ss.usermodel.Workbook;

import java.lang.reflect.InvocationTargetException;
import java.util.*;

public class TempController {
    public static void main(String[] args){
        Long startTime = System.currentTimeMillis();
        ExcelUtil excelUtil = ExcelUtil.getInstance();
        Map<String,String> replaceDatas = new HashMap<String, String>();
        replaceDatas.put("year","2017");
        replaceDatas.put("company","安链数据");
        List<Object> colDatas = null;
        List<List<Object>> datas = new LinkedList<List<Object>>();
        for(int i=0;i<65;i++){
            System.out.println(i);
            colDatas = new LinkedList<Object>();
            colDatas.add("郑州");
            colDatas.add(new Random().nextInt(10000)+1);
            colDatas.add(new Random().nextInt(10000)+1);
            colDatas.add(new Random().nextInt(10000)+1);
            colDatas.add(new Random().nextInt(10000)+1);
            datas.add(colDatas);
            continue;
        }
        System.out.print("模拟数据完成");
        try {
            Workbook wb = excelUtil.exportListExcelByTemplate("temp.xls",1,replaceDatas,datas);
            excelUtil.export2Path(wb,"fffffffff");
            Long endTime = System.currentTimeMillis();
            System.out.println(endTime-startTime);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
//        TemplateExportParams params = new TemplateExportParams("/temp.xls");
//        Map<String,Object> map = new HashMap();
//        map.put("id","1");
//        map.put("count","222");
//        map.put("caseCount","333");
//        List<Map<String,Object>> mapList = new ArrayList<Map<String, Object>>();
//        mapList.add(map);
//        mapList.add(map);mapList.add(map);mapList.add(map);mapList.add(map);
//        Map<String,Object> ret = new HashMap();
//        ret.put("mapList",mapList);
//        Workbook workbook = ExcelExportUtil.exportExcel(params,ret);
//        File savefile = new File("D:/excel/");
//        if (!savefile.exists()) {
//            savefile.mkdirs();
//        }
//        try {
//            FileOutputStream fos = new FileOutputStream("D:/excel/专项支出用款申请书_map.xls");
//            workbook.write(fos);
//            fos.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
}

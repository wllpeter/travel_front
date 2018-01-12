package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.PdfDO;
import com.bbdservice.sichuan.service.ReportService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.hibernate.result.Outputs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@RestController
@RequestMapping(value = "/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/getPdfListByType")
    @ApiOperation(value = "根据类型展示所有文件", notes = "届时")
    @ApiImplicitParam(name = "type", value = "类型", defaultValue = "0", paramType = "query", dataType = "Integer")
    public Response getListByType(Integer type) {
        List<PdfDO> list = reportService.getPdfList(type);
        return Response.success(list);
    }

    @GetMapping("/out")
    @ApiOperation(value = "得到文件流")
    @ApiImplicitParam(name = "id", value = "id", defaultValue = "40", paramType = "query", dataType = "Long")
    public void getOutPut(Long id, HttpServletResponse response) throws IOException {
        PdfDO p = reportService.getPdfLiu(id);
        File file=new File(p.getAddress());
        InputStream in = new FileInputStream(file);
        byte[] by = new byte[(int)file .length()];
        try {
            InputStream is = new FileInputStream(file);
            ByteArrayOutputStream bytestream = new ByteArrayOutputStream();
            byte[] bb = new byte[2048];
            int ch;
            ch = is.read(bb);
            while (ch != -1) {
                bytestream.write(bb, 0, ch);
                ch = is.read(bb);
            }
            by = bytestream.toByteArray();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
      //  return Response.success(by);
        response.setHeader("Content-Type","application/pdf");//设置响应的媒体类型，这样浏览器会识别出响应的是图片
        response.getOutputStream().write(by);
        response.flushBuffer();
//        //照片存储在网盘中，获取页面传来的照片ID
//
//        //从网盘下载照片的流
//        InputStream in = new FileInputStream(p.getAddress());
//
//        BufferedOutputStream bout = new BufferedOutputStream(response.getOutputStream());
//        //从输入流到输出流
//        try {
//            byte b[] = new byte[1024];
//            int len = in.read(b);
//            while (len > 0) {
//                bout.write(b, 0, len);
//                len = in.read(b);
//                System.out.println(len);
//            }
//        } catch (Exception e) {
//            throw e;
//        } finally {
//            bout.close();
//            in.close();
//        }
//        return Response.success(bout);
    }


}

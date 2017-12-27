package com.bbdservice.songshan;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

public class ReportServerApplicationTests {

	@Test
	public void contextLoads() {
        String s="123456aaa";
        s=s.replaceAll("a","b");
        System.out.println(s);
    }

}

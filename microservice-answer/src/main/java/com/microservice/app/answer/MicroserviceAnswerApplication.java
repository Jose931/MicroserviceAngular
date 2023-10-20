package com.microservice.app.answer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
@EntityScan({"com.microservice.app.answer.models.entity", 
	"com.microservice.commons.users.models.entity",
	"com.microservice.commons.exams.models.entity"})
public class MicroserviceAnswerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceAnswerApplication.class, args);
	}

}

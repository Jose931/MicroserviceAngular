package com.microservice.app.exams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceExamsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceExamsApplication.class, args);
	}

}

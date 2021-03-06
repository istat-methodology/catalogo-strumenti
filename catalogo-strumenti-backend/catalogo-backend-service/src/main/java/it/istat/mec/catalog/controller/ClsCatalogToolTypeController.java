package it.istat.mec.catalog.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.istat.mec.catalog.dto.ToolTypeDto;
import it.istat.mec.catalog.service.ClsToolTypeService;


@RestController
@RequestMapping("/catalog")
public class ClsCatalogToolTypeController {

	@Autowired
	private ClsToolTypeService service;
	
	@GetMapping("/open/tool-types")
	public List<ToolTypeDto> getAll() {

		 return service.findAll();
	}
	 
}


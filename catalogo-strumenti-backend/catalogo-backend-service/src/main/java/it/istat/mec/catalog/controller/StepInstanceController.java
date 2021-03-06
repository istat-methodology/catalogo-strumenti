package it.istat.mec.catalog.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.istat.mec.catalog.dto.StepInstanceDto;
import it.istat.mec.catalog.dto.StepInstanceInverseDto;
import it.istat.mec.catalog.request.CreateStepInstanceRequest;
import it.istat.mec.catalog.service.StepInstanceService;


@RestController
@RequestMapping("/catalog")
public class StepInstanceController {

	@Autowired
	private StepInstanceService stepInstanceService;
	
	@GetMapping("/open/stepinstances")
	public List<StepInstanceDto> getAllStepInstances() {

		return stepInstanceService.findAllStepInstances();
	}
	
	@GetMapping("/open/step-instances/app-service/{id}")
	public List<StepInstanceInverseDto> getStepInstancesByAppService(@PathVariable("id") Integer id) {

		return stepInstanceService.findStepInstancesByAppService(id);
	}
	
	@GetMapping(value = "/open/stepinstances/{id}")
	public StepInstanceDto getStepInstance(@PathVariable("id") Integer id) {

		return stepInstanceService.findStepInstanceById(id);

	}
	
	@PostMapping("/stepinstances")
	public StepInstanceDto create(@RequestBody CreateStepInstanceRequest request) {

		return stepInstanceService.newStepInstance(request);
	}
	
	@PutMapping(value = "/stepinstances/{id}")
	public StepInstanceDto updateStepInstance(@RequestBody CreateStepInstanceRequest request) {
		
		return stepInstanceService.updateStepInstance(request);
	}
	
	@DeleteMapping(value = "/stepinstances/{id}")
	public StepInstanceDto deleteStepInstance(@PathVariable("id") Integer id) {

		return stepInstanceService.deleteStepInstance(id);
	}
 
}



package it.istat.mec.catalog.dto;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CatalogToolMiniDto implements Serializable {

 
	private static final long serialVersionUID = -6905546979001303372L;
	private Integer id;	
	private Date releaseDate;	
	private String description;		
	private String name;	
	private Integer standardIstat;	
	private String tags;	
	private String version;
	private ToolTypeDto toolType;	
	private Date lastUpdate;	
	private String requirements;	
	private List<GSBPMProcessMiniDto> gsbpmProcesses;
	private List<StatisticalMethodDto> statisticalMethods;
	private List<LinkAgentToolDto> linkAgentsTools;
	private List<DocumentationDto> documentations;	 
	
	
}

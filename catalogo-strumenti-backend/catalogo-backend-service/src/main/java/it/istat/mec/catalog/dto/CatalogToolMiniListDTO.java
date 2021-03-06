package it.istat.mec.catalog.dto;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CatalogToolMiniListDTO implements Serializable {

 
	private static final long serialVersionUID = -6905546979001300372L;
	
	private Integer id;	
 
	private Date releaseDate;	
	private String description;		
	private String name;	
	private Integer standardIstat;	
	private String tags;	
	private String version;
	private ToolTypeDto toolType;	
 
	private String lastUpdate;
	private String requirements;
	private BusinessServiceMiniDto businessService;
	private List<GSBPMProcessMiniDto> gsbpmProcesses;
	private List<BaseDto> statisticalMethods;
}

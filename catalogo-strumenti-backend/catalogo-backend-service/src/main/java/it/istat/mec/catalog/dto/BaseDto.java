package it.istat.mec.catalog.dto;
import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseDto implements Serializable {
	
	private static final long serialVersionUID = -1613571770971506155L;
	
	private Integer id;	
	private String name;	
}

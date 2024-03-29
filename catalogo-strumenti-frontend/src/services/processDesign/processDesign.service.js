import { axiosCatalog } from "@/http";
import AbstractService from "@/services/abstract.service";

class ProcessDesignService extends AbstractService {
  constructor(endpoint) {
    super(endpoint);
  }
  save(payload) {
    //console.log(config);
    console.log(payload);
    return axiosCatalog
      .post(this.endpoint, payload)
      .then(res => {
        var data = res.data ? res.data : {};
        console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}
export const processDesignService = new ProcessDesignService(
  "/catalog/process-designes"
);
export const processDesignOpenService = new ProcessDesignService(
  "/catalog/open/process-designes"
);
export const processDesignByProcessStepOpenService = new ProcessDesignService(
  "/catalog/open/process-designes/process-step"
);



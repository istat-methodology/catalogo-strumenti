import { axiosCatalog } from "@/http";
import AbstractService from "@/services/abstract.service";

class BusinessServiceService extends AbstractService {
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
export const businessServiceService = new BusinessServiceService(
  "/catalog/businessservices"
);
export const businessOpenServiceService = new BusinessServiceService(
  "/catalog/open/businessservices"
);

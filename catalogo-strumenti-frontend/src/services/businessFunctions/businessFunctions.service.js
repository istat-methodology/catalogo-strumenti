import { axiosCatalog } from "@/http";
import AbstractService from "@/services/abstract.service";

class BusinessFunctionsService extends AbstractService {
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
  filter(payload) {
    console.log(payload);
    //var gsbpmParam = new URLSearchParams();
    //var typeParam = new URLSearchParams();
    var params = new URLSearchParams();
    if (payload.gsbpm) {
      payload.gsbpm.map(value => {
        params.append("gsbpmIds", value);
      });
    }
    /* if (payload.type) {
      payload.type.map(value => {
        params.append("type", value);
      });
    } */
    var request = {
      params: params
    };
    return axiosCatalog
      .get(this.endpoint, request)
      .then(res => {
        var data = res.data ? res.data : {};
        return data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  findBFunctionsByBService(id) {    
    return axiosCatalog
      .get(this.endpoint + "/business-service/" + id)
      .then(res => {
        var data = res.data ? res.data : {};

        return data;
      })
      .catch(err => {
        throw err;
      });
  }
  addProcess(fID, pID) {

    return axiosCatalog
      .put(this.endpoint + "/" + fID + "/processes/" + pID)
      .then(res => {
        var data = res.data ? res.data : [];
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
  removeProcess(fID, pID) {
    return axiosCatalog
      .delete(this.endpoint + "/" + fID + "/processes/" + pID)
      .then(res => {
        var data = res.data ? res.data : [];
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}

export const businessService = new BusinessFunctionsService(
  "/catalog/businessfunctions"
);
export const businessOpenService = new BusinessFunctionsService(
  "/catalog/open/businessfunctions"
);

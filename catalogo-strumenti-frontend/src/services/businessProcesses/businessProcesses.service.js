import { axiosCatalog } from "@/http";
import AbstractService from "@/services/abstract.service";

class BusinessProcessService extends AbstractService {
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
  addStep(idProcess, idStep) {
    return axiosCatalog
      .put(this.endpoint + "/" + idProcess + "/steps/" + idStep)
      .then(res => {
        var data = res.data ? res.data : [];

        return data;
      })
      .catch(err => {
        throw err;
      });
  }
  removeStep(idProcess, idStep) {
    return axiosCatalog
      .delete(this.endpoint + "/" + idProcess + "/steps/" + idStep)
      .then(res => {
        var data = res.data ? res.data : [];

        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}

export const businessProcessService = new BusinessProcessService(
  "/catalog/businessprocesses"
);
export const businessProcessOpenService = new BusinessProcessService(
  "/catalog/open/businessprocesses"
);
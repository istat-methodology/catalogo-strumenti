<template>
  <div>
    <div v-if="bProcessLocal">
      <div class="card">
        <div class="row">
          <CInput
            class="col-6"
            label="Nome*"
            placeholder="Nome"
            v-model="bProcessLocal.name"
          />
          <CInput
            class="col-4"
            label="Etichetta"
            placeholder="Etichetta"
            v-model="bProcessLocal.label"
          />
          <CInput
            class="col-2"
            label="Ordine"
            type="number"
            placeholder="Ordine"
            v-model="bProcessLocal.orderCode"
          />
        </div>
        <CTextarea
          label="Descrizione"
          placeholder="Descrizione"
          v-model="bProcessLocal.descr"
        />
      </div>

      <span
        v-if="
          bProcessLocal.processSteps && bProcessLocal.processSteps.length > 0
        "
      >
        <strong>Passi:</strong>
        <span class="icon-link float-right" @click="handleNewStep()"
          ><add-icon />Nuovo Passo</span
        >

        <CCardBody>
          <CDataTable
            v-if="bProcessLocal"
            :items="getProcessStepsList()"
            :fields="fields"
            :items-per-page="10"
            hover
            pagination
            ><template #show_details="{ item }">
              <td>
                <span class="icon-link" @click="handleEditStep(item)"
                  ><edit-icon title="Edit"
                /></span>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </span>
      <span v-else>Non sono presenti passi</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "BusinessProcessEdit",
  data() {
    return {
      fields: [
        {
          key: "index",
          label: "#",
          _style: "width:1%;"
        },
        {
          key: "name",
          label: "Nome",
          _style: "width:20%;"
        },

        {
          key: "tool",
          label: "Strumento",
          _style: "width:40%;"
        },
        {
          key: "stepInstances",
          label: "Funzione",
          _style: "width:40%;"
        },
        {
          key: "show_details",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ],
      bProcessLocal: {},
      states: [],
      FormState: {},
      stateform: 0,
      warningModal: false
    };
  },
  computed: {},
  emits: ["enableEditStep", "enableNewStep"],

  props: {
    bProcess: {
      type: Object,
      required: true,
      default: () => []
    }
  },
  methods: {
    getProcessStepsList: function() {
      if (this.bProcessLocal && this.bProcessLocal.processSteps) {
        return this.bProcessLocal.processSteps.map((step, index) => {
          return {
            id: step.id,
            index: index + 1,
            name: step.name == null ? "" : step.name,
            label: step.label == null ? "" : step.label,
            tool: step.businessService == null ? "" : step.businessService.name,
            stepInstances:
              step.stepInstances == null
                ? ""
                : step.stepInstances
                    .map(instance => {
                      return (
                        instance.functionality + " (" + instance.method + ")"
                      );
                    })
                    .join(", "),
            processDesigns: step.processDesigns
          };
        });
      } else {
        return [];
      }
    },
    handleSubmit() {
      this.stateform = this.FormState.LIST;
    },
    handleEditStep(step) {
      this.$emit("enableEditStep", step);
    },
    handleNewStep() {
      this.$emit("enableNewStep");
    },
    goBack() {
      this.$router.push("/catalogue/businessFunctions");
    },
    deleteBProcess() {
      this.warningModal = false;
    },

    modalOpen(app) {
      this.selectedBProcess = app;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.bProcessLocal = this.bProcess;
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
  box-shadow: none !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.material-design-icon {
  margin-bottom: 0.2rem;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 12px;
  text-align: left;
  background-color: #f1f1f1;
  margin-left: 5px;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>

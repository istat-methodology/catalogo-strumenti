<template>
  <!-- wait until service is loaded -->
  <div>
    <div class="row justify-content-between">
      <div class="col-4">Nuova Associazione > Nuovo referente</div>
      <div class="col-4">
        <span class="icon-link" @click.prevent="handleSubmit" title="Salva">
          <floppy-icon title="Salva" />
        </span>

        <span class="icon-link" @click.prevent="goBack(false)" title="Chiudi">
          <close-circle-icon title="Chiudi" />
        </span>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <CInput
          label="Nome"
          placeholder="Nome"
          v-model="agentLocal.name"
          :class="{ 'is-invalid': $v.agentLocal.name.$error }"
        />
        <div class="help-block" :class="{ show: $v.agentLocal.name.$error }">
          Campo obbligatorio
        </div>
        />
        <CInput
          label="Organizzazione"
          placeholder="Organizzazione"
          v-model="agentLocal.organization"
        />
        <CInput
          label="Contatto"
          placeholder="Contatto"
          v-model="agentLocal.contact"
        />

        <!--CInput label="Note" placeholder="Note" v-model="agentLocal.notes" /-->

        <CTextarea label="Note" placeholder="Note" v-model="agentLocal.notes" />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
//import { mapGetters } from "vuex";
export default {
  name: "AgentAdd",
  data() {
    return {
      agentLocal: {
        id: 0,
        name: "",
        organization: "",
        contact: "",
        notes: ""
      }
    };
  },
  emits: ["appClose"],
  props: {
    goBackClose: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  validations: {
    businessFunctionLocal: {
      name: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.agentLocal.$invalid) {
        this.$store
          .dispatch("agent/save", this.agentLocal)
          .then(this.$store.dispatch("agent/findAll"))
          .then(this.goBack(true));
      }
    },
    goBack(saved) {
      if (this.goBackClose) this.$emit("appClose", saved);
      else this.$router.push("/catalogue/referenti");
    },
    onChange(event) {
      this.tipologia = event.target.value;
    }
  },
  created() {
    this.$store.dispatch("agent/findAll");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 50%;
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
h2 {
  font-size: 24px;
  color: #213547;
  margin-top: 10px !important;
  transition: color 0.5s;
  padding-top: 26px;
}
</style>

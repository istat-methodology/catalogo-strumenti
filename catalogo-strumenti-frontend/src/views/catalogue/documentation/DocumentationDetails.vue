<template>
  <!-- wait until service is loaded -->
  <div class="row" v-if="documentation">
    <div class="col-8">
      <div id="id-main" />
      <div
        @mouseover="setActiveItemList('#id-link-main', true)"
        @mouseleave="setActiveItemList('#id-link-main', false)"
      >
        <div class="p-2">
          <h2 class="pt-4">
            {{ documentation.name | dashEmpty
            }}<span class="float-right">
              <router-link
                v-if="isAuthenticated"
                tag="a"
                :to="{
                  name: 'DocumentationEdit',
                  params: { id: documentation.id },
                }"
                class="icon-prop"
              >
                <edit-icon />
              </router-link>
            </span>
          </h2>
          <div class="row">
            <!-- <div class="card col-md-auto p-2">
                  <span><strong>Nome</strong></span>
                  <div class="card-slot  p-2">
                    <span>{{ documentation.name | dashEmpty }}</span>
                  </div>
                </div> -->

            <div class="card col-md-auto p-2">
              <span><strong>Editore</strong></span>
              <div class="card-slot p-2">
                <span>{{ documentation.publisher | dashEmpty }}</span>
              </div>
            </div>
            <div class="card col-md-auto p-2">
              <span><strong>Tipo Documento</strong></span>

              <div class="card-slot p-2">
                <span>{{ documentation.documentType.name | dashEmpty }}</span>
              </div>
            </div>
            <div class="card col-md-auto p-2">
              <span><strong>Riferimenti</strong></span>
              <div class="card-slot p-2">
                <span>{{ documentation.resource | dashEmpty }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="card col-md-auto p-2">
              <span><strong>Note</strong></span>
              <div class="card-slot p-2">
                <span>{{ documentation.notes | dashEmpty }}</span>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div id="id-second" />
        <div
          @mouseover="setActiveItemList('#id-link-second', true)"
          @mouseleave="setActiveItemList('#id-link-second', false)"
        >
          <div class="p-2">
            <app-tools-view :indexLabel="''"
              :descriptionLabel="'Strumenti metodologici associati al documento'"
               :tools="toolsByDocumentation"></app-tools-view>
          </div>
        </div>

        <div id="id-methods" />
        <div
          @mouseover="setActiveItemList('#id-link-methods', true)"
          @mouseleave="setActiveItemList('#id-link-methods', false)"
        >
          <div class="p-2">
            <app-methods
              :indexLabel="''"
              :descriptionLabel="'Metodi statistici associati al documento'"
              :statisticalMethods="methodsByDocumentation"
            ></app-methods>
          </div>
        </div>
      </div>
    </div>

    <aside class="container-rigth col-3">
      <section class="menu">
        <header>
          <h2 class="menu-heading"><b>Contenuto:</b></h2>
        </header>
        <ul class="menu-list">
          <li class="list-item" id="id-link-main">
            <a class="item-link" href="#id-main">Documento</a>
            <a class="item-link" href="#id-second">Strumenti Metodologici</a>
            <a class="item-link" href="#id-methods">Metodi Statistici</a>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>
<script>
/* import { required } from "vuelidate/lib/validators"; */

//import Documentation from "../documentation/shared/Documentation";
import ToolsView from "../tools/shared/ToolsView";
import StatisticalMethodView from "../statisticalMethods/shared/StatisticalMethodView";

import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "DocumentationDetails",
  //components: { plusORminus },
  data() {
    return {
      activeIndex: -1,
    };
  },
  computed: {
    ...mapGetters("documentation", ["documentation"]),
    ...mapGetters("tools", ["toolsByDocumentation"]),
    ...mapGetters("methods", ["methodsByDocumentation"]),
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  components: {
    // "app-documentation": Documentation,
    "app-tools-view": ToolsView,
    "app-methods": StatisticalMethodView,
  },
  methods: {
    setActiveItemList(selector, bool) {
      document.querySelector(selector).className = bool
        ? "list-item-hover"
        : "list-item";
    },
    setActiveCard(selector, bool) {
      document.querySelector(selector).className = bool ? "card-hover" : "card";
    },
    setActiveIndex(index) {
      this.activeIndex !== index
        ? (this.activeIndex = index)
        : (this.activeIndex = -1);
    },
  },
  created() {
    this.$store
      .dispatch("documentation/findById", this.$route.params.id)
      .then(() => {
        this.$store.dispatch(
          "tools/findToolsByDocumentation",
          this.documentation.id
        );
         this.$store.dispatch(
          "methods/findMethodsByDocumentation",
          this.documentation.id
        );
      });

 
  },
};
</script>

<style scoped>
.icon-prop {
  display: inline;
  padding-left: 6px;
}

.list-group-item {
  border: none !important;
}
* Clear floats after the columns */ .row:after {
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
fieldset.scheduler-border {
  border: 1px solid #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
}
legend.scheduler-border {
  width: inherit; /* Or auto */
  padding: 0 10px; /* To give a bit of padding on the left and right */
  border-bottom: none;
}
.max-col {
  max-width: 5%;
}

<style>
.property-heading {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <el-card>
    <div slot="header" class="property-heading">
      <el-button @click="drawer = true" type="primary" round>Filter</el-button>

      <div class="w-50">
        <el-input
          v-model="property.filters.search"
          @input="applyFilters"
          placeholder="Type to search"
          clearable
        />
      </div>

      <div class="spacer"></div>

      <el-upload
        action="http://localhost:8000/api/properties"
        :on-success="applyProperties"
        :before-upload="() => this.loading = true"
        :show-file-list="false"
        :headers="{Accept: 'application/json'}"
        name="csv_file"
        accept="csv"
      >
        <el-button icon="el-icon-bottom" type="primary">Import</el-button>
      </el-upload>
    </div>

    <el-drawer
      :visible.sync="drawer"
      :before-close="() => this.drawer = false"
      direction="ltr"
      style="width: 1100px"
    >
      <el-form ref="form" label-width="100px" label-position="top" style="padding: 15px">
        <el-row type="flex" align="center">
          <el-col :span="11">
            <el-form-item label="Price from"  prop="price_from" size="small">
              <el-input-number
                v-model.number="property.filters.price_from"
                placeholder="Price form"
                :min="1"
              />
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>

          <el-col :span="11">
            <el-form-item label="Price from" prop="price_to" size="small">
              <el-input-number
                v-model.number="property.filters.price_to"
                placeholder="Price to"
                :min="1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          v-for="key in property.filterKeys"
          :label="key.replace('_', ' ')"
          :key="`filter-${key}`"
          size="small"
        >
          <el-input-number
            v-model.number="property.filters[key]"
            :placeholder="key.replace('_', ' ')"
            :value="property.filters[key]"
            :min="1"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="applyFilters">Apply</el-button>
          <el-button @click="resetFilters">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-table v-loading="loading" :data="properties" height="calc(100vh - 160px)" style="width: 100%">
      <el-table-column
        v-for="header in property.headers"
        :label="header.toUpperCase()"
        :prop="header"
        :key="header"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script>
import {Property} from "@/models/Property";

export default {
  name: 'Home',
  components: {},
  data: () => ({
    loading: false,
    drawer: false,
    properties: [],
    property: new Property(),
  }),
  methods: {
    getProperties() {
      this.loading = true;

      const {
        search,
        garages,
        storeys,
        bedrooms,
        bathrooms,
        price_to,
        price_from,
      } = this.property.filters;

      let req = Property.all();

      if (search)
        req.query({name: search});

      if (garages)
        req.query({garages});

      if (storeys)
        req.query({storeys});

      if (bedrooms)
        req.query({bedrooms});

      if (bathrooms)
        req.query({bathrooms});

      if (price_from && price_to)
        req.query({price_from, price_to});

      req.send()
        .then(res => this.properties = res.data)
        .catch(err => console.log(err))
        .finally(() => this.loading = false);
    },
    applyProperties(properties) {
      this.loading = false;
      this.properties = this.properties.concat(properties);
    },
    applyFilters() {
      this.getProperties();
      this.$router.replace({name: 'Home', query: this.property.filters});
      this.drawer = false;
    },
    resetFilters() {
      this.$router.replace({name: 'Home', query: {}});
      this.property.resetFilters();
      this.drawer = false;
      this.getProperties();
    }
  },
  created() {
    Object.assign(this.property.filters, this.$route.query);

    this.getProperties();
  }
}
</script>

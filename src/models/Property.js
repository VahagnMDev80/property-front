import { omit } from "lodash";
import { Restify } from "vue-restify";

export class Property extends Restify {
  static request = {
    prefix: 'api'
  };

  static fields = {
    id: null,
    name: '',
    price: undefined,
    garages: undefined,
    storeys: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
  };

  formdata = true;

  constructor() {
    super({
      fields: Property.fields,
      request: Property.request
    });

    this.filters = Object.assign({
      search: '',
      price_to: undefined,
      price_from: undefined,
    }, omit(Property.fields, ['name', 'price']));
  }

  get headers() {
    return Object.keys(Property.fields);
  }

  get filterKeys() {
    return Object.keys(omit(this.filters, ['id','search', 'price_to', 'price_from']))
  }

  resetFilters() {
    this.filters = Object.assign({
      search: '',
      price_to: undefined,
      price_from: undefined,
    }, omit(Property.fields, ['name', 'price']));
  }
}

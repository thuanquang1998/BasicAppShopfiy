const APP_NAV = [
  { title: 'Home', key: 'home' },
  { title: 'Customers', key: 'customers'},
  { title: 'Forms', key: 'forms' },
  { title: 'Data Columns', key: 'data-columns' },
  { title: 'Products', key: 'products' },
  { title: 'Metafields', key: 'metafields' },
]

export const initState = {
  notification: {
    show: false,
    error: false,
    content: '',
  },
  store_setting: {},
  app_nav: {
    items: APP_NAV,
    selected: APP_NAV.filter(item => item.key === 'home')[0],
  },
  metafields: {
    items: [],
    selected: {},
  },
  products: {
    items: [],
    selected: {},
  }
}

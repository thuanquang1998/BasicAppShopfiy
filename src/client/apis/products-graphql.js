// @flow
import apiCaller from '../utils/apiCaller'

const find = async ({ id, limit, nextPageInfo, previousPageInfo, search, vendor, status }): Object => {
  console.log('vendor :>> ', vendor);
  let _id = id ? `&id=${id}` : ''
  let _limit = limit ? `&limit=${limit}` : ''
  let _nextPageInfo = nextPageInfo ? `&nextPageInfo=${nextPageInfo}` : ''
  let _previousPageInfo = previousPageInfo ? `&previousPageInfo=${previousPageInfo}` : ''
  let _search = search ? `&search=${search}` : ''
  let _vendor = vendor ? `&vendor=${vendor}` : ''
  let _status = status ? `&status=${status}` : ''
  return await apiCaller(
    `/admin/graphql-products?${_id}${_limit}${_nextPageInfo}${_previousPageInfo}${_search}${_vendor}${_status}`
  )
}
const create = async (data: Object): Object => {
  return await apiCaller(`/admin/graphql-products`, 'POST', { data });
};
const update = async (data: Object): Object => {
  return await apiCaller(`/admin/graphql-products`, 'PUT', { data });
};
const _delete = async (id: number): Object => {
  return await apiCaller(`/admin/graphql-products`, 'DELETE', { id });
};
const getAllProducts = async () => {
  return await apiCaller('/admin/graphql-products-bulk');
}
const pollGetAllProducts = async (id) => {
  console.log('id :>> ', id);
  return await apiCaller('/admin/graphql-products-bulk', 'POST', {id});
}
const getAllData = async (url) => {
  return await apiCaller('/admin/graphql-products-getAll', 'POST', {url});
}
const ProductsGraphqlApi = {
  find,
  create,
  update,
  delete: _delete,
  getAllProducts,
  pollGetAllProducts,
  getAllData
}

export default ProductsGraphqlApi

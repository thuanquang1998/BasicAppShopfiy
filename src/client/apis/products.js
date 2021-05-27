// @flow
import apiCaller from '../utils/apiCaller';

const find = async ({ limit, pageInfo, search, status, vendor }): Object => {
  let _limit = limit ? `&limit=${limit}` : '';
  let _pageInfo = pageInfo ? `&pageInfo=${pageInfo}` : '';
  let _search = search ? `&search=${search}` : '';
  let _status = status ? `&status=${status}` : '';
  let _vendor = vendor ? `&vendor=${vendor}` : '';

  return await apiCaller(`/admin/products?${_limit}${_pageInfo}${_search}${_status}${_vendor}`)
};

const findById = async (id: number): Object => {
  return await apiCaller(`/admin/products/${id}`);
};

const getCount = async (): Object => {
  return await apiCaller(`/admin/products-count`);
};

const create = async (product: Object): Object => {
  return await apiCaller(`/admin/products`, 'POST', { product });
};

const update = async (product): Object => {
  return await apiCaller(`/admin/products`, 'PUT', { product });
};

const _delete = async (id: number): Object => {
  return await apiCaller(`/admin/products`, 'DELETE', { id });
};

const ProductsApi = {
  find,
  findById,
  getCount,
  create,
  update,
  delete: _delete,
}

export default ProductsApi

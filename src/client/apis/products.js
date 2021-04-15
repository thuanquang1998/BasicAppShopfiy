// @flow
import apiCaller from '../utils/apiCaller';

const find = async ({ limit, pageInfo, search }): Object => {
  return await apiCaller(
    `/admin/products?${limit ? `&limit=${limit}` : ''}${pageInfo ? `&pageInfo=${pageInfo}` : ''}${ search ? `&search=${search}` : ''}`,
  );
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

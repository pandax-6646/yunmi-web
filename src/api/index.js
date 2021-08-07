import request from './request'

// 用户页面的请求
export const userRequest = {

  // 用户列表
  getUserListInfo() {
    return request.get('user/list');
  },

  // 删除用户列表里的某条信息
  delUserRowInfo(params) {
    return request.post('user/del', params);
  },

  // 修改用户列表里的某条信息
  editUserRowInfo(params) {
    return request.post('user/edit', params);
  },

  // 获取用户列表里的某条信息详情
  userRowInfoDetail(params) {
    return request.get('user/detail', params);
  },

  // 添加一条新的用户信息
  addUserRowInfo(params) {
    return request.post('user/add', params);
  }
}



// 首页请求
export const homeRequest = {
  getHomeChartData() {
    return request.get('count/all')
  }
}



// 商品页面的请求
export const brandRequest = {

  // 商品列表
  getBrandListInfo(params) {
    return request.get('brand/list', params);
  },

  // 商品详情
  brandRowInfoDetail(params) {
    return request.get('brand/detail', params);
  },

  // 修改商品信息
  editBrandRowInfo(params) {
    return request.get('brand/edit', params);
  },

  // 修改商品信息
  delBrandRowInfo(params) {
    return request.get('brand/del', params);
  },

  // 添加商品信息
  addBrandRowInfo(params) {
    return request.get('brand/add', params);
  },
}



// 一级分类页面的请求
export const typeRequest = {

  // 一级分类列表
  getTypeListInfo() {
    return request.get('type/all');
  },

  // 一级分类详情
  typeRowInfoDetail(params) {
    return request.get('type/detail', params);
  },

  // 编辑一级分类详情
  editTypeRowInfo(params) {
    return request.get('type/edit', params);
  },

  // 添加一级分类详情
  addTypeRowInfo(params) {
    return request.get('type/add', params);
  },

  // 删除一级分类详情
  delTypeRowInfo(params) {
    return request.get('type/del', params);
  },
}



// 二级分类页面的请求
export const subTypeRequest = {

  // 二级分类列表
  getSubTypeListInfo() {
    return request.get('subType/all');
  },

  // 二级分类详情
  subTypeRowInfoDetail(params) {
    return request.get('subType/detail', params);
  },

  // 编辑一级分类详情
  editSubTypeRowInfo(params) {
    return request.get('subType/edit', params);
  },

  // 添加一级分类详情  
  addSubTypeRowInfo(params) {
    return request.post('subType/add', params);
  },

  // 删除一级分类详情
  delSubTypeRowInfo(params) {
    return request.get('subType/del', params);
  },
}



// 产品页请求
export const productRequest = {

  // 产品列表分页
  getProductListInfo(params) {
    return request.get('product/list', params);
  },

  // 所有产品列表
  getProductListAll() {
    return request.get('product/all' );
  },

  // 修改产品上架状态
  changeStateInfo(params) {
    return request.post('product/changeStatus', params);
  },

  // 删除产品
  delProductRowInfo(params) {
    return request.get('product/del', params);
  },

  // 产品详情
  productRowDetailInfo(params) {
    return request.get('product/detail', params);
  },

  // 编辑产品
  editProductRowInfo(params) {
    return request.get('product/edit', params);
  },

  // 添加产品
  addProductRowInfo(params) {
    return request.post('product/add', params);
  },


}
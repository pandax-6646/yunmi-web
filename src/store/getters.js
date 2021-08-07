//管理派生状态值
const getters = {
  sidebar: (state) => state.app.sidebar,
  name: (state) => state.user.name,
  roleid: (state) => state.user.roleid
}
export default getters;
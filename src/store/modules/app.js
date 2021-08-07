//专门管理 项目中的非用户的状态值   如：左侧菜单状态

const app = {
  state: {
    sidebar: {
      opened: false //菜单状态  true   关闭    false 展开
    }
  },
  //mutations
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    TOGGLE_SIDEBAR_AC: ({
      commit
    }) => {
      //提交
      commit("TOGGLE_SIDEBAR");
    }
  }
}

export default app;
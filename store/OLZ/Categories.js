export const state = () => ({
  _DATA: null,
  _CATEGORIES: null
})

export const getters = {
  getCategories: state => state._CATEGORIES,
  getOneCategory: state => id => {
    let curCategory = null
    state._CATEGORIES.forEach(category => {
      if (category._id === id) {
        curCategory = category
      }
    })
    return curCategory
  },
  getOneSubCategory: state => (category, subCategory) => {
    let subcat = {}
    state._CATEGORIES.map(cat => {
      if (cat._id === category) return cat.subCategories.map(sub => {
        if(sub._id === subCategory) {
          subcat = {...sub, characteristics: sub.characteristics.map(char => {
            return {...char}
          })}
        }
      })
    })
    return subcat
  }
}
export const mutations = {
  ADD_CATEGORY: (state, category) => state._CATEGORIES.push(category),
  UPDATE_CATEGORIES: (state, categories) => state._CATEGORIES = categories,
  ADD_SUBCATEGORY: (state, {subcategory, idCategory}) => {
    state._CATEGORIES.map((category, index) => {
      if (category._id === idCategory) state._CATEGORIES[index].subCategories.push(subcategory)
    })
  },
  CHANGE_CATEGORY: (state, category) => {
    state._CATEGORIES = state._CATEGORIES.map(cat => {
      if(cat._id === category._id) return category
      return cat
    })
  },
  CHANGE_SUB_CATEGORY: (state, subCategory) => {
    state._CATEGORIES = state._CATEGORIES.map(category => {
      if (category._id === subCategory.category) return {...category, confirmed:false, subCategories: category.subCategories.map(subCat => {
        if (subCategory._id === subCat._id) return subCategory
        return subCat
      })}
      return {...category, confirmed: false}
    })
  },
  CONFIRM_SUB_CATEGORY: (state, id) => {
    state._CATEGORIES = state._CATEGORIES.map(category => {
      return {...category, subCategories: category.subCategories.map(subCat => {
        if (subCat._id === id) return {...subCat, confirmed: true, created: true}
        return subCat
      })}
    })
  },
  CONFIRM_CATEGORY: (state, id) => {
    state._CATEGORIES = state._CATEGORIES.map(category => {
      return category._id === id ? {...category, confirmed: true, created: true} : category
    })
  }
}

export const actions = {
  async addCategory({commit}, {form, notify}) {
    await this.$axios.post('/olz/categories/add/category', form).then(response => {
      commit('ADD_CATEGORY', response.data.category)
      notify({
        group: 'foo',
        title: `Успешно!`,
        text: response.data.msg,
        type: 'success'
      })
    }).catch(error => {
      notify({
        group: 'foo',
        title: `ERROR: ${error.response.status}`,
        text: error.response.data.msg,
        type: 'error'
      })
    })
  },
  async updateCategories({commit}, categories) {
    if(categories) return commit("UPDATE_CATEGORIES", categories)
    const response = await this.$axios.get(`/olz/categories/get`).catch(error => console.error(error.response.data.msg))
    commit("UPDATE_CATEGORIES", response.data.categories)
  },
  addSubCategory({ commit }, { form, notify }) {
    this.$axios.post('/olz/categories/add/subcategory', {...form, characteristics: form.characteristics.map(char => {
      if (char.type === 'chekbox') return {...char, list: char.list.split(',')}
      return char
    })}).then(response => {
      commit('ADD_SUBCATEGORY', {subcategory: response.data.subcategory, idCategory: response.data.subcategory.category})
      notify({ group: 'foo', title: `STATUS: ${response.status}`, text: response.data.msg, type: 'success' })
    }).catch(error => {
      notify({ group: 'foo', title: `ERROR: ${error.response.status}`, text: error.response.data.msg, type: 'error' })
    })
  },
  changeCategory({commit}, {category, notify, update}) {
    const { titleEn, titleRu, titleUa, _id } = category
    const body = { titleEn, titleRu, titleUa }
    this.$axios.put(`/olz/categories/change/category/${_id}`, body).then(response => {
      commit('CHANGE_CATEGORY', response.data.category)
      notify({ group: 'foo', title: `STATUS: ${response.status}`, text: response.data.msg, type: 'success' })
      update()
    }).catch(error => {
      notify({ group: 'foo', title: `ERROR: ${error.response.status}`, text: error.response.data.msg, type: 'error' })
    })
  },
  changeSubCategory({commit}, {subCategory, notify, update}) {
    const { titleEn, titleRu, titleUa, _id, characteristics } = subCategory
    const body = { titleEn, titleRu, titleUa, characteristics: characteristics.map(char => {
      if (char.type === 'chekbox')  return {...char, list: char.list.toString().split(',')}
      return char
    }) }
    this.$axios.put(`/olz/categories/change/subcategory/${_id}`, body).then(response => {
      commit('CHANGE_SUB_CATEGORY', response.data.subCategory)
      notify({ group: 'foo', title: `STATUS: ${response.status}`, text: response.data.msg, type: 'success' })
      update()
    }).catch(error => {
      notify({ group: 'foo', title: `ERROR: ${error.response.status}`, text: error.response.data.msg, type: 'error' })
    })
  },
  confirmSubCategory({commit}, {id, notify, update}) {
    this.$axios.put(`/olz/categories/confirm/subcategory/${id}`).then(response => {
      commit('CONFIRM_SUB_CATEGORY', id)
      notify({ group: 'foo', title: `STATUS: ${response.status}`, text: response.data.msg, type: 'success' })
      update()
    }).catch(error => {
      notify({ group: 'foo', title: `ERROR: ${error.response.status}`, text: error.response.data.msg, type: 'error' })
    })
  },
  confirmCategory({commit}, {id, notify, update}) {
    this.$axios.put(`/olz/categories/confirm/category/${id}`).then(response => {
      commit('CONFIRM_CATEGORY', id)
      notify({ group: 'foo', title: `STATUS: ${response.status}`, text: response.data.msg, type: 'success' })
      update()
    }).catch(error => {
      notify({ group: 'foo', title: `ERROR: ${error.response.status}`, text: error.response.data.msg, type: 'error' })
    })
  }
}
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('tokens')
  //const token = store.getState().auth.token
  if (token && config.headers.shouldPutToken !== false) {
    const tokenParsed = JSON.parse(token).token
    config.headers.Authorization = `Bearer ${tokenParsed}`
  }


  // const editionId = store.getState().edition.currentEdition.id
  // if (editionId != null) config.headers.edition = editionId

  // const publicationId = store.getState().publication?.publication?.id
  // if (publicationId != null) config.headers.publication = publicationId

  // const currentCanalId = store.getState().canal?.currentCanal?.id
  // if (currentCanalId != null) config.headers.canal = currentCanalId

  // const blockContainerId = store.getState().blockContainer?.container?.id
  // if (blockContainerId) config.headers.blockContainer = blockContainerId

  return config
})

// axios.interceptors.response.use(
//   (response) => {
//     // Si la donnée possède une erreur
//     if (response.data.exception) {
//       return Promise.reject(response.data)
//     }
//     return response
//   },
//   (error) => {
//     if (error && !error.response) {
//       return Promise.reject(error.response)
//     }
//     let res = error.response
//     if (
//       res &&
//       (res.status === 200 ||
//         res.status === 400 ||
//         res.status === 401 ||
//         res.status === 403 ||
//         res.status === 409 ||
//         res.status === 500) &&
//       res.data &&
//       res.data.message
//     ) {
//       //store.dispatch(messageActions.setGlobalMessage(res.data));
//       if (res.data && res.data.code && res.data.code == 40110) {
//         store.dispatch(actions.doLogout())
//       }
//       return Promise.reject(res.data)
//     }

//     const originalRequest = error.config
//     if (res && res.status === 498 && res.config && !originalRequest._retry) {
//       const refreshToken = store.getState().auth.refreshToken
//       originalRequest._retry = true
//       //On le fait egalement via redux pour mettre a jour le state
//       store.dispatch(actions.doRefresh(refreshToken))
//       //Et on le fait en local(pas propre) pour débloquer notre requete actuel
//       return axios
//         .post(CONSTANTE.WS_URL + '/auth/refresh', {
//           refreshToken: refreshToken,
//         })
//         .then((res) => {
//           originalRequest.headers.token = res.data.token
//           store.dispatch(actions.getRight(res.data.token))
//           originalRequest.headers.shouldPutToken = false
//           return axios(originalRequest).then((res) => {
//             return res
//           })
//         })
//     } else if (res && res.status === 498) {
//       store.dispatch(actions.doLogout())
//     } else {
//       // return err;
//       // Si c'est une erreur, reject le promise pour passer dans le catch
//       return Promise.reject(error.response)
//     }
//   }
// )

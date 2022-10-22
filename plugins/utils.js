// const apiUrl = process.env.API_URL

// export function yupRules(r) {
//   return (v) => {
//     try {
//       r.validateSync(v)
//       return true
//     } catch (err) {
//       return err.errors[0]
//     }
//   }
// }

// export async function uploadFile(file, updateStatus) {
//   updateStatus(true)
//   const formData = new FormData()
//   formData.append('uri', file)
//   const response = await fetch(`${apiUrl}/uploads`, {
//     method: 'POST',
//     body: formData,
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem('feathers-jwt'),
//     },
//   })
//   const result = await response.json()
//   updateStatus(false)
//   return result
// }

export default (context, inject) => {
  inject('utils', {
    yupRules: (r) => {
      return (v) => {
        try {
          r.validateSync(v)
          return true
        } catch (err) {
          return err.errors[0]
        }
      }
    },

    uploadFile: async (file, updateStatus) => {
      updateStatus(true)
      const formData = new FormData()
      formData.append('uri', file)
      const response = await fetch(`${context.$config.apiURL}/uploads`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('feathers-jwt'),
        },
      })
      const result = await response.json()
      updateStatus(false)
      return result
    },
  })
}

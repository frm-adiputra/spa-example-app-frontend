// If it's a private page and there's no payload, redirect.
export default async function (context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  // const { store } = context
  if (route.name !== 'login') {
    try {
      await store.dispatch('auth/authenticate')
      if (route.name === 'authcallback') {
        return redirect('/')
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      // if (e.code === 404 && e.name === 'NotFound') {
      await localStorage.removeItem('feathers-jwt')
      await store.dispatch('auth/logout')
      return redirect('/login')
      // } else {
      // }
    }
  }
  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('/login')
  }
}

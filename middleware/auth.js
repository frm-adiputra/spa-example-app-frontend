// If it's a private page and there's no payload, redirect.
export default async function (context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  if (route.name !== 'login') {
    try {
      await store.dispatch('auth/authenticate')
      if (route.name === 'authcallback') {
        return redirect('/')
      }
    } catch (e) {
      // eslint-disable-next-line
      // console.error(e)
      await localStorage.removeItem('feathers-jwt')
      return redirect('/login')
    }
  }
  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('/login')
  }
}

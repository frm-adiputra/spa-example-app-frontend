// If it's a private page and there's no payload, redirect.
export default function (context) {
  const { store, redirect, route } = context
  const { auth } = store.state
  // const { store } = context
  if (route.name !== 'login') {
    store.dispatch('auth/authenticate').catch(() => {})
  }
  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('/login')
  }
}

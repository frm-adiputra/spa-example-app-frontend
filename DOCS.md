# App Documentations

## Events Name Conventions

- data-create: event fired to create data
- data-update: event fired to update data
- data-remove: event fired to delete data

## Snackbar

To queue message into snackbar, use store dispatch like this

```JavaScript
this.$store.dispatch('snackbar/queue', {
    message: 'Your message',

    // 6000 is the default value
    timeout: 6000,

    // optional
    action: {

        // if label is null no action will be displayed
        label: 'Retry',

        // optional
        // action will be executed by calling
        // $store.dispatch(dispatchId, data, { root: true })
        dispatchId: 'person/save',
        payload: {} // optional
    }
})
```

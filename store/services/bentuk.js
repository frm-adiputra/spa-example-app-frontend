/* eslint-disable no-useless-constructor */
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '~/plugins/feathers'

class Bentuk extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Bentuk'

  // Define default properties here
  static instanceDefaults() {
    return {
      // email: '',
      // password: '',
    }
  }
}

const servicePath = 'bentuk'
const servicePlugin = makeServicePlugin({
  Model: Bentuk,
  service: feathersClient.service(servicePath),
  servicePath,
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      (err) => {
        // eslint-disable-next-line
        console.error(err)
      },
    ],
  },
})

export default servicePlugin

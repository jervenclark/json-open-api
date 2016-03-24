OPEN JSON API
=============

Express middleware implementation of the OpenAPI v2.0 and JSON-API v1.0 specifications.

Routes

		routes = [
		  'plural',
		  'singular'
		];


Verbs

		verbs = [
		  'get',
		  'post',
		  'patch',
		  'put',
		  'delete'
		];


Hooks

		hooks = [
		  'before',
		  'after'
		];


Config

		config = {
		  app: {
		    type: Object,
		    description: 'Requires an express application instance. Defaults to null',
		  },
		  models: [{
		    schema: {
		      type: Object,
		      description: 'Requires a mongoose model schema'
		    },
		    all: {
		      type: Function,
		      description: 'Requires a function to act as middleware for all resource methods'
		    },
		    { route }: {
		      hidden: Boolean { verb }: {
		        { hooks }: Function
		      }
		    }
		  }],
		  namespace: String,
		};
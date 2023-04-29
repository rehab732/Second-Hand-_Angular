// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
    publicKey: 'pk_test_51N1Hq9CE9dWv3QNWLJcIDM5L1p7JTOS6ygOvhj6lMsZYWeafit9lfnPiuMKVj5E6Tb5fbAqrQ7jVQaYGjF42INuH00o2oBc8UQ',
  },
  apiUrl:'http://localhost:7010'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

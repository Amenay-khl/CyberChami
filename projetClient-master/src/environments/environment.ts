// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyADKUASPoBG8VHqmbEVt8XRgsGyyrTwbiI",
    authDomain: "l3m-projetintegrateur.firebaseapp.com",
    databaseURL: "https://l3m-projetintegrateur-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "l3m-projetintegrateur",
    storageBucket: "l3m-projetintegrateur.appspot.com",
    messagingSenderId: "1013308717201",
    appId: "1:1013308717201:web:bd9555d497196f05dd2730",
    measurementId: "G-6YZHSVXHDW"
  },
  apiBaseUrl: 'http://localhost:5000/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

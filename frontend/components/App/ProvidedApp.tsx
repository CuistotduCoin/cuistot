// import React from "react";
// import { Provider, Subscribe } from "unstated";
// import { App, AppContainer } from ".";

// export class ProvidedApp extends React.Component {
//   public appContainer: any;

//   public constructor(props) {
//     super(props);
//     this.appContainer = new AppContainer();
//   }

//   public render() {
//     return (
//       <Provider inject={[this.appContainer]}>
//         <Subscribe to={[AppContainer]}>
//           {(app: any) => (
//             <App
//               referer={app.state.referer}
//               isLoggedIn={app.state.isLoggedIn}
//               currentGourmet={app.state.currentGourmet}
//               openSnackbar={app.openSnackbar}
//               logIn={app.logIn}
//               setReferer={app.setReferer}
//               setCurrentGourmet={app.setCurrentGourmet}
//             />
//           )}
//         </Subscribe>
//       </Provider>
//     );
//   }
// }

// export default ProvidedApp as any;

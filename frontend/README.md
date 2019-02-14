# [Cuistot du Coin](https://www.cuistotducoin.com) :

## EDITOR SETUP:
  - Use TSLint

## SETUP:
  - Copy the provided secrets file to the root (look at .env-example)
  - `yarn` to install dependencies
  - `yarn dev` for development server
  - `yarn build` for production server (lambda)
  - `yarn lambda` for development serverless (use build before lambda)
  - `yarn deploy` for deploying on AWS (circleCI will handle that)
 
 ## TECHNOLOGIES:
   ### Libraries & Packages
    * Uses _TypeScript_ for types with Javascript
    * Uses _MaterialUI_ for Generic Components
    * Uses _Formik_ for form validation
    * Uses _Next_ for universal server-rendereding
    * Uses _Apollo_, _aws-amplify_, _aws-appsync_ for providing API calls directly to components.
    * Uses Algolia for search

import dynamic from 'next/dynamic'

// @ts-ignore
// tslint:disable-next-line:variable-name
const graphqlOperation = dynamic(() => import('./graphqlOperation'), {
    ssr: false
})

export default graphqlOperation();
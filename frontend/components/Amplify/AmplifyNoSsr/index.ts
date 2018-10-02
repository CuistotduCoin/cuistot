import dynamic from 'next/dynamic'

// @ts-ignore
// tslint:disable-next-line:variable-name
const Amplify = dynamic(() => import('./Amplify'), {
    ssr: false
})

export default Amplify();
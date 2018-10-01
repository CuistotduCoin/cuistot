import dynamic from 'next/dynamic'

// @ts-ignore
// tslint:disable-next-line:variable-name
const Auth = dynamic(() => import('./Auth'), {
    ssr: false
})

export default Auth();
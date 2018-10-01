import dynamic from 'next/dynamic'

// @ts-ignore
// tslint:disable-next-line:variable-name
const Api = dynamic(() => import('./Api'), {
    ssr: false
})

export default Api();
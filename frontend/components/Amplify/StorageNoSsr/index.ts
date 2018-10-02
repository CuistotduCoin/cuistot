import dynamic from 'next/dynamic'

// @ts-ignore
// tslint:disable-next-line:variable-name
const Storage = dynamic(() => import('./Storage'), {
    ssr: false
})

export default Storage();
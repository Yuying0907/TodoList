import { atom } from 'recoil'

export const pageState = atom<string>({
    key: 'PAGE_STATE',
    default: '/login'
})

export const pathsState = atom<string[]>({
    key: 'PATH_PAGE',
    default: []
})


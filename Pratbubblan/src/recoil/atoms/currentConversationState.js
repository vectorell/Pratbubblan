import { atom } from 'recoil'

export const currentConversationState = atom({
    key: 'currentConversationState',            
    default: '',
})
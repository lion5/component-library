import {mount} from '@vue/test-utils'
import {afterEach, beforeEach, beforeAll, describe, expect, it, vi} from 'vitest'
import BaseModal from "@/atoms/modals/BaseModal/BaseModal.vue";

describe('BaseModal', () => {
    let wrapper

    beforeAll(() => {
        // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    })

    beforeEach(() => {
        wrapper = mount(BaseModal)
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe(':props', () => {
        it(':modalDisplayed - open modal if modalDisplayed set to true', async () => {
            await wrapper.setProps({modalDisplayed: true})
            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
        })
        it(':modalDisplayed - open modal if modalDisplayed set to true onMounted', async () => {
            wrapper = mount(BaseModal, {
                props: {
                    modalDisplayed: true
                }
            })
            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
        })
        it(':modalDisplayed - close modal if modalDisplayed set to false', async () => {
            expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)
        })
    })
    describe('@events', () => {
        it('@cancel - dialog cancel triggers @update:modalDisplayed', async () => {
            const dialog = await wrapper.find('dialog')
            await dialog.trigger('cancel')
            expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
            expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([false])
        })
    })
    describe('#slots', () => {
        // Source: https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts
        it('#default - trigger @update:modalDisplayed(true) when using open function', async () => {
            let openModal
            const wrapper = mount(BaseModal, {
                slots: {
                    default: (params) => {
                        openModal = params.openModal
                        return ''
                    }
                }
            })
            await openModal()
            expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
            expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([true])
        })
        it('#default - trigger @update:modalDisplayed(false) when using close function', async () => {
            let closeModal
            const wrapper = mount(BaseModal, {
                slots: {
                    default: (params) => {
                        closeModal = params.closeModal
                        return ''
                    }
                }
            })
            await closeModal()
            expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
            expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([false])
        })
    })
})

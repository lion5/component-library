import {afterEach, beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import {flushPromises, mount} from "@vue/test-utils";
import BaseModal from "@/atoms/modals/BaseModal/BaseModal.vue";
import DismissibleModal from "@/atoms/modals/DismissibleModal/DismissibleModal.vue";

describe('DismissibleModal', () => {
    let wrapper

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    })

    beforeEach(() => {
        wrapper = mount(DismissibleModal)
    })

    afterEach(() => {
        vi.clearAllMocks()
    })


    describe(':props', () => {
        it(':modalDisplayed - v-model is passed down correctly if modalDisplayed set to true', async () => {
            await wrapper.setProps({modalDisplayed: true})


            const baseModal = wrapper.findComponent(BaseModal)

            await flushPromises()

            expect(baseModal.vm.$props.modalDisplayed).toBe(true)
        })
        it(':modalDisplayed - v-model is passed down correctly if modalDisplayed set to true onMounted', async () => {
            wrapper = mount(DismissibleModal, {
                props: {
                    modalDisplayed: true
                }
            })
            const baseModal = wrapper.findComponent(BaseModal)
            expect(baseModal.vm.$props.modalDisplayed).toBe(true)
        })
        it(':modalDisplayed - v-model is passed down correctly if modalDisplayed set to false', async () => {
            const baseModal = wrapper.findComponent(BaseModal)
            expect(baseModal.vm.$props.modalDisplayed).toBe(false)
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
        it('#default - trigger @update:modalDisplayed(true) when using open function', async () => {
            let openModal
            const wrapper = mount(DismissibleModal, {
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
            const wrapper = mount(DismissibleModal, {
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

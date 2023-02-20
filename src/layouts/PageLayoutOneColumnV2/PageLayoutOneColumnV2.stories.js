import BasePageLayout from "@/layouts/PageLayoutOneColumnV2/PageLayoutOneColumnV2.vue";

export default {
    component: BasePageLayout
}

const Template = (args) => ({
    setup() {
        return {args}
    },
    components: {
        BasePageLayout
    },
    template: `
      <BasePageLayout v-bind="$props" style="background-color: antiquewhite">
      <template #headline>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">Headline - A very long Headline</div>
      </template>
      <template #content>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 1
          Pudding lemon drops soufflé jelly beans jelly-o jujubes gummi bears cake. Chocolate cake halvah pastry brownie
          gummi bears soufflé sesame snaps sesame snaps. Ice cream jujubes brownie apple pie shortbread lollipop. Bear
          claw shortbread pudding cake lemon drops lemon drops. Candy canes sesame snaps tootsie roll danish soufflé
          bear claw cookie dragée cupcake. Tart fruitcake oat cake cupcake oat cake powder lollipop halvah jelly.
          Cupcake oat cake tiramisu cookie brownie. Candy cheesecake caramels brownie chocolate cake macaroon soufflé.
          Icing chocolate cake macaroon jelly-o cake muffin chocolate cake. Gummi bears biscuit shortbread jujubes
          carrot cake. Icing danish gummi bears jelly-o halvah. Soufflé cake marzipan brownie toffee. Cake candy cake
          marshmallow donut chupa chups tiramisu cake.
        </div>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 2
          Chocolate chocolate bar dessert toffee wafer candy dragée. Croissant danish marzipan fruitcake wafer bonbon.
          Lemon drops jelly chocolate cake tart sugar plum chocolate wafer. Cheesecake danish toffee icing candy. Powder
          chocolate cake cheesecake marshmallow chupa chups carrot cake. Powder cake jujubes caramels marzipan muffin
          bear claw cheesecake. Chupa chups carrot cake cookie brownie pastry. Icing jelly halvah chupa chups icing.
          Icing toffee sugar plum tootsie roll tootsie roll chocolate cake. Macaroon croissant chupa chups pudding
          dessert pudding. Tart bonbon croissant liquorice jelly jelly beans chocolate bar chocolate brownie. Cake
          jelly-o cupcake liquorice sesame snaps.
        </div>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 3
          Jelly beans cake oat cake chocolate cake liquorice sweet roll lemon drops dragée. Chupa chups carrot cake
          cookie gummi bears jujubes cupcake pie. Pudding wafer liquorice powder tiramisu donut shortbread lemon drops
          cake. Macaroon chocolate cake jujubes biscuit icing cake liquorice dragée. Gummi bears toffee gummies bonbon
          toffee. Lemon drops marzipan topping cheesecake sweet candy canes wafer dragée chupa chups. Brownie jelly
          beans pastry cake sweet roll wafer sweet cheesecake bonbon. Donut dessert jelly beans jujubes pastry tart
          wafer croissant croissant. Chocolate bar tootsie roll powder chocolate bar sugar plum lollipop. Icing soufflé
          jelly-o chupa chups bear claw brownie. Toffee jelly beans oat cake oat cake oat cake tiramisu tiramisu. Cookie
          jelly-o soufflé sesame snaps cookie jelly beans cake cotton candy croissant. Croissant dessert shortbread
          jujubes cotton candy soufflé brownie tart cake.
        </div>
      </template>
      </BasePageLayout>
    `
})

export const Default = Template.bind({})
Default.args = {}

export const WithMoreSpace = (args) => ({
    setup() {
        return {args}
    },
    components: {
        BasePageLayout
    },
    template: `
      <BasePageLayout v-bind="$props" style="background-color: antiquewhite; --layout-space: 4rem; --layout-space-inline: 4rem; --layout-space-block-start: 4rem; --layout-space-block-end: 6rem;">
      <template #headline>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">Headline - A very long Headline</div>
      </template>
      <template #content>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 1
          Pudding lemon drops soufflé jelly beans jelly-o jujubes gummi bears cake. Chocolate cake halvah pastry brownie
          gummi bears soufflé sesame snaps sesame snaps. Ice cream jujubes brownie apple pie shortbread lollipop. Bear
          claw shortbread pudding cake lemon drops lemon drops. Candy canes sesame snaps tootsie roll danish soufflé
          bear claw cookie dragée cupcake. Tart fruitcake oat cake cupcake oat cake powder lollipop halvah jelly.
          Cupcake oat cake tiramisu cookie brownie. Candy cheesecake caramels brownie chocolate cake macaroon soufflé.
          Icing chocolate cake macaroon jelly-o cake muffin chocolate cake. Gummi bears biscuit shortbread jujubes
          carrot cake. Icing danish gummi bears jelly-o halvah. Soufflé cake marzipan brownie toffee. Cake candy cake
          marshmallow donut chupa chups tiramisu cake.
        </div>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 2
          Chocolate chocolate bar dessert toffee wafer candy dragée. Croissant danish marzipan fruitcake wafer bonbon.
          Lemon drops jelly chocolate cake tart sugar plum chocolate wafer. Cheesecake danish toffee icing candy. Powder
          chocolate cake cheesecake marshmallow chupa chups carrot cake. Powder cake jujubes caramels marzipan muffin
          bear claw cheesecake. Chupa chups carrot cake cookie brownie pastry. Icing jelly halvah chupa chups icing.
          Icing toffee sugar plum tootsie roll tootsie roll chocolate cake. Macaroon croissant chupa chups pudding
          dessert pudding. Tart bonbon croissant liquorice jelly jelly beans chocolate bar chocolate brownie. Cake
          jelly-o cupcake liquorice sesame snaps.
        </div>
        <div style="background-color: var(--color-primary-surface); padding: 1rem;">
          Content 3
          Jelly beans cake oat cake chocolate cake liquorice sweet roll lemon drops dragée. Chupa chups carrot cake
          cookie gummi bears jujubes cupcake pie. Pudding wafer liquorice powder tiramisu donut shortbread lemon drops
          cake. Macaroon chocolate cake jujubes biscuit icing cake liquorice dragée. Gummi bears toffee gummies bonbon
          toffee. Lemon drops marzipan topping cheesecake sweet candy canes wafer dragée chupa chups. Brownie jelly
          beans pastry cake sweet roll wafer sweet cheesecake bonbon. Donut dessert jelly beans jujubes pastry tart
          wafer croissant croissant. Chocolate bar tootsie roll powder chocolate bar sugar plum lollipop. Icing soufflé
          jelly-o chupa chups bear claw brownie. Toffee jelly beans oat cake oat cake oat cake tiramisu tiramisu. Cookie
          jelly-o soufflé sesame snaps cookie jelly beans cake cotton candy croissant. Croissant dessert shortbread
          jujubes cotton candy soufflé brownie tart cake.
        </div>
      </template>
      </BasePageLayout>
    `
})

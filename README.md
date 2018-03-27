# Pokemon Bag App

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Given Requirements

#### Requirements:

1. Displays and Managers a Bag inventory. This includes both Pokemon and items.
    a) Allows for the addition and removal of bag items/pokemon
    b) To select an item/pokemon from the bag and display the corresponding detailed information

2. To "evolve" a pokemon if the pokemon is at the appropriate level or the user has the appropriate items.  If a pokemon evolves the old pokemon should be removed from the bag and replaced with the new one.

As a user, when I navigate to your app I should be taken to the main page where I should have ability to interact with my bag based on the requirements listed above (the implementation and user experience is left up to you). For the MVP (minimal viable product), a user may evolve their pokemon by consuming a rare candy, if they have any.

#### Notes:

- You may consume the Pokeapi to obtain the correct information: http://pokeapi.co/docsv2/
- For the purposes of this exercise, we will not have the concept of a user - everything will be session based. 
- For the purposes of this app, please use only the Red, Blue, and Yellow version information.
- For the purposes of this app, you are not required to display information about Game Version, Location, Encounters, Contests, or any internal data attributes (e.g. ‘order’, ‘id’).

#### Running your app:

1. Your app should be self-contained. That is, we should be able to copy your app to any computer and run the application.
2. We should be able to use your app in any browser by navigating to ‘localhost:8000’

#### Extra Credit:

1. Instead of evolving pokemon by using a rare candy, you may choose to use rare candies to level up a pokemon. When a pokemon is added to the bag, it should be assigned a random level. If a pokemon can be evolved, it should be evolved into the correct pokemon once it reaches the required level.

## Analysis

#### Assumptions

1. By the nature of some of the requirements, the application is meant to strictly be built on the front-end and refresh it's data whenever the page is refreshed or the project is reloaded. Therefore, there's no data persistence
2. Evolutions happen automatically when items are included in the item-bag or new pokemon are inserted into the pokemon-bag

#### Strategy and Technology Decisions

1. I would build a reactive front-end only single-page-application that would deliver and meet all of the requirements
2. Vue.js allows for a simple reactive environment (and allows me to learn a new framework)
3. Vuetify.js will allow for enhancing the overall look of components and include an easy way to build in responsivity
4. Axios provided an api for grabbing information from the pokeapi

#### Implementation Decisions

1. I decided to include evolution items into the project. This is important because red, blue, and yellow belong to generation/1/ of the Pokemon series. The included evolution items don't appear in the games until generation/3/. This means there's a slight contradiction in the requirements where it asks me both to only use generation/1/ information and **("'evolve' a pokemon if the pokemon is at the appropriate level or the user has the appropriate items")**. Simply, items make the project more interesting because of the additional technical challenge they provided. I'll admit to using the project as practice.
2. To populate the list of pokemon, I make only a single api call and it only goes as deep as grabbing their names and their references to additional information. This was populate the list quickly and prevent the call from being made extra times needlessly.
3. When each pokemon is added to the bag, the rest of its information is retrieved through a series of two extra api calls and stored. Multiple can run at the same time, however. 
4. I decided to prevent the pokemon from appearing immediately in the bag for two reasons. One reason deals with synchronous logic checks *(e.g. "Is the evolution item that the pokemon needs to evolve already in the bag? If so evolve it!")* assuming that asynchronous information of each new pokemon existed when the checks ran. Well, the information never existed at that point in every test that I ran as a result of the time it took to call and extract the poke-api's information. I decided to defer the pokemon from being added to the bag (i.e. the event upon which some of the dependent logic checks would run). I could have deferred the checks themselves thereby allowing the pokemon's initialized constructor values to populate the bag along with the buttons, but that allowed for a second issue--the Level-Up button. If the pokemon was added early, or if it were evolved, it's level would not be populated yet, the Level-Up button would perform it's operation on the "stand-in" level using rare candies only to have the pokemon's level reset to its computed value thereby wasting the rare candies. As a simple way to get around it, I simple remove the pokemon's listing from the table until all of it's information is included and updated. Two ways other than this would have been to disable the level-up button until the information was included or not rely on the api-calls to populate the pokemon's level--this brings me to my next decision. This is an improvement I'll list later.
5. I interpretted the last two sentences of the Extra Credit section **("When a pokemon is added to the bag, it should be assigned a random level. If a pokemon can be evolved, it should be evolved into the correct pokemon once it reaches the required level.")** to mean a random level that didn't imediately evolve any particular pokemon. With how the rest of the app is built, I felt it would be confusing to click on a pokemon such as squirtle and see blastoise get added to the pokemon-bag instead. So, I gave each pokemon a random level that was strictly less than the minimum level they would evolve at. The minimum level took both api-calls to get to and therefor the level couldn't be set until both api-calls were made.

#### Improvements and Reflection Items

1. I feel like there's a better way to go than the decisions I made in "Implementation Decisions" #4 and #5. The button disable with some sort of loading bar I think would be ideal.
2. The appearance of a new pokemon in the pokemon-bag is too subtle. A strong color flash over the component or other indication that it appeared in the list would help.
3. The evolution of a pokemon is also a bit too subtle. Some indication that this was happenning or happened would improve this.
4. There's a bug associated with the pokemon-selector box. When selecting a pokemon from the dropdown and clicking away from the dropdown, the pokemon-selector box expands as if trying to hold both the selected text and the 'to-be-filled' selector field. This is a bug that's currently known to the Vuetify team.
5. With the inclusion of evolution items, the way the app is currently structured doesn't support the full capabilities of evolving Eevee. The app would need to reference many more things as lists (e.g. what pokemon can evolve to or what items they can use to evolve) and then provide additional loops throughout the app's logic to display the lists. And, unfortunately, this still doesn't allow Eevee to evolved appropriately because there's no included feature for choosing which item to use on a pokemon. With the current app's implementation, one would either need to hardcode the order in which items are used according to their availability, or pick one randomly.
6. The item bag could be more styled
7. While the app is somewhat responsive, it is lacking especially in regards to the item bag and the pokemon bag. This could be improved either with implementing more responsivity into their components, or, more drastically, redesign/reorganize the app's layout.
8. The "add" button on the pokemon-selector should grab focus after a pokemon is selected and allow a user to hit enter instead of clicking
9. Accessibility enhancements can be made
10. il8n enhancements can also be made
11. In code documentation is lacking, especially where map and filter are used liberally. It is these places especially that can be confusing hard to follow along with in regards to their purpose and function.
12. The application lacks appropriate unit and e2e testing. (or automated testing/integration)
13. Version control should be included
14. Finally, the app could implement some data-persistence in the future.

### That said...
#####I'm very proud of the project and my accomplishment of learning multiple new technologies and then building my first purely front-end application. Thank you for the inspiration! I would be more than glad to revisit any of the above items in the future!
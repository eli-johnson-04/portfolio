# Portfolio Backlog

## Decisions
- Need to decide if I want to have markdown folders _or_ if I want to have a naming scheme instead (this would potentially make it easier to display all the files as background cards)
    - Maybe I can place all markdown folders into a larger markdown folder? This way all the content will be grabbed for the cards but I can still have it organized
    - I'm doing both :D

## Code-based changes
- [ ] large-scale refactoring, mostly in Sphere.jsx
- [ ] convert pngs to jpgs to save space
- [ ] look into google indexing and crawling and how that works with markdown!

## Necessary Functionality
- [ ] IMPROVE PERFORMANCE
- [x] Spheres swell when hover
- [x] Show info on hover
- [x] Expand into modal when clicked
- [x] Spheres can be customized for different modal content, either via attribute or hard-coded (using an attribute is ideal...)
- [ ] Modal holds information related to sphere customization (i have no idea what i meant here)
- [x] Multiple spheres work indpendently of each other
- [x] Markdown viewer library for modal
- [x] Grab content from respective folders
- [x] Favicon
- [x] COLLAPSIBLE ENTRIES
- [x] Add styling and support for embeds
- [ ] Complete Profile page
    - [ ] fix visibility of text 
    - [ ] MAKE APPEARANCE CONSISTENT ACROSS VARYING SCREEN SIZES
- [ ] Complete Activity feed (up to date)
- [ ] Complete Portfolio page with grid for content (somehow make responsive and dynam ic??) ((completeness determined by an entry for each master resume project))
- [ ] fix portfolio activity entry styling
    - [ ] Smooth when collapsing an entry in activity or portfolio
    - [ ] add a hover popup on portfolio entries for keywords
        - have markdownLoader class add a property for a string of keywords and extract the keywords from the end of the "md" property and put them here, then contentFeed can create a tooltip using the keywords property of each entry
- [ ] SPLASH/LOADING PAGE BEFORE SPHERES ARE READY
    - Once I figure out how users will interact, provide that information on this page! I can also put a small notification guy in the bottom left corner or something as a reminder with a button to close the popup
        - popup auto-close timer (with notification?)
- [x] fix weird issues where clicking text does not register as clicking the sphere
- [x] prevent spheres from getting too close to each other (temporarily fixed, i do not yet have an elkegant solution other than reducing motion intensity)
- [x] encapsulate space scene functionality

## Beautification
- [ ] functionality for mobile (touch screens)!!!!
- [x] Spheres have hover physics
- [x] Modal ~~open~~ fade-in animation
- [x] Modal **explosion** animation
- [X] Hide the scrollbar in modals or make the right-hand side still curved as intended
- [x] Add starry background
- [x] Text rotates independently of the parent sphere
- [ ] Spheres are attached to the center sphere with lines (either rigid or wavy)
- [ ] More responsive sphere hover ease
- [ ] Add a spring for sphere random movement and responsiveness to mouse!
- [ ] Push around the spheres with the mouse (not super far), but they gravitate back to their original spot (rubber band)
- [ ] fix the powerpoint embed stealing focus
- [ ] explore normal and bump maps and other kinds of maps for a "realistic" planet


## Background Cards - maybe now background STARS?????
- [ ] Create little background cards (or STARS????) for every markdown file
- [ ] Give background cards color (washed out, muted, kinda blurry) (i may be able to make these one-dimensional and have them face the camera but that could be cheap)
- [ ] Make them fly into their respective sphere when that sphere is hovered
- [ ] Glassy appearance effect?

## Optional/Stretch Goals
- [ ] Putting text on a flat visible card instead of wrapping it, still allowing it to face the user but being obviously on a card
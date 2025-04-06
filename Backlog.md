# Portfolio Backlog

## Decisions
- Need to decide if I want to have markdown folders _or_ if I want to have a naming scheme instead (this would potentially make it easier to display all the files as background cards)
    - Maybe I can place all markdown folders into a larger markdown folder? This way all the content will be grabbed for the cards but I can still have it organized
    - I'm doing both :D

## Code-based changes
- [x] large-scale refactoring, mostly in Sphere.jsx
- [x] convert all images to webp to save space
- [ ] look into google indexing and crawling and how that works with markdown!

## Necessary Functionality
- [ ] IMPROVE PERFORMANCE ?
- [x] Spheres swell when hover
- [x] Show info on hover
- [x] Expand into modal when clicked
- [x] Spheres can be customized for different modal content, either via attribute or hard-coded (using an attribute is ideal...)
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
- [ ] portfolio activity entry styling
    - [x] Smooth when collapsing an entry in activity or portfolio
    - [x] add a hover tooltip on portfolio entries for keywords
        -[ ] fix tooltip stutter on first open
- [x] SPLASH/LOADING PAGE BEFORE SPHERES ARE READY
- [x] fix weird issues where clicking text does not register as clicking the sphere
- [x] prevent spheres from getting too close to each other
- [x] encapsulate space scene functionality
- [x] fix one-click closing for expanding activity/portfolio entries in contentFeedEntry
    - [x] add visual indactor that the entry can be closed by clicking its title

## Beautification
- [ ] add a big entry, probably pinned to the top of the portfolio entries (using my "out-of-bounds" numbering trick) about the website itself
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
- [x] Create little background cards (or STARS????) for every markdown file
- [x] Give background cards color (washed out, muted, kinda blurry) (i may be able to make these one-dimensional and have them face the camera but that could be cheap)
- [x] Make them fly into their respective sphere when that sphere is hovered
- [x] Glassy appearance effect?

## Optional/Stretch Goals
- [NO] Putting text on a flat visible card instead of wrapping it, still allowing it to face the user but being obviously on a card
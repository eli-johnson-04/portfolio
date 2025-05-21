**TL;DR: After making the topics look all nice, I'm working on enabling better support for mobile devices because I'm tired of getting my friends excited to read about my stuff and having to tell them to use their computer. Plus it's kinda embarrassing.**

# sucks.
Yeah, I'm not really enjoying this. I made the topics look all pretty, added an automatic post-counting and numbering system because I didn't want to do it myself, but of course the priority posts came into account and I had to **completely restructure** my markdown loading and processing system, create a new class and while its a lot more modular and elegant I'm just glad its over. 

*\*sigh\** but this isn't and it's been bothering me, so, here we are! Hey! It sucks. I don't wanna do this part, and I knew it would be a problem from the website's inception when I decided to be unconventional. *\*sigh\** that said I'm gonna make it happen and it'll be good *enough* and then I'll move on having the joy of knowing people will be getting a satisfactory experience from their LED slab. 

## the porlblem
The problem is that I don't know too much about how websites are structured behind the veil and how they work, since most of this site has been ThreeJS and (coping with) Tailwind and basic HTML. I don't know much about click events or how Safari is weird because Apple does weird stuff so I have to come up with different logic flows for opening spheres across devices. 

I decided that moving the mouse could trigger a hover event on a system not using a touch screen, and that a single click would open the sphere. However, on mobile devices, one tap would hover and the second would open it. Fortunately I have a resolve in what I want to happen here, so I am going to make it happen the way I want people to interact with it. That method makes sense, and this way I don't have to cut out the experience on mobile just because it would be easier to write. Then again, I'm gonna have to do some extra *\*coughboringcough\** Tailwind to make it look nice too, since I get a weird horizontal scrolling issue when opening individual entries outside of a subfolder and the text looks ridiculous crammed together in the middle of the screen. It sometimes annoys me that I do this but the website wouldn't have turned out as well as it has if I wasn't this way. *\*sigh\** so here we go!

I'm having to set up event listeners in my *main.jsx* to call handlers in *SpaceScene.js* since it deals will all the ThreeJS stuff to talk to each individual sphere in *sphere.jsx* to handle individual sphere states. Ugh. It'll be done soon, but now you have the luxury of my thoughts on it before its finished. 

![NASA Image of the Day May 19, 2025](https://www.nasa.gov/wp-content/uploads/2025/05/54521739963-b58dc96fbb-o.jpg)
###### Here's NASA's image of the day for May 19. I was gonna do today's but it was some jet and I liked this one two pictures to the right.

Mayor of Griperton, signing off. 
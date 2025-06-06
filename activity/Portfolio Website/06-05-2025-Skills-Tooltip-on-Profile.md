**TL;DR: Skills tooltip. Profile. Nice addition, not fun to make.**

# tbh

I saw my friend's website and she had a skills section in her profile, so I figured I should probably do the same. There's not much to say, but I had some fun with it. I grabbed a cool little black hole svg and customized the stroke color to match the text, then I surrounded the word "Skills" with it and the button looks pretty sweet. Maybe I'll make them spin at some point. Maybe in different directions.

That'd be pretty funny.

> **UPDATE:** I came back to my computer 4 hours after writing this and they spin now hehe

Getting the tooltip set up with markdown wasn't too bad (except for getting the container alignment/overflow right and creating an entirely new set of react-markdown html stylings), but the little voices in my head told me I was going to combust and blow up the Earth if I didn't make it look decent on mobile, even if my website is really just *functional* on mobile. I didn't have to redesign it from the ground up or anything, but I *did* have to restructure a lot of stuff to make it so the silly tooltip would actually be visible anytime it was open. Lots and *lots* of dimensioning and fiddling and trial/error until it worked, but what can you do!

There was another small detail with changing the text on the button hi button

![hi button](/images/activity/06-05-2025/hi-button.webp)
![bye button](/images/activity/06-05-2025/bye-button.webp)

bye button where clicking outside the tooltip hi tooltip

![hi tooltip](/images/activity/06-05-2025/hi-tooltip.webp)

bye tooltip would close the tooltip on mobile but not on desktop. It was a thrilling issue that I was about to leave as a "feature" until I discovered I could change the text based on the tooltip's state, or, rather, when the tooltip's interaction host (the button in my case hi button) has a visual change. Feels kinda ridiculous. Works kinda fine. Not gonna touch it.

Not what I wanted to be doing today, I would have rather been designing a foundational system I need for my latest VR stuff (go look at the first post in Virtual Reality Check Through the Skull). I spent most of today working on this (it took way too long), which sucks because I've been feeling like being awake for 18 hours isn't enough and I abhor getting less than the 6 hours I read somewhere as being the limit of sleep deprivation. I'd like to stay up later! But then I might as well not sleep at all, and that's not a desirable outcome. So I just push it reaallllllyyyyyyyyyyyy far.

*\*sigh\** Cheers!

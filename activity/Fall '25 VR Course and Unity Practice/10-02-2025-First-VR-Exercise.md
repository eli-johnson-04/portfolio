**TL;DR: Did my "first" VR tutorial, lovingly decorated a 1-room apartment, and animated some clock hands! I'm most proud of the clock, for sure - it took the longest.**

# FINALLY a VR exercise ugh

We're finally doing a Unity tutorial on developing with Unity XR! I obviously spent a lot of time doing this over the summer, but being taught from the game engine's own learning platform has proved helpful. Except for having to install a 13 GB editor from a few years ago. Not cool. I have >100 GB of my stuff on OneDrive and yet I still have maybe 60 GB free at any given time...

Anyway.

This exercise had two parts: VR project setup and VR locomotion. The setup was trivial, just downloading some files, installing a fourth Unity editor on my laptop, adding an empty room and foreground/background, and learning about build methods. Important stuff! I flew through it. There was also an optional exercise for programming a functioning clock for my own timezone. Obviously I had to do it.

## Coding the Clock

It wasn't as bad as I was expecting once I found `Transform.RotateAround()`. I already knew I would need a transform containing the center of rotation, so I set up my `AnalogClock` and `AnalogClockHand` classes, with `AnalogClock` containing an enumeration of `AnalogClock.TimeUnit.Hours`, `AnalogClock.TimeUnit.Minutes`, and `AnalogClock.TimeUnit.Seconds`. Every time `Update()` is called on the `AnalogClock`, it would pass the time to a list of its hands and have them each update their rotation. This was the setup:

![AnalogClock](/images/activity/10-02-2025/analogclock.webp)
###### Easy peasy. Give this to the parent Clock GameObject and assign some hands.

![AnalogClockHand](/images/activity/10-02-2025/analogclockhand.webp)
###### Assign a transform located at the center of the face, pick a time unit, and add it to the `AnalogClock`'s list.

However, I wasn't satisfied. Being a fan of watches (a hobby I'll likely ***never*** afford) I didn't like how it ticked, I wanted it to glide. I removed the check from `AnalogClock` that would force it to update only once per second, and moved forward. I knew I needed to address the distances between each of the tick marks, but I forgot that I would have to do it for the respective unit of the *hand doing the ticking*. For example, to make the hour hand glide I have to divide 360 by 12, then by 60 again for minutes, and again for seconds, then by 1000 for milliseconds. Yes, even the second hand is going to glide. And it works! It's awesome!

![SmoothClock](/images/activity/10-02-2025/clock.gif)
###### Tight.

![AnalogClockHandSmooth](/images/activity/10-02-2025/analogclockhandsmooth.webp)
###### It was sooooo awesome to figure this out. I'm ballin. Also I wrote it all without adding `f` for float, so I made constants because who caressssssss

Part two was more fun - I was to decorate the room with some specifically requested objects, and whatever else I wanted. I spent the better part of an hour on this, trying to see what all I could do with the surprisingly diverse options provided by the sample project. I'm pretty proud of the space, I wouldn't be upset with an apartment featuring this room. Maybe I'll get lucky and make enough money to have an apartment with more than one room!

This part also featured creating a teleportation area for the large rug behind the couch and adding teleportation anchors to some mats placed around the room, whose meshes I elected to hide because I didn't plan for my room to have them. They still work, but they just aren't as cool and awesome as everything else, so they're invisible :) Last, I added custom reticles, one for the large rug and a separate one for the anchors. I wanted to make it obvious that I put effort into making them appear visually distinct. Check out the finished product!

<iframe width="1339" height="753" src="https://www.youtube.com/embed/ePT19LW4cBE" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

...until next week!

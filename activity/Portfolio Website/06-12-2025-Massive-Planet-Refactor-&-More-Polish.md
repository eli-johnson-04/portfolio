**TL;DR: Made some stellar behind-the-scenes changes that nobody will see but me, but also gave the site the room to be a screensaver. Do I like web dev yet? No. Should I be working on VR? Probably. Did I still spend 4-6 hours? Yeah. I did.**

# Breathing new life into old filth

I made some massive changes that are 0% noticable from your end, but make my life so much easier (and my ego a lot happier). With the concepts I've been learning in game development, I decided to implement a proper state machine for my planets, which are instances of a class called Sphere. My *sphere.jsx* file is the longest one in the project (aside from rambling in markdown) that used to have lots of public attributes/methods and horrible state management that could be manipulated outside the class. Terrible, awful stuff.

![I Should've Used TypeScript](/images/activity/06-12-2025/shouldve-used-ts.webp)
###### JavaScript equivalents of enumeration are a joke, but at least I can access it with `SphereState.SHRINK` etc.

Yay states! I should've used TypeScript in the beginning, but this was a solution I found that worked well *enough* and didn't make me miserable. JavaScript is still ugly, though.

![Ugly React](/images/activity/06-12-2025/ugly-react.webp)
###### 👀

A relic of an older time. I couldn't make it private though. The react works like this, but not if there's a hashtag in there. I don't even care anymore.

Anyway yeah, the biggest thing was just making the interface better, making the methods make more sense, and letting each sphere handle its own stuff, the Scene handle inter-sphere stuff and interactions, and letting main do whatever main does.

The goal was to make the file shorter, although it actually got like 50 lines longer. Somehow, though... somehow it's easier to read (because that was half of the adventure).

I still have nearly 200 lines of code just for generating the **text** on the spheres, but I didn't have the energy to encapsulate it out and put it into a different file. Those functions just access too many private attributes and nothing uses that code except the spheres anyway. I don't care.

Point and laugh. Just about everything in the snippet is splitting text into lines, determining max line width, creating geometries and materials, spherical math to wrap the text onto the spheres and create separate spheres for the label and the hover text, setting them up with the right attributes to be manipulable for animations...

![Too Much Text Code](/images/activity/06-12-2025/code-for-text-spheres.webp)
###### blugggghhhbblllggghh. If it ain't broke, don't fix it.

## New features

I had my laptop plugged into the TV to watch a movie and my website was open, and I found myself just looking at it, realizing that it kind of makes a cool screensaver. I wanted to see if hiding the text would look nice! That's how I got to this refactor in the first place.

Now, after the first click or touch event, a timer is started every time the mouse moves or a click or touch occurs, and after 15s the text will hide on the spheres, but come back as soon as one of those three things happens. Gives it a little more life and invites me to add more to it later on.

Cool features, more learning, better practice, whatever. It's so great to have a passion project (I still **don't** like web dev), but not so cool when it isn't the thing you *should* be working on, or the thing you *really* want to work on, or the thing you're getting *paid* to work on...

It'll pay off one day, trust.

Cheers!

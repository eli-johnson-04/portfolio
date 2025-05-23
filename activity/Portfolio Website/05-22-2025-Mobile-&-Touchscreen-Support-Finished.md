**TL;DR: My changes are pushed, the sun has just finished setting, the cicadas are chirping, and life could not be more beautiful. No longer will this monkey rest on my back, for I have excised its metastasized grip from my conscience.**

> Indulge me; let this play while you read.
<iframe width="1340" height="754" src="https://www.youtube.com/embed/rjO2fhIyGXc" title="George Clanton - Dumb" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# yea its done
The one thing that has bothered me the most about this website was the fact that I knew mobile support was going to suck, so I put it off for months. Now, its the only thing I could put effort into before doing my own first personal mine-and-mine-alone all-made-by-me VR experience.

It sucked, and it's done. I put my nose down and conquered it. Nothing shall stand in my way. 

I heard recently that when it comes to making games or writing code, or anything really, there's a trap that's exceptionally easy to fall into where you focus too much on finding the best solution instead of sticking with the one you found hours ago that works and fixing it when you need to. I decided to run with this idea! There's *no* way this could get ugly, right? 

...right?

![Don't make me look at this again](/images/activity/05-22-2025/barf.webp)
###### Ohhhh yeah, get a load of this. Touch events are almost always preceded by a pointer event, so differentiating between the two is horrible! Horrible. Like this. Here, we wait for **10 milliseconds** to see if we get a touch event (since the two are registered at the same time but touch events always show up after pointer events?), and then use that to determine what the default interaction modality will be for the session: click-based or touch-based. This is equivalent to texting two of your friends, Early Earl and Late Larry, that you need a ride. Trouble is Larry isn't sure if he will be there. Unfortunately, if he shows up, you **need** to go with Larry. Since he can't tell you ahead of time, and you can't make any mistakes, you wait for 10 sluggish milliseconds and say "screw you!" to Earl and pop his tires because Larry made it. The cool part is that if you get picked up by Larry the first time, you need to get picked up by Larry **every time**, but he is never sure if he can make it, and it hurts everyone's feelings now that you have to pretend like Earl doesn't exist. If Larry shows up after you hitchhike with Earl, you've gotta pop his tires and figure out something else! You've set up your entire life around these two guys, you can really only stick with one, and you have to get it right the first time, every time. Otherwise your boss throws a tantrum because you have to drive to work twice on your first day to figure out who's going to be your permanent ride.

I probably could'be just waited 10 ms to detect if a touch event shows up and then flip a bool if it does to change the behavior of every pointer event instead of juggling them, but I can't reliably count on touchscreens to always send a pointer event. As a result, I always have to make eye contact with both Earl and Larry before having to potentially tell Earl I never want to see him again, and then seeing him again and making eye contact and popping his tires so he can't go anywhere, every day.

I'm not proud, and you shouldn't be either. But then again, maybe you should be! You might be reading this on your phone! It works! And you don't have to suffer for three hours to use it like I did, so have fun :D

## new makeup
I also dolled-up the appearance of the website as a whole, fixed some sizing issues and got rid of some unsightly scrollbars that didn't need to be there, and it should look pretty good on mobile now. 

It's time to celebrate because I'm able to tell my parents who love me so much and don't know a lot about this stuff that they can finally just use their phones <3. My friends as well, and myself. I can push my changes and check my phone later and move on. I'm ready to move on from thinking about mobile and to just focus on my internship and VR.

Just like with you, Earl. I don't want to play with you anymore.

![byebye](https://i.kym-cdn.com/entries/icons/original/000/028/033/Screenshot_7.jpg)

All aboard the Complain Train, departing Griperton immediately!
**TL;DR: Players can now sweep their hands over candles to "blow" them out (purposefully or not), or pinch the wicks!**

# Big Work, Small Changes, Big.... Learning...

I've been wanting to work on the story and work my way down so that I can figure out what kinds of interactions I need. For several days now I've been trying to work on this and not had the time. Last night, though, I had just turned off all the lights and was laying in the dark, ready to sleep, when I had an awesome idea.

I begrudgingly got out of bed (as I have for the same reason more and more lately) to get a sticky note, pen this idea down, and slap that thing on my desk for whenever I get to it. I have like four sticky notes of ideas that randomly struck me, just sitting in my journal. I wanted to see if I could make a gesture affording the user the ability to sweep their hand across candles to blow them out. Cool! Time to sleep.

Now it's today, Monday, and I got back from class. I was going to work on my game for a bit and then study for my databases class.

For a bit.

Two-ish-three-ish hours later and I have this!

![Sweep Interaction](/images/activity/06-09-2025/sweep-interaction.gif)
###### \*sigh of contentedness\*

It's not much, just a Static Gesture Detector (although this took a surprisingly long time to get the orientation right, I basically relearned hand poses) that talks to my SweepInteractor, which sends the message "OnSweep" to anything my hand collides with, provided my hand is moving fast enough. Its easily extensible if I want to allow other things to be swept and require different speeds for different things, but this part was fun. Gizmos are soooooooooo helpful (you can see it if you zoom in) ((the gif is cooler if you zoom in)) (((you should zoom in))).

## Roommate: "hey eli what if you could pinch the candles to put them out"

Oh yeah! What a cool idea!

![Sigh](/images/activity/06-09-2025/sigh.webp)

It kinda sucked. First I tried wick colliders, but they were inside the candle colliders so they were inaccessible to the near-far interactor for pinching, and then I didn't want to use multiple interactors or multiple interactables, and it was a mess for two-ish-three-ish hours. I did, however, learn about more types of interactors and interactables even though they didn't work >:(. Eventually I just gave each candle's wick a transform at the tip and said "if an interactor tries to grab the candle and it attaches at a distance closer to the wick tip than my threshold, turn off the candle and don't grab it" and it worked lmao.

![Candle Pinching](/images/activity/06-09-2025/pinch-to-put-out.gif)
###### Maybe my game is like, actually good, but also has fun little trinkets like this. It would be cool anyway though to force the user to not be careless with their setup to avoid putting out candles inadvertently via a hand sweep or pinch. I need to tweak the wick shader though so the tip doesn't look lit when it's not supposed to.

The code that makes this work is kinda ridiculous, at least the way I prevent the interactor from grabbing the candle. When `interactable` is selected it means that something is trying to pick up `interactable`. I have it set up so that `CheckPinch()` is called right after `interactable` is selected, hence the `SelectEnterEventArgs args` arguments.

![Silly Interactable Disable](/images/activity/06-09-2025/silly-interactable-disable.webp)
###### Basically, when the Candle is picked up, check if we need to turn the Candle off, disable the thing that lets the Candle get picked up, turn the candle off, and re-enable trhe thing that makes the Candle able to be picked up... **after the candle is \*technically\* picked up**. I don't have words - I really wasn't expecting the disable and re-enable to work. I do love negative space programming though.

So, yeah, quick progress update. Small update, big learning. I'm more familiar with XR interactor/interactable components and interfaces now. Taking what I can get.

What if I required the player to bring their fingers up to their mouth before pinching each wick...?

Cheers!

**TL;DR: I turned my old iPad Mini into a 3rd display, and set up my PC to SSH into it, turn it on, and open the app when my PC is unlocked! (I spent 8 hours automating a task that takes 8 seconds)**

# Exactly what it sounds like
## The music screen
I saw a TikTok a few years ago about someone who turned an old iPad into an extra display for their computer, and I remembered this over Christmas break '24. Unfortunately, my iPad was at school and I had two weeks left of break. It would have to wait.

I got back to Gainesville and got to work. I found the app that does the thing, Splashtop Wired XDisplay, and miraculously it works with iOS, like, 9. It does this over a **lightning** cable (you know, the 13-year old cable format?), so I set it up on my PC and my iPad. The case has a cool stand too, so I was able to prop it up really nice and I really just use it as a music display. I love it! It's a little small for anything else, but perfect to watch lyrics go by, or to have a cool audio visualizer while playing Guitar Hero. Windows recognizes it as a genuine display, and I keep it all the way on the "left" so I can still use my taskbar on the bottom. Check it out (and say hi to the duckies)! 

![iPad Mini Monitor](images/activity/ipad-monitor.webp)

## What am I getting into?
I thought to myself, as any normal person does:

> "I don't want to turn my iPad on every time I want to use it as a monitor. Surely, **surely**, I can automate this." 

![I was in for it](https://i.kym-cdn.com/entries/icons/original/000/044/438/Untitled-1.png)

...What ensued next was one of the most hair-pulling, stressful, and eye-opening adventures I have gone on for the sake of a convenience. But I'm a programmer, so, I stared this iPad in the eye until Machine Girl stared back without touching the screen. 

## This isn't illegal, right...?
Initially, I tried to use a VNC connection and a hotkey exectuable with the Windows Task Scheduler to run a script that would turn on the screen with Activator, a mostly gesture-focused tool for enabling efficient behavior on the iPad that also has a CLI library. Then my computer would open a VNC session, the iPad would constantly wait for and detect a VNC connection from my PC's IP address (hard-coded :p), type in the password, and open the app. Something this complex was definitely going to work! 

...It was worse than you think. Yes, iOS is written on top of Linux, but no, iPads do not come with bash installed, ipconfig or any inetutils/network commands, or tree, or openssh, grep (no, it does not have grep), gzip, lsof, NANO IT DOESN'T HAVE NANO, netcat, and a variety of other utilities I am used to. 

I jailbroke it. Thanks Reddit and ChatGPT, you guys are awesome, but you lied to me. This iPad had nothing I needed, and *I* didn't even know what I needed so I had to install it all as I went using the janky package manager. Once I successfully jailbroke it, I was able to start messing around and seeing what was possible. I learned that the standard iOS root password is "alpine", which is pretty cool (yes, I changed it and set up an SSH private key). I felt like such a hacker, SSH-ing into my 12(?) year-old iPad mini to write scripts that would run on their own. 

## This is what the Colosseum must have felt like

Except they didn't. I was at war with this thing. I had no idea how to have the system run this script on its own to detect a VNC connection, and even when I figured that out after several hours, the hotkeys were so frustrating. Eventually I used the VNC connection to run Activator commands to open the lock screen and open Splashtop, throwing hotkeys out the window, but this was a whole other adventure. I promise, you would be blown away at how difficult it is to locate the *filename* of an iOS application. 

I navigated through the abyssal bowels of this metal slab's filesystem for every bit of two and a half hours, installing standard terminal utilities through a fake app store. With extensive help from Claude and ChatGPT I was able to determine how to find it, and I took like six pictures so I could write a shell script that would run it for me, and I could have Activator run that. 

***FINALLY*** I had something real. I got the Task Scheduler to do the thing every time I unlocked the computer. But, it opened a big VNC application on my computer, and that's so ugly. Nobody wants to see this thing happening. It should be magic. 

So I made magic. Why couldn't I just use SSH and a shell script for the whole thing? 

I did. I'm a sorcerer. The whole script is like, 4 lines, and it works like a dream come true. I successfully spent 8 hours automating a task that takes 8 seconds. 

![8 hours of work](images/activity/the-culmination-of-8-hours.webp)
![Proof or it didn't happen](images/activity/the-proof.gif)
*I can't really express in words how good it feels that this just works when I unlock my PC. I just keep the iPad plugged in. And it works.*

## Everythingisfineeverythingisfineeverythingisfine
I accomplished the goal in only a single afternoon and evening! I slept so well that night, all five and a half hours before my 8AM alarm. After, of course, I answered the question: what if... what if locking my computer also locked the iPad? I wrote a script for that too, just to have Activator show the lock screen (since the iPad turns off the screen automatically 15 seconds after the lock screen appears). 

![Whatever, man](images/activity/ipad-lock-script.webp)

The script works if I run it manually but Windows doesn't like to do anything after the kernel sends the "locking down your system" signal, so I just left it since the iPad turns itself off after a minute or so anyway. 

> "...Surely, **surely** I can automate this."

I mean, I wasn't wrong. 
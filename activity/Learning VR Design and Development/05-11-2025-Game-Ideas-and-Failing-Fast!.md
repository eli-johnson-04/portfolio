**TL;DR: I tried to invent single-headset couch-multiplayer fishing for the Quest. Turns out, the hardware doesn’t allow this (yet). That said, I’ve now upgraded my collection of wild ideas and learned a lot in the process, so I press onward!**

# RIP, Single-Headset Couch-Multiplayer Fishing
I had two and a half hours alone with my thoughts in the car this past weekend, so I decided to think about some game ideas, mostly for the Quest platform. The last few days have been my first taste of failing fast, and while it felt pretty bad to get super excited and then let down, I have a better understanding of Quest limitations and capabilities, and I can have better ideas moving forward.

# The Idea
I wanted to create a single-headset couch-multiplayer game where two people fish together. In this setup, the headset wearer would use hand tracking and be the Captain, and the other player would see nothing but hold the inactive controllers as props attached to a rod and a reel, a blind Fisherman. Working together, the Captain pilots through a variety of environments, terrestrial and alien, while relaying information about the location/activity of fish and sea creatures of varying size and scale to the Fisherman. The Captain will tell the Fisherman where the fish is, relaying when the Fisherman needs to do specific quicktime events and gestures (swing left, swing right, left circle, right circle, etc) to catch the fish. At the same time, the Fisherman, with basically dead-weight controllers, will receive haptic feedback unique to each "trophy" fish, indicating fish on, or how close it is, or a constant buzz when it's ready to get yanked in, and then swing behind their head for the catch! All of course, within view of the Quest cameras.

This was based on the assumption that inactive controllers would still have pose data available for position and rotation, and that the bluetooth connection from the HMD to the controllers would remain open for haptic feedback. I was prepared to write recognition systems for gestures and haptic data sending, and I was super excited. 

I frantically voice-noted myself so I wouldn’t forget a thing, then started piecing it all together after the drive. I thought about how to calibrate distance between the players since they would stand apart, and I especially thought about how to balance the game since the Fisherman would need to have power over the Captain to force communication, spark the occasional conflict, and make the game fun for both parties.

**Captain over Fisherman**:
- Has information about the environment
- Knows about the ship location and pilots it
- **Can see**
- The Fisherman must understand their directions

**Fisherman over Captain**: 
- Boat can't move when the line is in the water
- Captain cannot fish
- Must succeed for the team to win, period.
- Captain must give good directions

I thought about other things as well, such as making the Fisherman appear to the Captain as a robot or non-humanoid so that they might be more (subconsciously) inclined to treat them less kindly, which might make for more interesting communication or sparking conflict and discourse. Many angles came to mind as I pondered the possibilities; lots of the implementation aspects that would go into this like audio cues (Sennheiser gave away a free set of plugins, one of which is for Unity VR surround sound - I could encourage players to use external speakers for audio cues), intuitive haptic patterns, and state systems for game logic. I felt like I had something marketable!

# Inspiration
It all started with thinking about using controllers as props in conjunction with hand tracking being used for play, and I considered the possibility that pose data, position and rotation, might still be tracked for the controllers but not used as input. As well, if the Bluetooth connection stayed open, maybe I could even send haptic commands. That’s when I thought, what if a second, blind player makes use of the still-available pose data? 

I considered prop hunts, dagger duels, and even about devising a collection of couch-multiplayer minigames. Ultimately, the fishing idea was so pervasive that I just kept going. I was inspired by games like *Overcooked* and *Keep Talking and Nobody Explodes*, the latter of which I used to beg people to play with me in VR. I love that game, and I figured that a blind fisherman could make for memorable experiences and appeal to a variety of audiences, with a promising opportunity for vision-impaired gamers!

I also knew that this was within my reach. Using the SDK I could definitely make even a rough prototype, since I am not a stellar modeler (...yet), and I felt like I might have struck gold. 

# :/
I was smart to take a reality check through the skull and learn more. I discovered that the controllers' pose data is ***not*** tracked when hand tracking is enabled, and that my backup plan, a rapid code-based swap request, could not occur frequently enough to give the illusion of both players having free reign due to calibration needs. This makes sense, as the Quest platform is designed for one player and my idea would conflict with the input model. It felt too good to be true, and Meta, if you're listening, controllers as props during hand tracking would be sick. My naive vision of having this game branded on an in-store Meta Quest Box was thrashed. Stomped. Beaten. Crushed. 

But not my drive. 

# I've got my boulder, and I've got my mountain.
I now know more. While still on the wave of using controllers as props, I came up with new ideas for the Quest 3's MR capabilities, which I am unable to prototype since I do not have a Quest 3. I love my Quest 2, but I had a thrilling idea that gave me chills. I won't say too much unless I have the opportunity to bring it to life, but a certain IP from Valve has me kicking my feet. 

I intend to keep ideating, learning, and working. I've been reading my bible, *The VR Book*, and it's fascinating. Everything just makes sense. My intuition for how I work and my ability to introject and analyze other people's patterns, subconsciously, has made this book feel like common sense, but through lenses I never considered. I am loving it - and highlighting things on almost every page. Gotta keep pushing!

> If anyone at Meta wants to enable controller posing while hand tracking is running, even as an optional experimental setting, let me know. I'll be on that. ASAP. I **will** be the first.
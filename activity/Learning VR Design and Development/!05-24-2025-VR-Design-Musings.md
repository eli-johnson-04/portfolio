**TL;DR: I needed a place to spew and enthuse about the new lenses of design I've been looking through, but I've also had some profound realizations about the impact of design and the impact I want to have.**

# A few thoughts

As I scrawl my highlighters through more and more of *The VR Book*, it's been so fascinating to learn the extent to which biology plays into our experiences (...obviously) and the role that our biological and perceptual experiences play in the design of everyday things. Speaking of, I haven't yet read Don Norman's *The Design of Everyday Things*, but what kind of designer would I be if I didn't (I ordered it between starting and finishing this sentence)? For VR especially, I cannot believe the complexity and interconnectedness of our audiovisual and physical sensory perception and how it impacts the way we experience an environment.

And how hard VR design is as a result.

> "Wherever you go, there you are."
>
> \- Confucius, most likely

What an incredible idea to find that designing every aspect of an experience intended for the most complex computer known to man is one of the most complex ways to design!

## Biology

### Eyes

I've known that foveated rendering is a thing for a while now. The idea of using eye tracking to render lower quality everywhere that you are not actively looking to save performance is super cool tech, and something that makes so much sense to exist. It's perfect design-wise; if executed well you couldn't figure out it was happening even if you wanted to **and** it only serves to benefit the system (at the cost of tracking delay). But seeing the diagram of cone vs. rod receptor density put it so much more in context of how big a deal it is, and made it even *more* apparent that it's just something that *should* exist. For reference, rods are better for detecting motion and seeing in the dark, while cones are better for high levels of light, seeing color, and seeing details.

![Receptor Density](/images/activity/05-24-2025/cone-vs-rod-density.webp)

##### Wikimedia Commons

###### This diagram is easiest to interpret as representing your **right** eye, and would be flipped to represent your left. 0° on the x-axis is the center of wherever your eye is pointing; this diagram is about the structure of the eye, **not** where you are looking. On the left side we see receptor distribution as the angle approaches the nose-side of your eye, and your temple is on the right.

It's also been cool to learn about the impact of field of view not just on immersion/presence (beyond my own experience) but also on motion sickness. Optokinetic nystagmus is a pretty funny term too, I didn't know we had a term for that rotating motion your eyes do when you get spun around a bunch or stare at a spinning object!

It was also a bit terrifying to discover that changing a scene during saccadic movements could be undetectable. Our eyes are incredible and so sensitive that they almost can't just sit still, more so than the tongue. Roughly 3 times per second our eyes do a motion called a saccade, an involuntary motion used for visual scanning and taking in information about our surroundings. They are the fastest motion the human body makes, and once started their destination cannot be changed. However, we take in far less information during the movement due to saccadic suppression, so if eye tracking got good enough to detect saccades we could witness frame-perfect unpredictable jumpscares or enhanced foveated rendering with seamless changes in rendering quality as the user looks around.


### Ears

There's one piece of information that has stuck with me more than a lot of other stuff in the book, since its application is so direct: Jerald recommends in the *Perception Design Guidelines* that promixity to an object should be indicated via an audio cue, while location should be via a visual cue. Our ears determine distance better than our eyes (although not vertical distance) and our eyes determine location better than our ears (although only in field of view). Light travels orders of magnitude faster than sound, but we respond to sound faster. Wouldn't it make sense that knowing how close an object is would be a bigger deal when responding to it? Of course, ascertaining location and eventually danger are important, but if something is far away, knowing those things becomes less pertinent. So, now I possess a key element of designing affordances and how to communicate a user's personal, action, and vista spaces. Personal space extends about two meters away from a user, action space is 2-20, and vista space is everything beyond that, basically backdrop.

![Funny Personal Action and Vista Space Image](/images/activity/05-24-2025/personal-action-vista-space.webp)

##### codenighter (DeviantArt)

###### Cool image that came up on Google when I searched for "personal space action space vista space" (I didn't find what I was looking for).

Vista space typically encompasses the rest frame, which ties-in to the stability of the scene and is one of the most important considerations for motion sickness. Don't get me started on the vestibular system, the little tubes and tiny organs in the ears that give us our sense of balance.


### Motion Sickness

I could talk for hours about motion sickness and VR sickness, but it all really boils down to a few things:

- Visual cues should match vestibular cues, so making users feel like their body is moving (vection) should be implemented carefully, and any kind of visual instability is dangerous
- Don't give users any reason to feel the need to adjust their balance (unless intentionally for an intense experience (looking at you, Richie and your silly plank))
- Divide visuals into two groups: one that represents content and another than represents the rest frame. This is generally just good practice in development and something I have already learned: separating static environment GameObjects from interactable GameObjects in Unity
- Test with lots and lots of users, especially those new to VR
- Minimize visual accelerations since the vestibular system cannot detect linear velocity, only changes to it
- Provide lots of comfort options, and **never** leave out snap turning as an option, unless really, truly, *actually* unnecessary


## Bigger, better, MORE!!!

There's so much more I'd love to enthuse over like interaction design, visual illusions, afference/efference and a slew of other things. I had a wonderful conversation with a dear friend yesterday about good design and my goals in learning VR design. Perhaps I haven't explored enough experiences yet, but there haven't been a great many that I could seat on a similar level as many of the incredible TV shows, movies, and flatscreen games I've played. *Lone Echo* and *Half-Life Alyx* were both incredible, among others, but I can't think of a list, really, of truly gripping experiences that changed part of me, even if minute. Presence is my biggest goal, and immersion is my dearest friend; I do lots of little things every day to heighten my immersion in a task or for an activity, even to the extent of feeling like chores just so I can maximally enjoy and be immersed in sitting down with some food and enjoying an episode of whatever TV show I'm into. This crafting of immersion and focus, of removing all distractions and giving myself the freedom to focus fully and entirely on the thing I am setting out to do, this is my goal with VR. I want to curate every single element of an experience and create something *moving*.

As I noted to my friend, there is a reason that everyone has a phone in their pocket. It's not just because it has a 25x zoom camera, or because it's a browser and a calculator and a notetaking tool and an instant messaging machine to talk to someone literally as far away as they could ever hope to get from one another. It's in their pocket because it has dozens of millions of songs in it, just about every single one they could ever want to listen to, and if not, the phone enables them to make new ones. They can read their favorite books, hear the voices of their favorite people, and share images of their favorite things. It's not about the technology, it's about the experience. Jerald notes this too, specifically with VR.

VR is on the precipice of hitting a point where it makes sense as something that *should* exist in everyday life. Cell phones do this because our standard for communication has necessitated instantaneous conversation, but it also enriches your daily experience. I want to be part of the cohort of designers that give VR a personal, enriching, and indistinguishable importance in one's daily activities. I don't care if they know me for it, and I don't know if making games is the way to make that happen, but I want someone's life to improve in a future-oriented manner because my design really reaches them.

I'm not finished reading the textbook, and I'm excited to get my copy of *The Design of Everyday Things*, but I'm also ready to finally make something! It's been difficult to find motivation to start because of uncertainty with my internship start date and because of pressure to learn more design stuff first, but I had a rad idea today that I want to iterate on and really explore. I'll be writing about it and seeing where it takes me!

Cheers :D

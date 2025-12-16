**TL;DR: This capstone of my prophesied VR class features some of my best work, and left me only pining for more time to pour effort into it. I loved creating a relaxing low-poly photography simulator, and I now only wish to do bigger projects, do them better, and make more!**

# "It's the Little Things"

Upon reading the textbook over the summer preceding this fall 2025 VR class, I was excited to get my hands filthy and gross in Unity for the group project. It definitely did not pan out as I had hoped, but such is life! I accepted it quickly and saved my lamentations for a stockpile of inspiration following finals week that I am now slowly unbinding. I had big big hopes for this project and although I did not meet them all, I still learned a lot and can apply it to the future; I had the opportunity to get hands-on with design questions I could not have thought to answer in advance, problems I had not anticipated, and of course, technical challenges along the way.

A semester's work of collaborative effort, nearly missing deadlines, and suffering through my other courses have produced my first planned and (mostly) completed VR experience, *Big World, Little Beauty*. This experience is a VR-based photography simulator for users to relax and simply take pictures of low-poly animated creatures that are then printed and can be picked up. There's a variety of animals and bugs, ambient background music, and a camera with configurable image parameters. Here's the demo!

<iframe width="1389" height="781" src="https://www.youtube.com/embed/4OLj4X4m-78" title="CIS4930 - Intro. to Virtual Reality | Virtual Realiteam - Big World, Little Beauty | P2 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## The Design Philosophy (Project Specifications)

Fortunate to work with a few dear friends, the **Virtual Realiteam** and I were required to compose a lovely relaxation-focused experience wherein a user is taken on a virtual journey, VR or not, built around Attention Restoration Theory (ART) (Kaplan, 1989, 1995). To briefly explain, ART focuses on a few key elements to ease stress on the mind, in turn reducing inhibitors to comfortable productivity and improving cognitive function:

- "Getting away" from stressors, major or daily
- Spending time in nature
- Directing attention acutely with easy engagement
- Fostering recovery of mental fatigue
- Enticing the user to want to be in the environment

The Virtual Realiteam and I brainstormed some concepts and landed on *Big World, Little Beauty*, where users will slow down their mental focus and direct it toward taking photos of low-poly animals in a virtual forest-like environment. I (not-so humbly) bear the heavy cross of coming up with the title.

No frills. Let's dig in!

## Scope

Although I am experienced with Agile methods, they were used more for milestones in the design of the course and the project. We had [five sprints](https://drive.google.com/drive/folders/12XW0DVFKmH2nlpjBG5j9yt7NFNVS7kSh?usp=sharing) and a final report, per the course requirements. I've included the report, as it captures the scope well.

<iframe src="https://docs.google.com/document/d/e/2PACX-1vTNwnFjg0bke01EHJp1Go78RgBVYNXXUccYXrk6ChJU224LCq5ijvijsOA9MZTQ3sK_VZ9ybrf1SobV/pub?embedded=true"></iframe>

In sum, *BW,LB* is not convoluted and the greatest complexities were in animations and camera programming. The user spawns in, they have hands that disappear when grabbing the camera, they can modify the capture parameters of the camera, and they just move around to take pictures of animals!

## Main Components

The four main components include the environment, the animals, the photography system itself, and the VR systems. Each team member's tasks had their own associated intricacies that I am not intimately familiar with, so I've detailed their efforts before my own.

### Environment

Yash owned the environment, and he created for *BW,LB* the terrain shape and the water. These elements are not complex, and he indicated that his semester was difficult so we did not have a problem with him owning them. He did a great job creating an engaging, varied environment (even though our play area was re-sized to be smaller than the world), and the water is perfect for our intended aesthetic.

However, I myself produced the treeline, the grass texturing, and a great deal of the vegetation and tree placement. I can hardly say I was satisifed with my efforts, but this project unfortunately fell lower on my priority list because it was the easiest of my courses to time required for tasks, and often demanded the least. Nonetheless I picked up on some nuances of material customization in Unity and learned how to use PolyBrush and tweak LODs.

Yash's efforts were crucial, though, as without him we would not have a meaningful capture of nature within the experience. Thank you Yash!

### Animals

Jonathan owned the animals and their animations, which started small and required a lot of grind-y effort to crank out - they only showed up in number and variety around Sprint 5. However, even though he was using pre-made animations for pre-made models that still demanded a concerted effort for animation controllers and timing, there's a plethora of animals with compelling visuals that make for lovely photo subjects. Thank you Jonathan!

### Camera and Photos

Callie owned the camera system and photography setup. Callie and I had to maintain a clear distinction of our efforts to be able to work independently in our caustic schedules. Here are her requirements (mine are listed in the next section):

- Camera model and style
- Viewfinder setup
- Configurable parameters and value-setting
- Copying the viewfinder's texture to a tangible object for [Polaroid-style photos](https://www.google.com/search?udm=2&q=polaroid+photo)
- Design hooks for VR interaction setup (somewhat collaborative)

Callie did a wonderful job with the camera and its associated tasks, and successfully developed a compelling photography system that was easy to use and understand. Together we (asynchronously) wrote this camera control system, but 99% is hers.

<iframe frameborder="0" scrolling="no" style="width:100%; height:557px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Feli-johnson-04%2Fbw-lb%2Fblob%2Fmain%2FAssets%2FScripts%2FHandheldCamera.cs&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&maxHeight=500"></iframe>

Thank you Callie!

### Hands, Locomotion, and Interactions

I have the most experience of the four of us with Unity XR, so I took the reins here. I owned the following technical goals:

- Source and animate VR hands
- Determine and set up locomotion modalities
- Make the camera and printed photos grabbable
- Design scope of interaction with camera
- *\*sigh\** Implement camera interaction using Callie's hooks

I'll go into detail, but not too much.

#### Hands

The hands sucked. Full stop. It took me long enough to find hands I liked, and learning how the animation of VR hands works irritated me to no end. I wanted so badly to rig up the animations that came with the asset, but it refused to work and I had to manually pose and model the hands myself, set up the animation controller, and rig the programming. I am happy to report that I detest this aspect of VR development.

#### Locomotion

Locomotion was okay, it was fine. Standard 2D continuous movement and teleportation on both hands. I would've liked to add a settings menu defining which hand determines smooth motion and which is for teleportation, but time constraints were limiting in many ways.

#### Grabbables

All I had to do to make the camera and the photos grabbable were to add XR Grab Interactables to their prefabs. This was easy until I had to make the camera interactable...

#### Making the Camera Interactable

I decided that the camera would obviously be a grabbable and would obviously only be interacted with when held by either hand. I wanted camera use to be effortless, but Unity XR purveys some level of handedness (i.e., interactors have a "handedness" property that allows filtering interactions by which hand is being used and which ones are permitted to interact). This meant I would need to define a sense of which hand is "in control" when the camera is being grabbed by both hands, and update its state based on which hands are currently grabbing it. This was the second-most difficult task I had for the entire project since I demanded it be effortless; it is not perfect, it does have bugs, but it is effortless and intuitive.

<iframe frameborder="0" scrolling="no" style="width:100%; height:557px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Feli-johnson-04%2Fbw-lb%2Fblob%2Fmain%2FAssets%2FScripts%2FAllowTakePicture.cs&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&maxHeight=500"></iframe>

###### I should've had more comments, but here's the idea - each hand has one of these components; all this component does is relinquish control over the camera controls (i.e., shutter and settings) if it isn't the first to grab the camera, and take back control if it grabs first or by itself. 

I also had to flip the camera's model around when the buttons appear to be on one side but the opposing hand grabs the camera. The name of the component isn't super precise, but its purpose changed as I wrote it.

<iframe frameborder="0" scrolling="no" style="width:100%; height:557px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Feli-johnson-04%2Fbw-lb%2Fblob%2Fmain%2FAssets%2FScripts%2FFlipOnLeftGrab.cs&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&maxHeight=500"></iframe>

###### I was doing my best for the code to be readable without comments (once again), but here all we do is mirror the camera's appearance by setting the X-scale of the model to 1 or -1 depending on if the oldest interactor grabbing it is right- or left-handed respectively, and move the screen a little depending on which hand is grabbing since the model doesn't perfectly mirror through the X-dimension. Cake.

The camera was set up to hide the hand models of grabbing interactors for immersion (and also because I didn't want to pose and animate the hands around the camera after my tribulations with the simple stuff). The most difficult task for me, though, was getting the UI working. Callie's hooks and UI setup were great, but I had to modify them a little since she didn't understand my requirements (my fault). That was easy, but getting the input to actually function in tandem with the hooks was the hard part - searching for input actions that actually did something and making my own to work with this system took way too long, but it works. Again - poor choice of component name, but it does what it needs to and only gets attached to the camera's prefab.

<iframe frameborder="0" scrolling="no" style="width:100%; height:557px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Feli-johnson-04%2Fbw-lb%2Fblob%2Fmain%2FAssets%2FScripts%2FFixedHandGrabbable.cs&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&maxHeight=500"></iframe>

###### Let's break this down. This component **extends** the XR Grab Interactable, meaning it **is** one but it **adds** or **redefines** parts of it. We rewrite `OnSelectEntering()` to say "when this object is grabbed, attach the hand to the left or right side of the camera depending on its handedness." We rewrite `OnSelectExited()` to say "**after** a hand isn't grabbing anymore, turn off the UI if that hand was controlling it". Then comes the most important part: every frame we check if a grabbing hand's thumbstick was pressed and we enable UI mode for that hand, which disables anything else that hand would use the thumbstick for (moving, teleporting, etc.). Afterward, once per frame, use that hand's thumbstick left/right to change settings, and up/down to change a setting's value. These changes happen inside the camera itself, which will update the appearance of the UI. Then, if the thumbstick on that hand is pressed again, deactivate UI mode and re-enable the other thumbstick-specific actions for that hand. On top of all this, the component also ensures only one hand can be in UI mode at a time, and it has to be the "dominant" hand holding the camera that was mentioned earlier.

Yeah. Geez. Yucky stuff but I learned a lot about the XR interaction pipeline.

## Takeaways and Future Plans

All in all, I loved working on this project. It was practice with VR/XR in Unity, and any amount of VR time was precious with the the sisyphean workload I bore. I refined some skills too:

- Creating quality work under exceptional circumstances/pressure
- Custom VR interactions and fooling around with handedness
- How to do controller-based VR hands
- Interfaces and connecting major gameplay systems
- Working remotely in a team
- LODs and distance-based detail manipulation
- Environment design for subconsciously imposing play area limits
- How much I love working on this and the never-ending nag of wanting to do more

Unsurprisingly, there were also things I wanted to improve or add:

- Better appearance of grass, ideally modelled
- Start and settings menus, credits
- Photo gallery, either with a carousel metaphor for the virtual printed photos or a menu-based gallery
- Saving photos to desktop
- More environmental variety
- Greater diversity in creature species and activities
- Greater dynamism in hand animations, poses for grabbing the camera
- Fixing the conflicting continuous move & teleportation providers
- Publishing!

I'd love to publish it, even though it was for a class. Either way, I am proud to have worked on it and I was blown away by how much easier it is to make virtual experiences as part of a team - I've done game jams but not on this timescale and certainly not with this much planning. It makes me excited for future opportunities in VR design/development, and emboldens my skills as I move closer to graduating with my bachelor's (one semester left)!

This post is the closing chapter of this topic, and I'm proud with the output I've produced and the skill refinement I've attained. I'm happy with the work I put in before and during the class, and now can only long for more opportunities like this!

Cheers!

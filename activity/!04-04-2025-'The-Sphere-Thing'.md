**TL;DR: Making this website was more of a journey than I was expecting, and far more personal than predicted. I've tied my loose ends feeling empowered, inspired, and with downforce in my momentum.**

# Background
## Cluelessness
This will be a long read.

I read somewhere that a great way to develop your skills and set yourself apart as a candidate for a position is to have a personal website. I thought about this for a while, but struggled to find the time to sit down and come up with something I was excited about. I learned about Ruby and Jekyll, GitHub Pages, self-hosting, and a wide array of libraries and web dev systems. I was daunted by possibilities. After traveling to Africa in Summer '24, however, and learning so much about user experience design in lecture and practice there (as well as taking another UXD course in Fall '24) I found myself with inspiration. 

I don't recall my inspiration for the site but the original plan was to create a 3D world leveraging Three.JS and GSAP to design a responsive, clean, and opaque-glassy aesthetic. The scene would feature three or more spheres that would open a React modal styled with TailwindCSS and display content that I did **not** want to write in HTML. I will do anything to avoid writing raw HTML, that is my last idea of fun. I didn't know much about web development, however, and after learning effective and responsible ways to incorporate AI into my workflow while in Ghana, I set off on ideating. I knew there had to be a way to make this easy...

## The spark to the inferno
For my algorithms abstraction and design course I elected to use Markdown to compose PDFs of our documentation, because of course a tool like Pandoc exists. Those PDFs were gorgeous, and I was so enamored every time I went to submit work with how good it looked with the formatting and the LaTeX for our formulations. What if I used Markdown for my website? 

> "Could I create a static site that converts Markdown to HTML so I can easily update website content?" 
> 
> "Yes, this is a great idea for creating a static, easily-updatable website. Using *react-markdown*, you can convert..."

I knew it was possible. 

### Enter react-markdown
Written as a React component, react-markdown allows a user to convert Markdown into HTML quickly and efficiently, and, as I would discover later, permits the inclusion of custom styling during conversion. I now had a plan. 

## Design
### Scenery
I wanted to have a blog-style Activity feed for regular updates on the website, my courses, and anything else related to development, and a Portfolio feed for resume projects and work experience. I also had some ideas related to creating an environment constructed from glassy, arbitrarily-colored cards in the background, further from the spheres. Each one would correspond to a single Markdown file that would fly into the sphere when the sphere was hovered, also causing the sphere to swell. I also wanted a Profile sphere for my contact information and bio with a headshot. 

When clicked, the sphere would "explode" and show the modal of the content. When the modal is closed, the sphere would shrink back to normal size, and the Markdown cards would fly back out where they belong. 

Lastly, I wanted physics effects so that the spheres would hover idly without straying too far, and would respond to the location of the mouse so it could be pushed but not too far, otherwise it would "fall" off of the tip of the cursor and spring back to its original location, with each sphere connected by a black line (because it would look cool).

### Principles and Theory
If I was going to do this, I was going to do it right. I made a backlog, and thoroughly considered how I would approach design. I wanted there to be as little confusion as possible about what was going on and what to do. Upon being presented with spheres, the assumption was that you have to interact with them in some way, especially since they move on their own and there isn't much else to look at.

I wanted the website to be clean and difficult to misunderstand, while fresh, exciting, and unique. I try to carry myself this way and present like this to others, so that the burden of being understood does not fall on others. This was a **core component** of my design and thought process. As such, the *world* would be the unfamiliar and exploratory component, while the *content* would be easy, familiar, and unmistakable. This being my first website gave me impetus to not over-extend myself with how I present it, although if given the opportunity now, I would love to see where I could take the presentation of my content. Nonetheless I moved into styling.

I chose a clean color palette of off whites and matte-glassy hues across the rainbow, with black reserved for contrast. I wanted it to be easy on the eyes, easy on the mind. Every action taken by the user should elicit clear visual feedback that something has happened if that action impacts their experience. Moving the mouse shouldn't do anything, but hovering over a sphere should be obvious as an invitation to click it. Moving away should make the sphere shrink back down. Clicking it, well, there will be no mystery what is happening. Titles, clearly-displayed content, and a large portion of the screen now covered by non-3D objects indicate a familiar experience to navigate the content as opposed to the world.

I jumped into Figma and created a rough but illustrative mockup as I learned more in my UXD class. The last update was sometime in September or August '24:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/ANQZOYEZztrtknOjaXgai2/Portfolio-Mockup?node-id=1-2&p=f&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share" allowfullscreen></iframe>

Ooh, boy. I was excited. 

# Development
Suffice to say, development was brutal. I was confident in my scripting and systems programming, but web dev is just different. JavaScript is a fickle beast, and I love love ***LOOOOOVE*** how everything fails at runtime :)!!!! I had a basic understanding of JavaScript, but if I were to start over, I would use TypeScript. Not having types has definitely slowed me down and is not what I am used to. 

## Hurdles, leaps, and bigger hurdles
Every step of this project has been a discovery of something new, a facepalm for something simple, or a sacrifice. As I look back through my commit history, I was smart to play around with basic things and take my time. 

I created the spheres and added hovering, added some lighting, and learned how to lock the camera to not rotate too far, as it made it difficult to find the spheres again if over-rotated. I added the text and gave it animations based on the state of the sphere, to change dynamically with it and use the same GSAP eases.

I created a branch just for the modals and worked on them there until they got to a place where I was satisified with merging them into the main branch avoiding breaking changes. This part was hard. I hated this part. Getting React to work with manually handling interactions for Three.JS objects sucked, and I employed some AI help to figure out how to do this, but I got it working. Even if I had to write some truly ugly stuff. JavaScript is such an unserious language and it felt fitting to leave facetious commit messages and comments on ugly code. Like these: 

![Ugly JavaScript React](images/activity/ugly-js.webp)
*This is so ugly man.*

![Ugly Modal Member](images/activity/ugly-modal-member.webp)
*Not as bad, but still. I strongly dislike JavaScript's lambdas. It makes sense for web dev, but euuggh.*

After this I continued on when I had time. I fixed bugs, made the spheres face the camera for liveness (which eventually changed to just the text so sphere textures made sense), customized scrollbars, created some favicons that worked across multiple devices, and added a whole slew of improvements, finally adding my first markdown file five months after creating the repository. From there it felt like a nag, but I was still excited to get it done. 

## Standards
I gave myself high standards, some intentionally and others happened on their own. If I had the time I would love to rewrite this entire website better, with better code standards and more effective modularization, especially since there was plenty of bloating and debloating and large commented sections all over the place, relics of the learning process. I employed heavy use of documentation for my stack, and AI for logic I simply did not understand. For example, handling click events and how to forward those into sphere behavior, encapsulating functionality of deeply-intertwined groups of code into separate units, setting up the lovely starry shader I found, and verifying that my ideas were feasible before learning to swim by jumping into a moving river. 

Nonetheless I took pride in ensuring my code was readable, made sense, and followed a pattern. Unfortunately, as time went on and my opportunities to work on the site grew further and further apart, it became more and more difficult to keep up with the standards since I still had so many things to attend to, in and outside of school. There were only a few places I really felt I suffered, like the use of underscores for members in *Sphere.jsx*, and not implementing this idea into other classes. I like it, and I used it heavily in my Linux modifications (see the Portfolio entry!), but it became difficult to keep up with as I was more and more focused on getting things implemented, or getting the website online, etc. I also feel I fell short on keeping it consistent, but this was one of my first truly personal projects unrelated to a course and I learned a lot about how I personally like to code throughout this process. I would absolutely do it differently. 

But there are also things I would do again. I have learned so much about OOP and functional programming during these last two semesters, how to foster readability in complex code, and when to encapsulate behavior into another function or another class. I feel so equipped now to write quality code that is readable, effective, and concise. I was proud of my encapsulation here, and I felt I did a great job setting things up in a way that made sense, i.e., *main.jsx* should set everything up and run everything, and *Sphere.jsx* should handle everything related to sphere behavior and managing sphere state, and *SpaceScene.jsx* should handle everything related to the scene and how the scene functions. 

Put more simply, I'm proud but I can still do better. And I intend to. 

## Evolution
The development process felt like stop sign after stop sign, where I would make progress and have to stop then start again. Whether due to lacking time to develop, or struggling to get something working or whatever, it frequently was frustrating, which led to changes. 

I was exploring star shaders to give the website more personality per the recommendation of a few friends, and it was here that it began the metamorphosis into what it is now. The planets came further down the line, but I wanted enough visual diversity to be cool. I ultimately chose Pluto for the Activity sphere, Callisto for the Portfolio, and Eris for the Profile. I think they look great, but I would love to add some normal mapping and displacement mapping to really make it special. 

## Personal website? Maybe a little *too* personal...
This website has been not just a skills-based journey, but also one of personal development. I am undoubtedly capable of thinking like a computer and designing procedures and algorithms that accomplish nuanced goals, but there is no mystery that this market is saturated, and competition is stout. It has terrified me and it still does, but this website has been an opportunity for me to prove to myself that I *can* be competitive, I can market my skills, and if nothing else, I ***can*** execute a vision. That has been my favorite part. Learning that I can make it happen. 

I have mixed feelings about this website taking nearly 7 months, and about the standards of my code, but I refused to let any of that get in the way of the experience. I was not going to sell myself short of how I wanted to be seen, so I *did* work on the swell and shrink animations for half a dozen hours, creating custom eases and tweaking times and getting it *just* right. I *did* play with the styling of the markdown for a while until it was an aesthetic I was happy with. I tried so hard to be meticulous, and to leave few places for a visitor to find a hole, or an issue, or to be left wondering what was going on or what to do. If **nothing** else, I made what I wanted to make and crafted the experience I knew I was capable of and deserved to be seen for, and now, I have the inspiration, the drive, and the confidence to do anything else. 

I have never doubted my ability to do anything I want to do. I could study biology or chemistry or medieval literature (I am taking a class on this right now) and I know for a fact I could be skilled and knowledgable, I just need to focus that into the things I really want. And with this emotional journey of hair pulling and showing off and encouragement from friends and family and sitting down and locking in, I am going to figure it out. I am going to do what I really want to do, and nothing will stop me. Certainly not GitHub Pages (it took me 12 hours to get my website to deploy and the issue was so small, so tiny, I couldn't believe I went to so much effort to fix it) ((I broke the deployment the next day for another half-dozen hours)).

At this point it is not perfect, but it never will be. I am always going to want to keep adding more, and at the time of writing, I still don't like web dev. I am excited to explore VR (and am considering integrating WebXR here :0), as it is something I have thought about for a long time and have been emotionally supported enough to feel is a worthy investment of my time. Especially so, since this website will no longer be nagging at me, a shadowy figure in the recesses of my mind's idling that gnaws at my resolve and cultivates feelings of inadequacy.

I may update this at some point, but that's everything worth mentioning for now. If you read this far, I appreciate you taking the time to understand how much of a journey this was. Please enjoy. 
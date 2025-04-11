*Feel free to read 'The Sphere Thing' in my Activity feed for a personal reflection on the journey of realizing this vision.*

# Structure
## Stack
This website is built on HTML, CSS, JavaScript, and Vite, with the following tools and frameworks:
- Three.JS: world construction, spheres, 3D objects
- GSAP: all 3D animations and many others for non-Three elements
- React JS: modals, custom components
- TailwindCSS: (almost) all HTML styling
- react-markdown: conversion of Markdown files into HTML
- rc-tooltip: React-based tooltips for keywords and TL;DRs
- GitHub Pages: deployment and hosting
- Miscellaneous: PostCSS, rehype-raw, simplex-noise, autoprefixer, dat.gui 

## Design
### Initial Plans and Mindset
I heard about Three.JS and was intruiged; I figured I could make a unique experience with Three.JS and GSAP to create something personal, something different.

This website initially was going to have three spheres, where two of them were connected by black lines to one of them in the center. These spheres would bridge between the *world* and the *content*, as it were, to provide a medium between the experience and *my* experience. These spheres would swell and shrink when hovered or unhovered, and would expand into a React modal, styled with TailwindCSS, when clicked. They would feature a title and hover text, which would change with its state to provide information about what the user is seeing. 

Each of the spheres would contain different information. There would be a Profile sphere, with information about me, contacts, a bio and a headshot, an Activity sphere containing a feed for regular updates on my work and classes, and a Portfolio sphere with entries for completed projects. 

The color pallete would be glassy, modern, and matte, with off-whites and muted colors to be easy on the eyes and easy on the mind. Simple. 

I elected to use react-markdown to convert Markdown files to HTML with custom tailwind styling, as this would make it breezy to add new content or remove it. Every Activity feed post is a Markdown file, and every Portfolio entry is a Markdown file. After completion, I would only need to write Markdown! I also don't enjoy writing HTML. Each Markdown file would have a corresponding glassy card somewhere in the environment, and when it's corresponding sphere was hovered (for example, the activity sphere), all the Markdown "cards" (or however many there were supposed to be) would fly into the sphere as it swelled, or fly back out when it shrank. 

After traveling to Ghana and learning about UXD, as well as taking a course on UXD specifically the fall afterward, I did some serious consideration and lots of drawings before jumping into Figma. I had a design mindset covered in my activity feed that I will also include here. 

If I was going to do this, I was going to do it right. I thought a lot about what would go through someone's mind when they interacted with my website, and I conducted think-aloud sessions during the drawing phase, after prototyping, and many more times during development. I wanted there to be as little confusion as possible about what was going on and what to do, hence the limited range of things on the interface. The user's first instinct is to move the mouse around and see what happens with the spheres, which I verified in testing were "inviting to click on when hovered". Once presented with non-3D objects, it becomes far more obvious what is happening. Every action taken by the user should elicit clear visual feedback that something has happened if that action impacts their experience or journey. This was all intentional; I did not want the burden of understanding to fall on others, I wanted them to be able to explore intuitively, with everything being offered to them as they sought it. 

I would like to believe it has worked out. The *world* is the unfamiliar and exploratory component, the uniqueness that captivates you like the hook of a gripping story. The *content* on the other hand is familiar. It is what you came here for, and now you have found it. New and exciting leads into easy, familiar, and unmistakable. All with a modern, warm, comfortable color palette and styling scheme that practically begs you to relax.

This was my mockup, last edited sometime in August or September '24, shortly before I had all the designs figured out:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/ANQZOYEZztrtknOjaXgai2/Portfolio-Mockup?node-id=1-2&p=f&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share" allowfullscreen></iframe>

I made a backlog in my [repository](https://github.com/eli-johnson-04/portfolio) and organized my ideas, and got to work. 

### Evolution
Of course, that is not where the website is now. The website features Pluto as the Activity planet, Callisto as the Portfolio planet, and Eris as the Profile planet. The background is also not white, it is a lovely starry sky shader I found and incorporated, kickstarting the change from clean to cosmic. 

As I made more space changes, the Markdown cards were daunting, and I figured they could be better as stars anyway. I added point-based stars that function the exact same as the cards were going to, and they add to the atmosphere. 

# Implementation
## A learning experience
I cover nearly everything relevant to the construction of this website in my Activity feed, but there are a few key components worth mentioning. 

This was hard. This tested me. I was challenged programmatically and emotionally to create something I was proud of. Above all, I had a vision that I was going to execute, and not necessarily by any means, but I refused to let the means stop me. I started strong, with a defined backlog, a prototype, and a plan, and I got to work with trying out ideas and starting small. As the challenges got more difficult I had to use more resources, incorporating support from friends and LLMs to assist in niche, nuanced problems specific to my stack and vision that I could not resolve on my own. Suffice to say, I have emerged victorious and learned so much. 

Over the last several months I had been bothered by not enjoying web development, imposter syndrome, lack of time, and wanting to pursue other things as I find my groove in software. I refused to let these get in my way, however, and I realized my plan nonetheless. 

My code standards were tested and I learned substantially about how I like to organize my code, as well as how hard it is to do so consistently. I actively benefitted from trusting in the value of encapsulation, modularity, and short functions, and saw how much easier it was to debug using a call stack when doing these things. To that end, I would love to rewrite the site again, in TypeScript, so I can hopefully avoid a lot of the JavaScript irritation that made this such an adventure. I also would like to see if I could place the *content* into a unique medium like I did with the *world*. I didn't want to over-extend myself on my first website, but I know I could do more. 

## Deployment
I acquired a custom domain name and set out to deploy the site on GitHub Pages, since it only needed to be built and served; it had no external sources. This was brutal. I read the documentation and employed AI assistance, and I fell short. For nearly 6 hours GitHub was generating my artifact while serving another that *wasn't even built*. I did not catch this until I was interacting with Claude and realized that GitHub was executing two deploy scripts, only one of which actually served content. 

> "Is it possible that GitHub is generating an artifact after building my site but a different script is deploying an unbuilt artifact, hence the MIME error referencing *main.jsx*?"
>
> "You have raised a crucial point! Yes..."

I didn't read anything after those seven words. I fixed the problem.

Two days later I wanted to see if I could make a preview build from the dev branch and serve it separately, and broke my deployment again. I was so frustrated. I fixed it several hours later, but resolved not to touch it again until merging all my dev changes into the main branch and permanently serving the site from main. 

Once I got the site to build and serve as intended, the finish line was finally in sight. Since then I have been adding small features, improving performance, and generally increasing the quality all around. I will reiterate, as I have many times before, I do not enjoy web dev, but I have been entranced by the actualization of this vision and I could not be more excited to have it finished, and to try out new things with my newfound resolve and confidence, empowerment and zeal. 

*Keywords: JavaScript, HTML, CSS, React, TailwindCSS, Three.JS, Vite, GSAP, Markdown, react-markdown, GitHub Pages & YML, backlogging, UXD, think-aloud, scope creep, modularization, encapsulation, readability, static website creation, SEO, deployment, hosting, JSX, web development, frontend, backend, graphics, texturing, lighting, Figma, project management*
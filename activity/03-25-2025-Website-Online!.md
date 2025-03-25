# The website is up!
Today I finally got this website available. I've been working, hard, for a while now, and I decided it was time to make it public after an internship opportunity fell through. I have some more things to add and content to include before including it as part of applications, but all I have to do is hand out the URL! 

## Losing my mind
I had a major issue as I was putting the website online; my GitHub deployment script was building the website correctly and the proper domain name was showing up in the URL, but no content was visible. I tried over and over to configure and reconfigure Vite to correctly transpile my JSX into JS, but I kept getting an error about an incorrect MIME type: my *main.jsx* file was being referenced and was not of the correct type... but after transpilation there **shouldn't be a *main.jsx***. 

It did not occur to me until I had rigorously examined every possible part of my project structure (and made way too many commits while testing deployment) that the auto-generated GitHub build and deploy action was messing with the one I had written and rewritten. Alas, the secondary build script was serving an artifact that hadn't even been built! I couldn't believe this didn't occur to me. 

It was resolved in 10 minutes and I picked up my head from my hands shortly after that. I sank probably 7 hours into this problem.

## Road to production
Now I am going to prettify the spheres, keep them from colliding inadvertently, fix some click detection issue, and add more content! I want to ensure the profile stays consistent across varying screen sizes (I detest frontend work) but if I'm going to do this, I'm going to do it right. More updates soon!

**TL;DR: Website is working after hours of toiling. More content and inclusion on applications soon!**
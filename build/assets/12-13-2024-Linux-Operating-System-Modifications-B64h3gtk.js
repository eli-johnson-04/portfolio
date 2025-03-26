const e=`# Custom Boot Message and Syscalls\r
## Boot Message\r
For the first part of this project, I worked with a modified version of Android Linux to add a custom boot message. By adding the following line in the Linux boot routine *init/main.c*, I was able to print a message before the kernel finished booting (after recompiling and reinstalling the entire kernel multiple times through the learning process).\r
\r
\`pr_err("\\n##### Elijah Johnson - I found the boot routine! #####\\n");\`\r
\r
In my operating systems course, this was a fundamental step in learning how to navigate the complex architecture of a kernel.\r
\r
## Syscalls\r
The second part of the project was far more involved. I added a system-wide and globally-tracked process log level, which determined a "filter" for which processes could log to the ring buffer. It sits atop the Linux logging system, and follows the same 0-7 level constraint. The Linux levels and corresponding custom **process log levels** are as follows: \r
\r
0. KERN_EMERG   - PROC_OVERRIDE\r
1. KERN_ALERT   - PROC_ALERT\r
2. KERN_CRIT    - PROC_CRITICAL\r
3. KERN_ERR     - PROC_ERROR\r
4. KERN_WARNING - PROC_WARNING\r
5. KERN_NOTICE  - PROC_NOTICE\r
6. KERN_INFO    - PROC_INFO\r
7. KERN_DEBUG   - PROC_DEBUG\r
\r
After adding the syscalls to the 64-bit syscall table for x86 architectures, I defined their prototypes and wrote their behaviors using the standard \`SYSCALL_DEFINE\` macros in  *kernel/sys.c* so that processes can only log at the same level or more severe than the current **PROC_LOG_LEVEL**. The syscalls were then wrapped in a library to be accessible from user space (and human-readable). I am proud to report that I did not brick the kernel even once, and I was thrilled to learn about navigating these low-level operations.\r
\r
![Syscall Tests](/images/pf/syscall-tests.png)\r
*A screenshot of the ring buffer after running my test suite.*\r
\r
# Memory Manager\r
Part 2 involved the design and creation of a static memory management library. I obtained a large initial space from the OS, then maintained used and free spaces with a variety of allocation strategies while handing out blocks to other processes. Key operations included:\r
- Initialization with a specified word size and # of words\r
- Securing a space from the OS to be "rented out"\r
- Creating a pointer to "rented" blocks for requesting process to use\r
- Allow processes to "free" their "rented" space\r
- Selecting various allocation strategies\r
- Tracking used and free blocks, consolidating adjacent free blocks together\r
- Testing with Valgrind to prevent memory leaks\r
\r
This project was brutal, but it fostered a real enjoyment of manual memory management. I found it exceptionally rewarding to see everything just *work*, and the logic of designing and implementing the processes of a (limited) memory management system was quite gratifying (except for bit operations :/). \r
\r
Smart pointers are cool. \r
\r
# Doom .WAD Filesystem Library\r
By far the coolest project of the three, I implemented a system that reads a custom .WAD file and interprets the inner structure as a filesystem. The header data of the .WAD contains the number and location of the file descriptors, where the descriptor list was at the end of the file and lump data was in the middle. \r
\r
My libWad filesystem uses a stack-based traversal of the nested file structure to create descriptor objects of varying types represented in both a hierarchical tree and a rapid-access map. The library features operations that enable a FUSE daemon to get information about each file and directory and be mounted directly to Linux! I was able to interface with the now-antiquated Doom map file as a valid filesystem. FUSE was interesting as well, I never considered that custom filesystems could be necessary until I started looking online about how to use the thing. \r
\r
Nonetheless I was able to permit common file operations (touch, mkdir, rm, cp, etc) and copying in/out large files, a staunchly empowering success after many hours behind the screen. If I didn't learn *anything* from writing a C++ memory manager, I definitely did here. Reading and writing and rewriting to byte offsets was tedious to keep up with and required of me an attention to detail and incredible amount of whiteboard time I had not previously encountered in my study. I loved it. \r
\r
![Exploring the Wad](/images/pf/exploring-the-wad.png)\r
*Mounting and exploring the directory in search of the holy grail.*\r
\r
![Making Inner Directories](/images/pf/making-inner-directories.png)\r
*Making and copying files, persistent across mounts.*\r
\r
> Smart pointers are cool. \r
> \r
> -Me\r
\r
*Keywords: syscalls, boot messages, Linux kernel, dmesg, ring buffer, Valgrind, memory management, pointers, alloc/free, allocation strategies, static library, filesystems, FUSE, mounting*`;export{e as default};

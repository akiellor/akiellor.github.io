### A foray into Kernel Development

Off the back of a couple of discussions with colleages about unikernels and the tooling that is sprouting to support the idea, I decided to learn a little more about kernel development.

[OS Dev](http://wiki.osdev.org/) provided a pretty good starting point with its [Bare Bones](http://wiki.osdev.org/Bare_Bones) tutorial. This tutorial takes you through to having a working 'Hello World' kernel. It mostly includes all the required code samples. The most difficult part of this tutorial was getting a gcc cross compiler working. OS Dev has a tutorial [GCC Cross Compiling](http://wiki.osdev.org/GCC_Cross-Compiler), but it was filled with manual steps and I struggled to get something working. Thankfully there had been some work to script the cross compilation by another tutorial [How to build a GCC Cross-Compiler](http://preshing.com/20141119/how-to-build-a-gcc-cross-compiler), the scripted solution worked almost unaltered.

You can find the resulting kernel here [Hello Kernel](http://github.com/akiellor/hello-kernel).

##### Learned about

* the x86 architecture
* the multiboot specification for bootloaders
* a little assembly code (and that there are two dialects, AT&T and intel)
* VGA and the framebuffer
* a little C

 

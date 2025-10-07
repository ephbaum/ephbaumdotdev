---
title: MAMP Pro 3 + PECL + Extensions = Working MEMCACHE
postSlug: mamp-pecl-memcache
slug: mamp-pecl-memcache
pubDate: 04/20/2015 07:00 PM
imgUrl: "../../../../assets/img/ephbaum_dot_dev.png"
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description: "When MAMP Pro needs memcache extensions but the GitHub repos aren't keeping up—learn how to compile PECL extensions yourself. A complete guide to setting up MAMP's build environment, configuring PHP paths, and installing memcache without breaking your development workflow."
layout: ../../../../layouts/BlogPost.astro
---

Through a twist of fate well beyond my control I find that I must use a development environment every day that requires MySQL, Apache, PHP and Memcached. As it happens, through various personal life choices, very probably also well beyond my control, my daily driver is a MacBook Pro and thus, through various other factors and decisions, I use MAMP Pro.

It's in running this configuration, you see, that I have found the need to regularly install new memcache extensions within MAMP and while at one point I was able to utilize this  [majksner/php-memcached-mamp](httphttps://github.com/majksner/php-memcached-mamp) repo for a compiled version, for whatever reason they're not really keeping up with the latest releases of MAMP. As a result I've had to figure out how to compile them myself.

Here's how I do that, if only for my own recollection. My hope is that this might help others with similar needs. Assuming that MAMP Pro is already installed I start with:

### Step one:

##### Install Memcached service:

Assuming you're clever and have already installed homebrew, you install the memcached daemon thusly:

    brew install memcached  
    

Once installed, to start memcache I just add

`/usr/local/bin/memcached -d -m 512 -l 127.0.0.1 -p 11211` to a script somewhere. perhaps in a `startApache.sh` file... (hint, hint).

> For reference, I've used Alfred to launch memcached with a simple workflow. It works well for me, and I don't bother autostarting memcached with MAMP because only one of my hosts needs it and I prefer to get an error if it's not running to remind me that it should be running...

### Step two:

#### Access MAMP's /bin From Command Line

This part isn't difficult either.

If you try to use `which php` from your terminal interface of choice, if you haven't already made any changes to your environment (which is entirely possible, since you've installed homebrew you're already a bit of a power user, aren't you?), the output will be `/usr/bin/php`.

If you try to do anything with `pecl` you'll be told that the system has no earthly idea what you're talking about.

That means we need to tell the terminal to use a different path for for exectutables. In this case we want to use MAMP's PHP folder(s).

For me I have all of my `$PATH` exports in `~/.bash_profile`, however, depending on your set-up and which tutorials / paths you've followed or updated in the past, you may use `~/.profile` or `~/.bashrc` or some other file.

Open the file in your editor of choice and add the path for your MAMP's PHP like this:

    export PATH="/Applications/MAMP/bin/php/php5.5.23/bin:$PATH"  
    

If you don't want to edit your files or would prefer it just be handled for you to some extent, you can copy pasta this, remembering to change the path to match whichever version of PHP you are going to be working with:

    echo "export PATH=/Applications/MAMP/bin/php/php5.5.23/bin:$PATH" >> ~/.bash_profile  
    source ~/.bash_profile  
    

> The first command stuffs that line into the bottom of `~/.bash_profile` or creates the file if it doesn't already exist. The second command simply tells your terminal to read the file.

A quick test of `which php` and `which pecl` should report that they are now being sourced from your path above e.g. `/Applications/MAMP/bin/php/php5.5.23/bin/php`.

If you plan to build more than one version of an extension, you'll need to **change** that path for each after you complete the rest of the steps.

> I've not run into this issue, but if you try to run a command like `php -v` and get `Permission Denied` you might need to make these files executable. MAMP should have installed this way, but as always you never know what to expect. Use `chmod +x /Applications/MAMP/bin/php/php5.5.23/bin/*`, adjusting the path for your version, and try again. It should work.

### Step three:

#### Get some PHP to make with the building

Welcome to still more easy, all things considered.

Since you need to use PHP to actually build the Memcache extension, we start by getting the version of php that we need to include for to make MAMP a proper build environment. Grab the version you need from [php.net](http://php.net/downloads.php).

> Remember that you'll need one for each version of PHP you'll need to run.

> I have found that it works best if you grab the package from php.net as opposed to MAMP's downloadable compiled versions available on their website.

Given that I used the example of 5.5.23 above, and that's the latest that I've worked with, I'll simply continue that trend. Adjust as your needs dictate.

For this step you should be sure that you've installed Xcode Command Line tools.

> Check with `xcode-select -p` and if you see a path listed, you should be good to go. If not you can install with `xcode-select --install`.

> As an additional aside, I believe I installed autoconf through homebrew at one point. Though the Xcode Command Line tools should handle everything for building, I thought it worth noting.

Once you download and extract PHP, and assuming it's sitting in your downloads folder, you'll need to to get it where it needs to go. Again, here's some commands that will do the trick, changing your path as necessary:

    mkdir /Applications/MAMP/bin/php/php5.5.23/include  
    mv ~/Downloads/php-5.5.23 /Applications/MAMP/bin/php/php5.5.23/include/php  
    cd /Applications/MAMP/bin/php/php5.5.23/include/php && ./configure  
    

> Commands here will make a directory called `include` and then move your downloaded and extracted folder to this new folder and rename it `php`. Finally, you'll change directory to this new folder and use `./configure` to, well, configure PHP.

### Congratulations

#### The _hard_ part is over.

None of this should have been too taxing and now you should now be able to work with PEAR and PECL and PHP from the command line and be operating within your MAMP Environment.

From here you should be able to install anything from PECL.

For example, to install the memcache extension you can use:

`pecl install memcache`

After all the output from the build process you should be told that install was ok and it will tell you to add `extension=memcache.so` to your `php.ini` file.

**Important**: There are several ways of getting at your `php.ini` but if you're using MAMP Pro you are best off using their interface to be sure you have the right file. Their folder structure can be somewhat difficult to navigate and often you'll find that changes you make to the file you think is the right configuration file will invariably be not the right file. For this you'd use `File > Edit Template > PHP > PHP 5.5.23 php.ini` and find the section (`⌘ + F`) called Dynamic Extensions and add your new extension line `extension=memcache.so` under `; Extensions` and you're done.

### Conclusion

This process has taken me a little time to get right. I have followed numerous different _guides_ and the like, tweaked, and found that this method works perfectly for me. I have been using MAMP Pro for almost two years now under Mavericks and now Yosemite. If you find that this process doesn't work for you, then try another! There's probably a _right_ way for your set-up.

Finally, I want to point out that I feel it best to comment / remove the path variable from my `~/.bash_profile` once my MAMP environment is up and running. I find that it's best not to permanently override system versions of things like PHP and Ruby for several reasons. YMMV, of course. If you want to play it safe like me you can comment out this line by throwing a hash `#` at the beginning, then it will be there in case you need it again in the future for any reason.

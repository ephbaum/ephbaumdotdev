---
title: ANSI Terminal Colors
postSlug: terminal-colors
slug: terminal-colors
pubDate: 11/14/2023 09:42 PM
imgUrl: ../../../../assets/img/2023/11/xterm-colors-c.png
ogImage: ../../../../assets/img/2023/11/xterm-colors-c.png
author: Eph Baum
featured: false
draft: false
tags:
  - terminal
  - ansi
  - colors
  - command-line
description: "Stop googling terminal color codes every time you want to add some flair to your scripts. This comprehensive ANSI color reference has everything you need—from basic 16 colors to the full 256-color palette—with visual swatches and hex codes to make your terminal pop."
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/11/xterm-colors-c.png)

Every so often I decide I want to make some changes to my terminal or add colors to a script and then I have to go looking up a list of color codes.

Data available [here](https://gist.github.com/jasonm23/2868981).

To save future me some time, and perhaps present you, here are some tables with some codes that might help:

<style>
table {
    font-family: sans-serif;
    font-size: 1.2rem;
}
caption {
    padding: 1rem;
}
td {
    margin: 0 auto;
    padding: .5rem;
    text-align: center;
}
.hexcolor {
    font-size: 0.8rem;
}
.ansicode {
    font-weight: 600;
}
.lightfont {
    color: #fff;
}
.darkfont {
    color: #000;
}
</style>
<table class="table hexcolors" style="width: auto; margin-left: auto; margin-right: auto;">
    <caption>
        16 Color Palette
    </caption>
    <tbody>
        <tr>
            <td class="lightfont" style="background-color: #000000;">
                <span class="ansicode">
                    000
                </span>
                <br>
                <span class="hexcolor">
                    #000000
                </span>
            </td>
            <td class="lightfont" style="background-color: #800000;">
                <span class="ansicode">
                    001
                </span>
                <br>
                <span class="hexcolor">
                    #800000
                </span>
            </td>
            <td class="lightfont" style="background-color: #008000;">
                <span class="ansicode">
                    002
                </span>
                <br>
                <span class="hexcolor">
                    #008000
                </span>
            </td>
            <td class="lightfont" style="background-color: #808000;">
                <span class="ansicode">
                    003
                </span>
                <br>
                <span class="hexcolor">
                    #808000
                </span>
            </td>
            <td class="lightfont" style="background-color: #000080;">
                <span class="ansicode">
                    004
                </span>
                <br>
                <span class="hexcolor">
                    #000080
                </span>
            </td>
            <td class="lightfont" style="background-color: #800080;">
                <span class="ansicode">
                    005
                </span>
                <br>
                <span class="hexcolor">
                    #800080
                </span>
            </td>
            <td class="lightfont" style="background-color: #008080;">
                <span class="ansicode">
                    006
                </span>
                <br>
                <span class="hexcolor">
                    #008080
                </span>
            </td>
            <td class="darkfont" style="background-color: #c0c0c0;">
                <span class="ansicode">
                    007
                </span>
                <br>
                <span class="hexcolor">
                    #c0c0c0
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #808080;">
                <span class="ansicode">
                    008
                </span>
                <br>
                <span class="hexcolor">
                    #808080
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff0000;">
                <span class="ansicode">
                    009
                </span>
                <br>
                <span class="hexcolor">
                    #ff0000
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ff00;">
                <span class="ansicode">
                    010
                </span>
                <br>
                <span class="hexcolor">
                    #00ff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffff00;">
                <span class="ansicode">
                    011
                </span>
                <br>
                <span class="hexcolor">
                    #ffff00
                </span>
            </td>
            <td class="lightfont" style="background-color: #0000ff;">
                <span class="ansicode">
                    012
                </span>
                <br>
                <span class="hexcolor">
                    #0000ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff00ff;">
                <span class="ansicode">
                    013
                </span>
                <br>
                <span class="hexcolor">
                    #ff00ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ffff;">
                <span class="ansicode">
                    014
                </span>
                <br>
                <span class="hexcolor">
                    #00ffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffffff;">
                <span class="ansicode">
                    015
                </span>
                <br>
                <span class="hexcolor">
                    #ffffff
                </span>
            </td>
        </tr>
    </tbody>
</table>

<table class="table hexcolors" style="width: auto; margin-left: auto; margin-right: auto;">
    <caption>
        24 Greyscale Palette
    </caption>
    <tbody>
        <tr>
            <td class="lightfont" style="background-color: #080808;">
                <span class="ansicode">
                    232
                </span>
                <br>
                <span class="hexcolor">
                    #080808
                </span>
            </td>
            <td class="lightfont" style="background-color: #121212;">
                <span class="ansicode">
                    233
                </span>
                <br>
                <span class="hexcolor">
                    #121212
                </span>
            </td>
            <td class="lightfont" style="background-color: #1c1c1c;">
                <span class="ansicode">
                    234
                </span>
                <br>
                <span class="hexcolor">
                    #1c1c1c
                </span>
            </td>
            <td class="lightfont" style="background-color: #262626;">
                <span class="ansicode">
                    235
                </span>
                <br>
                <span class="hexcolor">
                    #262626
                </span>
            </td>
            <td class="lightfont" style="background-color: #303030;">
                <span class="ansicode">
                    236
                </span>
                <br>
                <span class="hexcolor">
                    #303030
                </span>
            </td>
            <td class="lightfont" style="background-color: #3a3a3a;">
                <span class="ansicode">
                    237
                </span>
                <br>
                <span class="hexcolor">
                    #3a3a3a
                </span>
            </td>
            <td class="lightfont" style="background-color: #444444;">
                <span class="ansicode">
                    238
                </span>
                <br>
                <span class="hexcolor">
                    #444444
                </span>
            </td>
            <td class="lightfont" style="background-color: #4e4e4e;">
                <span class="ansicode">
                    239
                </span>
                <br>
                <span class="hexcolor">
                    #4e4e4e
                </span>
            </td>
            <td class="lightfont" style="background-color: #585858;">
                <span class="ansicode">
                    240
                </span>
                <br>
                <span class="hexcolor">
                    #585858
                </span>
            </td>
            <td class="lightfont" style="background-color: #626262;">
                <span class="ansicode">
                    241
                </span>
                <br>
                <span class="hexcolor">
                    #626262
                </span>
            </td>
            <td class="lightfont" style="background-color: #6c6c6c;">
                <span class="ansicode">
                    242
                </span>
                <br>
                <span class="hexcolor">
                    #6c6c6c
                </span>
            </td>
            <td class="lightfont" style="background-color: #767676;">
                <span class="ansicode">
                    243
                </span>
                <br>
                <span class="hexcolor">
                    #767676
                </span>
            </td>
        </tr>
        <tr>
            <td class="darkfont" style="background-color: #eeeeee;">
                <span class="ansicode">
                    255
                </span>
                <br>
                <span class="hexcolor">
                    #eeeeee
                </span>
            </td>
            <td class="darkfont" style="background-color: #e4e4e4;">
                <span class="ansicode">
                    254
                </span>
                <br>
                <span class="hexcolor">
                    #e4e4e4
                </span>
            </td>
            <td class="darkfont" style="background-color: #dadada;">
                <span class="ansicode">
                    253
                </span>
                <br>
                <span class="hexcolor">
                    #dadada
                </span>
            </td>
            <td class="darkfont" style="background-color: #d0d0d0;">
                <span class="ansicode">
                    252
                </span>
                <br>
                <span class="hexcolor">
                    #d0d0d0
                </span>
            </td>
            <td class="darkfont" style="background-color: #c6c6c6;">
                <span class="ansicode">
                    251
                </span>
                <br>
                <span class="hexcolor">
                    #c6c6c6
                </span>
            </td>
            <td class="darkfont" style="background-color: #bcbcbc;">
                <span class="ansicode">
                    250
                </span>
                <br>
                <span class="hexcolor">
                    #bcbcbc
                </span>
            </td>
            <td class="darkfont" style="background-color: #b2b2b2;">
                <span class="ansicode">
                    249
                </span>
                <br>
                <span class="hexcolor">
                    #b2b2b2
                </span>
            </td>
            <td class="darkfont" style="background-color: #a8a8a8;">
                <span class="ansicode">
                    248
                </span>
                <br>
                <span class="hexcolor">
                    #a8a8a8
                </span>
            </td>
            <td class="darkfont" style="background-color: #9e9e9e;">
                <span class="ansicode">
                    247
                </span>
                <br>
                <span class="hexcolor">
                    #9e9e9e
                </span>
            </td>
            <td class="darkfont" style="background-color: #949494;">
                <span class="ansicode">
                    246
                </span>
                <br>
                <span class="hexcolor">
                    #949494
                </span>
            </td>
            <td class="lightfont" style="background-color: #8a8a8a;">
                <span class="ansicode">
                    245
                </span>
                <br>
                <span class="hexcolor">
                    #8a8a8a
                </span>
            </td>
            <td class="lightfont" style="background-color: #808080;">
                <span class="ansicode">
                    244
                </span>
                <br>
                <span class="hexcolor">
                    #808080
                </span>
            </td>
        </tr>
    </tbody>
</table>

<table class="table hexcolors" style="width: auto; margin-left: auto; margin-right: auto;">
    <caption>
        256 Colors Palette
    </caption>
    <tbody>
        <tr>
            <td class="lightfont" style="background-color: #000000;">
                <span class="ansicode">
                    016
                </span>
                <br>
                <span class="hexcolor">
                    #000000
                </span>
            </td>
            <td class="lightfont" style="background-color: #005f00;">
                <span class="ansicode">
                    022
                </span>
                <br>
                <span class="hexcolor">
                    #005f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #008700;">
                <span class="ansicode">
                    028
                </span>
                <br>
                <span class="hexcolor">
                    #008700
                </span>
            </td>
            <td class="lightfont" style="background-color: #00af00;">
                <span class="ansicode">
                    034
                </span>
                <br>
                <span class="hexcolor">
                    #00af00
                </span>
            </td>
            <td class="lightfont" style="background-color: #00d700;">
                <span class="ansicode">
                    040
                </span>
                <br>
                <span class="hexcolor">
                    #00d700
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ff00;">
                <span class="ansicode">
                    046
                </span>
                <br>
                <span class="hexcolor">
                    #00ff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fff00;">
                <span class="ansicode">
                    082
                </span>
                <br>
                <span class="hexcolor">
                    #5fff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd700;">
                <span class="ansicode">
                    076
                </span>
                <br>
                <span class="hexcolor">
                    #5fd700
                </span>
            </td>
            <td class="lightfont" style="background-color: #5faf00;">
                <span class="ansicode">
                    070
                </span>
                <br>
                <span class="hexcolor">
                    #5faf00
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f8700;">
                <span class="ansicode">
                    064
                </span>
                <br>
                <span class="hexcolor">
                    #5f8700
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5f00;">
                <span class="ansicode">
                    058
                </span>
                <br>
                <span class="hexcolor">
                    #5f5f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f0000;">
                <span class="ansicode">
                    052
                </span>
                <br>
                <span class="hexcolor">
                    #5f0000
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #00005f;">
                <span class="ansicode">
                    017
                </span>
                <br>
                <span class="hexcolor">
                    #00005f
                </span>
            </td>
            <td class="lightfont" style="background-color: #005f5f;">
                <span class="ansicode">
                    023
                </span>
                <br>
                <span class="hexcolor">
                    #005f5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #00875f;">
                <span class="ansicode">
                    029
                </span>
                <br>
                <span class="hexcolor">
                    #00875f
                </span>
            </td>
            <td class="lightfont" style="background-color: #00af5f;">
                <span class="ansicode">
                    035
                </span>
                <br>
                <span class="hexcolor">
                    #00af5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #00d75f;">
                <span class="ansicode">
                    041
                </span>
                <br>
                <span class="hexcolor">
                    #00d75f
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ff5f;">
                <span class="ansicode">
                    047
                </span>
                <br>
                <span class="hexcolor">
                    #00ff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fff5f;">
                <span class="ansicode">
                    083
                </span>
                <br>
                <span class="hexcolor">
                    #5fff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd75f;">
                <span class="ansicode">
                    077
                </span>
                <br>
                <span class="hexcolor">
                    #5fd75f
                </span>
            </td>
            <td class="lightfont" style="background-color: #5faf5f;">
                <span class="ansicode">
                    071
                </span>
                <br>
                <span class="hexcolor">
                    #5faf5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f875f;">
                <span class="ansicode">
                    065
                </span>
                <br>
                <span class="hexcolor">
                    #5f875f
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5f5f;">
                <span class="ansicode">
                    059
                </span>
                <br>
                <span class="hexcolor">
                    #5f5f5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f005f;">
                <span class="ansicode">
                    053
                </span>
                <br>
                <span class="hexcolor">
                    #5f005f
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #000087;">
                <span class="ansicode">
                    018
                </span>
                <br>
                <span class="hexcolor">
                    #000087
                </span>
            </td>
            <td class="lightfont" style="background-color: #005f87;">
                <span class="ansicode">
                    024
                </span>
                <br>
                <span class="hexcolor">
                    #005f87
                </span>
            </td>
            <td class="lightfont" style="background-color: #008787;">
                <span class="ansicode">
                    030
                </span>
                <br>
                <span class="hexcolor">
                    #008787
                </span>
            </td>
            <td class="lightfont" style="background-color: #00af87;">
                <span class="ansicode">
                    036
                </span>
                <br>
                <span class="hexcolor">
                    #00af87
                </span>
            </td>
            <td class="lightfont" style="background-color: #00d787;">
                <span class="ansicode">
                    042
                </span>
                <br>
                <span class="hexcolor">
                    #00d787
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ff87;">
                <span class="ansicode">
                    048
                </span>
                <br>
                <span class="hexcolor">
                    #00ff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fff87;">
                <span class="ansicode">
                    084
                </span>
                <br>
                <span class="hexcolor">
                    #5fff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd787;">
                <span class="ansicode">
                    078
                </span>
                <br>
                <span class="hexcolor">
                    #5fd787
                </span>
            </td>
            <td class="darkfont" style="background-color: #5faf87;">
                <span class="ansicode">
                    072
                </span>
                <br>
                <span class="hexcolor">
                    #5faf87
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f8787;">
                <span class="ansicode">
                    066
                </span>
                <br>
                <span class="hexcolor">
                    #5f8787
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5f87;">
                <span class="ansicode">
                    060
                </span>
                <br>
                <span class="hexcolor">
                    #5f5f87
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f0087;">
                <span class="ansicode">
                    054
                </span>
                <br>
                <span class="hexcolor">
                    #5f0087
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #0000af;">
                <span class="ansicode">
                    019
                </span>
                <br>
                <span class="hexcolor">
                    #0000af
                </span>
            </td>
            <td class="lightfont" style="background-color: #005faf;">
                <span class="ansicode">
                    025
                </span>
                <br>
                <span class="hexcolor">
                    #005faf
                </span>
            </td>
            <td class="lightfont" style="background-color: #0087af;">
                <span class="ansicode">
                    031
                </span>
                <br>
                <span class="hexcolor">
                    #0087af
                </span>
            </td>
            <td class="lightfont" style="background-color: #00afaf;">
                <span class="ansicode">
                    037
                </span>
                <br>
                <span class="hexcolor">
                    #00afaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #00d7af;">
                <span class="ansicode">
                    043
                </span>
                <br>
                <span class="hexcolor">
                    #00d7af
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ffaf;">
                <span class="ansicode">
                    049
                </span>
                <br>
                <span class="hexcolor">
                    #00ffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fffaf;">
                <span class="ansicode">
                    085
                </span>
                <br>
                <span class="hexcolor">
                    #5fffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd7af;">
                <span class="ansicode">
                    079
                </span>
                <br>
                <span class="hexcolor">
                    #5fd7af
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fafaf;">
                <span class="ansicode">
                    073
                </span>
                <br>
                <span class="hexcolor">
                    #5fafaf
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f87af;">
                <span class="ansicode">
                    067
                </span>
                <br>
                <span class="hexcolor">
                    #5f87af
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5faf;">
                <span class="ansicode">
                    061
                </span>
                <br>
                <span class="hexcolor">
                    #5f5faf
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f00af;">
                <span class="ansicode">
                    055
                </span>
                <br>
                <span class="hexcolor">
                    #5f00af
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #0000d7;">
                <span class="ansicode">
                    020
                </span>
                <br>
                <span class="hexcolor">
                    #0000d7
                </span>
            </td>
            <td class="lightfont" style="background-color: #005fd7;">
                <span class="ansicode">
                    026
                </span>
                <br>
                <span class="hexcolor">
                    #005fd7
                </span>
            </td>
            <td class="lightfont" style="background-color: #0087d7;">
                <span class="ansicode">
                    032
                </span>
                <br>
                <span class="hexcolor">
                    #0087d7
                </span>
            </td>
            <td class="lightfont" style="background-color: #00afd7;">
                <span class="ansicode">
                    038
                </span>
                <br>
                <span class="hexcolor">
                    #00afd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #00d7d7;">
                <span class="ansicode">
                    044
                </span>
                <br>
                <span class="hexcolor">
                    #00d7d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ffd7;">
                <span class="ansicode">
                    050
                </span>
                <br>
                <span class="hexcolor">
                    #00ffd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fffd7;">
                <span class="ansicode">
                    086
                </span>
                <br>
                <span class="hexcolor">
                    #5fffd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd7d7;">
                <span class="ansicode">
                    080
                </span>
                <br>
                <span class="hexcolor">
                    #5fd7d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fafd7;">
                <span class="ansicode">
                    074
                </span>
                <br>
                <span class="hexcolor">
                    #5fafd7
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f87d7;">
                <span class="ansicode">
                    068
                </span>
                <br>
                <span class="hexcolor">
                    #5f87d7
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5fd7;">
                <span class="ansicode">
                    062
                </span>
                <br>
                <span class="hexcolor">
                    #5f5fd7
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f00d7;">
                <span class="ansicode">
                    056
                </span>
                <br>
                <span class="hexcolor">
                    #5f00d7
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #0000ff;">
                <span class="ansicode">
                    021
                </span>
                <br>
                <span class="hexcolor">
                    #0000ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #005fff;">
                <span class="ansicode">
                    027
                </span>
                <br>
                <span class="hexcolor">
                    #005fff
                </span>
            </td>
            <td class="lightfont" style="background-color: #0087ff;">
                <span class="ansicode">
                    033
                </span>
                <br>
                <span class="hexcolor">
                    #0087ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #00afff;">
                <span class="ansicode">
                    039
                </span>
                <br>
                <span class="hexcolor">
                    #00afff
                </span>
            </td>
            <td class="darkfont" style="background-color: #00d7ff;">
                <span class="ansicode">
                    045
                </span>
                <br>
                <span class="hexcolor">
                    #00d7ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #00ffff;">
                <span class="ansicode">
                    051
                </span>
                <br>
                <span class="hexcolor">
                    #00ffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fffff;">
                <span class="ansicode">
                    087
                </span>
                <br>
                <span class="hexcolor">
                    #5fffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fd7ff;">
                <span class="ansicode">
                    081
                </span>
                <br>
                <span class="hexcolor">
                    #5fd7ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #5fafff;">
                <span class="ansicode">
                    075
                </span>
                <br>
                <span class="hexcolor">
                    #5fafff
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f87ff;">
                <span class="ansicode">
                    069
                </span>
                <br>
                <span class="hexcolor">
                    #5f87ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f5fff;">
                <span class="ansicode">
                    063
                </span>
                <br>
                <span class="hexcolor">
                    #5f5fff
                </span>
            </td>
            <td class="lightfont" style="background-color: #5f00ff;">
                <span class="ansicode">
                    057
                </span>
                <br>
                <span class="hexcolor">
                    #5f00ff
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #8700ff;">
                <span class="ansicode">
                    093
                </span>
                <br>
                <span class="hexcolor">
                    #8700ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #875fff;">
                <span class="ansicode">
                    099
                </span>
                <br>
                <span class="hexcolor">
                    #875fff
                </span>
            </td>
            <td class="darkfont" style="background-color: #8787ff;">
                <span class="ansicode">
                    105
                </span>
                <br>
                <span class="hexcolor">
                    #8787ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #87afff;">
                <span class="ansicode">
                    111
                </span>
                <br>
                <span class="hexcolor">
                    #87afff
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d7ff;">
                <span class="ansicode">
                    117
                </span>
                <br>
                <span class="hexcolor">
                    #87d7ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ffff;">
                <span class="ansicode">
                    123
                </span>
                <br>
                <span class="hexcolor">
                    #87ffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #afffff;">
                <span class="ansicode">
                    159
                </span>
                <br>
                <span class="hexcolor">
                    #afffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd7ff;">
                <span class="ansicode">
                    153
                </span>
                <br>
                <span class="hexcolor">
                    #afd7ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #afafff;">
                <span class="ansicode">
                    147
                </span>
                <br>
                <span class="hexcolor">
                    #afafff
                </span>
            </td>
            <td class="darkfont" style="background-color: #af87ff;">
                <span class="ansicode">
                    141
                </span>
                <br>
                <span class="hexcolor">
                    #af87ff
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5fff;">
                <span class="ansicode">
                    135
                </span>
                <br>
                <span class="hexcolor">
                    #af5fff
                </span>
            </td>
            <td class="lightfont" style="background-color: #af00ff;">
                <span class="ansicode">
                    129
                </span>
                <br>
                <span class="hexcolor">
                    #af00ff
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #8700d7;">
                <span class="ansicode">
                    092
                </span>
                <br>
                <span class="hexcolor">
                    #8700d7
                </span>
            </td>
            <td class="lightfont" style="background-color: #875fd7;">
                <span class="ansicode">
                    098
                </span>
                <br>
                <span class="hexcolor">
                    #875fd7
                </span>
            </td>
            <td class="lightfont" style="background-color: #8787d7;">
                <span class="ansicode">
                    104
                </span>
                <br>
                <span class="hexcolor">
                    #8787d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #87afd7;">
                <span class="ansicode">
                    110
                </span>
                <br>
                <span class="hexcolor">
                    #87afd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d7d7;">
                <span class="ansicode">
                    116
                </span>
                <br>
                <span class="hexcolor">
                    #87d7d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ffd7;">
                <span class="ansicode">
                    122
                </span>
                <br>
                <span class="hexcolor">
                    #87ffd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #afffd7;">
                <span class="ansicode">
                    158
                </span>
                <br>
                <span class="hexcolor">
                    #afffd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd7d7;">
                <span class="ansicode">
                    152
                </span>
                <br>
                <span class="hexcolor">
                    #afd7d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #afafd7;">
                <span class="ansicode">
                    146
                </span>
                <br>
                <span class="hexcolor">
                    #afafd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #af87d7;">
                <span class="ansicode">
                    140
                </span>
                <br>
                <span class="hexcolor">
                    #af87d7
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5fd7;">
                <span class="ansicode">
                    134
                </span>
                <br>
                <span class="hexcolor">
                    #af5fd7
                </span>
            </td>
            <td class="lightfont" style="background-color: #af00d7;">
                <span class="ansicode">
                    128
                </span>
                <br>
                <span class="hexcolor">
                    #af00d7
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #8700af;">
                <span class="ansicode">
                    091
                </span>
                <br>
                <span class="hexcolor">
                    #8700af
                </span>
            </td>
            <td class="lightfont" style="background-color: #875faf;">
                <span class="ansicode">
                    097
                </span>
                <br>
                <span class="hexcolor">
                    #875faf
                </span>
            </td>
            <td class="lightfont" style="background-color: #8787af;">
                <span class="ansicode">
                    103
                </span>
                <br>
                <span class="hexcolor">
                    #8787af
                </span>
            </td>
            <td class="darkfont" style="background-color: #87afaf;">
                <span class="ansicode">
                    109
                </span>
                <br>
                <span class="hexcolor">
                    #87afaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d7af;">
                <span class="ansicode">
                    115
                </span>
                <br>
                <span class="hexcolor">
                    #87d7af
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ffaf;">
                <span class="ansicode">
                    121
                </span>
                <br>
                <span class="hexcolor">
                    #87ffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #afffaf;">
                <span class="ansicode">
                    157
                </span>
                <br>
                <span class="hexcolor">
                    #afffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd7af;">
                <span class="ansicode">
                    151
                </span>
                <br>
                <span class="hexcolor">
                    #afd7af
                </span>
            </td>
            <td class="darkfont" style="background-color: #afafaf;">
                <span class="ansicode">
                    145
                </span>
                <br>
                <span class="hexcolor">
                    #afafaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #af87af;">
                <span class="ansicode">
                    139
                </span>
                <br>
                <span class="hexcolor">
                    #af87af
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5faf;">
                <span class="ansicode">
                    133
                </span>
                <br>
                <span class="hexcolor">
                    #af5faf
                </span>
            </td>
            <td class="lightfont" style="background-color: #af00af;">
                <span class="ansicode">
                    127
                </span>
                <br>
                <span class="hexcolor">
                    #af00af
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #870087;">
                <span class="ansicode">
                    090
                </span>
                <br>
                <span class="hexcolor">
                    #870087
                </span>
            </td>
            <td class="lightfont" style="background-color: #875f87;">
                <span class="ansicode">
                    096
                </span>
                <br>
                <span class="hexcolor">
                    #875f87
                </span>
            </td>
            <td class="lightfont" style="background-color: #878787;">
                <span class="ansicode">
                    102
                </span>
                <br>
                <span class="hexcolor">
                    #878787
                </span>
            </td>
            <td class="darkfont" style="background-color: #87af87;">
                <span class="ansicode">
                    108
                </span>
                <br>
                <span class="hexcolor">
                    #87af87
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d787;">
                <span class="ansicode">
                    114
                </span>
                <br>
                <span class="hexcolor">
                    #87d787
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ff87;">
                <span class="ansicode">
                    120
                </span>
                <br>
                <span class="hexcolor">
                    #87ff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #afff87;">
                <span class="ansicode">
                    156
                </span>
                <br>
                <span class="hexcolor">
                    #afff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd787;">
                <span class="ansicode">
                    150
                </span>
                <br>
                <span class="hexcolor">
                    #afd787
                </span>
            </td>
            <td class="darkfont" style="background-color: #afaf87;">
                <span class="ansicode">
                    144
                </span>
                <br>
                <span class="hexcolor">
                    #afaf87
                </span>
            </td>
            <td class="darkfont" style="background-color: #af8787;">
                <span class="ansicode">
                    138
                </span>
                <br>
                <span class="hexcolor">
                    #af8787
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5f87;">
                <span class="ansicode">
                    132
                </span>
                <br>
                <span class="hexcolor">
                    #af5f87
                </span>
            </td>
            <td class="lightfont" style="background-color: #af0087;">
                <span class="ansicode">
                    126
                </span>
                <br>
                <span class="hexcolor">
                    #af0087
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #87005f;">
                <span class="ansicode">
                    089
                </span>
                <br>
                <span class="hexcolor">
                    #87005f
                </span>
            </td>
            <td class="lightfont" style="background-color: #875f5f;">
                <span class="ansicode">
                    095
                </span>
                <br>
                <span class="hexcolor">
                    #875f5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #87875f;">
                <span class="ansicode">
                    101
                </span>
                <br>
                <span class="hexcolor">
                    #87875f
                </span>
            </td>
            <td class="darkfont" style="background-color: #87af5f;">
                <span class="ansicode">
                    107
                </span>
                <br>
                <span class="hexcolor">
                    #87af5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d75f;">
                <span class="ansicode">
                    113
                </span>
                <br>
                <span class="hexcolor">
                    #87d75f
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ff5f;">
                <span class="ansicode">
                    119
                </span>
                <br>
                <span class="hexcolor">
                    #87ff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #afff5f;">
                <span class="ansicode">
                    155
                </span>
                <br>
                <span class="hexcolor">
                    #afff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd75f;">
                <span class="ansicode">
                    149
                </span>
                <br>
                <span class="hexcolor">
                    #afd75f
                </span>
            </td>
            <td class="darkfont" style="background-color: #afaf5f;">
                <span class="ansicode">
                    143
                </span>
                <br>
                <span class="hexcolor">
                    #afaf5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #af875f;">
                <span class="ansicode">
                    137
                </span>
                <br>
                <span class="hexcolor">
                    #af875f
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5f5f;">
                <span class="ansicode">
                    131
                </span>
                <br>
                <span class="hexcolor">
                    #af5f5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #af005f;">
                <span class="ansicode">
                    125
                </span>
                <br>
                <span class="hexcolor">
                    #af005f
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #870000;">
                <span class="ansicode">
                    088
                </span>
                <br>
                <span class="hexcolor">
                    #870000
                </span>
            </td>
            <td class="lightfont" style="background-color: #875f00;">
                <span class="ansicode">
                    094
                </span>
                <br>
                <span class="hexcolor">
                    #875f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #878700;">
                <span class="ansicode">
                    100
                </span>
                <br>
                <span class="hexcolor">
                    #878700
                </span>
            </td>
            <td class="lightfont" style="background-color: #87af00;">
                <span class="ansicode">
                    106
                </span>
                <br>
                <span class="hexcolor">
                    #87af00
                </span>
            </td>
            <td class="darkfont" style="background-color: #87d700;">
                <span class="ansicode">
                    112
                </span>
                <br>
                <span class="hexcolor">
                    #87d700
                </span>
            </td>
            <td class="darkfont" style="background-color: #87ff00;">
                <span class="ansicode">
                    118
                </span>
                <br>
                <span class="hexcolor">
                    #87ff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #afff00;">
                <span class="ansicode">
                    154
                </span>
                <br>
                <span class="hexcolor">
                    #afff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #afd700;">
                <span class="ansicode">
                    148
                </span>
                <br>
                <span class="hexcolor">
                    #afd700
                </span>
            </td>
            <td class="darkfont" style="background-color: #afaf00;">
                <span class="ansicode">
                    142
                </span>
                <br>
                <span class="hexcolor">
                    #afaf00
                </span>
            </td>
            <td class="lightfont" style="background-color: #af8700;">
                <span class="ansicode">
                    136
                </span>
                <br>
                <span class="hexcolor">
                    #af8700
                </span>
            </td>
            <td class="lightfont" style="background-color: #af5f00;">
                <span class="ansicode">
                    130
                </span>
                <br>
                <span class="hexcolor">
                    #af5f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #af0000;">
                <span class="ansicode">
                    124
                </span>
                <br>
                <span class="hexcolor">
                    #af0000
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d70000;">
                <span class="ansicode">
                    160
                </span>
                <br>
                <span class="hexcolor">
                    #d70000
                </span>
            </td>
            <td class="lightfont" style="background-color: #d75f00;">
                <span class="ansicode">
                    166
                </span>
                <br>
                <span class="hexcolor">
                    #d75f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #d78700;">
                <span class="ansicode">
                    172
                </span>
                <br>
                <span class="hexcolor">
                    #d78700
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfaf00;">
                <span class="ansicode">
                    178
                </span>
                <br>
                <span class="hexcolor">
                    #dfaf00
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdf00;">
                <span class="ansicode">
                    184
                </span>
                <br>
                <span class="hexcolor">
                    #dfdf00
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfff00;">
                <span class="ansicode">
                    190
                </span>
                <br>
                <span class="hexcolor">
                    #dfff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffff00;">
                <span class="ansicode">
                    226
                </span>
                <br>
                <span class="hexcolor">
                    #ffff00
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdf00;">
                <span class="ansicode">
                    220
                </span>
                <br>
                <span class="hexcolor">
                    #ffdf00
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffaf00;">
                <span class="ansicode">
                    214
                </span>
                <br>
                <span class="hexcolor">
                    #ffaf00
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff8700;">
                <span class="ansicode">
                    208
                </span>
                <br>
                <span class="hexcolor">
                    #ff8700
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff5f00;">
                <span class="ansicode">
                    202
                </span>
                <br>
                <span class="hexcolor">
                    #ff5f00
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff0000;">
                <span class="ansicode">
                    196
                </span>
                <br>
                <span class="hexcolor">
                    #ff0000
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d7005f;">
                <span class="ansicode">
                    161
                </span>
                <br>
                <span class="hexcolor">
                    #d7005f
                </span>
            </td>
            <td class="lightfont" style="background-color: #d75f5f;">
                <span class="ansicode">
                    167
                </span>
                <br>
                <span class="hexcolor">
                    #d75f5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #d7875f;">
                <span class="ansicode">
                    173
                </span>
                <br>
                <span class="hexcolor">
                    #d7875f
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfaf5f;">
                <span class="ansicode">
                    179
                </span>
                <br>
                <span class="hexcolor">
                    #dfaf5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdf5f;">
                <span class="ansicode">
                    185
                </span>
                <br>
                <span class="hexcolor">
                    #dfdf5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfff5f;">
                <span class="ansicode">
                    191
                </span>
                <br>
                <span class="hexcolor">
                    #dfff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffff5f;">
                <span class="ansicode">
                    227
                </span>
                <br>
                <span class="hexcolor">
                    #ffff5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdf5f;">
                <span class="ansicode">
                    221
                </span>
                <br>
                <span class="hexcolor">
                    #ffdf5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffaf5f;">
                <span class="ansicode">
                    215
                </span>
                <br>
                <span class="hexcolor">
                    #ffaf5f
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff875f;">
                <span class="ansicode">
                    209
                </span>
                <br>
                <span class="hexcolor">
                    #ff875f
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff5f5f;">
                <span class="ansicode">
                    203
                </span>
                <br>
                <span class="hexcolor">
                    #ff5f5f
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff005f;">
                <span class="ansicode">
                    197
                </span>
                <br>
                <span class="hexcolor">
                    #ff005f
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d70087;">
                <span class="ansicode">
                    162
                </span>
                <br>
                <span class="hexcolor">
                    #d70087
                </span>
            </td>
            <td class="lightfont" style="background-color: #d75f87;">
                <span class="ansicode">
                    168
                </span>
                <br>
                <span class="hexcolor">
                    #d75f87
                </span>
            </td>
            <td class="darkfont" style="background-color: #d78787;">
                <span class="ansicode">
                    174
                </span>
                <br>
                <span class="hexcolor">
                    #d78787
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfaf87;">
                <span class="ansicode">
                    180
                </span>
                <br>
                <span class="hexcolor">
                    #dfaf87
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdf87;">
                <span class="ansicode">
                    186
                </span>
                <br>
                <span class="hexcolor">
                    #dfdf87
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfff87;">
                <span class="ansicode">
                    192
                </span>
                <br>
                <span class="hexcolor">
                    #dfff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffff87;">
                <span class="ansicode">
                    228
                </span>
                <br>
                <span class="hexcolor">
                    #ffff87
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdf87;">
                <span class="ansicode">
                    222
                </span>
                <br>
                <span class="hexcolor">
                    #ffdf87
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffaf87;">
                <span class="ansicode">
                    216
                </span>
                <br>
                <span class="hexcolor">
                    #ffaf87
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff8787;">
                <span class="ansicode">
                    210
                </span>
                <br>
                <span class="hexcolor">
                    #ff8787
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff5f87;">
                <span class="ansicode">
                    204
                </span>
                <br>
                <span class="hexcolor">
                    #ff5f87
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff0087;">
                <span class="ansicode">
                    198
                </span>
                <br>
                <span class="hexcolor">
                    #ff0087
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d700af;">
                <span class="ansicode">
                    163
                </span>
                <br>
                <span class="hexcolor">
                    #d700af
                </span>
            </td>
            <td class="lightfont" style="background-color: #d75faf;">
                <span class="ansicode">
                    169
                </span>
                <br>
                <span class="hexcolor">
                    #d75faf
                </span>
            </td>
            <td class="darkfont" style="background-color: #d787af;">
                <span class="ansicode">
                    175
                </span>
                <br>
                <span class="hexcolor">
                    #d787af
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfafaf;">
                <span class="ansicode">
                    181
                </span>
                <br>
                <span class="hexcolor">
                    #dfafaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdfaf;">
                <span class="ansicode">
                    187
                </span>
                <br>
                <span class="hexcolor">
                    #dfdfaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfffaf;">
                <span class="ansicode">
                    193
                </span>
                <br>
                <span class="hexcolor">
                    #dfffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffffaf;">
                <span class="ansicode">
                    229
                </span>
                <br>
                <span class="hexcolor">
                    #ffffaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdfaf;">
                <span class="ansicode">
                    223
                </span>
                <br>
                <span class="hexcolor">
                    #ffdfaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffafaf;">
                <span class="ansicode">
                    217
                </span>
                <br>
                <span class="hexcolor">
                    #ffafaf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff87af;">
                <span class="ansicode">
                    211
                </span>
                <br>
                <span class="hexcolor">
                    #ff87af
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff5faf;">
                <span class="ansicode">
                    205
                </span>
                <br>
                <span class="hexcolor">
                    #ff5faf
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff00af;">
                <span class="ansicode">
                    199
                </span>
                <br>
                <span class="hexcolor">
                    #ff00af
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d700d7;">
                <span class="ansicode">
                    164
                </span>
                <br>
                <span class="hexcolor">
                    #d700d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #d75fd7;">
                <span class="ansicode">
                    170
                </span>
                <br>
                <span class="hexcolor">
                    #d75fd7
                </span>
            </td>
            <td class="darkfont" style="background-color: #d787d7;">
                <span class="ansicode">
                    176
                </span>
                <br>
                <span class="hexcolor">
                    #d787d7
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfafdf;">
                <span class="ansicode">
                    182
                </span>
                <br>
                <span class="hexcolor">
                    #dfafdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdfdf;">
                <span class="ansicode">
                    188
                </span>
                <br>
                <span class="hexcolor">
                    #dfdfdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfffdf;">
                <span class="ansicode">
                    194
                </span>
                <br>
                <span class="hexcolor">
                    #dfffdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffffdf;">
                <span class="ansicode">
                    230
                </span>
                <br>
                <span class="hexcolor">
                    #ffffdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdfdf;">
                <span class="ansicode">
                    224
                </span>
                <br>
                <span class="hexcolor">
                    #ffdfdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffafdf;">
                <span class="ansicode">
                    218
                </span>
                <br>
                <span class="hexcolor">
                    #ffafdf
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff87df;">
                <span class="ansicode">
                    212
                </span>
                <br>
                <span class="hexcolor">
                    #ff87df
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff5fdf;">
                <span class="ansicode">
                    206
                </span>
                <br>
                <span class="hexcolor">
                    #ff5fdf
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff00df;">
                <span class="ansicode">
                    200
                </span>
                <br>
                <span class="hexcolor">
                    #ff00df
                </span>
            </td>
        </tr>
        <tr>
            <td class="lightfont" style="background-color: #d700ff;">
                <span class="ansicode">
                    165
                </span>
                <br>
                <span class="hexcolor">
                    #d700ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #d75fff;">
                <span class="ansicode">
                    171
                </span>
                <br>
                <span class="hexcolor">
                    #d75fff
                </span>
            </td>
            <td class="darkfont" style="background-color: #d787ff;">
                <span class="ansicode">
                    177
                </span>
                <br>
                <span class="hexcolor">
                    #d787ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfafff;">
                <span class="ansicode">
                    183
                </span>
                <br>
                <span class="hexcolor">
                    #dfafff
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfdfff;">
                <span class="ansicode">
                    189
                </span>
                <br>
                <span class="hexcolor">
                    #dfdfff
                </span>
            </td>
            <td class="darkfont" style="background-color: #dfffff;">
                <span class="ansicode">
                    195
                </span>
                <br>
                <span class="hexcolor">
                    #dfffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffffff;">
                <span class="ansicode">
                    231
                </span>
                <br>
                <span class="hexcolor">
                    #ffffff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffdfff;">
                <span class="ansicode">
                    225
                </span>
                <br>
                <span class="hexcolor">
                    #ffdfff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ffafff;">
                <span class="ansicode">
                    219
                </span>
                <br>
                <span class="hexcolor">
                    #ffafff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff87ff;">
                <span class="ansicode">
                    213
                </span>
                <br>
                <span class="hexcolor">
                    #ff87ff
                </span>
            </td>
            <td class="darkfont" style="background-color: #ff5fff;">
                <span class="ansicode">
                    207
                </span>
                <br>
                <span class="hexcolor">
                    #ff5fff
                </span>
            </td>
            <td class="lightfont" style="background-color: #ff00ff;">
                <span class="ansicode">
                    201
                </span>
                <br>
                <span class="hexcolor">
                    #ff00ff
                </span>
            </td>
        </tr>
    </tbody>
</table>
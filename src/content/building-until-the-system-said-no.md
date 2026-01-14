---
title: "Building Until the System Said No"
date: "2026-01-13"
description: "I built an Android app over almost two years. Coding, debugging, refactoring, and iterating repeatedly to address"
tags: ["android", "flutter" ,"shipping", "reflection" ]
---


I built an Android app over the course of almost two years coding, debugging, refactoring, and iterating repeatedly to address a problem I had observed firsthand.

Despite the effort and care that went into it, the app never made it to the Play Store due to platform policy constraints.

This post is not a guide or a success story. It’s an attempt to document what it felt like to build something , carry it through multiple layers of complexity, and eventually encounter limits that I couldn’t solve.

### What the App Was

The app was designed to help track peritoneal dialysis (PD) data including water intake, output, weight, and session-specific readings making it easy to record daily data, visualize trends over time, and export meaningful summaries as pdf’s when needed. 

### When Correct Solutions Didn’t Exist

As the app grew beyond basic data entry(CRUD), design decisions stopped being straightforward. Visualizing trends and exporting them as PDFs felt essential for the use case, but the Flutter ecosystem made this far more complicated than I had expected.

While there were many charting and PDF libraries available, very few supported what I actually needed ,date on the x-axis, dual y-axes, and output that preserved data readability. After evaluating multiple options, I settled on Syncfusion charts as it was the closest fit.

The real challenge emerged when I tried to bring those graphs into a PDF.There was no direct way to render complex charts in a pdf, most of the available options provided simple graphs that did not fit my particular use case. At that point, I had to decide what to do since I didn't want to drop the feature, and implementing a parallel graph-rendering system for PDFs would take a lot of effort .

The idea I came up with was to captured the fully rendered chart(which was a feature available in a different page) as an image and embedded it into the PDF like taking a screenshot of the graph and adding the image to the pdf. This approach may not have been the best way to do this but it worked to certain extent. The main problem I encountered was it did not capture the legend for some reason. So Apparently Syncfusion’s toImage method depends on the chart’s rendered state for it to capture everything and since I was not rendering the graph on the page ,I was just exporting it to pdf, the legend was not part of the capture.

That requirement conflicted with how I wanted PDF generation to work. Rendering charts on the pdf export page so that the legend appers in the pdf resulted in UI that was confusing for the user, At that point, the problem became about working within the constraint.

So I chose to manually render the legend inside the PDF drawing the elements myself, fixing positions, and aligning colors with the chart. It wasn’t, reusable, or scalable easily, but it preserved the meaning of the data and respected the use case, it was the only way i coud think of other than fully creating a custom library that matched my use case.

![Manually rendered legend in pdf](/images/legend.png)

Manually rendered legend in pdf


That stretch of the project changed how I think about building things. It stopped being about finding the right package or the cleanest abstraction, and became about making conscious trade-offs knowing when to accept imperfection, and being accountable for the consequences.

### When Shipping Became an Infrastructure Problem

When I shifted from building the app to trying to ship it, the nature of the work changed completely. The problems I was facing were no longer about features or logic, but about infrastructure policies, toolchains, backend responsibility, and environments I didn’t fully control.

One of the requirements from Google Play was support for complete account and data deletion. At a glance, this sounded like a simple feature, but it quickly turned into an architectural decision. Handling deletion on the client side meant trusting the app to recursively clean up all user data correctly a process that could be interrupted, partially executed, or left inconsistent if the user navigated away or the app crashed mid-operation.

Moving this responsibility to the backend was a better option, but that introduced another trade-off. I could either build a custom backend, managing authentication, authorization, and security guarantees myself, or rely on Google Cloud Functions. A custom backend was technically free, but it expanded the scope of the project significantly and increased the risk surface for mistakes in an area where correctness matters more than flexibility.

I choose Cloud Functions because they provide built-in security guarantees. Given that this was needed for only a single operation, maintaining a custom backend would have been a unnecessary overhead , even though this introduced cost and a stronger dependency on the Google ecosystem. Given that account deletion would be used infrequently , I prioritized reliability and convinence.

What followed wasn’t a single blocker, but a cascade of them , since I had to upgrade my flutter version to support cloud functions,upgrading flutter broke gradle compatibility ,but I had already uninstalled android studios that upgraded gradle and I didnt have enough space for andriod studios I had to upgrade my ssd reinstall all the programs again and finally fix the compatibility issue between the versions of flutter gradle and java all for a feature that was unlikely to be used, but impossible to skip.
 
### The moment effort stopped changing the outcome

Once the technical and infrastructural requirements were in place, I moved into the final stage ,shipping the app. I set up a Google Play Console account, completed verification, and onboarded testers from friends and family to meet the platform’s testing requirements. Preparing store assets, descriptions, and builds felt like the last stretch of a long process.

A few hours after submission, the app was rejected. At first, I assumed this was something fixable  a security issue, a missing disclosure, or an implementation detail I had overlooked. Instead, the rejection was based on policy ,Individual developers were not permitted to publish medical applications on the Play Store.

![Play Console rejection message](/images/play-console-rejection.png)

I tried again, adjusting what I could and re-evaluating the submission, but the outcome was the same. This wasn’t a case where iteration helped. There was nothing to refine or correct the constraint existed outside the codebase entirely.In the end, despite all the work, publishing the app on the Play Store was not possible on my developer account.

At that point, the remaining options required changing the nature of the project itself forming a company, or finding an organization willing to publish the app on my behalf. Both paths carried responsibilities and commitments far beyond what the project had been built for.

Acting on a suggestion from friends, I reached out to a hospital that already had a presence on the Google Play Store. They responded, and we discussed the possibility of publishing the app under their name. While it ultimately didn’t make sense for them to maintain a separate application alongside their existing one, that conversation clarified something important for me the app itself wasn’t the issue ownership and liability were.

With no viable path forward that didn’t fundamentally change the scope of the project, I stopped trying to ship it. I recorded a walkthrough of the app and published the code on GitHub. It wasn’t the ending I had planned for, but it was a way to let the work exist rather than disappear.

## Letting This Be Enough

I don’t think this experience left me with a simple conclusion. Part of me still resists closed systems the way they limit who can participate, who can publish, and under what conditions. At the same time, I understand why those constraints exist, especially in domains where responsibility and trust matter as much as they do in healthcare.

What this project gave me wasn’t a successful launch, but a deeper understanding of what it means to build something real. I learned how quickly a project can shift from creative problem-solving to navigating policies, infrastructure, and ownership and how little of that has to do with code quality alone.

Even though the app never shipped, the experience changed how I think about trade-offs, correctness, and responsibility. It taught me that effort doesn’t always translate into outcomes, but that learning still accumulates quietly, and often invisibly.

Letting this work exist now, in writing, feels like the right way to close it. Not as a success story, and not as a failure, but as a chapter that shaped how I approach building things going forward.

[GitHub repository containing source code and screenshots](https://github.com/Nikhithasriram/Tracking)

---
layout: post
title: "Architectural Cost: A year of Gemjars."
date: 2013-05-21 09:15
comments: true
categories: 
---

This post is an experience report of building, maintaining and rebuilding a internet service, [Gemjars](http://gemjars.org). It shows how the usage bills from Infrastructure Providers can be motivation for architectural cost reduction and improvement.

## What is Gemjars?
[Gemjars](http://gemjars.org) is a service I have been running for the last year. It allows you to include RubyGems as dependencies in any maven-based dependency management tool[[1]](#conclusion) for use with JRuby. It does this by bridging the HTTP API for maven to the HTTP API for RubyGems. For hybrid java/ruby projects this is means the build tooling is uniform for either the ruby or java code. **WIN!**

## Caching Proxy Architecture
The original architecture of Gemjars.org used a caching proxy-based architecture. When Gemjars didn't have a requested resource in the cache, it would

+ Fetch the gem from RubyGems
+ Package it as a jar with its associated pom.xml
+ Cache any generated artifacts (pom, jar, ivy.xml)
+ Send them back to the client. 

This approach was sound and validated the idea, but there were some significant deficiencies:

+ Native extensions could not be repackaged for consumers because they are not supported by JRuby.
+ Requests often take a long time, because of the in-request interaction with RubyGems and this caused request timeouts for some consumers (especially intermediate proxies like artifactory).
+ The were some reasonably serious stability issues also, where the only known solution was to restart the service. I have theories about thread safety issues when using the RubyGems API in a multithreaded environment, but there was nothing I could really put my finger on.

The worst thing about all of these issues is that they stopped developers from continuing with their work. **FAIL!**

## Rethinking the Design
For a long time I had thought about enhancing the design by caching the artifacts in an S3 bucket and redirect the client there. This would have meant that all clients would have to follow redirects, which I couldn't guarantee. But it led me to the thought of using an S3 bucket as a mirror for all RubyGems.

Initially I thought this was a crazy idea, RubyGems is huge. But using the [AWS Calculator](http://calculator.s3.amazonaws.com/calc5.html) I was able to quickly see whether this was financially viable. The numbers:

+ **Storage:** ~100GB (built a straight RubyGems mirror to get this number)
+ **GET Requests:** 1m (current traffic is about 150k, most HEAD requests)
+ **PUT Requests:** 300k (Guess)
+ **Data Out:** 20GB (Guess)
+ **Data In:** ~100GB (Represents a full mirror, ongoing would be smaller)
 
**Total Cost: $11.52 USD**

The amazing thing is that I was already spending about $40 on a small EC2 instance. With these estimates, the design seemed cost effective. Apparently RubyGems is not that huge.

The static design served from S3 seemed like a good way to solving the stability. The S3 SLA states that if they do not provide 99.9% uptime I will be reimbursed with service credit, there is no way I could provide that level of service on my own.

The request timeout issues became a non-issue as all the artifacts were built ahead of time, removing the latency to RubyGems. A nice side effect of the design is that as all gems are processed ahead of time, allowing for a compatibility page. A compatibility page should help greatly when diagnosing why a gem is unavailable.

## Conclusion
Quantifying the cost of infrastructure is extremely valuable. Without measuring the cost of infrastructure it is impossible to decrease the cost in an informed way. Part of the value proposition of AWS and other infrastructure service providers is that your infrastructure cost is quantified in your monthly bill.

S3 has changed my default design for a public facing website. Typically I would have used some ruby server, sinatra, and haml. The ruby stack comes with two basic options for deployment: Heroku or Roll-Your-Own. Heroku is good to start, free, slow if your dyno stops, and faster if you pay. Roll your own is expensive to start, many tools make it easier, but you still have to at least think about, OS, instance size, chef/puppet, packaging, deployment... and the list goes on. There is a lot of knowledge required to do this well, and is an expensive way of serving HTML.

Now when looking at a web problem, I’ll be looking to see how I can build it with a cheap, reliable, static solution.

[1] for example: Maven, Ivy, Gradle, Buildr, leiningen


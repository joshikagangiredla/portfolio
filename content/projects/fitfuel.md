---
# ── Basics ──────────────────────────────────────────────
title: "FitFuel"
slug: "fitfuel"
summary: "A fitness app concept that adapts today's workout to the time, energy and body you actually have, shaped by four weeks of research and testing."
hook: "5 p.m. on a Tuesday. The meeting ran over, your back is stiff, and the plan says 45 minutes."
order: 1
featured: true
card: "UX case study · AI app"        # Small label under the title on the Work grid
status: draft

# ── Context ─────────────────────────────────────────────
type: "Class project"
course: "AI for UX Design"
client: "FitFuel, a fictional early-stage start-up (course brief)"
year: 2026
duration: "4 weeks, Oct 24 – Nov 23, 2026"
role: "Sole designer and researcher"
team: []
disciplines: ["UX research", "AI product design", "Interaction design", "Accessibility", "Usability testing"]
tools: ["Figma", "Claude", "Zoom", "Clipto"]
methods: ["Literature review", "Market scan", "Interview synthesis", "WCAG 2.2 AA audit", "Wizard-of-Oz usability testing"]
deliverables: ["Research direction brief", "Stakeholder research report", "One-page design brief", "23-screen Figma prototype (light and dark)", "Accessibility audit", "Usability test findings"]

# ── Images (files go in /images/fitfuel/) ───────────────
cover:
  src: "/images/fitfuel/cover.png"   # TODO: add cover image
  alt: "FitFuel app screens on a sky-to-lavender background: a daily check-in, a recommended 15-minute seated session, and a Done screen."
thumbnail:
  src: "/images/fitfuel/cover.png"
  alt: "FitFuel's Today's session screen recommending a shorter, seated workout."

# ── Links ───────────────────────────────────────────────
links:
  live: ""
  prototype: "https://www.figma.com/design/4IZR00nviEzovqgt7A4MWG"
  other: ""

# ── SEO ────────────────────────────────────────────────
seo:
  title: "FitFuel: AI fitness app case study"
  description: "How research and Wizard-of-Oz testing shaped a fitness app that adapts each day's workout to your time, energy and body, without making you log."
---

## 01 Setting the scene: A start-up betting that AI can make fitness stick

FitFuel's brief was broad: use AI to make fitness and nutrition routines "more personal, more adaptive, and easier to sustain in busy lives." The starting audiences were time-pressed working adults, people returning after a lapse, and people whose access needs make mainstream fitness apps hard to use.

FitFuel is a fictional start-up from my AI for UX Design course. Over four weeks, from October 24 to November 23, 2026, I was the **sole designer and researcher**, and I treated two things in the brief as open questions: who it was really for, and whether AI belonged in the product at all.

Retention is the whole game. About 70% of lifestyle-app users stop within 100 days, yet 76% of one activity app's users came back after 30 or more days away. And the cheapest competitor is free: about 1 in 3 U.S. adults already use an AI chatbot for health information.

## 02 The problem: Adapt to someone's day without making them report on it

To adapt, an app has to know how your day and your body are. But the people FitFuel is for quit apps that make them log, measure or explain themselves.

In the interviews, four of five people had quit a plan that couldn't bend to an injury or body change, and four of five had quit something over logging. One put it simply: "It took me twenty minutes to log a meal. So I deleted it." At the same time, all five wanted the day's decision made for them, with a way to override it.

> How little can someone tell the app, and still get a session that fits today?

## 03 Digging in: What people quit over isn't what they complain about most

Each week's output became the next week's input, and I kept one evidence log across all four, so any claim in the final design traces back to a source.

- **Week 1, direction:** three provisional user hypotheses (labelled unvalidated), four research questions including "is AI justified?", and a source and ethics policy.
- **Week 2, evidence:** about 25 studies, a market scan of 20 products and 117 sources, and 7 interview transcripts synthesized into 13 themes and 83 logged claims.
- **Week 3, design:** a one-page brief for one flow, a 23-screen Figma prototype in light and dark, and an accessibility audit.
- **Week 4, testing:** four moderated Wizard-of-Oz sessions, fixes, and this case study.

The most useful work was critique. Three rounds against my own drafts changed six findings. "No time" as the core barrier became **fatigue plus unpredictable schedules**. Returning users stopped being a separate audience, because all five interviewees were both time-pressed and returning. And the loudest complaint, streaks and lapse messages, turned out to cause **zero** actual quits once I counted them.

That left three opportunities, in priority order: **win the bad day**, be **inclusive by default** (audio-complete, seated options as standard, not behind a paywall), and show **progress without measurement** (no food logging by default, weight never required).

I designed for **Maya**, an illustrative persona built from one participant: early 30s, a senior marketing role with nonstop meetings, and a desk-job back problem. Her failure mode is slow erosion: "5 p.m. on a Tuesday... a meeting runs over." Two stress-test personas kept the design honest: one with progressive sight loss and long COVID, for whom doing less can be the right answer, and one who goes "five times or zero" and needs holding back after a lapse.

### How I used AI
Claude worked inside a configured project with my standing instructions: cite sources, label anything unsupported as a hypothesis, and push back on my framing. It searched, drafted syntheses, critiqued its own drafts, wired the Figma prototype and ran a scripted accessibility scan. I set the questions, chose the personas, the opportunity and the AI's role, and approved every correction. One rule ran under everything: **AI never validates its own claims.**

## 04 The turning point: Winning the bad day

Of the three opportunities, only one was a place where AI plausibly earned its spot: the day when your plans or your body don't match the plan, and you need a version that still counts instead of skipping it or overdoing it.

Before designing a single screen, I locked the AI's role into one sentence:

> **FitFuel understands how you feel today, and learns what that means for you.**

People can say "back's grumpy, slept badly" instead of filling in fields, and over time the app learns what "low energy" means for *this* person. They can see, correct or reset what it learned. I labelled that role a hypothesis from the start, because no study shows AI beats a person adjusting their own plan. Testing would have to prove it.

## 05 Making it real: One check-in, one session, one reason
<!-- layout: stacked -->

The flow starts at 5 p.m. on a bad Tuesday. Maya says or taps how today is. FitFuel shows back what it heard, recommends one session with a reason in her own words, and lets her change it in one tap. A 5-minute session ends with the same "Done" as a 45-minute one.

![FitFuel Today screen before check-in, with planned sessions and no streaks](/images/fitfuel/today.png "Entry is the check-in, not a dashboard")

### The AI shows its reading
Every input on the "Here's what I heard" screen comes from her own words. When it's unsure, it asks ("stiff, or does it hurt?") instead of guessing.

![FitFuel "Here's what I heard" screen reflecting the user's check-in](/images/fitfuel/heard.png "The AI shows what it understood")

### One session, never a list
Maya: "When I have to design the workout myself, I will absolutely not do it." So FitFuel recommends exactly one session, with a reason line that names her inputs: "Shorter and seated because you said 15 minutes and your lower back is stiff." No "AI-powered" badges; visible reasoning builds trust.

![FitFuel Today's session screen recommending a 15-minute seated session with its reason](/images/fitfuel/session.png "One session with a reason")

### Sharp pain goes to a person
Stiffness gets adapted. Sharp, swollen or new pain is routed to a physio or GP. Over-warning was the most common chatbot error I found, and under-warning risks injury, so the line had to be clear.

![FitFuel pain routing screen suggesting a physio or GP for sharp pain](/images/fitfuel/pain.png "Sharp pain is routed to a human")

### Short counts as done
"Done. 15 minutes, seated." Same wording at any length, and rating is optional. No streaks, no comments on gaps, and a quiet welcome back after time away.

![FitFuel Done screen confirming a 15-minute seated session](/images/fitfuel/done.png "A short session ends with the same Done")

### Learning you can see and undo
"Low energy: 15 minutes feels about right." Every learned pattern can be changed, forgotten or reset.

![FitFuel "What I've learned" screen with editable learned patterns](/images/fitfuel/learned.png "Learning you can see, correct and reset")

### Accessible from the start
A scripted scan of all 46 screens checked every text layer's contrast and every tap target against WCAG 2.2 AA. Dark mode passed; light mode didn't. Coral text on cream was 2.47:1, so I added a darker accent (5.26:1). Small "Back," "Cancel" and "Not today" targets grew to 44 pt, and "End session" got a confirmation: "What you've done still counts." The re-scan was clean. Seated sessions, captions and a "repeat cue" are standard, not an "accessible mode."

### Testing with a wizard behind the curtain
I ran four moderated Wizard-of-Oz sessions on November 20 and 21. I played the AI: when a participant described their day, I triggered the matching "Here's what I heard" screen.

- **Make the session longer:** 4 of 4 passed. The core pacing mechanic holds.
- **Sharp pain:** everyone who reached it trusted it. "It's making sure that I'm not doing anything wrong."
- **Why this session?** The reason works once read, but the Why box was noticed late.
- **Return after time away:** nobody felt judged.
- **Check in on a bad day** and **see what it learned** struggled, mostly from prototype bugs and setup.

Then came the surprise. **Nobody used voice.** Even when told they could speak, all four typed or tapped. The wizard was built around a spoken check-in, so it was never triggered, and the AI idea at the heart of FitFuel went untested. That choice is itself a finding: on a bad day, people reach for chips and a few typed words, not a conversation.

Participants also raised something on their own, all four of them: **reach me, don't wait to be opened.** "If we are not doing anything from past two weeks, obviously we need that push to start."

### What changed after testing
- Fixed the three bugs testers hit, and added "Pick any that fit, or skip" above the chips.
- Dimmed Shorter and Longer at their limits, so buttons can't lead nowhere.
- Designed the reach-out testers asked for: a notification that offers today's session and never mentions missed days.
- Rebuilt the visual direction in a light, sky-blue style with black buttons and an iOS type system, plus a matching dark mode.

![Two FitFuel notifications: "Check in for today's session" and "Got five minutes today? Your session is ready: 5 or 15 min."](/images/fitfuel/notif.png "A reach-out that never mentions missed days")

## 06 The ending: Honest about what's proven

FitFuel ended as a tested, accessible 23-screen prototype with a clear flow for the bad day, and an honest record of what testing did and didn't prove. My recommendations for what comes next:

1. **Test the AI before building it.** Run sessions with the wizard live on typed words too. If fewer than 4 of 5 people accept the app's reading, ship a three-tap check-in with simple rules.
2. **Test the reach-out**, one reminder at a time the user picks, offering the 5-minute version.
3. **Make the session card clearer**, with labelled rows, action buttons ("+ 5 min") and a stronger first line in the Why box.
4. **Get a physio to review the pain triggers.** "Sharp, swollen or new" is my working list, not a clinical one.
5. **Finish the accessibility work Figma can't show:** screen-reader labels, 200% text and a landscape player.

<!-- layout: full -->
**What I learned**
- **Counting behaviour beats counting opinions.** The loudest complaint, streaks, caused no quits. Designing against the strongest quotes would have built the wrong product.
- **Labelling everything was slow, and worth it.** Writing "hypothesis" next to the AI's role made it obvious what testing had to prove, and when it didn't.
- **My test assumed people would talk.** Nobody spoke, so next time I'll pilot the method with one person first and script scenarios word for word.
- **AI made the work wider, not automatically better.** It let one person scan 20 products and audit 46 screens, but the value came from the critique loops, not the first drafts.
- **I'd recruit beyond my network**, including a screen-reader user.

---

### Notes and sources
FitFuel is a fictional client from my AI for UX Design course. Interviews were course-supplied (5 U.S. former athletes); testing used 4 participants from my own network, so treat results as signals, not proof. Participant quotes are anonymised and names are illustrative.

- Kidman et al. (2024), *JMIR* 26:e56897
- Lin (2018), return after 30+ days away
- KFF and Pew surveys on AI chatbot use for health information
- Sturm & Cohen (2019), *Preventing Chronic Disease* 16:190017
- W3C, WCAG 2.2 (2024)

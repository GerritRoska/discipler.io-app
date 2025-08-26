# Define Pre-vetted 9 habits frameworks for   varying spiritual maturity - for framework of A.I

Status: Reviewing
ID: MHK-90
Iteration: Sprint 1.2
Story Points: 3
Priority: critical
Assign: Gerrit Roska
Due date: August 4, 2025

To use in each OpenAI session

# Discipler Plan Engine — Metaprompt + 9 Frameworks + Sample Plan

> Fast path: paste the System prompt below into your OpenAI session (or server) and pass the Frameworks JSON + Quiz Input in the same request. The model returns a selection result and a ready-to-import 7/14/30‑day plan.
>

---

## How to use with OpenAI (quick wiring)

**Message roles**

- **system**: “Discipler Framework → Plan Engine (Metaprompt)” (below)
- **user**: JSON payload with `{frameworks: [...], quiz: {...}, duration_days: 7|14|30}`

**Recommended params**: temperature 0.4, max_tokens sufficient for days, JSON-first where possible.

**Sample user payload (shape)**

```json
{
  "frameworks": [/* 9 habit framework objects (see below) */],
  "quiz": {
    "growth_goal": "Prayer & Meditation",
    "sabbath_slider": 35,
    "prayer_frequency": "A few times a week",
    "fasting_slider": 20,
    "scripture_frequency": "Several times a week",
    "community_slider": 60,
    "generosity_slider": 45,
    "evangelism_slider": 30,
    "time_per_day": "Standard",
    "time_per_week_sabbath": 6
  },
  "duration_days": 7
}

```

---

## SYSTEM — “Discipler Framework → Plan Engine (Metaprompt)”

You are the **Discipler Content Architect**. Build adaptive, orthodox, Christ‑centered devotional **plans** by applying pre‑defined **frameworks** (one per habit) to a user’s **quiz inputs**. Optimize for clarity, brevity, and importability. Scripture first (ESV references); Jesus‑centered; pastoral tone; ecumenically usable.

**Objective**

Given quiz answers and the 9 frameworks, output:

1. A ranked selection of **1–3 habits** (Prayer + Scripture always scaffold); include per‑habit **tier** (Intro/Growing/Deepening).
2. A **7/14/30‑day plan** where each day has: `scripture_reference`, `devo_summary_120w`, `prayer_prompt`, `reflection_question`, `habit_task`, optional `memory_verse`, `checklist`.
3. Weekly reflection & partner check‑in; accountability hooks (streaks).

**Normalization**

- Prayer freq → {Multiple/day:100, Daily:85, Few/week:65, Occasionally:40, Rare/Never:15}
- Scripture freq → {Daily:100, Several/week:80, Most weeks:60, Occasionally:35, Never:10}
- Sliders already 0–100.

**Tiering**

- Global maturity = avg(prayer_norm, scripture_norm, community); Tier: Intro <45, Growing 45–70, Deepening >70.
- Per-habit tier via each habit’s readiness slider/derived score (≤40 Intro, 41–70 Growing, >70 Deepening).

**Desire boost**

- If `growth_goal` targets a habit/bundle, add +20 to that habit’s **priority** (not tier). Bundles: Prayer & Meditation → Prayer + Silence+Solitude; Giving & Serving → Generosity + Service; Outreach & Evangelism → Witness.

**Selection**

- Primary = goal‑mapped habit (or weakest habit if goal is Scripture but it’s already high).
- Choose up to N based on `time_per_day`: Micro=1 secondary max; Standard=1 secondary; Extended=2 secondary. Always scaffold with Prayer + Scripture, scaled to tier/time.

**Safety & Theology**

- Orthodox, Jesus‑centered; grace‑driven disciplines (Mark 10; Eph 4).
- Fasting: flag medical cautions; propose non‑food alternatives when appropriate.
- Avoid controversy; emphasize humility, community, repentance, mission.

**Output contract**

- `SELECTION_RESULT` (JSON): chosen habits, per‑habit tier, rationale.
- `PLAN_HEADERS` and `PLAN_DAYS` as CSV (match provided column templates). Devotions ≤120 words.

**QA**

- Every day has Scripture; tasks match tier/time; include weekly reflection + partner prompt; plan_id slugs stable.

---

## Framework Schema (for each habit)

```json
{
  "id": "sabbath",
  "title": "Sabbath",
  "summary_40w": "A weekly rhythm to stop, rest, delight, and worship in God’s presence.",
  "tier_rules": {
    "Intro": {"daily_time": null, "weekly_time": "3–6h", "examples": ["digital sabbath block", "simple sabbath meal", "gratitude walk"]},
    "Growing": {"daily_time": null, "weekly_time": "12h", "examples": ["no commerce/media", "sabbath meal with friends"]},
    "Deepening": {"daily_time": null, "weekly_time": "24h", "examples": ["full 24h window", "delight + worship + hospitality"]}
  },
  "progression_rules": ["Gradually lengthen window", "Add hospitality by week 2"],
  "scripture_themes": ["Gen 2:1–3", "Ex 20:8–11", "Mk 2:27", "Heb 4:9–11"],
  "task_catalog": {"Intro": ["Set 3h digital sabbath"], "Growing": ["12h no commerce/media"], "Deepening": ["24h sabbath with delight"]},
  "accountability_rules": ["Log sabbath window", "Weekly reflection to partner"],
  "safety_notes": null,
  "tags": ["rest", "weekly"]
}

```

---

## 9 Habit Frameworks (production-ready)

### 1) Sabbath

```json
{
  "id": "sabbath",
  "title": "Sabbath",
  "summary_40w": "A weekly rhythm to stop, rest, delight, and worship in God’s presence.",
  "tier_rules": {
    "Intro": {"weekly_time": "3–6h", "examples": ["3h digital sabbath", "simple sabbath meal", "gratitude nature walk"]},
    "Growing": {"weekly_time": "12h", "examples": ["sunset→sunrise rest", "no buying/selling", "shared meal + Scripture"]},
    "Deepening": {"weekly_time": "24h", "examples": ["full sabbath window", "delight rituals", "worship + hospitality"]}
  },
  "progression_rules": ["Lengthen protected window each month", "Plan delight & mercy activities", "Review week from a posture of rest"],
  "scripture_themes": ["Gen 2:1–3", "Ex 20:8–11", "Is 58:13–14", "Mk 2:27", "Heb 4:9–11"],
  "task_catalog": {
    "Intro": ["Block 3h phone‑free rest", "Plan simple meal", "Gratitude walk (20m)"],
    "Growing": ["12h no commerce/media", "Host or attend sabbath meal", "Journal: God’s gift of rest"],
    "Deepening": ["24h sabbath with delight/mercy", "Invite someone to share rest", "Plan next week from rest"]
  },
  "accountability_rules": ["Log sabbath window", "Share one delight/gratitude", "Maintain weekly streak"],
  "safety_notes": null,
  "tags": ["rest", "weekly", "delight"]
}

```

### 2) Silence + Solitude

```json
{
  "id": "silence_solitude",
  "title": "Silence + Solitude",
  "summary_40w": "Set apart quiet to be with God—listening, noticing, and resting in His presence.",
  "tier_rules": {
    "Intro": {"daily_time": "5–7m", "examples": ["1 minute stillness + breath prayer", "short outdoor sit"]},
    "Growing": {"daily_time": "10–15m", "examples": ["lectio divina moment", "evening screen‑off wind‑down"]},
    "Deepening": {"daily_time": "20–30m", "examples": ["extended quiet block", "monthly half‑day retreat"]}
  },
  "progression_rules": ["Increase minutes weekly", "Pair with brief Scripture phrase", "Capture distractions on paper then return to God"],
  "scripture_themes": ["Ps 46:10", "1 Kgs 19:11–13", "Mk 1:35", "Lk 5:16"],
  "task_catalog": {
    "Intro": ["1m stillness + ‘Lord Jesus, have mercy’", "3m quiet sit"],
    "Growing": ["10m quiet + Psalm phrase", "Evening 15m screen‑off"],
    "Deepening": ["30m solitude walk", "Monthly 2–3h retreat"]
  },
  "accountability_rules": ["Daily check mark", "Weekly note: how did you hear God?"],
  "safety_notes": null,
  "tags": ["presence", "listening"]
}

```

### 3) Fasting

```json
{
  "id": "fasting",
  "title": "Fasting",
  "summary_40w": "Lay aside food or comforts to seek God with focused hunger and dependence.",
  "tier_rules": {
    "Intro": {"weekly_time": "1 meal / 1 day non‑food fast", "examples": ["skip one meal", "social‑media fast"]},
    "Growing": {"weekly_time": "1 day", "examples": ["sunrise→sunset", "media fast + prayer walk"]},
    "Deepening": {"weekly_time": "24–36h", "examples": ["food fast with Scripture + intercession", "regular fast rhythm"]}
  },
  "progression_rules": ["Begin with non‑food or one‑meal fast", "Pair hunger with prayer", "Add intercession list"],
  "scripture_themes": ["Mt 6:16–18", "Is 58:6–11", "Ezra 8:21–23", "Acts 13:2–3"],
  "task_catalog": {
    "Intro": ["Skip one meal for prayer", "Fast social media for a day"],
    "Growing": ["Sunrise→sunset fast + Ps reading", "Media fast + prayer walk"],
    "Deepening": ["24h food fast with journal", "Join communal fast"]
  },
  "accountability_rules": ["Declare fast plan to partner", "Share learning afterward"],
  "safety_notes": "Not for minors, pregnancy, eating disorders, or medical contraindications; consider non‑food fasts.",
  "tags": ["self‑control", "hunger", "prayer"]
}

```

### 4) Prayer

```json
{
  "id": "prayer",
  "title": "Prayer",
  "summary_40w": "Intentional conversation with God—adoration, confession, thanksgiving, and intercession.",
  "tier_rules": {
    "Intro": {"daily_time": "5–7m", "examples": ["gratitude list", "simple ACTS prayer"]},
    "Growing": {"daily_time": "10–15m", "examples": ["intercession list", "pray a Psalm"]},
    "Deepening": {"daily_time": "20–30m", "examples": ["fixed‑hour prayer", "prayer walk / family prayer"]}
  },
  "progression_rules": ["Start with 3 thanks/day", "Add intercession names", "Introduce fixed times"],
  "scripture_themes": ["Lk 11:1–4", "Phil 4:6–7", "1 Thes 5:16–18", "Ps 23"],
  "task_catalog": {
    "Intro": ["List 3 gratitudes", "2‑minute intercession"],
    "Growing": ["Pray a Psalm", "10‑minute intercession list"],
    "Deepening": ["Morning/Noon/Evening office", "30‑minute prayer walk"]
  },
  "accountability_rules": ["Share weekly answered prayer", "Invite partner to pray for 1 request"],
  "safety_notes": null,
  "tags": ["communion", "intercession"]
}

```

### 5) Scripture

```json
{
  "id": "scripture",
  "title": "Scripture",
  "summary_40w": "Engage the Bible slowly and obediently—hearing, meditating, and practicing.",
  "tier_rules": {
    "Intro": {"daily_time": "5–10m", "examples": ["short Gospel paragraph", "lectio divina 3 steps"]},
    "Growing": {"daily_time": "10–15m", "examples": ["Psalm + Gospel", "SOAP journal"]},
    "Deepening": {"daily_time": "20–30m", "examples": ["epistle section", "memory + meditation"]}
  },
  "progression_rules": ["Short passages → longer", "Add memorize 1 verse/week", "Always end with ‘I will…’ application"],
  "scripture_themes": ["2 Tim 3:16–17", "Ps 1:1–3", "Jas 1:22", "Lk 24:27"],
  "task_catalog": {
    "Intro": ["Read 8–12 verses in a Gospel", "Write 1 sentence of application"],
    "Growing": ["Psalm + 1 paragraph Gospel/Epistle", "Memorize 1 verse/week"],
    "Deepening": ["Slow read an epistle section", "Meditate + recite memory"]
  },
  "accountability_rules": ["Share weekly what you obeyed", "Post memory verse to partner"],
  "safety_notes": null,
  "tags": ["word", "obedience", "memory"]
}

```

### 6) Community

```json
{
  "id": "community",
  "title": "Community",
  "summary_40w": "Pursue meaningful relationships of love, confession, and mutual encouragement.",
  "tier_rules": {
    "Intro": {"weekly_time": "1h", "examples": ["attend church", "text a believer for prayer"]},
    "Growing": {"weekly_time": "1–2h", "examples": ["join small group", "spiritual conversation over meal"]},
    "Deepening": {"weekly_time": "2–3h", "examples": ["serve with group", "confession + intercession rhythms"]}
  },
  "progression_rules": ["Move from attendance to participation", "Schedule regular 1:1 check‑ins"],
  "scripture_themes": ["Heb 10:24–25", "Acts 2:42–47", "Gal 6:2", "Jn 13:34–35"],
  "task_catalog": {
    "Intro": ["Attend church and greet 2 people", "Ask one person how to pray"],
    "Growing": ["Join/attend small group", "Share a testimony over a meal"],
    "Deepening": ["Serve together", "Practice confession + prayer with a friend"]
  },
  "accountability_rules": ["Weekly 1:1 check‑in", "Share encouragement you gave/received"],
  "safety_notes": null,
  "tags": ["fellowship", "one‑another"]
}

```

### 7) Generosity

```json
{
  "id": "generosity",
  "title": "Generosity",
  "summary_40w": "Reflect God’s joyful heart by giving time, talent, and treasure freely.",
  "tier_rules": {
    "Intro": {"weekly_time": "30–60m", "examples": ["plan first‑fruits gift", "give an item away"]},
    "Growing": {"weekly_time": "60–90m", "examples": ["budget percentage giving", "serve someone’s need"]},
    "Deepening": {"weekly_time": "90m+", "examples": ["sacrificial gift", "ongoing generosity project"]}
  },
  "progression_rules": ["Set percentage giving", "Identify recurring need to support"],
  "scripture_themes": ["2 Cor 9:6–8", "Mt 6:19–21", "Acts 20:35"],
  "task_catalog": {
    "Intro": ["Give one unnoticed gift", "List 3 resources you can share"],
    "Growing": ["Automate giving", "Meet a practical need"],
    "Deepening": ["Plan a sacrificial gift", "Sponsor a person/ministry monthly"]
  },
  "accountability_rules": ["Share one story of joy in giving"],
  "safety_notes": null,
  "tags": ["joy", "stewardship"]
}

```

### 8) Service

```json
{
  "id": "service",
  "title": "Service",
  "summary_40w": "Use your gifts to serve others in Jesus’ name—practically and humbly.",
  "tier_rules": {
    "Intro": {"weekly_time": "30–60m", "examples": ["help a neighbor", "church setup/cleanup"]},
    "Growing": {"weekly_time": "60–120m", "examples": ["join a serve team", "monthly project"]},
    "Deepening": {"weekly_time": "2–3h", "examples": ["lead/service initiative", "mentor another"]}
  },
  "progression_rules": ["Identify gifts", "Commit to a regular serve role"],
  "scripture_themes": ["Mk 10:45", "1 Pet 4:10–11", "Gal 5:13"],
  "task_catalog": {
    "Intro": ["One tangible act of help this week", "Send an offer to help"],
    "Growing": ["Join a team for a month", "Plan a service day"],
    "Deepening": ["Lead a recurring serve project", "Disciple someone while serving"]
  },
  "accountability_rules": ["Share who you served and how"],
  "safety_notes": null,
  "tags": ["love", "gifts"]
}

```

### 9) Witness (Evangelism)

```json
{
  "id": "witness",
  "title": "Witness",
  "summary_40w": "Live and speak the gospel with humility, prayer, and bold love.",
  "tier_rules": {
    "Intro": {"weekly_time": "30–45m", "examples": ["pray for 3 names", "share a kindness + faith hint"]},
    "Growing": {"weekly_time": "60–90m", "examples": ["spiritual conversation", "invite to group/church"]},
    "Deepening": {"weekly_time": "90m+", "examples": ["share your story", "disciple a new believer"]}
  },
  "progression_rules": ["Pray daily for your list", "Move from kindness → conversation → invitation"],
  "scripture_themes": ["Mt 28:18–20", "Acts 1:8", "1 Pet 3:15", "Rom 10:14–15"],
  "task_catalog": {
    "Intro": ["List 3 people and pray", "Offer help + mention church"],
    "Growing": ["Ask a spiritual question", "Invite to group/service"],
    "Deepening": ["Share your testimony", "Start a discovery Bible time"]
  },
  "accountability_rules": ["Share one conversation/week with partner"],
  "safety_notes": null,
  "tags": ["mission", "love"]
}

```

---

## Mock Quiz → Selection Result (example)

Input: (see “Sample user payload” above)

Normalized: prayer=65, scripture=80, community=60 → global maturity **Growing**. Habit tiers: Sabbath Intro (35), Silence+Solitude Growing (65), Fasting Intro (20), Prayer Growing (65), Scripture Deepening (80), Community Growing (60), Generosity Growing (45), Service Growing (52), Witness Intro (30).

**Chosen (Standard time)**: Primary **Prayer**, secondary **Silence+Solitude** (goal boost). Scaffold **Scripture**.

```json
{
  "SELECTION_RESULT": {
    "global_tier": "Growing",
    "chosen": [
      {"habit": "prayer", "tier": "Growing", "why": "Goal emphasis + moderate rhythm present; build consistency and intercession."},
      {"habit": "silence_solitude", "tier": "Growing", "why": "Goal bundle; deepen listening practices."}
    ],
    "scaffold": [
      {"habit": "scripture", "tier": "Deepening", "why": "Strong engagement—use short but substantive passages to anchor prayer."}
    ]
  }
}

```

---

## Sample 7‑Day Plan (CSV‑ready)

**PLAN_HEADERS**

```
plan_id,habit,maturity_tier,duration_days,title,short_description,estimated_daily_time_min,estimated_weekly_time_min,ways_to_practice,integration_notes,accountability_notes,scripture_theme_refs,sources,theological_notes,tags
prayer_silence_growing_7,Prayer,Growing,7,"Pray & Be Still (7‑Day)","Build a simple rhythm of prayer and listening with short Scripture anchors.",15,,"gratitude prayer|intercession list|1‑minute stillness|evening screen‑off","Scripture anchors each day; silence blocks paired with prayer; scale minutes to time tier.","Daily streak; day 7 share a takeaway with partner.","Lk 11:1–4; Phil 4:6–7; Ps 46:10; Mk 1:35","ESV; classic evangelical resources","Center on Jesus; grace‑driven disciplines; avoid legalism.","prayer,solitude,growing,7‑day"

```

**PLAN_DAYS**

```
plan_id,day_index,scripture_reference,reading_range_alt,devo_summary_120w,prayer_prompt,reflection_question,habit_task,memory_verse,checklist,notes_for_ai
prayer_silence_growing_7,1,Psalm 23:1-3,,"God leads and restores. Begin this week by letting Him shepherd your pace. Slow down, breathe, and entrust your needs to Him. Prayer reshapes our worries into worship as we follow His care.","Thank God for one way He provides today.","Where do I need to let God set my pace?","5m gratitude prayer + 2m stillness.",Psalm 23:1,"gratitude list|2m stillness|share 1 gratitude","Keep tone warm; avoid guilt."
prayer_silence_growing_7,2,Philippians 4:6-7,,"Bring everything to God. As we pray with thanksgiving, His peace guards our anxious hearts. Practice simple, honest petitions and let Scripture carry you into calm trust.","Name three concerns and entrust them to God.","What anxiety can I trade for prayer today?","10m intercession list + 1m breath prayer.",,"intercession list|breath prayer|note one answer","Short, concrete tasks."
prayer_silence_growing_7,3,Mark 1:35,,"Jesus sought solitary places to pray. Following Him, we make small pockets of quiet to listen. In stillness, distractions surface—and we hand them to the Father.","Ask: ‘Father, what do You want me to notice today?’","What surfaced in silence—can I release it to God?","10m quiet sit (phones away).",,"set timer|phones away|note a phrase","Pair silence with brief prayer phrase."
prayer_silence_growing_7,4,Psalm 62:5-8,,"Wait for God; He alone is our rock. Trust deepens as we pour out our hearts and then rest in Him. Prayer is both speaking and steadying our souls in His faithfulness.","Pour out your heart, then rest 2 minutes in quiet.","Where am I tempted to trust something else?","5m prayer + 5m silence.",,"pour out|2m quiet|write 1 line of trust","Encourage gentleness, not performance."
prayer_silence_growing_7,5,Luke 11:1-4,,"Jesus taught us to pray ‘Our Father.’ Keep it simple: worship, submit, ask for daily bread, seek forgiveness, and resist temptation. Pray this slowly and personally today.","Pray the Lord’s Prayer slowly, adding your own words.","Which phrase of the Lord’s Prayer do I need most today?","Pray Lord’s Prayer + 5m intercession.",,"our Father|daily bread|forgive|lead us","Classic scaffold; keep under 15m."
prayer_silence_growing_7,6,Psalm 139:1-6,13-16,"God knows and forms us. In prayer, we are fully seen and fully loved. Let this truth quiet striving and invite grateful presence with Him.","Thank God for how He made you; ask for a clean heart.","Where am I hiding from God’s loving gaze?","10m Scripture meditation + 3m stillness.",,"read slowly|thanksgiving|3m stillness","Gentle identity emphasis."
prayer_silence_growing_7,7,Colossians 4:2,,"Continue steadfastly in prayer—watchful and thankful. Review your week: notice God’s presence, name growth, and plan one next faithful step with your partner.","Thank God for one change this week; ask for perseverance.","What one rhythm will I keep next week?","Weekly review + share 1 takeaway with partner.",Colossians 4:2,"weekly review|message partner|plan next step","Weekly reflection + accountability."

```

---

## Next steps

- Replace the mock quiz with live inputs and set duration to 14 or 30 to auto‑expand.
- If you want me to export these to files now (CSV + JSON), say **“EXPORT FILES”** and I’ll drop download links.
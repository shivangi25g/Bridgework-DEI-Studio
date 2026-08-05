const tools = {
  access: {
    kicker: "Access check",
    title: "Who could be unintentionally left out?",
    copy: "Review a policy, event, intake process, or team decision through barriers people might face before they ever arrive.",
    prompts: [
      "What assumptions are we making about time, money, documents, language, transportation, or digital access?",
      "Who benefits from the current process, and who has to work harder to use it?",
      "Where can we add choice without making the experience confusing?",
      "What would we change if the person affected was in the room today?"
    ]
  },
  safety: {
    kicker: "Psychological safety",
    title: "Can people name risk without paying for it socially?",
    copy: "Use this lens before debriefs, policy rollouts, incident reviews, or team meetings where honest input matters.",
    prompts: [
      "What signals tell people that disagreement is welcome here?",
      "How do we respond when someone raises harm, bias, or burnout?",
      "Who speaks last, and whose silence might be information?",
      "What follow-up proves that feedback changed something?"
    ]
  },
  power: {
    kicker: "Power map",
    title: "Where is decision-making power sitting?",
    copy: "Map formal authority, informal influence, lived expertise, risk exposure, and who carries the consequences.",
    prompts: [
      "Who can say no, and who absorbs the outcome?",
      "Where are lived experience and frontline knowledge treated as evidence?",
      "Who needs information earlier to participate meaningfully?",
      "What power can be shared, delegated, compensated, or made transparent?"
    ]
  },
  repair: {
    kicker: "Repair script",
    title: "What would accountable repair sound like?",
    copy: "Use when a comment, process, or decision has caused harm and the goal is changed behavior, not image management.",
    prompts: [
      "Name the impact without asking the harmed person to prove it again.",
      "Ask what support or boundary is needed now.",
      "State the specific behavior or process that will change.",
      "Schedule a check-in so repair does not disappear after the apology."
    ]
  }
};

const scenarios = [
  {
    theme: "Workplace equity",
    title: "A staff member says schedule changes are hurting caregivers.",
    body: "The change improved coverage, but several employees are quietly swapping shifts and one has stopped volunteering for extra duties.",
    question: "Whose constraints were invisible when this decision was made?",
    reflection: "Look for the operational win and the equity cost at the same time. A strong response keeps coverage goals while adding transparent exceptions, caregiver input, and a review date."
  },
  {
    theme: "Housing justice",
    title: "A resident avoids a service because the intake feels unsafe.",
    body: "The program is meant to help, but the first step asks for details that could expose trauma, immigration concerns, or past system involvement.",
    question: "What information is truly needed now, and what can wait until trust is built?",
    reflection: "Reduce the barrier by explaining why each question is asked, offering opt-outs where possible, and separating care from surveillance."
  },
  {
    theme: "Inclusive programming",
    title: "A community event has low attendance from the group it hopes to serve.",
    body: "Planning was enthusiastic, but the time, location, food, childcare, and invitation channels were chosen by people outside the community.",
    question: "Where did we invite feedback too late?",
    reflection: "Shift from outreach to co-design. Involve community members before the format is fixed, and compensate expertise when the budget allows."
  },
  {
    theme: "Harm reduction",
    title: "A team wants stricter rules after a high-risk incident.",
    body: "People are scared and want certainty, but a punitive rule may push the most vulnerable people away from support.",
    question: "How can we increase safety without increasing shame or exclusion?",
    reflection: "Pair clear boundaries with non-punitive support, staff training, overdose-response readiness, and a review of what the environment made harder."
  }
];

const toolTabs = document.querySelectorAll(".tool-tab");
const toolKicker = document.querySelector("#tool-kicker");
const toolTitle = document.querySelector("#tool-title");
const toolCopy = document.querySelector("#tool-copy");
const toolPrompts = document.querySelector("#tool-prompts");

function renderTool(key) {
  const tool = tools[key];
  toolKicker.textContent = tool.kicker;
  toolTitle.textContent = tool.title;
  toolCopy.textContent = tool.copy;
  toolPrompts.innerHTML = tool.prompts.map((prompt) => `<li>${prompt}</li>`).join("");
  toolTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tool === key));
}

toolTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderTool(tab.dataset.tool));
});

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".topic-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.dataset.filter;
    filters.forEach((button) => button.classList.toggle("is-active", button === filter));
    cards.forEach((card) => {
      const visible = value === "all" || card.dataset.topic.includes(value);
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const scenarioTheme = document.querySelector("#scenario-theme");
const scenarioTitle = document.querySelector("#scenario-title");
const scenarioBody = document.querySelector("#scenario-body");
const scenarioQuestion = document.querySelector("#scenario-question");
const scenarioButton = document.querySelector("#new-scenario");
const reflectionButton = document.querySelector("#reflection-toggle");
const reflection = document.querySelector("#reflection");
let scenarioIndex = 0;

function renderScenario(index) {
  const scenario = scenarios[index];
  scenarioTheme.textContent = scenario.theme;
  scenarioTitle.textContent = scenario.title;
  scenarioBody.textContent = scenario.body;
  scenarioQuestion.textContent = scenario.question;
  reflection.querySelector("p").textContent = scenario.reflection;
  reflection.hidden = true;
  reflectionButton.textContent = "Show reflection";
  reflectionButton.setAttribute("aria-expanded", "false");
}

scenarioButton.addEventListener("click", () => {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  renderScenario(scenarioIndex);
});

reflectionButton.addEventListener("click", () => {
  const nextState = !reflection.hidden;
  reflection.hidden = nextState;
  reflectionButton.textContent = nextState ? "Show reflection" : "Hide reflection";
  reflectionButton.setAttribute("aria-expanded", String(!nextState));
});

const focus = document.querySelector("#focus");
const practice = document.querySelector("#practice");
const measure = document.querySelector("#measure");
const pledgeText = document.querySelector("#pledge-text");
const scanInputs = [
  document.querySelector("#engagement"),
  document.querySelector("#reflection-score"),
  document.querySelector("#exploration"),
  document.querySelector("#care-score")
];
const scanResultText = document.querySelector("#scan-result-text");
const comicPrompts = [
  "Rewrite one panel from the perspective of the person with the least power in the room.",
  "Add a missing access need: time, language, childcare, transportation, technology, or safety.",
  "Pause the story at panel two. What question would move the group from blame to learning?",
  "Name the hidden rule in the comic. Who benefits from it, and who has to adapt?",
  "Design a fifth panel where the group follows up instead of treating inclusion as a one-time fix."
];
const comicPromptButton = document.querySelector("#comic-prompt-button");
const comicPrompt = document.querySelector("#comic-prompt");
let comicPromptIndex = 0;
const theaterTabs = document.querySelectorAll(".theater-tab");
const theaterPanels = document.querySelectorAll(".theater-panel");
const questResult = document.querySelector("#quest-result");
const choiceButtons = document.querySelectorAll(".choice-button");
const valueResult = document.querySelector("#value-result");
const valueButtons = document.querySelectorAll(".value-button");
const surveyInputs = document.querySelectorAll(".survey-input");
const surveyResultText = document.querySelector("#survey-result-text");
const labTabs = document.querySelectorAll(".lab-tab");
const labPanels = document.querySelectorAll(".lab-panel");
const allyLearn = document.querySelector("#ally-learn");
const allyAdvocate = document.querySelector("#ally-advocate");
const allyEmpathy = document.querySelector("#ally-empathy");
const allyPlanText = document.querySelector("#ally-plan-text");
const scenePromptButton = document.querySelector("#scene-prompt-button");
const scenePrompt = document.querySelector("#scene-prompt");
const scenePrompts = [
  "Choose a scene where someone is dismissed. What evidence is ignored, and whose crDEIbility is protected?",
  "Find a moment where a character changes their mind. What made learning possible: trust, discomfort, accountability, or care?",
  "Pause during a conflict scene. What would an ally do that does not make the harmed person carry the whole conversation?",
  "Pick a scene about belonging. What rule, space, or tradition decides who feels at home?",
  "Watch for silence. Who is quiet because they are safe, and who is quiet because speaking has a cost?"
];
let scenePromptIndex = 0;
const roleContent = {
  student: {
    kicker: "Student",
    title: "Learn, notice, and make participation safer.",
    copy: "Students can practice DEI by noticing who is included in examples, whose voices shape group work, and how classmates are supported when they name barriers.",
    actions: [
      "Ask whose perspective is missing from a class discussion or group project.",
      "Share crDEIt clearly and interrupt patterns where one person does invisible work.",
      "Use chosen names and pronouns, and correct mistakes briefly."
    ]
  },
  educator: {
    kicker: "Educator",
    title: "Design the room before asking people to belong.",
    copy: "Educators can make DEI concrete by changing examples, access practices, participation formats, and how feedback is handled.",
    actions: [
      "Audit readings, cases, slides, and examples for whose knowledge is centered.",
      "Offer multiple ways to participate: speaking, writing, anonymous input, and reflection.",
      "Explain how accommodation, conflict, and feedback processes work before they are needed."
    ]
  },
  manager: {
    kicker: "Manager",
    title: "Turn values into processes people can trust.",
    copy: "Managers influence hiring, workload, scheduling, conflict repair, evaluation, and psychological safety.",
    actions: [
      "Review outreach, hiring, and evaluation language for bias and hidden barriers.",
      "Track who gets mentorship, visibility, stretch assignments, and service work.",
      "Respond to harm with clear repair steps, not just informal reassurance."
    ]
  },
  ally: {
    kicker: "Ally",
    title: "Use your access to reduce someone else's burden.",
    copy: "Allyship is active: learning, listening, advocating, and repairing without making marginalized people carry the whole lesson.",
    actions: [
      "Speak up when exclusion happens, especially when the affected person is not present.",
      "Do your own learning before asking someone to educate you.",
      "Share power, crDEIt, information, and access."
    ]
  },
  community: {
    kicker: "Community worker",
    title: "Build trust through access, dignity, and follow-through.",
    copy: "Community-facing DEI means designing services with people, reducing stigma, and treating lived experience as expertise.",
    actions: [
      "Ask what barrier makes support hardest to access right now.",
      "Co-design programs with people affected by the outcome.",
      "Close the loop by showing what changed after feedback."
    ]
  }
};
const roleButtons = document.querySelectorAll(".role-button");
const roleKicker = document.querySelector("#role-kicker");
const roleTitle = document.querySelector("#role-title");
const roleCopy = document.querySelector("#role-copy");
const roleActions = document.querySelector("#role-actions");
const journalPrompts = [
  "What assumption did I notice in myself while exploring this site?",
  "Which barrier had I not considered before?",
  "Where did I see equality being mistaken for equity?",
  "What would it look like to practice care with accountability?",
  "Who should be included before a decision is finalized?",
  "What is one action I can take this week that does not depend on being praised?"
];
const journalPromptButton = document.querySelector("#journal-prompt-button");
const journalPrompt = document.querySelector("#journal-prompt");
let journalPromptIndex = 0;
const doorStories = {
  front: {
    kicker: "Front door",
    title: "First impressions can become barriers.",
    story: "A person arrives guarded, tired, and frustrated after moving through homelessness, mental health stress, addiction stigma, and systems that may have already failed them. The easy assumption is non-compliance. A more equitable question is: what happened before they reached this door?",
    stat: "Homelessness and poverty are shaped by systems, not individual character alone.",
    theory: "Trauma-informed care asks us to read behaviour through context, safety, and past harm.",
    lens: "Unconscious bias and trauma-informed access.",
    reflection: "What story did I make up before I had enough context?"
  },
  intake: {
    kicker: "Intake room",
    title: "Paperwork can decide who feels safe enough to stay.",
    story: "Intake is not just a form. It can be the first moment someone is asked to repeat trauma, prove need, explain identity, disclose immigration or family context, or trust a worker they just met. Equity means privacy, plain language, interpretation, consent, and enough time to build trust.",
    stat: "Administrative steps can become access barriers when people are in crisis, exhausted, afraid, or missing documents.",
    theory: "Procedural justice asks whether processes feel fair, respectful, understandable, and voice-giving.",
    lens: "Documentation, language access, privacy, and trust.",
    reflection: "What information do we truly need now, and what can wait until safety is established?"
  },
  dorm: {
    kicker: "Dorm room",
    title: "Privacy, dignity, and safety are DEI issues.",
    story: "A shared living space can provide shelter and still feel unsafe, especially for someone carrying trauma, abuse, withdrawal, grief, or fear. Inclusion means noticing noise, triggers, cultural needs, gender safety, disability access, and the emotional cost of constant exposure.",
    stat: "Shared shelter can provide safety while also reducing privacy, autonomy, and control.",
    theory: "Dignity-centred design looks at how space, routine, and rules shape belonging.",
    lens: "Psychological safety, accessibility, and dignity.",
    reflection: "What would make this space feel less like control and more like care?"
  },
  dining: {
    kicker: "Dining / mess",
    title: "Food is culture, health, dignity, and belonging.",
    story: "A dining space can look simple, but it holds many DEI questions: dietary restrictions, religion, allergies, disability, shame, scarcity, timing, family habits, addiction recovery, and whether people are treated with dignity while receiving basic needs.",
    stat: "Food access is not only about calories; it is connected to health, culture, autonomy, and dignity.",
    theory: "Cultural humility asks service providers to stay curious about meaning, identity, and need instead of assuming one standard works for everyone.",
    lens: "Food equity, cultural safety, disability access, and dignity.",
    reflection: "Whose food needs are treated as normal, and whose are treated as extra work?"
  },
  mDEIcal: {
    kicker: "MDEIcal room",
    title: "Healthcare access is not equal when eligibility is unequal.",
    story: "Some residents need mental health support, addiction care, wound care, mDEIcation, or crisis follow-up, but face barriers: no insurance, no family doctor, fear, stigma, transportation, or past harm in institutions. A partnership can become equity when care comes closer to people.",
    stat: "People without stable housing often face barriers to consistent primary and preventive healthcare.",
    theory: "The social determinants of health show how housing, income, racism, disability, and immigration status affect care.",
    lens: "Healthcare inequity and barrier removal.",
    reflection: "Who is expected to navigate a system that was not designed for them?"
  },
  quiet: {
    kicker: "Prayer / quiet room",
    title: "Belonging includes spiritual and emotional safety.",
    story: "A quiet room can offer prayer, grounding, grief, reflection, or a moment away from crisis. For residents with different faiths, cultures, trauma histories, neurodivergence, or emotional needs, inclusion means having space to regulate without being judged, watched, or interrupted.",
    stat: "Psychological safety includes the ability to pause, regulate, grieve, pray, and recover in ways that respect identity.",
    theory: "bell hooks' love ethic connects care, respect, knowledge, and responsibility to how people are held in vulnerable moments.",
    lens: "Spiritual safety, emotional regulation, culture, and respect.",
    reflection: "Do our spaces make room for how people cope, pray, grieve, and regain control?"
  },
  supply: {
    kicker: "Supply room",
    title: "Material support should not require shame.",
    story: "Gloves, winter coats, clothes, hygiene items, harm-reduction supplies, and donations can determine whether someone can attend an appointment, stay warm, feel clean, or be seen with dignity. Equity shows up in how supplies are offered: with choice, privacy, and respect.",
    stat: "Material resources shape participation; lack of clothing, hygiene items, and seasonal supplies can block access to work, care, housing, and safety.",
    theory: "Equity means matching support to barriers, not giving everyone the same thing and calling it fair.",
    lens: "Material dignity, harm reduction, accessibility, and choice.",
    reflection: "How can help be offered without making people feel inspected, grateful, or less human?"
  },
  office: {
    kicker: "Staff office",
    title: "Inclusion includes the people doing the care work.",
    story: "Frontline staff carry crisis, grief, conflict, overdose risk, disclosures of abuse, and safety concerns. Equity at work includes scheduling, training, voice, conflict repair, and whether staff can raise concerns without being labelled difficult.",
    stat: "Frontline care work carries emotional labour, safety risk, and high-stakes decision pressure.",
    theory: "Organizational justice asks whether power, workload, voice, and care are distributed fairly.",
    lens: "Power, workload, psychological safety, and advocacy.",
    reflection: "Who is absorbing the stress that keeps the system running?"
  },
  board: {
    kicker: "Board room",
    title: "Representation matters, but decision power matters more.",
    story: "Leadership decisions shape who gets resources, whose safety is prioritized, and what counts as success. Inclusion means lived expertise and frontline knowledge can influence strategy, not just decorate it.",
    stat: "Representation without decision power can become symbolic rather than transformative.",
    theory: "Epistemic justice means treating lived experience and frontline knowledge as real expertise.",
    lens: "Representation, decision-making power, and accountability.",
    reflection: "Who is closest to the problem, and are they close to the decision?"
  },
  exit: {
    kicker: "Exit",
    title: "Inclusive organizations are built before people reach crisis.",
    story: "The goal is not only to help someone survive one night. The goal is to build systems where fewer people are pushed to the door in the first place.",
    stat: "Prevention, housing stability, fair work, healthcare access, and belonging all reduce crisis demand.",
    theory: "Systems thinking connects individual stories to policies, budgets, leadership, and public attitudes.",
    lens: "Equity by design and collective responsibility.",
    reflection: "What would this organization change upstream if it measured dignity as a core outcome?"
  }
};
const doorButtons = document.querySelectorAll(".door-button");
const doorKicker = document.querySelector("#door-kicker");
const doorTitle = document.querySelector("#door-title");
const doorStory = document.querySelector("#door-story");
const doorStat = document.querySelector("#door-stat");
const doorTheory = document.querySelector("#door-theory");
const doorLens = document.querySelector("#door-lens");
const doorReflection = document.querySelector("#door-reflection");
const doorPanel = document.querySelector(".door-panel");
const journeyStories = {
  classroom: {
    kicker: "Classroom",
    title: "You are in a room where everyone seems to know the hidden rules.",
    story: "The professor asks for examples from work experience. You have lived experience, social service experience, and frontline knowledge, but the room seems to reward corporate language first.",
    ask: "You ask for space to connect course theory to frontline practice. The room gets a better example, and the learning becomes more accessible.",
    hide: "You translate your experience quietly in your head. You protect yourself, but the room misses knowledge that could have helped everyone learn."
  },
  casework: {
    kicker: "Case management",
    title: "A file says someone is non-compliant.",
    story: "A resident misses an appointment. The simple version is that they did not care. The fuller version may include transit, trauma, childcare, documents, fear, or a system that made them feel unwelcome.",
    ask: "You ask what got in the way. The conversation moves from blame to barriers, and the plan becomes more realistic.",
    hide: "You mark the no-show and move on. The barrier becomes invisible, and the system learns nothing."
  },
  shelter: {
    kicker: "Shelter floor",
    title: "Someone makes a comment about residents not wanting to work.",
    story: "You hear a quick judgment in a stressful space. It would be easy to let it pass because everyone is tired and there is always another crisis waiting.",
    ask: "You name the assumption and bring the focus back to barriers: trauma, documents, health, discrimination, safety, and opportunity.",
    hide: "Silence keeps the peace in the moment, but it can also teach the room that stigma is acceptable."
  },
  mba: {
    kicker: "MBA table",
    title: "Confidence is being mistaken for competence.",
    story: "A leadership discussion moves quickly. The loudest voices sound polished, while quieter forms of expertise are treated as less strategic.",
    ask: "You invite quieter expertise into the discussion. Leadership becomes more than volume; it becomes listening, context, and responsibility.",
    hide: "The loudest voices define the answer. The group may call it merit while repeating old power patterns."
  }
};
const journeySteps = document.querySelectorAll(".journey-step");
const journeyChoices = document.querySelectorAll(".journey-choice");
const journeyKicker = document.querySelector("#journey-kicker");
const journeyTitle = document.querySelector("#journey-title");
const journeyStory = document.querySelector("#journey-story");
const journeyResult = document.querySelector("#journey-result");
let currentJourney = "classroom";
const wordGrid = [
  "EQUITYZQRM",
  "ABCARERNOP",
  "MITRUSTLAD",
  "XAACCESSK",
  "QSPONMLKIJ",
  "ALLYDVCARE",
  "PRZNOTEAMS",
  "HARMREDUCE",
  "BELONGINGS",
  "VOICEPOWER"
];
const wordTargets = ["EQUITY", "CARE", "TRUST", "ACCESS", "ALLY", "BIAS"];
const wordSearch = document.querySelector("#word-search");
const wordBank = document.querySelector("#word-bank");
const wordCheck = document.querySelector("#word-check");
const wordClear = document.querySelector("#word-clear");
const wordResult = document.querySelector("#word-result");
let selectedLetters = [];
const foundWords = new Set();
const crosswordInputs = document.querySelectorAll("#front-games .crossword-input");
const crosswordCheck = document.querySelector("#crossword-check");
const crosswordClear = document.querySelector("#crossword-clear");
const crosswordResult = document.querySelector("#crossword-result");
const sortChips = document.querySelectorAll("#front-games .sort-chip");
const sortResult = document.querySelector("#sort-result");
let sortedCount = 0;
const scatterPrompts = [
  { letter: "B", category: "Cultural foods" },
  { letter: "S", category: "Ways to show respect" },
  { letter: "M", category: "Languages, greetings, or names" },
  { letter: "C", category: "Community traditions" },
  { letter: "A", category: "Accessibility supports" },
  { letter: "R", category: "Allyship actions" }
];
const scatterLetter = document.querySelector("#scatter-letter");
const scatterCategory = document.querySelector("#scatter-category");
const scatterAnswer = document.querySelector("#scatter-answer");
const scatterCheck = document.querySelector("#scatter-check");
const scatterNew = document.querySelector("#scatter-new");
const scatterResult = document.querySelector("#scatter-result");
let scatterIndex = 0;
const bingoSquares = document.querySelectorAll(".bingo-square");
const bingoResult = document.querySelector("#bingo-result");
const bingoLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const empathyPrompts = [
  {
    scenario: "A resident misses an appointment after a difficult night.",
    good: "Ask what got in the way and rebuild the plan around the barrier.",
    rethink: "Assume they are not motivated."
  },
  {
    scenario: "A seller cannot understand a dashboard that leadership says is intuitive.",
    good: "Test the journey with new sellers, low digital-literacy users, and regional-language users.",
    rethink: "Tell sellers to use the help center if they are confused."
  },
  {
    scenario: "A patient does not respond to healthcare outreach.",
    good: "Try alternate outreach channels and ask what access barriers may be present.",
    rethink: "Treat non-response as lack of interest."
  },
  {
    scenario: "A staff member reports burnout after repeated crisis shifts.",
    good: "Review workload, safety, supervision, and recovery time as system issues.",
    rethink: "Praise their resilience and keep the schedule unchanged."
  },
  {
    scenario: "A club member stops attending case-prep sessions.",
    good: "Check whether jargon, pace, confidence norms, or lack of beginner supports are creating barriers.",
    rethink: "Assume they are not serious about consulting."
  },
  {
    scenario: "A student is quiet during a discussion about identity and belonging.",
    good: "Offer low-pressure ways to contribute and do not make silence mean disengagement.",
    rethink: "Call on them publicly so they speak for their identity group."
  }
];
const empathyScenario = document.querySelector("#empathy-scenario");
const empathyChoices = document.querySelectorAll(".empathy-choice");
const empathyNew = document.querySelector("#empathy-new");
const empathyResult = document.querySelector("#empathy-result");
let empathyIndex = 0;
const strategyScenarios = [
  {
    title: "A seller dashboard is technically correct, but many small sellers are confused.",
    copy: "You are leading a product and analytics team. Engagement looks fine overall, but support tickets from newer sellers are rising.",
    outcomes: {
      fast: "Bias risk: top-user data may overrepresent confident, digitally fluent sellers and hide barriers for new or smaller sellers.",
      inclusive: "Access improved: testing with different sellers reveals language, navigation, trust, and support needs before the redesign scales.",
      support: "Partial fix: a help center can reduce friction, but if the product journey is still confusing, the burden stays on users."
    }
  },
  {
    title: "A healthcare outreach model ranks patients by expected response rate.",
    copy: "The model is efficient, but people with unstable housing, language barriers, or limited phone access may be less likely to respond.",
    outcomes: {
      fast: "Bias risk: optimizing only for response rate can exclude people who need outreach most but are harder to reach.",
      inclusive: "Equity move: add access barriers, community context, and alternative outreach channels to the decision criteria.",
      support: "Partial fix: extra follow-up helps, but the model still needs to measure barriers instead of treating silence as low interest."
    }
  },
  {
    title: "A consulting club case-prep program helps advanced students most.",
    copy: "The strongest members are improving quickly, but beginners and students unfamiliar with consulting language are not showing up again.",
    outcomes: {
      fast: "Bias risk: rewarding only polished performance can turn hidden knowledge into a gatekeeping tool.",
      inclusive: "Belonging increased: beginner tracks, jargon explanations, peer mentoring, and multiple participation formats widen access.",
      support: "Partial fix: office hours help motivated students, but the core session still needs clearer entry points."
    }
  }
];
const strategySimTitle = document.querySelector("#strategy-sim-title");
const strategySimCopy = document.querySelector("#strategy-sim-copy");
const strategyChoices = document.querySelectorAll(".strategy-choice");
const strategySimResult = document.querySelector("#strategy-sim-result");
const strategyNext = document.querySelector("#strategy-next");
let strategyScenarioIndex = 0;
const dashboardTiles = document.querySelectorAll(".dashboard-tile");
const dashboardResult = document.querySelector("#dashboard-result");
const dashboardInsights = {
  language: "Engagement may be rising overall, but who is excluded if the interface is only comfortable in one language or literacy style?",
  access: "Retention can hide who left early. Are disabled users, rural users, or low-bandwidth users included in the analysis?",
  feedback: "NPS only reflects people who answered. Whose feedback is missing because the survey format, timing, or trust level did not work for them?",
  support: "Fewer tickets may mean fewer problems, or it may mean people gave up. Do users know where to ask for help?"
};
const strategyRooms = {
  seller: {
    kicker: "Seller hub",
    title: "A platform can grow and still leave people behind.",
    story: "A seller dashboard is redesigned for speed, but smaller sellers are confused by jargon, navigation, and support flows. The overall engagement metric rises, but the new-user experience is uneven.",
    metric: "Engagement is up, but support tickets from newer sellers are rising.",
    risk: "Top-user data may overrepresent confident, digitally fluent sellers.",
    fix: "Test with new sellers, low digital-literacy users, and regional-language users before scaling.",
    reflection: "Who has to work harder to use a system that was supposedly built for everyone?"
  },
  dashboard: {
    kicker: "Data dashboard",
    title: "A dashboard can look objective while hiding whose data is missing.",
    story: "The NPS score looks strong, retention is improving, and leadership wants to celebrate. But the survey only reached users who stayed, understood the form, and trusted the platform enough to respond.",
    metric: "NPS is high and retention is up.",
    risk: "Averages can hide people who left early, never responded, or could not access the feedback channel.",
    fix: "Segment by access barriers, language, tenure, geography, disability needs, and non-response patterns.",
    reflection: "What would this dashboard say if silence counted as data?"
  },
  healthcare: {
    kicker: "Healthcare model",
    title: "Efficiency can become inequity when outreach favours easy-to-reach patients.",
    story: "A healthcare model prioritizes patients likely to respond to outreach. It performs well operationally, but people with unstable housing, language barriers, low trust, or limited phone access may be deprioritized.",
    metric: "Response rate improves and outreach cost drops.",
    risk: "The model may exclude people with higher barriers because they are harder to contact.",
    fix: "Add equity weights, community context, alternate outreach channels, and barrier-aware follow-up.",
    reflection: "Are we reaching the people who are easiest to reach, or the people most at risk of being missed?"
  },
  consulting: {
    kicker: "Consulting club",
    title: "Talent development is not inclusive if hidden rules stay hidden.",
    story: "A case-prep program helps already-confident students improve quickly, while beginners and students unfamiliar with consulting language quietly stop attending.",
    metric: "Advanced members are performing better in mock cases.",
    risk: "Polish, jargon, and prior exposure can be mistaken for potential.",
    fix: "Create beginner tracks, explain jargon, normalize practice, offer peer mentoring, and vary participation formats.",
    reflection: "Who gets coached into confidence, and who is expected to arrive with it already?"
  },
  community: {
    kicker: "Health camp",
    title: "Community impact depends on whether support reaches people in usable ways.",
    story: "A health camp is well organized, but attendance depends on location, timing, trust, language, transportation, and whether people can follow up after the event.",
    metric: "Hundreds of people receive screenings and educational kits.",
    risk: "One-time events can miss people with mobility, caregiving, work, cost, or documentation barriers.",
    fix: "Partner locally, offer accessible timing, language support, follow-up pathways, and community-led outreach.",
    reflection: "What makes support reachable before someone has to ask for special help?"
  },
  accessibility: {
    kicker: "Access lab",
    title: "Knowledge is not inclusive if it only arrives in one format.",
    story: "Educational material is available, but visually impaired students need audio formats, clear navigation, and learning tools that do not make access feel like an exception.",
    metric: "Learning resources exist and distribution is complete.",
    risk: "Availability can be mistaken for accessibility.",
    fix: "Design with multiple formats from the beginning: audio, captions, readable structure, plain language, and assistive technology compatibility.",
    reflection: "What would change if accessibility was treated as design quality, not accommodation?"
  }
};
const strategyRoomButtons = document.querySelectorAll(".dashboard-room-button");
const strategyDashboardPanel = document.querySelector(".dashboard-panel");
const strategyKicker = document.querySelector("#strategy-kicker");
const strategyTitle = document.querySelector("#strategy-title");
const strategyStory = document.querySelector("#strategy-story");
const strategyMetric = document.querySelector("#strategy-metric");
const strategyRisk = document.querySelector("#strategy-risk");
const strategyFix = document.querySelector("#strategy-fix");
const strategyReflection = document.querySelector("#strategy-reflection");
const galleryFilters = document.querySelectorAll(".gallery-filter");
const posterCards = document.querySelectorAll(".poster-card");

function updatePledge() {
  pledgeText.textContent = `I will strengthen ${focus.value} by choosing to ${practice.value}, and I will know it helped when ${measure.value}.`;
}

[focus, practice, measure].forEach((field) => field.addEventListener("change", updatePledge));

function updateScan() {
  const [engagement, reflectionScore, exploration, careScore] = scanInputs.map((input) => Number(input.value));
  const lowScores = [
    ["engagement", engagement],
    ["reflection", reflectionScore],
    ["exploration", exploration],
    ["care", careScore]
  ].sort((a, b) => a[1] - b[1]);
  const lowest = lowScores[0][0];
  const guidance = {
    engagement: "Start with belonging: clarify purpose, invite quieter voices in low-pressure ways, and make participation possible across time, language, and access needs.",
    reflection: "Slow the room down: ask what assumptions are present, what power dynamics are shaping the conversation, and what people are learning about themselves.",
    exploration: "Open the field: bring in lived experience, test multiple explanations, and reward thoughtful questions before deciding on the solution.",
    care: "Repair the foundation: build trust through respect, responsibility, clear boundaries, and follow-through before asking for more vulnerability."
  };
  scanResultText.textContent = guidance[lowest];
}

scanInputs.forEach((input) => input.addEventListener("input", updateScan));

function updateComicPrompt() {
  comicPrompt.textContent = comicPrompts[comicPromptIndex];
  comicPromptIndex = (comicPromptIndex + 1) % comicPrompts.length;
}

comicPromptButton.addEventListener("click", updateComicPrompt);

theaterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const panelName = tab.dataset.panel;
    theaterTabs.forEach((button) => {
      const selected = button === tab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    theaterPanels.forEach((panel) => {
      const selected = panel.id === `panel-${panelName}`;
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
    });
  });
});

const questFeedback = {
  ask: "Strong equity move: pausing creates choice, makes access needs visible, and improves the room before harm becomes normalized.",
  push: "Efficiency can hide exclusion. Try naming the time pressure, then ask what one adjustment would make participation easier now.",
  private: "A private check-in can help, but it should not be the only repair. The group pattern still needs to change in the room."
};

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    questResult.textContent = questFeedback[button.dataset.choice];
  });
});

const valueTranslations = {
  trust: "Share expectations early, follow through visibly, and explain decisions when you cannot say yes.",
  respect: "Pronounce names correctly, do not interrupt, crDEIt ideas, and make disagreement about the issue instead of the person.",
  curiosity: "Ask what context you are missing before deciding what a person's behavior means.",
  vulnerability: "Model learning out loud: say what you are unsure about and invite correction without making others manage your guilt."
};

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    valueResult.textContent = valueTranslations[button.dataset.value];
  });
});

function updateSurvey() {
  const scores = Array.from(surveyInputs).map((input) => Number(input.value));
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  if (average < 2.5) {
    surveyResultText.textContent = "This space needs repair before deeper learning. Start with clarity, access needs, and visible follow-through.";
  } else if (average < 4) {
    surveyResultText.textContent = "There is a usable foundation. Pick one barrier to reduce today and one signal that feedback changed something.";
  } else {
    surveyResultText.textContent = "Belonging is trending well. Protect it by sharing power, inviting quieter perspectives, and documenting what works.";
  }
}

surveyInputs.forEach((input) => input.addEventListener("input", updateSurvey));

labTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const panelName = tab.dataset.lab;
    labTabs.forEach((button) => {
      const selected = button === tab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    labPanels.forEach((panel) => {
      const selected = panel.id === `lab-panel-${panelName}`;
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
    });
  });
});

function updateAllyPlan() {
  allyPlanText.textContent = `I will ${allyLearn.value}; I will ${allyAdvocate.value}; and I will ${allyEmpathy.value}.`;
}

[allyLearn, allyAdvocate, allyEmpathy].forEach((field) => field.addEventListener("change", updateAllyPlan));

function updateScenePrompt() {
  scenePrompt.textContent = scenePrompts[scenePromptIndex];
  scenePromptIndex = (scenePromptIndex + 1) % scenePrompts.length;
}

scenePromptButton.addEventListener("click", updateScenePrompt);

function renderRole(roleKey) {
  const role = roleContent[roleKey];
  roleKicker.textContent = role.kicker;
  roleTitle.textContent = role.title;
  roleCopy.textContent = role.copy;
  roleActions.innerHTML = role.actions.map((action) => `<li>${action}</li>`).join("");
  roleButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.role === roleKey));
}

roleButtons.forEach((button) => {
  button.addEventListener("click", () => renderRole(button.dataset.role));
});

function updateJournalPrompt() {
  journalPrompt.textContent = journalPrompts[journalPromptIndex];
  journalPromptIndex = (journalPromptIndex + 1) % journalPrompts.length;
}

journalPromptButton.addEventListener("click", updateJournalPrompt);

function renderDoor(doorKey) {
  const door = doorStories[doorKey];
  doorKicker.textContent = door.kicker;
  doorTitle.textContent = door.title;
  doorStory.textContent = door.story;
  doorStat.textContent = door.stat;
  doorTheory.textContent = door.theory;
  doorLens.textContent = door.lens;
  doorReflection.textContent = door.reflection;
  doorPanel.dataset.room = doorKey;
  doorButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.door === doorKey));
}

doorButtons.forEach((button) => {
  button.addEventListener("click", () => renderDoor(button.dataset.door));
});

function renderJourney(journeyKey) {
  const journey = journeyStories[journeyKey];
  currentJourney = journeyKey;
  journeyKicker.textContent = journey.kicker;
  journeyTitle.textContent = journey.title;
  journeyStory.textContent = journey.story;
  journeyResult.textContent = "Choose a response to reveal what that decision teaches about inclusion.";
  journeySteps.forEach((button) => button.classList.toggle("is-active", button.dataset.journey === journeyKey));
}

journeySteps.forEach((button) => {
  button.addEventListener("click", () => renderJourney(button.dataset.journey));
});

journeyChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const journey = journeyStories[currentJourney];
    journeyResult.textContent = journey[button.dataset.choice];
  });
});

function renderWordSearch() {
  wordSearch.innerHTML = "";
  wordGrid.forEach((row, rowIndex) => {
    row.split("").forEach((letter, colIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "letter-cell";
      button.textContent = letter;
      button.dataset.key = `${rowIndex}-${colIndex}`;
      button.dataset.letter = letter;
      button.addEventListener("click", () => {
        if (button.classList.contains("is-found")) return;
        button.classList.toggle("is-selected");
        if (button.classList.contains("is-selected")) {
          selectedLetters.push(button);
        } else {
          selectedLetters = selectedLetters.filter((item) => item !== button);
        }
      });
      wordSearch.appendChild(button);
    });
  });

  wordBank.innerHTML = wordTargets.map((word) => `<span data-word="${word}">${word}</span>`).join("");
}

function clearWordSelection() {
  selectedLetters.forEach((button) => button.classList.remove("is-selected"));
  selectedLetters = [];
}

wordCheck.addEventListener("click", () => {
  const selectedWord = selectedLetters.map((button) => button.dataset.letter).join("");
  if (wordTargets.includes(selectedWord) && !foundWords.has(selectedWord)) {
    foundWords.add(selectedWord);
    selectedLetters.forEach((button) => {
      button.classList.remove("is-selected");
      button.classList.add("is-found");
    });
    const bankItem = wordBank.querySelector(`[data-word="${selectedWord}"]`);
    if (bankItem) bankItem.classList.add("is-found");
    wordResult.textContent = `Nice. You found ${selectedWord}. ${foundWords.size} of ${wordTargets.length} found.`;
    selectedLetters = [];
  } else if (foundWords.has(selectedWord)) {
    wordResult.textContent = `${selectedWord} is already found. Try another word.`;
    clearWordSelection();
  } else {
    wordResult.textContent = "Not quite. Clear the letters and try selecting one word in order.";
  }
});

wordClear.addEventListener("click", () => {
  clearWordSelection();
  wordResult.textContent = "Selection cleared. Try another DEI word.";
});

crosswordCheck.addEventListener("click", () => {
  let correct = 0;
  crosswordInputs.forEach((input) => {
    const isCorrect = input.value.trim().toLowerCase() === input.dataset.answer;
    input.classList.toggle("is-correct", isCorrect);
    input.classList.toggle("is-wrong", !isCorrect && input.value.trim().length > 0);
    if (isCorrect) correct += 1;
  });
  crosswordResult.textContent = `${correct} of ${crosswordInputs.length} answers correct.`;
});

crosswordClear.addEventListener("click", () => {
  crosswordInputs.forEach((input) => {
    input.value = "";
    input.classList.remove("is-correct", "is-wrong");
  });
  crosswordResult.textContent = "Crossword reset. Try the clues again.";
});

sortChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const isGood = chip.dataset.good === "true";
    if (!chip.classList.contains("is-good") && !chip.classList.contains("is-rethink")) {
      sortedCount += 1;
    }
    chip.classList.toggle("is-good", isGood);
    chip.classList.toggle("is-rethink", !isGood);
    sortResult.textContent = isGood
      ? `Ally move. ${sortedCount} of ${sortChips.length} sorted.`
      : `Needs a rethink. ${sortedCount} of ${sortChips.length} sorted.`;
  });
});

function renderScatterPrompt() {
  const prompt = scatterPrompts[scatterIndex];
  scatterLetter.textContent = prompt.letter;
  scatterCategory.textContent = prompt.category;
  scatterAnswer.value = "";
  scatterResult.textContent = "Try a word that starts with the letter and fits the category.";
}

if (scatterCheck && scatterNew) {
  scatterCheck.addEventListener("click", () => {
    const answer = scatterAnswer.value.trim();
    const letter = scatterLetter.textContent.toLowerCase();
    if (!answer) {
      scatterResult.textContent = "Add an answer first.";
    } else if (answer.toLowerCase().startsWith(letter)) {
      scatterResult.textContent = "Nice. Now ask: would someone from that community feel represented with care?";
    } else {
      scatterResult.textContent = `Good thought, but this round needs an answer that starts with ${scatterLetter.textContent}.`;
    }
  });

  scatterNew.addEventListener("click", () => {
    scatterIndex = (scatterIndex + 1) % scatterPrompts.length;
    renderScatterPrompt();
  });
}

function updateBingo() {
  const selected = Array.from(bingoSquares).map((square) => square.classList.contains("is-selected"));
  const hasLine = bingoLines.some((line) => line.every((index) => selected[index]));
  const count = selected.filter(Boolean).length;
  bingoResult.textContent = hasLine
    ? "Care lens line complete. These barriers often cluster, so support has to be coordinated."
    : `${count} selected. Look for three in a row and notice how access barriers can overlap.`;
}

bingoSquares.forEach((square) => {
  square.addEventListener("click", () => {
    square.classList.toggle("is-selected");
    updateBingo();
  });
});

function renderEmpathyPrompt() {
  const prompt = empathyPrompts[empathyIndex];
  empathyScenario.textContent = prompt.scenario;
  empathyChoices[0].textContent = prompt.good;
  empathyChoices[1].textContent = prompt.rethink;
  empathyChoices.forEach((choice) => choice.classList.remove("is-good", "is-rethink"));
  empathyResult.textContent = "Choose a response to see the inclusion effect.";
}

empathyChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const isCare = choice.dataset.care === "true";
    empathyChoices.forEach((button) => button.classList.remove("is-good", "is-rethink"));
    choice.classList.add(isCare ? "is-good" : "is-rethink");
    empathyResult.textContent = isCare
      ? "Inclusive move: this reduces the barrier instead of placing the full burden on the person affected."
      : "Needs a rethink: this treats the barrier as an individual problem instead of a system design issue.";
  });
});

empathyNew.addEventListener("click", () => {
  empathyIndex = (empathyIndex + 1) % empathyPrompts.length;
  renderEmpathyPrompt();
});

function renderStrategyScenario() {
  const scenario = strategyScenarios[strategyScenarioIndex];
  strategySimTitle.textContent = scenario.title;
  strategySimCopy.textContent = scenario.copy;
  strategySimResult.textContent = "Choose a strategy to see who benefits and who may still be left out.";
  strategyChoices.forEach((choice) => choice.classList.remove("is-good", "is-rethink", "is-partial"));
}

strategyChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const scenario = strategyScenarios[strategyScenarioIndex];
    const choiceType = choice.dataset.choice;
    strategyChoices.forEach((button) => button.classList.remove("is-good", "is-rethink", "is-partial"));
    choice.classList.add(choiceType === "inclusive" ? "is-good" : choiceType === "support" ? "is-partial" : "is-rethink");
    strategySimResult.textContent = scenario.outcomes[choiceType];
  });
});

strategyNext.addEventListener("click", () => {
  strategyScenarioIndex = (strategyScenarioIndex + 1) % strategyScenarios.length;
  renderStrategyScenario();
});

dashboardTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    dashboardTiles.forEach((button) => button.classList.remove("is-selected"));
    tile.classList.add("is-selected");
    dashboardResult.textContent = dashboardInsights[tile.dataset.gap];
  });
});

function renderStrategyRoom(roomKey) {
  const room = strategyRooms[roomKey];
  strategyKicker.textContent = room.kicker;
  strategyTitle.textContent = room.title;
  strategyStory.textContent = room.story;
  strategyMetric.textContent = room.metric;
  strategyRisk.textContent = room.risk;
  strategyFix.textContent = room.fix;
  strategyReflection.textContent = room.reflection;
  strategyDashboardPanel.dataset.strategyRoom = roomKey;
  strategyRoomButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.strategyRoom === roomKey));
}

strategyRoomButtons.forEach((button) => {
  button.addEventListener("click", () => renderStrategyRoom(button.dataset.strategyRoom));
});

galleryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.dataset.galleryFilter;
    galleryFilters.forEach((button) => button.classList.toggle("is-active", button === filter));
    posterCards.forEach((card) => {
      const visible = value === "all" || card.dataset.galleryTopic.includes(value);
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

renderTool("access");
renderScenario(0);
updatePledge();
updateScan();
updateComicPrompt();
updateSurvey();
updateAllyPlan();
updateScenePrompt();
renderRole("student");
updateJournalPrompt();
renderDoor("front");
renderJourney("classroom");
renderWordSearch();
renderScatterPrompt();
renderEmpathyPrompt();
renderStrategyScenario();
renderStrategyRoom("seller");

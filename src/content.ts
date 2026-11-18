/**
 * Everything the site says lives in this file.
 * To update the portfolio, edit the values below; no component changes needed.
 */

import avatar from "./assets/images/avatar.png";
import dineflowImage from "./assets/images/dineflow-architecture.webp";
import streetLightImage from "./assets/images/smart-street-light.webp";
import electronicsSocietyImage from "./assets/images/electronics-society.webp";

/* ------------------------------------------------------------------ types */

export type StageId =
  | "inbound_files"
  | "file_monitor"
  | "pre_etl"
  | "orchestrate"
  | "process"
  | "reconcile";

export interface Stage {
  id: StageId;
  /** Short human name shown on the node. */
  name: string;
  /** What this stage of the pipeline does. */
  what: string;
  /** My contribution at this stage. */
  myPart: string;
  tools: string[];
}

export interface Role {
  title: string;
  period: string;
  points: string[];
}

export interface Job {
  company: string;
  note?: string;
  location: string;
  roles: Role[];
}

export interface Project {
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** Use "contain" for logos that should not be cropped. Defaults to "cover". */
  imageFit?: "cover" | "contain";
  /** Backdrop colour shown around a contained image. */
  imageBackdrop?: string;
  facts?: { label: string; value: string }[];
  stack: string[];
  codeUrl: string;
}

/** One stage in a project's data flow diagram. */
export interface FlowStage {
  id: string;
  name: string;
  /** Small second line on the node. */
  label: string;
  /** Marks a medallion layer. */
  tone?: "bronze" | "silver" | "gold";
  /** What happens at this stage. */
  what: string;
  /** Airflow task that runs this stage, if any. */
  task?: string;
  /** Shown instead of a task for stages the DAG does not run. */
  runNote?: string;
  tools: string[];
}

/** A bar across one or more stages: a system they live in, or a task that runs them. */
export interface FlowBar {
  id: string;
  label: string;
  caption?: string;
  from: string;
  to: string;
}

export interface FeaturedProject {
  name: string;
  summary: string;
  facts: { label: string; value: string }[];
  stack: string[];
  codeUrl: string;
  /** Full architecture image, linked under the diagram. */
  diagramUrl: string;
  flow: {
    caption: string;
    stages: FlowStage[];
    groups: FlowBar[];
    tasks: FlowBar[];
    tasksCaption: string;
  };
}

export interface SkillGroup {
  group: string;
  items: string[];
}

/* ---------------------------------------------------------------- profile */

export const profile = {
  name: "Anupesh Kumar Verma",
  shortName: "Anupesh Verma",
  role: "Data Engineer",
  company: "Personify Health",
  location: "Noida, India",
  email: "anupeshkverma121@gmail.com",
  links: {
    github: "https://github.com/anupeshverma",
    linkedin: "https://www.linkedin.com/in/anupeshverma/",
    leetcode: "https://leetcode.com/AnupeshVerma/",
    gfg: "https://www.geeksforgeeks.org/user/anupeshkverma121/",
  },
  /**
   * Google Drive link to the resume. Keep the same link when you update the
   * resume: in Drive, right-click the file, then File information > Manage versions > Upload new version.
   * The file must be shared as "Anyone with the link" (Viewer).
   */
  resumeUrl: "https://drive.google.com/file/d/1WzSwm9ztfZEup4NHN9gtIhfNvNpKLdaw/view",
  avatar,
  /** Getform endpoint that receives contact form messages. */
  contactFormUrl: "https://getform.io/f/7d2cbbe5-ab81-403a-9f1a-e381a9efe054",
};

export const hero = {
  headline: "I build the pipelines behind healthcare data for 60M+ users.",
  intro:
    "Data Engineer at Personify Health, working with PySpark, Airflow, AWS and Snowflake. I also build GenAI features on top of the data layer.",
};

/* --------------------------------------------------------------- pipeline */

const stages: Stage[] = [
    {
      id: "inbound_files",
      name: "Inbound files",
      what: "Healthcare files arrive from clients through S3, EFT and UI uploads, each with its own layout.",
      myPart:
        "Onboarded 10+ healthcare clients by mapping their source schemas to internal data models, configuring ingestion pipelines, and validating end-to-end data flow in production.",
      tools: ["Amazon S3", "SQL", "Python"],
    },
    {
      id: "file_monitor",
      name: "File monitoring",
      what: "Every hour, a report lists inbound files that are missing, delayed or invalid, so problems surface before they reach the pipeline.",
      myPart:
        "Automated this with an Airflow DAG. It replaced manual database checks and cut monitoring effort by 80%+.",
      tools: ["Airflow", "SQL"],
    },
    {
      id: "pre_etl",
      name: "Pre-ETL",
      what: "Some raw files can't be ingested as they are. This serverless layer fixes and validates them, then stages them for the main pipeline.",
      myPart: "Implemented the layer on AWS Step Functions, Lambda and Glue.",
      tools: ["AWS Step Functions", "Lambda", "Glue"],
    },
    {
      id: "orchestrate",
      name: "Orchestration",
      what: "An event-driven platform picks up each file and triggers Docker-based ETL jobs through KubernetesPodOperator.",
      myPart:
        "Built and maintained 20+ Airflow DAGs for the platform, with duplicate-run guards and per-source concurrency limits.",
      tools: ["Airflow", "Docker", "KubernetesPodOperator"],
    },
    {
      id: "process",
      name: "Processing",
      what: "Raw tables are standardized and validated, then run through Melissa data-quality and MPI checks to produce clean, standard tables.",
      myPart:
        "Developed standardization, validation, Melissa data-quality and MPI checks in the processing layer.",
      tools: ["Python", "SQL", "Melissa", "MPI"],
    },
    {
      id: "reconcile",
      name: "Reconciliation",
      what: "SQL checks compare the data across PostgreSQL, Aurora and Snowflake, so what lands downstream matches what came in.",
      myPart: "Wrote the SQL reconciliation checks across all three stores.",
      tools: ["PostgreSQL", "Amazon Aurora", "Snowflake"],
    },
];

export const pipeline = {
  title: "The pipeline I work on",
  description:
    "A simplified view of how a healthcare file becomes trusted data. Select a stage to see what happens there and what I did.",
  /** Main path in order; `file_monitor` branches off the first stage. */
  stages,
};

/* ------------------------------------------------------------------ about */

export const about = {
  paragraphs: [
    "I'm a data engineer at Personify Health. I work on the pipelines and data quality checks that turn raw healthcare files into trusted data, using PySpark, Airflow, AWS and Snowflake.",
    "Day to day, I build and maintain Airflow DAGs for an event-driven ingestion platform, automate file monitoring, and onboard new healthcare clients. I also build GenAI features on top of the data layer, from RAG pipelines to multi-agent assistants on Amazon Bedrock.",
  ],
  facts: [
    { label: "Now", value: "Data Engineer I, Personify Health" },
    { label: "Based in", value: "Noida, India" },
    { label: "Studied", value: "B.Tech, NIT Allahabad, 2024" },
    { label: "Focus", value: "Batch pipelines, data quality, GenAI on data" },
  ],
};

/* ------------------------------------------------------------- experience */

export const experience: Job[] = [
  {
    company: "Personify Health",
    note: "via Cloudangles",
    location: "Noida",
    roles: [
      {
        title: "Data Engineer I",
        period: "Nov 2025 – Present",
        points: [
          "Contributed to migrating a legacy SSIS and SQL Server workflow to a distributed PySpark pipeline processing healthcare datasets for 60M+ users, enabling scalable batch processing.",
          "Built and maintained 20+ Airflow DAGs for an event-driven ingestion platform, triggering Docker-based ETL jobs via KubernetesPodOperator, with duplicate-run guards and per-source concurrency limits.",
          "Automated file monitoring with an Airflow DAG that generates hourly exception reports for missing, delayed and invalid inbound files, replacing manual database checks and cutting monitoring effort by 80%+.",
          "Implemented a serverless pre-ETL layer on AWS Step Functions, Lambda and Glue that fixes and validates raw files the core ETL cannot ingest as-is, then stages them for the main pipeline.",
          "Developed standardization, validation, Melissa data-quality and MPI checks in the processing layer, with SQL reconciliation across PostgreSQL, Aurora and Snowflake.",
        ],
      },
      {
        title: "Data Engineer Trainee",
        period: "Jan 2025 – Nov 2025",
        points: [
          "Onboarded 10+ healthcare clients by mapping source schemas to internal data models, configuring ingestion pipelines, and validating end-to-end data flow in production.",
          "Engineered a multi-agent wellness assistant on Amazon Bedrock (Claude 3.7 Sonnet) using LangGraph and FAISS: a supervisor agent routes queries to Journey, Challenges and Shoutouts sub-agents that call platform APIs.",
          "Connected agents to a knowledge base of journeys, challenges and habits to cut redundant API calls, returning structured JSON rendered as interactive UI cards so users can enroll or join challenges in one click.",
        ],
      },
    ],
  },
  {
    company: "Infobay.ai",
    note: "formerly EduGorilla",
    location: "Lucknow",
    roles: [
      {
        title: "Python Developer Intern",
        period: "Aug 2024 – Dec 2024",
        points: [
          "Created a BlueStacks-based automated Android testing framework using ADB and Android SDK, reducing manual testing effort by 30% and speeding up test execution by 40%.",
          "Implemented a Progressive Web App (PWA) install flow, speeding up app delivery and customer onboarding.",
          "Automated build generation and Google Play Console deployment with Selenium, reducing manual release effort.",
        ],
      },
    ],
  },
];

/* --------------------------------------------------------------- projects */

export const featuredProject: FeaturedProject = {
  name: "DineFlow: AI Data Platform",
  summary:
    "An end-to-end batch platform that takes food-delivery data from raw CSVs to AI-powered analytics. Data lands in S3, loads into Snowflake through a keyless storage integration, and moves through Bronze, Silver and Gold layers in dbt. One daily Airflow DAG runs the whole thing, and an OpenAI layer adds review enrichment, a RAG chatbot and a text-to-SQL app.",
  facts: [
    { label: "Data", value: "10M orders, 23M order items, 300K reviews" },
    { label: "Modeling", value: "Incremental MERGE facts, SCD2 snapshot, dbt tests" },
    { label: "AI layer", value: "LLM enrichment, RAG chat, text-to-SQL with a SELECT-only guard" },
  ],
  stack: ["Snowflake", "dbt", "Airflow", "AWS S3", "Docker", "OpenAI API", "Streamlit"],
  codeUrl: "https://github.com/AnupeshVerma/DineFlow-AI-Data-Platform",
  diagramUrl: dineflowImage,
  flow: {
    caption: "How data moves through DineFlow. Select a stage for details.",
    stages: [
      {
        id: "s3",
        name: "S3 data lake",
        label: "7 CSV files",
        what: "Seven CSV files sit in one bucket, one folder per table: four dimension files and three fact files with 10M orders, 23M order items and 300K reviews (about 2.3 GB).",
        runNote: "Files are uploaded to the bucket before the DAG starts.",
        tools: ["Amazon S3"],
      },
      {
        id: "bronze",
        name: "Bronze",
        label: "RAW",
        tone: "bronze",
        what: "COPY INTO loads each file from the S3 stage into raw tables. Snowflake reads the bucket through a storage integration and an IAM role, so no access keys are stored anywhere.",
        task: "reload_raw",
        tools: ["Snowflake", "COPY INTO", "IAM role"],
      },
      {
        id: "silver",
        name: "Silver",
        label: "STAGING",
        tone: "silver",
        what: "One dbt view per source cleans, types and renames the columns: placeholder values become nulls, prices lose their currency symbol, and emails are lowercased.",
        task: "dbt_build_core",
        tools: ["dbt", "Snowflake"],
      },
      {
        id: "gold",
        name: "Gold",
        label: "MARTS",
        tone: "gold",
        what: "Dimensions, fact tables and business marts. Facts are incremental with a MERGE strategy, so a re-run processes only new rows instead of rebuilding 10M+. Includes an SCD2 snapshot and dbt tests with a reconciliation check.",
        task: "dbt_build_core",
        tools: ["dbt", "Snowflake"],
      },
      {
        id: "enrichment",
        name: "Enrichment",
        label: "OpenAI",
        what: "An LLM reads each review and returns structured JSON with its sentiment and topic, which is written back to Snowflake. The step is idempotent and sample-capped, so no review is paid for twice.",
        task: "enrich_reviews",
        tools: ["OpenAI API", "Python"],
      },
      {
        id: "ai_mart",
        name: "AI mart",
        label: "dbt model",
        what: "dbt models the enriched reviews into a review-insights mart, like any other table in the warehouse.",
        task: "dbt_build_ai",
        tools: ["dbt", "Snowflake"],
      },
      {
        id: "apps",
        name: "Apps",
        label: "Streamlit",
        what: "Streamlit apps sit on top of the warehouse: dashboards, a RAG chat that answers from real reviews and shows its sources, and text-to-SQL that only runs queries that pass a SELECT-only check.",
        runNote: "Not part of the DAG. The apps are there whenever someone opens them.",
        tools: ["Streamlit", "OpenAI API"],
      },
    ],
    groups: [{ id: "snowflake", label: "Snowflake", from: "bronze", to: "ai_mart" }],
    tasksCaption: "One Airflow DAG runs these four tasks in order, once a day.",
    tasks: [
      { id: "reload_raw", label: "reload_raw", caption: "COPY from S3", from: "s3", to: "bronze" },
      { id: "dbt_build_core", label: "dbt_build_core", caption: "dbt build and tests", from: "silver", to: "gold" },
      { id: "enrich_reviews", label: "enrich_reviews", caption: "LLM enrichment", from: "enrichment", to: "enrichment" },
      { id: "dbt_build_ai", label: "dbt_build_ai", caption: "AI mart", from: "ai_mart", to: "ai_mart" },
    ],
  },
};

export const otherProjects: Project[] = [
  {
    name: "Smart Street Light",
    summary:
      "Street lights that switch on only when movement is detected. Uses the YOLO object detection model and frame differencing to track vehicles and estimate their speed.",
    image: streetLightImage,
    imageAlt:
      "Road camera frame with detected vehicles outlined in green and an estimated speed label above one car.",
    stack: ["Python", "YOLO", "OpenCV", "NumPy"],
    codeUrl: "https://github.com/anupeshverma/Smart_Street_Light",
  },
  {
    name: "Electronics Society website",
    summary:
      "A web platform for the Electronics Society at MNNIT Allahabad that connects ECE students, professors and alumni. I led the team of 7 that built it as Web Team Coordinator.",
    image: electronicsSocietyImage,
    imageAlt: "Logo of the Electronics Society, MNNIT Allahabad.",
    imageFit: "contain",
    imageBackdrop: "#b8e1fa",
    stack: ["Django", "Tailwind CSS", "JavaScript"],
    codeUrl: "https://github.com/Electronics-Society-MNNIT/ECE-Society",
  },
];

/* ----------------------------------------------------------------- skills */

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "SQL", "Java"] },
  {
    group: "Data engineering",
    items: [
      "PySpark",
      "Airflow",
      "dbt",
      "Kafka",
      "ETL/ELT",
      "Data modeling and warehousing",
      "Data quality",
      "CDC",
    ],
  },
  {
    group: "Cloud and databases",
    items: [
      "AWS (S3, Lambda, Glue, Step Functions)",
      "Snowflake",
      "PostgreSQL",
      "Amazon Aurora",
      "MySQL",
    ],
  },
  {
    group: "GenAI",
    items: ["LangGraph", "LangChain", "Amazon Bedrock", "FAISS", "RAG", "OpenAI API"],
  },
  { group: "Tools", items: ["Git", "Docker", "Linux", "Jira"] },
];

/* -------------------------------------------------- education and awards */

export const education = {
  school: "Motilal Nehru National Institute of Technology Allahabad",
  shortSchool: "NIT Allahabad",
  degree: "B.Tech, Electronics and Communication Engineering",
  period: "2020 – 2024",
  detail: "CGPA 7.9/10",
};

export const recognition = [
  {
    title: "14th global rank, HackSquad 2022",
    detail: "Contributed to open-source projects in a global team-based event.",
  },
  {
    title: "900+ DSA problems solved",
    detail: "Data structures and algorithms practice on LeetCode and GeeksforGeeks.",
    links: [
      { label: "LeetCode profile", url: "https://leetcode.com/AnupeshVerma/" },
      { label: "GeeksforGeeks profile", url: "https://www.geeksforgeeks.org/user/anupeshkverma121/" },
    ],
  },
  {
    title: "Platinum winner, DevElevate 2022",
    detail: "A technical blog-writing event organised by Showwcase.",
  },
];

/* ---------------------------------------------------------------- contact */

export const contact = {
  heading: "Get in touch",
  intro:
    "Hiring for a data engineering role, or want to talk pipelines? Send a message here or email me directly.",
};

/** Sections that appear in the navigation, in page order. */
export const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Parvez Ali",
  role: "ML Engineer · Medical Imaging Researcher",
  location: "Munich, Germany",
  email: "parvezpanhwar51@gmail.com",
  github: "https://github.com/Panhwar-hub",
  linkedin: "https://www.linkedin.com/in/panhwarparvez99/",
  cv: `Parvez_Ali_CV.pdf?v=${__BUILD_ID__}`,
  status: "Open to PhD positions",
};

export const stats = [
  { value: "1.0", label: "MSc thesis grade" },
  { value: "1.5 / 1.4", label: "Joint MSc final grade (THD / USB)" },
  { value: "500+ → 20–40", label: "B-scans per OCT volume, after sampling" },
  { value: "1.5 yrs", label: "Building medical AI at deepeye" },
];

export const threads = [
  {
    k: "01",
    title: "Longitudinal medical imaging",
    body:
      "Learning from sequences of OCT volumes, not a single scan; how a retina changes across visits and what that says about the next treatment decision.",
  },
  {
    k: "02",
    title: "Trustworthy, uncertainty-aware ML",
    body:
      "Calibration, conformal prediction and distribution shift. A clinical model should know when its own prediction shouldn't be trusted.",
  },
  {
    k: "03",
    title: "From notebook to clinic",
    body:
      "I deploy what I train: DICOM pipelines, APIs and compiled services running at clinic sites, connected to real imaging and EMR systems.",
  },
  {
    k: "04",
    title: "Sensors & embedded systems",
    body:
      "An electrical engineering background: C++, MATLAB, Arduino, Raspberry Pi, ESP32 and a growing interest in perception for robots that sense touch and force.",
  },
];

export const research = [
  {
    tag: "MSc Thesis · Grade 1.0",
    period: "Dec 2025 – Apr 2026",
    title: "Predicting anti-VEGF injection need in nAMD from longitudinal OCT",
    where: "Deggendorf Institute of Technology × deepeye Medical GmbH, Munich",
    summary:
      "Patients with neovascular age-related macular degeneration receive repeated anti-VEGF injections, and deciding when to inject is a major burden for clinics. I built deep learning models that read a patient's history of OCT volumes and predict upcoming injection need; combining volumetric image features with temporal modelling across follow-up visits.",
    points: [
      "3D CNN feature extraction over volumetric OCT, with temporal modelling across visits",
      "Real-world clinical data with irregular visit intervals",
      "Built on my B-scan importance-sampling pipeline to make volumes tractable",
    ],
    keywords: ["nAMD", "Longitudinal OCT", "3D CNN", "Temporal modelling", "PyTorch"],
  },
  {
    tag: "In preparation · Preprint planned",
    period: "2026 – ongoing",
    title: "Does a model's confidence survive treatment? OCT biomarkers under treatment-induced shift",
    where: "Independent study on the open OLIVES dataset (PRIME & TREX-DME trials)",
    summary:
      "Prior work showed that an OCT biomarker classifier trained on treatment-naive eyes loses accuracy on the same eyes after anti-VEGF therapy. Nobody had asked whether its probabilities stay trustworthy. I'm testing whether calibration, conformal coverage and selective prediction hold up under this within-patient shift — and whether the failure comes from prevalence change (correctable without new labels) or from lesions genuinely looking different.",
    points: [
      "RQ1 — Do calibration (ECE, Brier) and conformal coverage hold from first to last visit?",
      "RQ2 — Is the drop label shift or appearance (conditional) shift?",
      "RQ3 — Can unlabelled intermediate visits correct it?",
    ],
    keywords: ["Calibration", "Conformal prediction", "Label shift", "OLIVES", "Honest reporting"],
  },
  {
    tag: "Applied research · deepeye",
    period: "2025 – 2026",
    title: "B-scan importance sampling for large OCT volumes",
    where: "deepeye Medical GmbH, Munich",
    summary:
      "A single eye can produce 500+ B-scans per visit. I designed and benchmarked pooling and importance-sampling strategies that keep the 20–40 diagnostically relevant slices, cutting inference time while preserving accuracy — validated through 3D CNN training experiments on nAMD classification.",
    points: [
      "Benchmarked preprocessing: CLAHE, gamma correction, histogram equalisation",
      "Compared sampling strategies end-to-end via downstream model performance",
    ],
    keywords: ["OCT", "Volumetric data", "Efficiency", "Preprocessing"],
  },
];

export const builds = [
  {
    title: "Clinical DICOM integration service",
    kind: "Production · deepeye",
    body:
      "Python middleware that connects an ophthalmology PACS, a cloud AI treatment-planning system and a practice EMR. It receives DICOM studies, anonymises them, sends them for AI analysis, embeds the returned PDF report back into DICOM, and routes the result to both the imaging archive and the EMR, with zero clicks from clinic staff.",
    detail: [
      "Three input channels: folder watch, DICOM C-STORE listener, authenticated HTTP API for EMR orders",
      "Order matching by patient, laterality and time window, persisted in SQLite",
      "Compiled to a self-contained Windows executable and deployed per clinic",
    ],
    stack: ["Python", "pynetdicom", "Flask", "waitress", "SQLite", "Nuitka", "DICOM"],
  },
  {
    title: "Soft robotic gripper, object recognition from touch",
    kind: "Collaboration · Jeju National University",
    body:
      "With a former classmate's soft robotic arm, I built the sensing-to-ML side: an ESP32 streams capacitive pressure-sensor readings over serial, a classifier identifies what the gripper is holding (ball, box or triangular object), and a live GUI shows predictions in real time on the lab station.",
    detail: [
      "Serial data acquisition and labelled recording pipeline per object class",
      "Trained classifier with swappable model artifacts for updating the deployed station",
      "Real-time matplotlib classification app",
    ],
    stack: ["ESP32", "Python", "scikit-learn", "Serial I/O", "matplotlib"],
  },
  {
    title: "Internal usage dashboard",
    kind: "Tooling · deepeye",
    body:
      "A React + Flask dashboard to track how the treatment-planning product is used, plus interactive stakeholder reports on clinical and demographic data in Plotly and Looker Studio.",
    detail: [],
    stack: ["React", "Flask", "Plotly", "Looker Studio"],
  },
];

export const projects = [
  {
    title: "LLM fine-tuning: extractive QA & summarisation",
    body:
      "Fine-tuned BERT and DistilBERT on SQuAD for answer-span extraction, and T5 for abstractive summarisation. Compared encoder-only and encoder-decoder models for different NLP tasks.",
    tags: ["HuggingFace", "BERT", "T5"],
  },
  {
    title: "Road segmentation from satellite imagery",
    body:
      "U-Net trained on the Massachusetts Roads dataset (1,000+ aerial images) for road-network extraction in urban planning.",
    tags: ["U-Net", "Segmentation", "TensorFlow"],
  },
  {
    title: "Genomic feature analysis & species classification",
    body:
      "A bioinformatics pipeline for GC content, codon usage and neutrality plots across three species, with a Random Forest classifier on genomic features.",
    tags: ["Bioinformatics", "Random Forest"],
  },
  {
    title: "Voice authentication for the Sindhi language",
    body:
      "Bachelor's thesis: a deep-learning speaker verification system for Sindhi, a low-resource language.",
    tags: ["Speech", "Deep learning", "B.E. thesis"],
  },
];

export const experience = [
  {
    role: "Machine Learning Engineer",
    org: "deepeye Medical GmbH",
    place: "Munich",
    period: "Jun 2026 – present",
    body:
      "Full-time role covering both sides of medical AI: OCT data processing and model training, and the software and infrastructure that run those models live at clinics.",
  },
  {
    role: "Working Student — Computer Vision & Medical AI",
    org: "deepeye Medical GmbH",
    place: "Munich",
    period: "Dec 2025 – May 2026",
    body:
      "Built the B-scan importance-sampling algorithm and carried out my MSc thesis on anti-VEGF injection prediction.",
  },
  {
    role: "Data Science Intern, Medical Imaging",
    org: "deepeye Medical GmbH",
    place: "Munich",
    period: "May 2025 – Nov 2025",
    body:
      "OCT preprocessing research, B-scan pooling experiments with 3D CNNs, clinical data analysis and an internal React + Flask dashboard.",
  },
  {
    role: "Subject Specialist, Computer Science",
    org: "IBA Community Colleges",
    place: "Pakistan",
    period: "Aug 2023 – Mar 2024",
    body:
      "Taught web development (MERN stack) and object-oriented programming in Java; wrote self-paced tutorials for students.",
  },
];

export const education = [
  {
    degree: "M.Sc. Artificial Intelligence & Data Science",
    org: "Deggendorf Institute of Technology, Germany × University of South Bohemia, Czech Republic",
    period: "2024 – 2026",
    note: "Joint degree · Final grade 1.5 (THD) / 1.4 (USB) · Thesis 1.0",
  },
  {
    degree: "B.E. Electrical Engineering (Computer Systems)",
    org: "Sukkur IBA University, Pakistan",
    period: "2018 – 2022",
    note: "CGPA 3.46 / 4.00 · Thesis: Deep-learning voice authentication for Sindhi",
  },
];

export const skills = [
  {
    group: "Medical imaging",
    items: ["OCT analysis", "nAMD / DME", "Volumetric 3D processing", "DICOM", "CLAHE & preprocessing"],
  },
  {
    group: "Deep learning",
    items: ["PyTorch", "TensorFlow", "3D CNN", "U-Net", "LSTM / RNN", "Transformers"],
  },
  {
    group: "Trustworthy ML",
    items: ["Calibration", "Conformal prediction", "Distribution shift", "Uncertainty estimation"],
  },
  {
    group: "LLMs & NLP",
    items: ["HuggingFace", "Fine-tuning", "RAG", "LangChain", "LangGraph"],
  },
  {
    group: "Engineering & MLOps",
    items: ["Python", "C / C++", "Flask", "React", "Git", "Linux", "AWS", "SQL", "Spark", "HDF5"],
  },
  {
    group: "Hardware",
    items: ["ESP32", "Arduino", "Raspberry Pi", "MATLAB", "Sensors"],
  },
];

export const certs = [
  "Event-Driven Agentic Document Workflows; DeepLearning.AI (2025)",
  "Open-Source Models with Hugging Face; DeepLearning.AI (2025)",
  "Sequences, Time Series and Prediction; Coursera (2023)",
];

export const languages = ["English — fluent", "German — intermediate", "Urdu — native"];

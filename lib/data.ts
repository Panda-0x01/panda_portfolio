export const siteConfig = {
  name: "Drumil Nikhare",
  title: "Security Engineer & SOC Analyst",
  description:
    "Motivated and detail-oriented Cybersecurity professional with a strong interest in Security Operations Center (SOC) analysis, threat detection, and incident response.",
  url: "https://drumilnikhare.dev",
  email: "drumilnikhare29@gmail.com",
  location: "India",
  github: "https://github.com/Panda-0x01",
  linkedin: "https://www.linkedin.com/in/drumilnikhare",
  accentColor: "#0ea5e9",
};

export const stats = [
  { label: "Projects Built", value: "3+", suffix: "" },
  { label: "GPA (B.Tech)", value: "8.57", suffix: "/10" },
  { label: "Internships", value: "2", suffix: "" },
  { label: "Security Tools", value: "10+", suffix: "" },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech – Computer Science & Engineering (Cybersecurity)",
    institution: "Silver Oak University",
    period: "2025 – Present",
    gpa: "8.57 / 10",
    description:
      "Specialization in Cybersecurity. Focus areas include network security, ethical hacking, cryptography, and security operations.",
  },
  {
    id: 2,
    degree: "Diploma in Information Technology",
    institution: "Silver Oak University",
    period: "2022 – 2025",
    gpa: "8.78 / 10",
    description:
      "Foundation in information technology, programming, database management, and networking fundamentals.",
  },
];

export const certifications = [
  { name: "CompTIA Security+", issuer: "CompTIA", status: "Pursuing" },
  { name: "CEH – Certified Ethical Hacker", issuer: "EC-Council", status: "Pursuing" },
  { name: "OSCP", issuer: "Offensive Security", status: "Targeted" },
];

export const skills = {
  security: [
    { name: "Network Security", level: 85 },
    { name: "Threat Analysis", level: 80 },
    { name: "Incident Response", level: 78 },
    { name: "Vulnerability Assessment", level: 82 },
    { name: "Malware Reverse Engineering", level: 70 },
    { name: "Cryptography", level: 75 },
    { name: "SIEM Operations", level: 78 },
    { name: "Penetration Testing", level: 72 },
  ],
  tools: [
    "Burp Suite",
    "Metasploit",
    "Wireshark",
    "Nmap",
    "Splunk",
    "Elastic SIEM",
    "Nessus",
    "OWASP ZAP",
    "Kali Linux",
    "Autopsy",
  ],
  programming: [
    { name: "Python", level: 85 },
    { name: "PHP", level: 78 },
    { name: "JavaScript / TypeScript", level: 75 },
    { name: "Bash / Shell", level: 72 },
    { name: "SQL", level: 80 },
  ],
  domains: [
    "SOC Analysis",
    "Threat Intelligence",
    "Digital Forensics",
    "Web Application Security",
    "API Security",
    "Cloud Security",
    "OSINT",
    "Secure Coding (OWASP)",
  ],
};

export const experience = [
  {
    id: 1,
    title: "PHP Development Intern",
    company: "Aspiration IT Consulting",
    type: "Internship",
    period: "Jan 2025 – Apr 2025",
    duration: "4 months",
    location: "Ahmedabad, Gujarat, India",
    mode: "On-site",
    bullets: [
      "Developed and maintained dynamic web applications using PHP, MySQL, and HTML/CSS, contributing to client-facing projects during a 4-month on-site internship.",
      "Implemented secure coding practices including input validation and SQL injection prevention, applying OWASP guidelines to production code.",
      "Collaborated with senior developers to debug and optimize backend logic, reducing page load errors across key modules.",
      "Gained hands-on exposure to the full web development lifecycle — from requirement gathering to deployment.",
    ],
  },
  {
    id: 2,
    title: "Python Developer Intern",
    company: "Sparks To Ideas",
    type: "Internship",
    period: "Jul 2024",
    duration: "1 month",
    location: "Ahmedabad, Gujarat, India",
    mode: "On-site",
    bullets: [
      "Built Python-based scripts and automation tools during a 1-month intensive internship, focusing on practical problem-solving and clean code practices.",
      "Worked with Python libraries for data handling and task automation, improving workflow efficiency for internal processes.",
      "Applied foundational programming skills in a real-world team environment, receiving mentorship on professional development standards.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    slug: "boing-api-security",
    name: "Boing",
    tagline: "API Abuse & Security Monitoring Platform",
    description:
      "A production-ready API abuse detection platform ingesting real-time telemetry over HTTP and WebSockets, with a 3-layer detection pipeline combining rule-based, statistical, and machine-learning approaches.",
    longDescription:
      "Boing is a comprehensive API security monitoring solution designed to detect and respond to API abuse in real time. The platform ingests telemetry via HTTP and WebSockets, processes it through a sophisticated 3-layer detection pipeline (rule-based, statistical, and ML-based), and alerts security teams through multiple channels. Built with a security-first architecture, it includes JWT authentication, RBAC, encrypted API secrets, and full audit logging.",
    techStack: ["FastAPI", "React", "MySQL", "Docker", "Isolation Forest", "WebSockets", "JWT", "RBAC"],
    highlights: [
      "Supports >5,000 events/min with sub-200ms dashboard refresh latency",
      "3-layer detection pipeline: rule-based, statistical, and ML (Isolation Forest + One-Class SVM)",
      "~92% anomaly recall with <5% false-positive rate",
      "Multi-channel alerting: SMTP, Slack webhooks, in-app notifications",
      "Reduced mean time to detection by an estimated 60%",
    ],
    github: "https://github.com/Panda-0x01/Boing_API",
    live: "https://boing-main.vercel.app/",
    category: "Security Tool",
    featured: true,
  },
  {
    id: 2,
    slug: "zeno-ai-assistant",
    name: "Zeno",
    tagline: "Local-First AI Desktop Assistant",
    description:
      "A fully local, cross-platform AI desktop assistant with zero cloud dependency. Features AES-256-GCM encrypted storage, offline voice I/O, and a permission-based plugin system.",
    longDescription:
      "Zeno is a privacy-first AI assistant that runs entirely on the user's machine — no cloud APIs, no data leakage. Built on Electron with a React/TypeScript frontend and a FastAPI backend, it streams LLM responses locally via Ollama. Security is paramount: all local data is encrypted with AES-256-GCM, execution is sandboxed, and a permission-based plugin system controls capabilities. Voice interaction works offline via Whisper/VOSK.",
    techStack: ["Electron", "React", "TypeScript", "FastAPI", "Ollama", "AES-256-GCM", "Whisper", "VOSK"],
    highlights: [
      "Zero cloud dependency — fully local, cross-platform (Windows/macOS/Linux)",
      "AES-256-GCM encrypted local data storage",
      "Sandboxed execution with permission-based plugin system",
      "Offline voice I/O: Web Speech API with Whisper/VOSK fallback",
      "ARIA-compliant accessible UI with light/dark themes",
    ],
    github: "https://github.com/Panda-0x01/zeno_AI",
    live: "https://zeno-main.vercel.app/",
    category: "AI / Privacy",
    featured: true,
  },
];

export const research = [
  {
    id: 1,
    slug: "thermal-cryptographic-key-generation",
    title: "Thermal Image-Based Cryptographic Key Generation",
    status: "In Progress",
    type: "Research Paper",
    techStack: ["Python", "ECC", "Image Processing", "Finite Field Mathematics"],
    description:
      "A novel biometric entropy pipeline that converts thermal camera captures into numerical matrices, mapped onto elliptic curves over finite fields to derive cryptographic parameters leveraging ECDLP hardness.",
    highlights: [
      "Biometric entropy pipeline converting thermal camera captures into numerical matrices",
      "Elliptic curve mapping over finite fields to derive cryptographic parameters",
      "Key entropy statistically comparable to NIST-recommended ECC curves",
      "Strong brute-force resistance via ECDLP hardness",
      "Targeting submission to applied cryptography or security systems venue",
    ],
    github: "https://github.com/Panda-0x01",
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: "building-boing-api-abuse-detection",
    title: "Building Boing: Engineering an API Abuse Detection Platform",
    excerpt:
      "How I designed a 3-layer detection pipeline combining rule-based filters, statistical analysis, and machine learning to achieve 92% anomaly recall with under 5% false positives.",
    content: `
# Building Boing: Engineering an API Abuse Detection Platform

API abuse is one of the most underestimated attack surfaces in modern software. Rate limiting alone is not enough. In this post, I walk through the architecture decisions behind Boing — a production-ready API security monitoring platform I built from scratch.

## The Problem

Most API gateways provide basic rate limiting and authentication. But sophisticated abuse — credential stuffing, data scraping, account enumeration — operates within rate limits, uses valid credentials, and blends into normal traffic.

## The 3-Layer Detection Pipeline

The core innovation in Boing is a layered detection approach:

**Layer 1: Rule-Based Detection**
Fast, deterministic checks for known-bad patterns: excessive failed authentication attempts, forbidden endpoint access, malformed request structures, and known attack signatures.

**Layer 2: Statistical Analysis**
Baseline modeling per API key, per IP, and per endpoint. Deviation from established behavioral norms (request frequency, payload size distribution, endpoint traversal patterns) triggers elevated risk scores.

**Layer 3: Machine Learning**
Isolation Forest and One-Class SVM models trained on normal traffic patterns. These catch novel abuse patterns that neither rules nor statistics can identify deterministically.

## Performance Architecture

The platform needed to handle >5,000 events per minute with sub-200ms dashboard latency. Key decisions:
- FastAPI with async background workers for telemetry ingestion
- Redis for real-time counters and sliding window rate calculations
- WebSockets for live dashboard updates without polling overhead
- Docker + Gunicorn for containerized horizontal scaling

## Security Design

Every component was designed with security as a first principle:
- JWT authentication with short-lived tokens
- RBAC with principle of least privilege
- Encrypted API secrets at rest
- Comprehensive audit logging for all detection events
- Rate limiting on the monitoring API itself

## Results

After tuning the pipeline on synthetic traffic datasets, Boing achieved approximately 92% anomaly recall with under 5% false positive rate. Multi-channel alerting (SMTP, Slack, in-app) reduced mean time to detection by an estimated 60% compared to manual log review.

The project is open source at [GitHub](https://github.com/Panda-0x01/Boing_API) and a live demo is available at [boing-main.vercel.app](https://boing-main.vercel.app/).
    `,
    category: "Security Engineering",
    tags: ["API Security", "Machine Learning", "FastAPI", "Anomaly Detection"],
    date: "2025-03-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "zeno-privacy-first-ai-assistant",
    title: "Zeno: Building a Privacy-First Local AI Assistant",
    excerpt:
      "Why I built a fully local AI desktop assistant with AES-256-GCM encryption, offline voice I/O, and zero cloud dependency — and what I learned about building secure, private AI applications.",
    content: `
# Zeno: Building a Privacy-First Local AI Assistant

Every major AI assistant sends your data to the cloud. Your conversations, your queries, your context — all of it passes through third-party servers. For security professionals, this is not acceptable. Zeno was my answer.

## The Privacy Problem with AI Assistants

Popular AI tools — regardless of their privacy policies — fundamentally require your data to leave your device. For sensitive work involving vulnerability research, client data, or proprietary code, this is a real risk. I wanted an AI assistant I could use in air-gapped environments.

## Architecture Decisions

**Local LLM via Ollama**
Ollama makes it straightforward to run quantized LLMs locally. Zeno communicates with Ollama via a local FastAPI server, streaming responses through WebSockets to the Electron frontend. No network calls, no API keys, no telemetry.

**AES-256-GCM Encryption**
All conversation history, preferences, and stored context are encrypted at rest using AES-256-GCM. The encryption key is derived from the user's system identity and a local secret — never stored in plaintext.

**Sandboxed Execution**
The plugin system uses a permission-based model. No plugin can access filesystem, network, or system APIs without explicit user grant. Each plugin runs in an isolated context.

## Voice I/O Without the Cloud

Web Speech API provides browser-native voice recognition, but it requires internet connectivity (data goes to Google/Microsoft servers). Zeno uses it as a primary option but falls back to Whisper (via Python subprocess) for fully offline operation. VOSK provides an alternative for lower-resource environments.

## Cross-Platform Distribution

Getting Electron apps to work consistently across Windows, macOS, and Linux is non-trivial. The build pipeline uses electron-builder with platform-specific targets, and the FastAPI backend is bundled as a PyInstaller executable to eliminate Python dependency requirements for end users.

## Lessons Learned

Building a secure, local AI application taught me that privacy engineering is about architecture, not just policies. The default must be no data leaving the device. Every integration — voice, plugins, LLM — needs an offline fallback. Security is not a feature you add at the end.

Zeno is open source at [GitHub](https://github.com/Panda-0x01/zeno_AI).
    `,
    category: "AI / Privacy",
    tags: ["Privacy", "Electron", "Local AI", "Encryption", "Ollama"],
    date: "2025-02-20",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: 3,
    slug: "thermal-ecc-key-generation-research",
    title: "Thermal Image-Based ECC Key Generation: A Research Overview",
    excerpt:
      "Exploring a novel approach to biometric cryptography: using thermal camera captures as entropy sources for elliptic curve key generation, with statistical properties comparable to NIST ECC curves.",
    content: `
# Thermal Image-Based ECC Key Generation: A Research Overview

Biometric cryptography has long promised to eliminate the password. Most approaches use fingerprints or iris scans — both well-studied, and both vulnerable to known attack classes. Thermal imaging offers a different primitive: rich, difficult-to-replicate entropy from human physiological patterns.

## The Core Idea

Thermal cameras capture infrared radiation emitted by the human body. The resulting images contain high-entropy patterns from blood vessel distribution, metabolic activity, and tissue structure — patterns that are unique to an individual and difficult to replicate or steal.

The research question: can this entropy be reliably and securely converted into cryptographic key material?

## The Pipeline

**Step 1: Thermal Capture and Preprocessing**
Raw thermal images are captured and preprocessed to normalize temperature ranges, remove noise, and extract the relevant anatomical region. The preprocessing must be deterministic — the same physical state should produce consistent entropy.

**Step 2: Numerical Matrix Conversion**
The preprocessed image is converted to a numerical matrix representing temperature gradients at each pixel. Dimensionality reduction techniques ensure the matrix is both compact and information-dense.

**Step 3: Elliptic Curve Mapping**
The matrix values are mapped onto an elliptic curve defined over a finite field. The specific mapping function is designed to distribute points uniformly on the curve, preserving entropy.

**Step 4: Key Derivation**
Cryptographic parameters (private key scalar, public key point) are derived from the curve representation. The ECDLP hardness property ensures that an adversary who observes the public key cannot reverse-engineer the thermal source.

## Preliminary Results

Early experiments show key entropy statistically comparable to NIST P-256 curve recommendations. The pipeline shows strong resistance to brute-force attacks, and the biometric variability (slight differences in thermal capture conditions) is handled through fuzzy extraction techniques.

## Next Steps

The primary challenge is intra-individual variability — the same person's thermal image changes with temperature, health, and time of day. Robust fuzzy extraction and error correction coding are being implemented to handle this variability without compromising security.

Targeting submission to an applied cryptography or security systems conference upon completion of the full encrypt/decrypt validation workflow.
    `,
    category: "Cryptography Research",
    tags: ["Cryptography", "ECC", "Biometrics", "Research", "Python"],
    date: "2025-01-10",
    readTime: "12 min read",
    featured: false,
  },
];

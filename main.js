// ==========================================================================
// NEHA MIRIAM JOSE — EDITORIAL MOTION & STORYTELLING SCRIPTS
// Soft Pastel Aesthetics, Refined Section Entrances & Interactive Timeline
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Initial Page Load Execution ---
    document.body.classList.add('is-ready');

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 2. Global Section Entrance Choreography (IntersectionObserver) ---
    const revealTargets = document.querySelectorAll(
        '.section-chapter, .section-subtitle, .about-grid, .carousel-stage-container, .carousel-controls-bar, .toolkit-grid, .leadership-cards-grid, .milestones-grid, .contact-grid, .feature-pastel-card, .toolkit-card, .milestone-card, .c-link-card, .contact-info-col, .contact-form-col'
    );

    if ('IntersectionObserver' in window && revealTargets.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealTargets.forEach(target => {
            revealObserver.observe(target);
        });
    } else {
        revealTargets.forEach(target => target.classList.add('is-revealed'));
    }

    // --- 3. Subtle Pastel Scrapbook Decorative Float (Gentle Parallax) ---
    const decorShapes = document.querySelectorAll('.pastel-decor-shape, .scrapbook-decor');
    let decorTicking = false;

    if (decorShapes.length > 0 && !isReducedMotion) {
        window.addEventListener('scroll', () => {
            if (!decorTicking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    decorShapes.forEach((shape, idx) => {
                        const speed = 0.02 + (idx % 3) * 0.012;
                        const direction = idx % 2 === 0 ? 1 : -1;
                        shape.style.transform = `translateY(${scrollY * speed * direction}px)`;
                    });
                    decorTicking = false;
                });
                decorTicking = true;
            }
        }, { passive: true });
    }

    // --- 4. Interactive Scroll-Driven Journey Timeline Storytelling ---
    const timelineStack = document.getElementById('timeline-stack');
    const timelineProgressBar = document.getElementById('timeline-progress-bar');
    const timelineRows = document.querySelectorAll('.timeline-row');

    if (timelineStack && timelineRows.length > 0) {
        let timelineTicking = false;

        function updateJourneyTimeline() {
            if (isReducedMotion) {
                if (timelineProgressBar) timelineProgressBar.style.height = '100%';
                timelineRows.forEach(row => row.classList.add('is-active'));
                return;
            }

            const stackRect = timelineStack.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Activate when top of timeline enters the bottom 70% of viewport
            const triggerPoint = windowHeight * 0.70;

            const progress = (triggerPoint - stackRect.top) / stackRect.height;
            const clampedProgress = Math.min(Math.max(progress, 0), 1);

            // Update smooth progress height
            if (timelineProgressBar) {
                timelineProgressBar.style.height = `${(clampedProgress * 100).toFixed(1)}%`;
            }

            // Update individual timeline nodes and alternating cards
            timelineRows.forEach((row, idx) => {
                const rowRect = row.getBoundingClientRect();
                const rowTrigger = rowRect.top + 30;

                if (rowTrigger <= triggerPoint) {
                    if (!row.classList.contains('is-active')) {
                        row.classList.add('is-active');
                    }
                } else if (rowTrigger > triggerPoint + 40) {
                    // Reverses naturally when scrolling upward
                    if (row.classList.contains('is-active')) {
                        row.classList.remove('is-active');
                    }
                }
            });

            timelineTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!timelineTicking) {
                window.requestAnimationFrame(updateJourneyTimeline);
                timelineTicking = true;
            }
        }, { passive: true });

        // Initial check on page load
        updateJourneyTimeline();
    }

    // --- 5. Project & Leadership Details Pop-out Modal Window Logic ---
        const projectModal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-dynamic-content');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        const projectsData = [
            {
                number: "01",
                category: "Cybersecurity & Docker Sandboxing",
                accent: "sage",
                title: "Ethical Hacking Simulation Portal",
                image: "./project/ethical-hacking/user-challenges.png",
                imageAlt: "Ethical Hacking Simulation Portal Challenges Dashboard",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/Ethical-Hacking-Simulation-Portal",
                stats: [
                    { num: "10", label: "Vulnerability Labs", desc: "OWASP Top 10 exploit environments" },
                    { num: "16K–18K", label: "Isolated Port Pool", desc: "Dynamic non-colliding Docker sockets" },
                    { num: "27", label: "Relational Tables", desc: "Normalized SQLite3 schema" },
                    { num: "40+", label: "Interactive Views", desc: "FastAPI + DiceBear Avatars" },
                    { num: "AI", label: "Gemini 2.5 Flash", desc: "Instructional tutoring & hint engine" }
                ],
                mediaItems: [
                    {
                        type: "video",
                        src: "./project/ethical-hacking/user-demo.mp4",
                        poster: "./project/ethical-hacking/user-challenges.png",
                        tabLabel: "User Experience (Video Demo)",
                        icon: "fa-solid fa-circle-play",
                        title: "Student & Learner Experience Walkthrough",
                        caption: "Live student walkthrough: on-demand ephemeral Docker lab launch, web exploit terminal interaction, flag verification, interactive LMS tutorial player, and peer-to-peer chat."
                    },
                    {
                        type: "video",
                        src: "./project/ethical-hacking/admin-demo.mp4",
                        poster: "./project/ethical-hacking/admin-challenges.png",
                        tabLabel: "Admin Governance (Video Demo)",
                        icon: "fa-solid fa-shield-halved",
                        title: "Administrative Control Center Walkthrough",
                        caption: "Platform administrator walkthrough: real-time user management & security audit logs, Docker container orchestration, dynamic challenge creation, quiz composer, and the upgrade-publishing pipeline."
                    },
                    {
                        type: "image",
                        src: "./project/ethical-hacking/user-challenges.png",
                        tabLabel: "User Challenges",
                        icon: "fa-solid fa-laptop-code",
                        title: "Live Vulnerability Challenge Catalog",
                        caption: "Challenge discovery catalog featuring 10 hands-on exploit labs with difficulty indicators, XP reward points, category filtering, and direct Docker container spin-up triggers."
                    },
                    {
                        type: "image",
                        src: "./project/ethical-hacking/user-tutorials.png",
                        tabLabel: "Interactive LMS Player",
                        icon: "fa-solid fa-book-open-reader",
                        title: "Block-Based Interactive Tutorial Player",
                        caption: "Modular lesson engine featuring rich content blocks, diagrammatic walkthroughs, interactive checkpoint knowledge checks, hints, and dynamic XP recalculations."
                    },
                    {
                        type: "image",
                        src: "./project/ethical-hacking/admin-challenges.png",
                        tabLabel: "Admin Challenges",
                        icon: "fa-solid fa-sliders",
                        title: "Administrative Challenge & Lab Configuration",
                        caption: "Admin workbench for binding Docker images, configuring port allocation rules, authoring custom challenge flags, and setting point values."
                    },
                    {
                        type: "image",
                        src: "./project/ethical-hacking/admin-users.png",
                        tabLabel: "User Governance",
                        icon: "fa-solid fa-users-gear",
                        title: "Real-Time User Monitoring & Audit Log",
                        caption: "Centralized administrator dashboard for monitoring live user activity, account locks, ban toggles, XP/Level overrides, and security audit trails."
                    }
                ],
                about: "A production-grade, full-stack cybersecurity training and simulation portal engineered to bridge the gap between theoretical knowledge and safe, practical offensive/defensive operations. By marrying an asynchronous FastAPI backend with automated Docker container sandboxing, the platform dynamically provisions isolated, ephemeral vulnerable web micro-applications on dedicated localhost ports (16000–18000). Students can safely analyze, exploit, and remediate real-world OWASP Top 10 vulnerabilities inside sandboxed containers without endangering host systems, all while earning XP, leveling up on global leaderboards, and receiving AI-guided tutoring.",
                features: [
                    "Dynamic On-Demand Ephemeral Docker Sandboxing: Programmatically provisions isolated micro-labs on dedicated localhost ports (16000–18000) with 30-minute auto-expiration windows and TCP socket health checks.",
                    "10 Realistic Vulnerability Simulation Labs: Complete hands-on challenge micro-applications covering SQLi, Stored XSS, CSRF Banking, IDOR, LFI/Path Traversal, Remote Command Injection, Unrestricted File Upload, SSTI, Brute-Force, and Bank Account Takeover.",
                    "Modular Block-Based Learning Engine (LMS): Structured hierarchical courses with interactive knowledge checks, hints, rating feedback, and integrated Google Gemini 2.5 Flash tutoring.",
                    "Deterministic Gamification & Ranking: Dual-sort ranking priority (XP ↓, Level ↓, Challenges Solved ↓, ID ↑) with milestone history and real-time global leaderboard.",
                    "Social Graph & Peer-to-Peer Interaction: User discovery search, stateful friendship requests, and private P2P chat with independent per-user clear histories.",
                    "Granular Role-Based Administration (16 Dashboards): Comprehensive governance suite for live user tracking, challenge creation, quiz composition, audit logging, and an Upgrade-Publish system (+50% XP boost for early student adoption)."
                ],
                labs: [
                    { name: "SQL Injection (SQLi)", cwe: "CWE-89", desc: "Raw string concatenation auth bypass & database extraction." },
                    { name: "Stored Cross-Site Scripting", cwe: "CWE-79", desc: "Persistent guestbook script injection & session exfiltration." },
                    { name: "CSRF Banking Simulation", cwe: "CWE-352", desc: "Unauthorized state-changing funds transfer via forged requests." },
                    { name: "Insecure Direct Object Reference", cwe: "CWE-639", desc: "Horizontal & vertical authorization bypass via URL parameters." },
                    { name: "Local File Inclusion (LFI)", cwe: "CWE-22", desc: "Directory traversal exploiting unvalidated paths to read /etc/flag." },
                    { name: "Remote Command Injection", cwe: "CWE-78", desc: "Shell metacharacter execution inside diagnostic ping utility." },
                    { name: "Unrestricted File Upload", cwe: "CWE-434", desc: "Arbitrary script upload & execution through weak MIME checks." },
                    { name: "Server-Side Template Injection", cwe: "CWE-1336", desc: "Jinja2 dynamic interpolation exploiting environment variables." },
                    { name: "Brute-Force Authentication", cwe: "CWE-307", desc: "Automated credential cracking bypassing missing rate limits." },
                    { name: "Bank Account Takeover", cwe: "CWE-287", desc: "Multi-stage session hijacking & predictable balance exfiltration." }
                ],
                archHighlights: [
                    { icon: "fa-solid fa-server", title: "Asynchronous FastAPI Core", desc: "High-throughput ASGI REST backend handling concurrent student traffic, API routing, Pydantic validation, and session governance." },
                    { icon: "fa-brands fa-docker", title: "Docker Engine SDK Sandboxing", desc: "Programmatic container orchestration (docker_manager.py) with dynamic port binding, socket health checks, and 30-min auto-cleanup." },
                    { icon: "fa-solid fa-database", title: "27-Table Relational Schema", desc: "Normalized SQLite database with foreign keys, DEFERRED concurrency model, exponential retry backoff, and Write-Ahead Logging (WAL)." },
                    { icon: "fa-solid fa-brain", title: "Gemini AI Tutoring Layer", desc: "Integrated gemini-2.5-flash model generating dynamic context-aware hints and instructional guidance." }
                ],
                pipeline: ["Student Auth / Login", "Docker Manager (16K-18K)", "10 Ephemeral Exploit Labs", "Flag & XP Validation", "Global Leaderboard"],
                technologies: ["FastAPI 0.104", "Docker SDK 7.0", "Python 3.10", "SQLite3 (27 Tables)", "Google Gemini AI", "Flask Micro-Labs", "Uvicorn ASGI", "Vanilla CSS3 / ES6 JS", "DiceBear API", "HTTPx"],
                github: "https://github.com/nehamiriamjose/Ethical-Hacking-Simulation-Portal"
            },
            {
                number: "02",
                category: "Deep Learning, Audio Signal Processing & Ensemble Learning",
                accent: "lavender",
                title: "Beyond the Illusion: Ensemble Learning for Effective Voice Deepfake Detection",
                image: "./deepfake_audio_dashboard.jpg",
                imageAlt: "Deepfake Audio Detection System UI & Spectrogram Analysis",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/deepfake-audio-detection",
                stats: [
                    { num: "(26, 128)", label: "Feature Matrix", desc: "13 MFCC + 12 Chroma + 1 ZCR channels" },
                    { num: "4 Models", label: "Deep Neural Suite", desc: "RNN, 1D-CNN, LSTM & ConvLSTM" },
                    { num: "5 Subsets", label: "FoR Dataset", desc: "Original, Norm, 2sec, Rerec & Merged" },
                    { num: "Dual", label: "Ensemble Voting", desc: "Soft (Probability) & Hard (Majority)" },
                    { num: "500/Batch", label: "NPZ Batch Extractor", desc: "Optimized Librosa feature pipeline" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./deepfake_audio_dashboard.jpg",
                        tabLabel: "Audio DSP & Detection UI",
                        icon: "fa-solid fa-wave-square",
                        title: "Acoustic Feature Extraction & Real-Time Classification Dashboard",
                        caption: "Live web inference interface displaying interactive audio waveform visualizer, 26x128 combined acoustic feature heatmap (13 MFCCs, 12 Chroma pitch classes, 1 Zero Crossing Rate), Short-Time Fourier Transform (STFT) spectrogram, Real vs Fake detection score, and FoR batch processing telemetry."
                    },
                    {
                        type: "image",
                        src: "./deepfake_ensemble_architecture.jpg",
                        tabLabel: "Ensemble Deep Learning Architecture",
                        icon: "fa-solid fa-network-wired",
                        title: "4-Model Deep Neural Network Suite & FoR Dataset Benchmarks",
                        caption: "Comprehensive deep learning ensemble pipeline feeding standardized (26, 128) acoustic matrices through RNN, 1D-CNN, LSTM, and ConvLSTM branches into Soft Voting (probability averaging) and Hard Voting (majority consensus) decision engines alongside ROC-AUC, Confusion Matrix, and FoR subset evaluations."
                    }
                ],
                about: "Beyond the Illusion is a deep learning voice forensics and acoustic signal processing system engineered to detect synthetic, AI-generated, and cloned human speech. As generative AI voice cloning models reach unprecedented fidelity, distinguishing authentic vocal timbre from manipulated audio has become critical for voice biometrics, fraud prevention, and digital security. This system implements an end-to-end pipeline: extracting multi-domain acoustic characteristics (MFCCs, Chroma pitch classes, and Zero Crossing Rate) into a standardized (26, 128) feature representation, training four distinct deep neural architectures (RNN, 1D-CNN, LSTM, ConvLSTM), and synthesizing predictions using Soft and Hard Voting ensemble mechanisms with real-time web deployment.",
                features: [
                    "Multi-Domain Acoustic Feature Extraction: Computes 13 Mel-Frequency Cepstral Coefficients (MFCC), 12 Chroma pitch energy classes, and 1 Zero Crossing Rate (ZCR) per time frame using Librosa at 22,050 Hz (N_FFT = 2048, Hop Length = 512).",
                    "Dimension Standardization & Normalization: Standardizes varying audio durations into a uniform matrix of 26 feature channels × 128 time frames via temporal truncation and zero-padding, followed by z-score normalization ((x - μ) / σ).",
                    "High-Throughput Batch Processing Engine: High-performance audio feature extraction pipeline processing audio in structured batches of 500 files and serializing standardized tensors into compressed NumPy .npz formats.",
                    "4 Heterogeneous Deep Neural Architectures: Parallel evaluation of Recurrent Neural Networks (RNN) for sequential temporal tracking, 1D-CNN for localized spectral pattern filters, Long Short-Term Memory (LSTM) for long-range temporal dependencies, and ConvLSTM for joint spatial-temporal modeling.",
                    "Dual-Strategy Ensemble Decision Engine: Implements Soft Voting (averaging predicted class probabilities P(Fake) across models) and Hard Voting (majority class consensus) to achieve superior generalization over individual base classifiers.",
                    "FoR Multi-Subset Benchmarking: Comprehensive evaluation across 5 Fake-or-Real (FoR) dataset subsets: for-original, for-norm (normalized), for-2sec (2-second slices), for-rerec (re-recorded acoustic variations), and for-merged (combined multi-source corpus).",
                    "Rigorous Forensics Evaluation: Assessed with classification Accuracy, Precision, Recall, F1-Score, ROC-AUC curves, Equal Error Rate (EER), and Confusion Matrices to guarantee minimal false-positive rates on authentic human voices.",
                    "End-to-End Web Inference Interface: Interactive web portal enabling users to upload raw audio recordings (.mp3 / .wav), extract real-time acoustic features, run ensemble model inference, and inspect Real/Fake confidence telemetry."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-wave-square", title: "Acoustic Signal Processing (DSP)", desc: "Extracts 13 MFCC spectral envelopes, 12 Chroma octave pitch distributions, and 1 ZCR sign-flip metric into a unified (26, 128) matrix." },
                    { icon: "fa-solid fa-cubes-stacked", title: "4 Deep Learning Architectures", desc: "Heterogeneous neural network suite (RNN, 1D-CNN, LSTM, ConvLSTM) engineered to capture both spectral frequency nuances and temporal cadence." },
                    { icon: "fa-solid fa-scale-balanced", title: "Soft & Hard Voting Consensus", desc: "Dual ensemble decision layers combining continuous probability estimates and discrete majority votes to minimize individual model bias." },
                    { icon: "fa-solid fa-database", title: "Fake-or-Real (FoR) Corpus", desc: "Trained and benchmarked across 5 specialized dataset configurations covering original recordings, normalized audio, 2-sec clips, and re-recorded environments." }
                ],
                pipeline: ["Audio Ingestion (22.05 kHz)", "MFCC + Chroma + ZCR Extraction", "Dimension Standardization (26, 128)", "Batch NPZ Serialization", "4-Model Neural Inference", "Soft / Hard Voting Ensemble", "Real/Fake Web Telemetry"],
                technologies: ["Python 3.10", "Librosa DSP", "TensorFlow / Keras", "NumPy & SciPy", "Scikit-Learn", "Matplotlib & Seaborn", "Ensemble Voting", "Fake-or-Real (FoR)", "Audio Signal Processing", "Web UI Deployment"],
                github: "https://github.com/nehamiriamjose"
            },
            {
                number: "03",
                category: "Machine Learning, NLP & Support Automation",
                accent: "blue",
                title: "AI-Powered Ticket Creation & Categorisation from User Input",
                image: "./project/ai-ticket/user-part.mp4",
                imageAlt: "AI-Powered Ticket Creation and Categorisation Video Demos",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/AI-Powered-Ticket-Creation-and-Categorisation-from-user-input-",
                reportUrl: "./project/ai-ticket/project-report.pdf",
                stats: [
                    { num: "47,837", label: "Dataset Scale", desc: "Enterprise IT support tickets processed" },
                    { num: "85.7%", label: "Topic Accuracy", desc: "Best-in-class XGBoost classifier (85.8% F1)" },
                    { num: "8 Topics", label: "Category Triage", desc: "Hardware, Access, Storage, Admin, HR & more" },
                    { num: "3 Tiers", label: "Priority & SLA", desc: "High, Medium, Low with auto-deadlines" },
                    { num: "5 Models", label: "Classifier Suite", desc: "Evaluated XGBoost, SVM, LR, RF & Naive Bayes" }
                ],
                mediaItems: [
                    {
                        type: "video",
                        src: "./project/ai-ticket/user-part.mp4",
                        tabLabel: "User Portal (Video Demo)",
                        icon: "fa-solid fa-circle-play",
                        title: "Student / User Complaint Submission Walkthrough",
                        caption: "Live user walkthrough: interactive complaint submission, SpaCy NER extraction, real-time AI classification preview, and automatic ticket generation."
                    },
                    {
                        type: "video",
                        src: "./project/ai-ticket/support-part.mp4",
                        tabLabel: "Support Console (Video Demo)",
                        icon: "fa-solid fa-headset",
                        title: "Support Engineer Queue & SLA Triage Walkthrough",
                        caption: "Live support team walkthrough: active queue filtering, SLA urgency countdown tracking, status progression, and ticket resolution logs."
                    },
                    {
                        type: "video",
                        src: "./project/ai-ticket/admin-part.mp4",
                        tabLabel: "Admin Governance (Video Demo)",
                        icon: "fa-solid fa-shield-halved",
                        title: "Administrative Control Center & Analytics Walkthrough",
                        caption: "Platform administrator walkthrough: multi-tier queue analytics, XGBoost model telemetry, database operations, and system-wide SLA compliance reports."
                    }
                ],
                about: "AI-Powered Ticket Creation and Categorisation is an enterprise machine learning and natural language processing system engineered to transform raw, unstructured user complaints into structured, triaged IT support tickets. Trained and benchmarked on a real-world corpus of 47,837 IT support tickets, the system combines multi-class topic classification (comparing 5 machine learning architectures), urgency priority ranking enhanced with SMOTE class balancing, custom SpaCy Named Entity Recognition (NER), an asynchronous FastAPI REST backend, and a 3-role Streamlit management portal with automated SLA tracking.",
                features: [
                    "Comparative ML Classifier Benchmark: Evaluated 5 diverse algorithms (XGBoost, Linear SVM, Logistic Regression, Random Forest, and Multinomial Naive Bayes) on TF-IDF feature matrices, selecting XGBoost (85.7% accuracy / 0.858 macro F1) as the production topic classifier.",
                    "SMOTE Class Balancing: Implemented Synthetic Minority Over-sampling Technique (imbalanced-learn) to counteract severe class imbalances in high-urgency ticket samples, ensuring high recall for mission-critical operational incidents.",
                    "Custom SpaCy Named Entity Recognition (NER): Extracted domain-specific entities (user identities, software/hardware models, system error codes, and priority cues) directly from raw, messy natural language inputs.",
                    "Milestone 3 Automated Ticket Generation Engine: Synthesizes unstructured user problem descriptions into structured tickets with concise formulated titles, mapped topic categories, priority confidence scores, and SLA target deadlines.",
                    "High-Throughput FastAPI REST Backend: Asynchronous ASGI API exposing /generate-ticket endpoints with Pydantic validation, error handling, and SQLite relational persistence.",
                    "Role-Based 3-Tier Streamlit Portal: Dedicated user interfaces for regular Users (interactive ticket submission with real-time AI preview), Support Team (queue triage, filterable ticket tables, and status updates), and Admins (metrics dashboard and auto-refreshing database view).",
                    "Automated SLA & Alert Notification Pipeline: Proactive notification service (notification_service.py) monitoring time-to-resolution thresholds, calculating SLA compliance, and alerting support leads on overdue items."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-bolt", title: "XGBoost Classifier (85.7%)", desc: "Top-performing gradient boosting model achieving 85.7% topic accuracy and 0.858 F1 score across 47,837 tickets." },
                    { icon: "fa-solid fa-tags", title: "SpaCy Custom NER", desc: "Domain-specific entity extraction pipeline parsing issue descriptions for hardware models, software versions, and error codes." },
                    { icon: "fa-solid fa-server", title: "Asynchronous FastAPI Core", desc: "Low-latency REST endpoints delivering real-time ticket synthesis, structured JSON validation, and SQLite persistence." },
                    { icon: "fa-solid fa-clock", title: "Dynamic SLA & Notification Hub", desc: "Automated urgency scoring and SLA deadline tracker with active/closed queue tabs and live auto-refresh." }
                ],
                pipeline: ["Raw User Input", "NLTK Preprocessing & TF-IDF", "SpaCy NER Extraction", "XGBoost Topic & SMOTE Priority", "FastAPI Synthesis", "SQLite3 DB Logging", "Streamlit 3-Role Console"],
                technologies: ["Python 3.10", "XGBoost", "Scikit-Learn", "SpaCy NER", "NLTK", "SMOTE (imbalanced-learn)", "FastAPI", "Streamlit", "SQLite3", "Pandas & NumPy", "Altair & Seaborn"],
                github: "https://github.com/nehamiriamjose/AI-Powered-Ticket-Creation-and-Categorisation-from-user-input-"
            },
            {
                number: "04",
                category: "Full-Stack Python Flask & On-Demand Logistics",
                accent: "pink",
                title: "CraveCart — Multi-User Food Ordering & Delivery System",
                image: "./food_ordering.jpg",
                imageAlt: "CraveCart Food Ordering & On-Demand Delivery Platform Dashboard",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/Food-Ordering-System",
                stats: [
                    { num: "1,000+", label: "Concurrent Sessions", desc: "0 database locks under 1k load benchmark" },
                    { num: "3 Roles", label: "Unified Portals", desc: "Customer, Partner (/partner), Courier (/courier)" },
                    { num: "7 Stages", label: "Live Order Tracking", desc: "Animated courier route on SVG map" },
                    { num: "64", label: "WSGI Worker Threads", desc: "Waitress multi-threaded server (2k conn limit)" },
                    { num: "320+", label: "Writes / Second", desc: "SQLite Write-Ahead Logging (WAL mode)" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./food_ordering.jpg",
                        tabLabel: "Customer Portal & Cart",
                        icon: "fa-solid fa-utensils",
                        title: "Customer Discovery, Dish Customizer & Smart Cart",
                        caption: "End-to-end customer ordering portal with dietary filtering (Veg, Vegan, Gluten-Free), real-time fuzzy search, portion size & add-on customizer modal, single-restaurant cart protection, and CravePoints loyalty calculation (10 pts per $1)."
                    },
                    {
                        type: "image",
                        src: "./food_ordering.jpg",
                        tabLabel: "Restaurant Partner (/partner)",
                        icon: "fa-solid fa-store",
                        title: "Restaurant Partner Kitchen Workbench & Campaign Manager",
                        caption: "Live kitchen order management dashboard: Advance order statuses to 'Ready for Pickup', fleet courier dispatch assignment, full menu & modifier CRUD, instant 86'd / in-stock toggling, promo campaign launch with countdown timers, and revenue analytics."
                    },
                    {
                        type: "image",
                        src: "./food_ordering.jpg",
                        tabLabel: "Courier Driver (/courier)",
                        icon: "fa-solid fa-motorcycle",
                        title: "Courier Driver Mission Control & Earnings Telemetry",
                        caption: "On-demand courier interface with instant online/offline shift toggles, active pickup & drop-off delivery queues with customer notes, step-by-step mission progression, base pay + tip breakdown, and instant cashout payout tracking."
                    }
                ],
                about: "CraveCart is a modern, high-concurrency, full-stack multi-user food ordering and on-demand delivery web application built using Python Flask, Vanilla CSS, SQLite (in WAL mode with busy timeouts), and Waitress WSGI. The platform is architected to seamlessly connect three distinct user roles—Customers, Restaurant Partners, and Courier Delivery Drivers—into a single unified ecosystem. Benchmark verified for 1,000+ simultaneous concurrent sessions with 100% request success rate and 0 database locks, CraveCart features 7-stage live animated order progression, a multi-method payment gateway with 3D-Secure and dynamic UPI QR simulation, and Web Audio API synthesized tactile feedback.",
                features: [
                    "Customer Experience & Discovery: Instant fuzzy auto-suggest search across restaurants and dishes, dietary filters (Veg, Vegan, Gluten-Free), price tier sorting ($ to $$$$), and post-order 1-5 star reviews that dynamically recalculate storefront ratings.",
                    "Dish Customizer & Smart Cart: Interactive modal for selecting portion sizes (Small, Medium, Large) and add-ons/modifiers with live price calculation, stock enforcement, and multi-restaurant cart mixing prevention.",
                    "Promotional Engine & Loyalty: Custom promo codes with percentage/fixed discounts, minimum spend thresholds, countdown timers, and CravePoints loyalty reward system (10 points earned per $1 spent).",
                    "Multi-Gateway Checkout: Address picker, driver tip selector, CravePoints redemption, simulated 3D-Secure OTP verification for Credit/Debit Cards, UPI App Push with dynamic QR timer, and instant Net Banking authorization.",
                    "7-Stage Real-Time Order Tracking: Stateful progression (Placed → Confirmed → Preparing → Ready → Picked Up → On The Way → Delivered) featuring animated courier marker navigation along an interactive SVG delivery route map.",
                    "Restaurant Partner Portal (/partner): Real-time kitchen queue, advance-order controls, courier allocation, menu & category CRUD with image uploads, dietary tags, instant 86'd/in-stock toggles, and promotional campaign authoring.",
                    "Courier Driver Portal (/courier): Instant online/offline shift toggling, delivery mission acceptance, turn-by-turn pickup/drop-off instructions, customer delivery notes, and live earnings payout dashboard with simulated instant cashouts.",
                    "Production Concurrency & Testing: 64-thread Waitress WSGI server with SQLite WAL mode and 30s busy timeout, verified by a 1,000-user concurrency benchmark (320+ writes/sec, 0 locks) and 31 automated pytest unit/integration tests."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-server", title: "Waitress Multi-Threaded WSGI", desc: "High-performance production WSGI web server running 64 worker threads with a 2,000 connection limit handling heavy concurrent user loads." },
                    { icon: "fa-solid fa-database", title: "SQLite WAL & Connection Pool", desc: "Write-Ahead Logging (WAL mode) with 30s busy timeout, pragma optimizations, and memory caching enabling 320+ writes/sec with zero lock contention." },
                    { icon: "fa-solid fa-users-gear", title: "Tri-Role Access Architecture", desc: "Role-based session routing securely isolating Customer storefronts, Restaurant Partner (/partner) kitchen workflows, and Courier Driver (/courier) missions." },
                    { icon: "fa-solid fa-route", title: "7-Stage SVG Tracking & Web Audio", desc: "Real-time state machine orchestrating animated vector map telemetry alongside Web Audio API synthesized haptic button and checkout chimes." }
                ],
                pipeline: ["Discovery & Modifiers", "3D-Secure / UPI Checkout", "Kitchen Queue (/partner)", "Courier Dispatch (/courier)", "Live 7-Stage SVG Tracking", "Delivered & CravePoints"],
                technologies: ["Python 3.10+", "Flask Framework", "Waitress WSGI", "SQLite3 (WAL Mode)", "Vanilla JS (ES6+)", "Custom CSS System", "Web Audio API", "Pytest (31 Tests)", "SVG Route Animation", "RESTful APIs"],
                github: "https://github.com/nehamiriamjose/Food-Ordering-System"
            },
            {
                number: "05",
                category: "Embedded Systems, IoT & Disaster Telemetry",
                accent: "sage",
                title: "GeoSentinel: LoRa-Based Intelligent Landslide Detection & Early Warning System",
                image: "./geosentinel.jpg",
                imageAlt: "GeoSentinel LoRa-Based Landslide Monitoring and Early Warning Telemetry System",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/geosentinel-landslide-lora",
                stats: [
                    { num: "Sub-GHz", label: "LoRa SX1278 Link", desc: "Long-range off-grid RF telemetry" },
                    { num: "6-DOF", label: "MPU6050 IMU", desc: "3-Axis Accel (m/s²) + 3-Axis Gyro (°/s)" },
                    { num: "12-Bit", label: "Soil & DHT22 ADC", desc: "Moisture mV + Ambient Temp/Humidity" },
                    { num: "CRC-16", label: "CCITT-FALSE", desc: "Packet validation & zero corruption" },
                    { num: "5 States", label: "Alert Decision Matrix", desc: "Normal, Watch, Warning, Fault, Lost" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./geosentinel.jpg",
                        tabLabel: "3D Slope Telemetry & Dashboard",
                        icon: "fa-solid fa-mountain-sun",
                        title: "3D Geological Slope Visualization & Real-Time Telemetry Dashboard",
                        caption: "Live monitoring console displaying 3D geological slope stability zones, soil moisture ADC curves, DHT22 ambient temperature and relative humidity graphs, MPU6050 3-axis tilt indicators, SX1278 RSSI/SNR signal diagnostics, and real-time alert level thresholds."
                    },
                    {
                        type: "image",
                        src: "./geosentinel_schematic.jpg",
                        tabLabel: "Hardware Architecture & Sensor Bus",
                        icon: "fa-solid fa-microchip",
                        title: "Dual ESP32 Transmitter/Receiver Hardware Schematic & Bus Mapping",
                        caption: "Full hardware block schematic illustrating remote slope transmitter node (ESP32 wired via SPI to SX1278 LoRa radio, ADC GPIO 34 for Soil Moisture, 1-Wire DHT22, and I2C SDA/SCL for MPU6050) transmitting over sub-GHz LoRa RF to central base station receiver."
                    }
                ],
                about: "GeoSentinel is an embedded IoT-driven landslide disaster monitoring and early warning system engineered to provide continuous, long-range environmental and geotechnical observation in vulnerable, off-grid mountainous terrains. By pairing dual ESP32 microcontrollers with Semtech SX1278 LoRa transceivers operating over sub-GHz frequencies, the system acquires real-time soil moisture dynamics, atmospheric temperature/humidity, and 6-axis inertial motion without relying on cellular GSM or Wi-Fi infrastructure. Transmitted telemetry packets undergo rigorous CRC-16/CCITT-FALSE integrity validation and feed into a 5-tier early warning decision matrix to safeguard at-risk communities.",
                features: [
                    "Dual-Node Embedded Architecture: Remote slope-mounted transmitter unit and central receiving base station built on dual 32-bit ESP32 microcontrollers with low-power sleep profiles.",
                    "Long-Range Sub-GHz LoRa Telemetry: SX1278 transceiver communicating over SPI bus (SCK GPIO 18, MISO 19, MOSI 23, CS 5, DIO0 26) delivering resilient non-line-of-sight packet transmission across rugged terrain.",
                    "Multi-Parameter Geotechnical Sensing: Continuous sampling of soil electrical properties (GPIO 34 12-bit ADC with voltage estimation), ambient temperature & relative humidity via DHT22 (1-wire), and 6-axis inertial dynamics via MPU6050 (I2C bus on GPIO 21/22).",
                    "Deterministic CRC-16 Packet Protocol: Structured comma-separated packet format (V1,NODE_01,Seq,Uptime,SoilADC,Soil_mV,DHT_Valid,Temp,Hum,MPU_Valid,AccX,AccY,AccZ,GyroX,GyroY,GyroZ,MPU_Temp,Plausibility,CRC16) guaranteeing zero payload corruption.",
                    "RF Diagnostics & Link Quality Telemetry: Real-time calculation and display of Received Signal Strength Indicator (RSSI in dBm), Signal-to-Noise Ratio (SNR in dB), packet loss rates, and sequence counters.",
                    "Multi-Tier Early Warning Decision Matrix: 5 distinct operational and threat states (NORMAL, WATCH, WARNING, SENSOR FAULT, COMMUNICATION LOST) designed to prevent false alarms from temporary vibration spikes.",
                    "Audible & Visual Alert Extension Ready: Base station driver interface supporting high-power outdoor emergency sirens, local alert buzzers, and status LED annunciation.",
                    "Real-Time 3D Geological Monitoring UI: Telemetry visualization console rendering 3D topological slope stability heatmaps, environmental time-series charts, and live sensor health diagnostics."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-satellite-dish", title: "Sub-GHz SX1278 LoRa Radio", desc: "Long-range, low-power spread spectrum modulation bypassing cellular reliance for remote slope telecommunication." },
                    { icon: "fa-solid fa-compass-drafting", title: "6-DOF MPU6050 Inertial Fusion", desc: "High-resolution 3-axis accelerometer (m/s²) and 3-axis gyroscope (°/s) capturing sudden structural shear and slope tilt." },
                    { icon: "fa-solid fa-shield-halved", title: "CRC-16/CCITT-FALSE Verification", desc: "Cryptographic cyclic redundancy check validating packet integrity at the receiver before telemetry ingestion." },
                    { icon: "fa-solid fa-triangle-exclamation", title: "5-Tier Threat Matrix & Siren Output", desc: "Multi-parameter thresholding evaluating soil saturation, tilt velocity, and sensor fault states with siren driver outputs." }
                ],
                pipeline: ["Sensor Read (Soil, DHT22, MPU6050)", "CRC-16 Checksum Calculation", "SX1278 LoRa Transmission", "Receiver CRC Validation", "RSSI / SNR Diagnostic Extraction", "5-Tier Alert Evaluation & Dashboard"],
                technologies: ["Embedded C++", "ESP32 (Dual Node)", "Semtech SX1278 LoRa", "SPI Bus Protocol", "I2C Interface", "MPU6050 6-DOF IMU", "DHT22 Environmental Sensor", "Capacitive Soil Moisture", "CRC-16 Checksum", "Web Audio / Alert Matrix"],
                github: "https://github.com/nehamiriamjose"
            },
            {
                number: "06",
                category: "Frontend Web & Client-Side Data Persistence",
                accent: "sage",
                title: "Book Tracker — Personal Reading Journal & Catalog",
                image: "./project/book-tracker/book-tracker-collection.png",
                imageAlt: "Book Tracker Personal Reading Journal and Library Catalog Interface",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/Book-Tracker",
                liveUrl: "https://nehamiriamjose.github.io/Book-Tracker/",
                github: "https://github.com/nehamiriamjose/Book-Tracker",
                stats: [
                    { num: "100%", label: "Client-Side", desc: "Zero database or server dependencies" },
                    { num: "4 Counters", label: "Reading Ledger", desc: "Live Total, To Read, Reading & Finished counts" },
                    { num: "Instant", label: "Real-Time Search", desc: "Dynamic title & author substring filtering" },
                    { num: "A11y", label: "Accessible Forms", desc: "ARIA alerts & dynamic input validation" },
                    { num: "Offline", label: "LocalStorage Sync", desc: "Instant JSON serialization & browser cache" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./project/book-tracker/book-tracker-collection.png",
                        tabLabel: "Library Catalog & Search",
                        icon: "fa-solid fa-book-bookmark",
                        title: "Personal Library Catalog, Real-Time Search & Status Filter Tabs",
                        caption: "Interactive personal reading catalog featuring dynamic bookplate cards with reading status indicators (To read, Reading, Finished), instant title and author search, filter tabs, in-place status cycle dropdowns, and individual book deletion controls."
                    },
                    {
                        type: "image",
                        src: "./project/book-tracker/book-tracker-form.png",
                        tabLabel: "Add Book & Reading Ledger",
                        icon: "fa-solid fa-square-plus",
                        title: "Accessible Book Entry Form & Real-Time Reading Ledger",
                        caption: "Book logging interface with mandatory title and author validation, accessible aria-describedby error feedback, default status dropdown, and live statistics counter updating Total Books, To Read, Reading, and Finished reads instantaneously."
                    }
                ],
                about: "Book Tracker is an elegant personal reading journal and library catalog web application inspired by independent bookstores and classic reading logs. Engineered with semantic HTML5, custom Vanilla CSS, and modular ES6+ JavaScript, the application delivers a quiet, distraction-free space to chronicle your reading life without requiring account creation, backend databases, or complex build tooling. All entries, status transitions, and library edits synchronize automatically to the browser's localStorage, ensuring immediate page load times, total data privacy, and seamless offline functionality.",
                features: [
                    "Intuitive Book Logging & Submission: Frictionless book addition workflow with fields for Book Title, Author, and Reading Status (To read, Reading, Finished) without page reloads, prepending newly added titles immediately to the top of the collection.",
                    "Accessible Inline Form Validation: Enforces mandatory fields with clear error announcements, dynamic aria-invalid and aria-describedby attributes, and automatic blur-state validation that clears gracefully upon user input.",
                    "Real-Time Reading Ledger: Dynamic statistics counter in the header tracking Total Books, To Read, Reading, and Finished counts, recalculating instantly on additions, status shifts, and deletions.",
                    "Instant Search & Substring Matching: Real-time client-side search filtering across your entire library by book title or author name as you type.",
                    "Status Category Filter Tabs: Seamlessly toggle between All, To read, Reading, and Finished shelves without re-fetching or reloading data.",
                    "Interactive Bookplate Cards & In-Place Actions: Update a book's reading status on the fly with in-card dropdown menus or delete titles with single-click trash controls.",
                    "Zero-Dependency Browser LocalStorage Persistence: Automatically serializes all records as structured JSON under the 'book_tracker_books' key, preserving complete libraries and empty bookshelves across browser refreshes.",
                    "Warm Editorial Design Aesthetics: Curated reading-inspired palette using soft cream paper surfaces (#fbf9f4), muted sage green accents (#3f6050), and warm leather tones paired with Google Fonts Lora and Plus Jakarta Sans typography."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-database", title: "Browser LocalStorage Engine", desc: "Reliable client-side persistence serialized as structured JSON with unique UUID generation, maintaining data integrity without cloud servers." },
                    { icon: "fa-solid fa-universal-access", title: "Accessible Form State Architecture", desc: "Accessible ARIA attributes, semantic inputs, and dynamic error announcements built with WCAG contrast and screen-reader standards in mind." },
                    { icon: "fa-solid fa-magnifying-glass", title: "Sub-Millisecond Search & Filter DOM Pipeline", desc: "Fast event-driven DOM reconciliation filtering bookplate cards in memory without UI stutter or re-renders." },
                    { icon: "fa-solid fa-palette", title: "Reading Journal Editorial UI System", desc: "Custom vanilla CSS design tokens, soft paper textures, matte pastel badges, and editorial typography (Lora & Plus Jakarta Sans)." }
                ],
                pipeline: ["Book Entry & ARIA Validation", "JSON Serialization & LocalStorage", "Reactive Ledger Counter Update", "Live Search & Filter Tabs", "In-Place Status Updates / Deletion"],
                technologies: ["HTML5 Semantic", "Vanilla CSS3", "JavaScript (ES6+)", "Browser LocalStorage API", "Accessible Forms (ARIA)", "Google Fonts (Lora / Plus Jakarta Sans)", "GitHub Pages Hosting"],
                github: "https://github.com/nehamiriamjose/Book-Tracker"
            },
            {
                number: "07",
                category: "Rule-Based Expert System, Emergency Decision Trees & Full-Stack Web",
                accent: "blue",
                title: "DisasterShield — Disaster Management Guidance Chatbot",
                image: "./project/disaster-shield/disaster-shield-home.png",
                imageAlt: "DisasterShield Disaster Management Guidance Chatbot Dashboard",
                author: "Neha Miriam Jose",
                repoName: "nehamiriamjose/-Disaster-Management-Guidance-Chatbot-",
                liveUrl: "https://disaster-management-guidance-chatbo.vercel.app/",
                github: "https://github.com/nehamiriamjose/-Disaster-Management-Guidance-Chatbot-",
                stats: [
                    { num: "35", label: "Decision Paths", desc: "Earthquake (13), Flood (12), Landslide (10)" },
                    { num: "100%", label: "Deterministic", desc: "Zero hallucination, auditable safety logic" },
                    { num: "100%", label: "Offline-Ready", desc: "Zero dependency on cloud APIs or internet" },
                    { num: "4 Hotlines", label: "Verified Helplines", desc: "112 (ERSS), 1078 (NDRF), 101 (Fire), 108 (EMS)" },
                    { num: "20 / 20", label: "Tests Passed", desc: "Automated Pytest verification suite" }
                ],
                mediaItems: [
                    {
                        type: "video",
                        src: "./project/disaster-shield/disaster-shield-demo.mp4",
                        poster: "./project/disaster-shield/disaster-shield-home.png",
                        tabLabel: "Live Video Walkthrough",
                        icon: "fa-solid fa-circle-play",
                        title: "DisasterShield End-to-End Walkthrough",
                        caption: "Live production walkthrough: disaster scenario selection, interactive situational triage questions, actionable emergency safety directives, 72-hour Go-Bag checklist tracking, and official helpline directory."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-home.png",
                        tabLabel: "Scenario Selection",
                        icon: "fa-solid fa-house-chimney-crack",
                        title: "Official Disaster Safety Assessment & Scenario Discovery",
                        caption: "Landing dashboard featuring situation-specific disaster modules (Earthquake, Flood & Flash Flood, Landslide & Debris Flow) grounded in official Indian NDMA, GSI, CWC, and NDRF safety guidelines."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-chat.png",
                        tabLabel: "Interactive Chatbot",
                        icon: "fa-solid fa-comments",
                        title: "Rule-Based Interactive Emergency Chatbot",
                        caption: "Real-time guided assessment engine that adapts dynamically to the victim's location (indoor, in-vehicle, outdoor) and rising hazard severity without external AI latency."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-triage.png",
                        tabLabel: "Critical Hazard Triage",
                        icon: "fa-solid fa-triangle-exclamation",
                        title: "Multi-Tier Urgency Triage & Electrical Safety Logic",
                        caption: "Dynamically classifies risk levels (Normal, Precautionary, Urgent, Critical) and provides life-saving actions to strictly avoid, including submerged electrical hazards and fast water knock-down limits."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-guidance.png",
                        tabLabel: "Guidance & Helplines",
                        icon: "fa-solid fa-shield-heart",
                        title: "Synthesized Guidance Outcome & Emergency Hotlines",
                        caption: "Final structured guidance outcome with instant action protocols, dangerous actions to avoid, direct-tap emergency helpline buttons, and conversation transcript copy/download functionality."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-gobag.png",
                        tabLabel: "72h Go-Bag Checklist",
                        icon: "fa-solid fa-kit-medical",
                        title: "72-Hour Emergency Go-Bag Preparedness Tracker",
                        caption: "Comprehensive emergency kit checklist organized across vital documents, protective gear, first aid, and survival essentials with client-side localStorage persistence."
                    },
                    {
                        type: "image",
                        src: "./project/disaster-shield/disaster-shield-sources.png",
                        tabLabel: "Official Directory",
                        icon: "fa-solid fa-book-bookmark",
                        title: "Verified National Emergency Directory & Statutory Protocols",
                        caption: "Pan-India emergency helplines directory (112, 1078, 101, 108, CWC Flood Control, National Highways) directly cross-referenced against statutory government documentation."
                    }
                ],
                about: "DisasterShield is an emergency decision-support web application engineered to deliver rapid, structured, and deterministic life-safety guidance during natural disasters including earthquakes, floods, and landslides. Rather than relying on non-deterministic generative AI models—which pose critical risks of hallucinated phone numbers or speculative advice during a crisis—DisasterShield is built on a verified rule-based expert system with 35 deterministic decision paths strictly derived from official statutory protocols (NDMA, Geological Survey of India, Central Water Commission, and NDRF). The system operates seamlessly both online on Vercel and completely offline locally during communication infrastructure collapses.",
                features: [
                    "Deterministic Rule-Based Expert System: Implements 35 exhaustive decision paths across Earthquake (13 paths), Flood & Flash Flood (12 paths), and Landslide & Debris Flow (10 paths) without external LLM dependencies.",
                    "Multi-Tier Urgency Triage Engine: Dynamically evaluates the user's immediate environment (indoor, outdoor, stranded in vehicle, rising waters) and classifies situations across Normal, Precautionary, Urgent, and Critical severity levels.",
                    "Life-Safety Directives & Avoidance Warnings: Explicitly details high-priority survival actions ('Drop, Cover & Hold On', vertical evacuation, lateral escape sprints) alongside dangerous actions to avoid (e.g. entering submerged breaker rooms, walking in fast currents).",
                    "72-Hour Emergency Go-Bag Checklist: Interactive disaster preparedness tracker categorized into Vital Documents, Cash, Protective Clothing, Medical, and Survival Gear with real-time percentage progress saved to browser LocalStorage.",
                    "Interactive Decision Tree Flowchart: Visual representation of the decision hierarchy allowing reviewers and users to inspect the underlying branch logic and outcome nodes.",
                    "Session Conversation Transcript: Full session transcript generation enabling victims or emergency responders to review, copy, or download the diagnostic dialog as a timestamped .txt log.",
                    "Zero-Hallucination Verified Emergency Hotlines: Integrated directory with direct-dial triggers for 112 (National ERSS), 1078 (NDRF Search & Rescue), 101 (Fire & Rescue), and 108 (Ambulance Triage).",
                    "100% Offline Resilience: Pure Python/Flask backend and structured JSON knowledge base designed to run standalone on local machines during disaster-induced internet blackouts."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-sitemap", title: "Rule-Based Expert Engine", desc: "Deterministic decision-tree engine (chatbot_engine.py) traversing branch states based on user responses with guaranteed predictability." },
                    { icon: "fa-solid fa-database", title: "Decoupled JSON Knowledge Base", desc: "Modular JSON datasets (earthquake.json, flood.json, landslide.json, checklist.json, sources.json) separating emergency domain rules from server logic." },
                    { icon: "fa-solid fa-server", title: "Lightweight Python Flask Core", desc: "RESTful Python backend providing stateless decision routing, transcript rendering, and offline local hosting capabilities." },
                    { icon: "fa-solid fa-shield-halved", title: "Zero-Latency Client Persistence", desc: "Client-side Vanilla ES6+ architecture with LocalStorage state persistence for Go-Bag progress without network overhead." }
                ],
                pipeline: ["Disaster Scenario Selection", "Situation & Location Assessment", "Deterministic Tree Branching", "Severity Triage & Directives", "Transcript & Go-Bag Tracking"],
                technologies: ["Python 3.10+", "Flask Framework", "Rule-Based Expert Systems", "Decision Trees", "Vanilla JavaScript (ES6+)", "HTML5 & CSS3", "Browser LocalStorage", "Pytest Suite (20 Tests)", "Vercel Cloud Deployment"],
                github: "https://github.com/nehamiriamjose/-Disaster-Management-Guidance-Chatbot-"
            }
        ];

        const leadershipData = [
            {
                number: "01",
                category: "SAHYA TECH FEST • CYFUSION",
                accent: "sage",
                title: "Event Coordinator & Organizer — Cyfusion",
                org: "Amal Jyothi College of Engineering (Autonomous)",
                term: "2026",
                stats: [
                    { num: "150+", label: "Participants", desc: "Inter-college delegates & teams" },
                    { num: "2 Rounds", label: "Competition Format", desc: "Cybersecurity quiz & UI/UX hackathon" },
                    { num: "₹10K+", label: "Prize Pool", desc: "Awarded during stage valedictory" },
                    { num: "100%", label: "Execution Success", desc: "Smooth event flow & logistics" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./leadership/sahya-stage.png",
                        tabLabel: "Stage Ceremony",
                        icon: "fa-solid fa-award",
                        title: "Valedictory Presentation & Awards",
                        caption: "Stage Prize & Certificate Distribution Ceremony at SAHYA'26 alongside Faculty Coordinators & Department Dignitaries."
                    },
                    {
                        type: "image",
                        src: "./leadership/sahya-badge.png",
                        tabLabel: "Event Badges",
                        icon: "fa-solid fa-id-badge",
                        title: "Official SAHYA Cyfusion Badges",
                        caption: "Official SAHYA Event Badges for Neha Miriam Jose & the Cyfusion Event Organization Team."
                    }
                ],
                about: "Led the end-to-end planning, challenge curation, and live operations for Cyfusion, the marquee cybersecurity and UI/UX design competition at SAHYA, the national-level annual technical festival of Amal Jyothi College of Engineering. Directed a team of student volunteers to manage participant registrations, venue setups, real-time scoring, and stage coordination.",
                features: [
                    "Curated two competitive rounds: Round 1 (Speed Cybersecurity & Tech Trivia) and Round 2 (Figma UI/UX Design Sprint & Rapid Prototyping).",
                    "Coordinated with faculty convenors and external judges to evaluate over 30+ team submissions with standardized rubrics.",
                    "Managed live stage proceedings, prize distribution protocols, and official certificate awards during the grand valedictory ceremony.",
                    "Handled logistics, digital scoring leaderboards, participant grievance resolution, and sponsorship collateral distribution."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-bullhorn", title: "Event Operations & Logistics", desc: "Managed schedules, venue IT infrastructure, timing clocks, and resource allocation for 150+ participants." },
                    { icon: "fa-solid fa-shield-halved", title: "Challenge Problem Design", desc: "Designed engaging challenge problem statements spanning cybersecurity awareness and user experience design." },
                    { icon: "fa-solid fa-users", title: "Volunteer Leadership", desc: "Mentored and delegated tasks across a 12-member student volunteer committee." },
                    { icon: "fa-solid fa-trophy", title: "Stage Presentation", desc: "Anchored and presented valedictory awards alongside the Head of Department and college leadership." }
                ],
                pipeline: ["Event Conceptualization", "Challenge Design", "Participant Onboarding", "Live Hackathon Rounds", "Valedictory & Awards"],
                technologies: ["Event Management", "Cybersecurity Trivia", "Figma UI/UX", "Public Speaking", "Team Leadership", "Operations Management"]
            },
            {
                number: "02",
                category: "STUDENT GOVERNANCE & LEADERSHIP",
                accent: "blue",
                title: "Department Student Council Representative",
                org: "Students' Council • Amal Jyothi College of Engineering",
                term: "2024 – Present",
                stats: [
                    { num: "400+", label: "Students Represented", desc: "Across CSE undergraduate batches" },
                    { num: "15+", label: "Seminars & Events", desc: "Organized with academic faculty" },
                    { num: "9.29", label: "Academic CGPA", desc: "Balancing leadership with academic excellence" },
                    { num: "2024–27", label: "Tenure Duration", desc: "Active department council member" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./leadership/council-speech.png",
                        tabLabel: "Keynote Speech",
                        icon: "fa-solid fa-microphone",
                        title: "Auditorium Assembly Address",
                        caption: "Neha Miriam Jose addressing the student assembly and department gatherings at Amal Jyothi College of Engineering."
                    },
                    {
                        type: "image",
                        src: "./leadership/council-classroom.jpg",
                        tabLabel: "Classroom Address",
                        icon: "fa-solid fa-chalkboard-user",
                        title: "Classroom Assembly Address",
                        caption: "Presenting academic updates, upcoming event schedules, and grievance resolution channels directly in student classrooms."
                    },
                    {
                        type: "image",
                        src: "./leadership/council-session.jpeg",
                        tabLabel: "Council Session",
                        icon: "fa-solid fa-users",
                        title: "Interactive Department Session",
                        caption: "Facilitating interactive feedback sessions and council meetings with student cohorts."
                    }
                ],
                about: "Elected by peers to serve as the Department Representative for Computer Science & Engineering in the Students' Council at Amal Jyothi College of Engineering. Acts as a liaison between students, faculty, and administration to voice student needs, facilitate academic enhancement programs, organize department fests, and cultivate an inclusive campus environment.",
                features: [
                    "Spearheads communication channels between over 400+ CSE students and department faculty leadership.",
                    "Organizes technical guest lectures, coding competitions, career orientation workshops, and alumni interaction sessions.",
                    "Advocates for laboratory upgrades, library resources, and student welfare initiatives in central council meetings.",
                    "Leads stage announcements, public addresses, and orientation sessions for incoming freshman batches."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-comments", title: "Student Advocacy & Liaison", desc: "Translating student feedback and academic requirements into actionable administrative proposals." },
                    { icon: "fa-solid fa-calendar-check", title: "Academic Event Coordination", desc: "Organized faculty seminars, tech talks, and departmental farewells & welcome programs." },
                    { icon: "fa-solid fa-handshake", title: "Crisis & Grievance Resolution", desc: "Assisting students with academic queries, timetable harmonizations, and campus support." },
                    { icon: "fa-solid fa-microphone-lines", title: "Public Speaking & Governance", desc: "Delivered keynote addresses and led assembly proceedings with clarity and poise." }
                ],
                pipeline: ["Student Representation", "Faculty Liaison", "Event Programming", "Resource Planning", "Campus Governance"],
                technologies: ["Student Representation", "Public Speaking", "Department Leadership", "Campus Governance", "Conflict Resolution", "Communication"]
            },
            {
                number: "03",
                category: "DEV COMMUNITY & WORKSHOPS",
                accent: "lavender",
                title: "Core Community Member & Workshop Instructor",
                org: "Blankspace Developer Community • Amal Jyothi",
                term: "2024 – Present",
                stats: [
                    { num: "100+", label: "Students Trained", desc: "Hands-on coding bootcamps" },
                    { num: "4+", label: "Workshops Led", desc: "C, Java & Algorithmic problem solving" },
                    { num: "1st", label: "Award of Recognition", desc: "Honored for technical workshop leadership" },
                    { num: "2024–Now", label: "Active Contributor", desc: "Mentoring junior developer cohorts" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./leadership/blankspace-team.png",
                        tabLabel: "Community Team",
                        icon: "fa-solid fa-people-group",
                        title: "Blankspace Core Team",
                        caption: "Blankspace Core Community & Coding Club Team gathered at the Central Complex, Amal Jyothi College of Engineering."
                    },
                    {
                        type: "image",
                        src: "./leadership/blankspace-cert.jpeg",
                        tabLabel: "Award of Recognition",
                        icon: "fa-solid fa-certificate",
                        title: "Workshop Leadership Certificate",
                        caption: "Neha Miriam Jose receiving Certificate of Recognition for outstanding technical workshop delivery and peer mentorship."
                    }
                ],
                about: "Active core member and technical mentor at Blankspace, the premier student-led software development and competitive programming community at Amal Jyothi. Dedicated to democratizing technical skills through hands-on bootcamps, code review circles, and mentoring first- and second-year undergraduates in foundational computer science principles.",
                features: [
                    "Delivered interactive technical workshops on C programming fundamentals, memory management, pointers, and Java OOP.",
                    "Designed curated problem sets on platforms like HackerRank and LeetCode to build algorithmic thinking among peers.",
                    "Mentored junior students one-on-one through debugging sessions and project ideation sprints.",
                    "Awarded formal Certificate of Recognition for exemplary workshop instruction and community impact."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-chalkboard-user", title: "Hands-on Workshop Delivery", desc: "Conducted live coding demonstrations and interactive debugging sessions for large student batches." },
                    { icon: "fa-solid fa-code", title: "Curriculum & Problem Design", desc: "Authored easy-to-understand problem sheets and reference code walkthroughs in C and Java." },
                    { icon: "fa-solid fa-heart-pulse", title: "Peer-to-Peer Mentorship", desc: "Created an open, encouraging environment for beginners to overcome coding anxiety." },
                    { icon: "fa-solid fa-award", title: "Community Recognition", desc: "Recognized by faculty advisors and club leadership for impactful technical contributions." }
                ],
                pipeline: ["Curriculum Planning", "Live Coding Masterclasses", "Hands-on Lab Exercises", "Code Review Circles", "Peer Mentorship"],
                technologies: ["Peer Tutoring", "C Programming", "Java OOP", "Data Structures", "Hands-on Mentorship", "Community Building"]
            },
            {
                number: "04",
                category: "AZURE '26 CULTURAL FEST",
                accent: "pink",
                title: "Event Coordinator — Internal Theme Show",
                org: "AZURE '26 • Amal Jyothi College of Engineering",
                term: "2026",
                stats: [
                    { num: "2,000+", label: "Audience Reach", desc: "College-wide grand audience" },
                    { num: "40+", label: "Cast & Models", desc: "Thematic stage performers" },
                    { num: "100%", label: "AV Sync", desc: "Backstage lighting & sound cues" },
                    { num: "Flagship", label: "Event Status", desc: "High-voltage prime-time show" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        src: "./leadership/azure-performance.png",
                        tabLabel: "Theme Performance",
                        icon: "fa-solid fa-masks-theater",
                        title: "Theatrical Stage Performance",
                        caption: "Theatrical Theme Show Stage Performance & Cast Ensemble at AZURE '26."
                    },
                    {
                        type: "image",
                        src: "./leadership/azure-stage.png",
                        tabLabel: "Ramp Production",
                        icon: "fa-solid fa-lightbulb",
                        title: "Ramp Show & Lighting",
                        caption: "Dynamic Ramp Show & Lighting Production on the Main Stage at AZURE '26."
                    },
                    {
                        type: "image",
                        src: "./leadership/azure-badge.png",
                        tabLabel: "Coordinator Badge",
                        icon: "fa-solid fa-id-badge",
                        title: "Official Coordinator ID",
                        caption: "Official AZURE'26 Event Coordinator ID Badge — Internal Theme Show."
                    }
                ],
                about: "Spearheaded stage management, performance scheduling, thematic costume curation, and backstage audiovisual synchronization for the Internal Theme Show & Theatrical Ramp Presentation at AZURE '26, the annual cultural festival of Amal Jyothi College of Engineering. Coordinated across production, lighting, music, and performance teams to deliver a breathtaking main-stage spectacle.",
                features: [
                    "Coordinated the rehearsal timeline and live performance choreography for over 40+ stage performers and ramp models.",
                    "Synchronized dynamic theatrical lighting presets, audio soundscapes, and LED backdrop visuals in real-time.",
                    "Directed backstage security, green room schedules, costume transitions, and emergency contingency protocols.",
                    "Managed audience crowd flow and VIP seating arrangements for an audience exceeding 2,000 students and faculty."
                ],
                archHighlights: [
                    { icon: "fa-solid fa-clapperboard", title: "Stage Production & AV Cues", desc: "Maintained split-second synchronization across sound engineers, lighting technicians, and performers." },
                    { icon: "fa-solid fa-stopwatch", title: "Backstage Schedule Execution", desc: "Orchestrated seamless costume changes and entry/exit timings under tight show constraints." },
                    { icon: "fa-solid fa-users-viewfinder", title: "Cast & Ensemble Direction", desc: "Guided 40+ student performers through blocking, stage presence, and confidence building." },
                    { icon: "fa-solid fa-palette", title: "Creative Concept Execution", desc: "Brought creative storylines to life through cohesive music, lighting, and wardrobe aesthetics." }
                ],
                pipeline: ["Thematic Concept & Casting", "Choreography & Rehearsals", "AV & Lighting Sync", "Main Stage Production", "Post-Event Wrap"],
                technologies: ["Stage Production", "Logistics Scheduling", "Creative Direction", "AV Synchronization", "Crowd Management", "Team Leadership"]
            }
        ];

        function renderDetailModal(type, index) {
            const data = (type === 'leadership') ? leadershipData[index] : projectsData[index];
            if (!data || !modalContent) return;

            const badgeClass = `badge-${data.accent}`;
            const tagClass = `tag-${data.accent}`;
            const numLabel = (type === 'leadership') ? `INITIATIVE NO. ${data.number}` : `PROJECT NO. ${data.number}`;

            // Check if item has rich media showcase switcher (videos + screenshots)
            const hasMediaShowcase = Array.isArray(data.mediaItems) && data.mediaItems.length > 0;

            let mediaHtml = '';
            if (hasMediaShowcase) {
                const firstMedia = data.mediaItems[0];
                mediaHtml = `
                    <div class="modal-showcase-container">
                        <div class="modal-media-nav" id="modal-media-nav" role="tablist">
                            ${data.mediaItems.map((m, idx) => `
                                <button type="button" class="modal-media-tab-btn ${idx === 0 ? 'active' : ''}" data-media-idx="${idx}" role="tab">
                                    <i class="${m.icon || 'fa-regular fa-image'}"></i>
                                    <span>${m.tabLabel}</span>
                                </button>
                            `).join('')}
                        </div>

                        <div class="modal-media-viewport" id="modal-media-viewport">
                            ${firstMedia.type === 'video' ? `
                                <video controls class="modal-media-video" poster="${firstMedia.poster || ''}" preload="metadata">
                                    <source src="${firstMedia.src}" type="video/mp4">
                                    Your browser does not support HTML5 video.
                                </video>
                            ` : `
                                <img src="${firstMedia.src}" alt="${firstMedia.title || data.title}" class="modal-media-img" loading="lazy">
                            `}
                        </div>

                        <div class="modal-media-caption-bar" id="modal-media-caption">
                            <i class="fa-solid fa-circle-info"></i>
                            <span>${firstMedia.caption || firstMedia.title || ''}</span>
                        </div>
                    </div>
                `;
            } else if (data.image) {
                mediaHtml = `
                    <div class="modal-media-frame">
                        <img src="${data.image}" alt="${data.imageAlt || data.title}" class="modal-screenshot" loading="lazy">
                    </div>
                `;
            }

            // Stat Metrics Grid
            let statsHtml = '';
            if (Array.isArray(data.stats) && data.stats.length > 0) {
                statsHtml = `
                    <div class="modal-stats-grid">
                        ${data.stats.map(s => `
                            <div class="modal-stat-card stat-${data.accent}">
                                <span class="stat-num">${s.num}</span>
                                <span class="stat-lbl">${s.label}</span>
                                <span class="stat-desc">${s.desc}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // Vulnerability Labs Grid (if applicable)
            let labsHtml = '';
            if (Array.isArray(data.labs) && data.labs.length > 0) {
                labsHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title"><i class="fa-solid fa-bug"></i> 10 Hands-On Vulnerability Simulation Labs</h4>
                        <div class="modal-labs-grid">
                            ${data.labs.map((l, i) => `
                                <div class="modal-lab-item">
                                    <div class="modal-lab-head">
                                        <span class="modal-lab-title">${i + 1}. ${l.name}</span>
                                        <span class="modal-lab-cwe">${l.cwe}</span>
                                    </div>
                                    <p class="modal-lab-desc">${l.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Highlights Grid (Pillars)
            let archHtml = '';
            if (Array.isArray(data.archHighlights) && data.archHighlights.length > 0) {
                const sectionTitle = (type === 'leadership') ? 'Leadership Pillars & Strategic Impact' : 'Architectural Pillars & Infrastructure';
                const sectionIcon = (type === 'leadership') ? 'fa-solid fa-compass' : 'fa-solid fa-layer-group';
                archHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title"><i class="${sectionIcon}"></i> ${sectionTitle}</h4>
                        <div class="modal-arch-grid">
                            ${data.archHighlights.map(a => `
                                <div class="modal-arch-card">
                                    <h5><i class="${a.icon}"></i> ${a.title}</h5>
                                    <p>${a.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Pipeline Steps
            let pipelineHtml = '';
            if (Array.isArray(data.pipeline) && data.pipeline.length > 0) {
                const pipelineTitle = (type === 'leadership') ? 'Initiative Execution & Delivery Lifecycle' : 'Technical Pipeline & Execution Flow';
                pipelineHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title"><i class="fa-solid fa-diagram-project"></i> ${pipelineTitle}</h4>
                        <div class="modal-pipeline-box">
                            <div class="modal-pipeline-steps">
                                ${data.pipeline.map((step, idx) => `
                                    <span class="modal-pipeline-step">${step}</span>
                                    ${idx < data.pipeline.length - 1 ? '<i class="fa-solid fa-arrow-right modal-pipeline-arrow"></i>' : ''}
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }

            // Action Row
            let actionRowHtml = '';
            if (type === 'project' && data.github) {
                actionRowHtml = `
                    <div class="modal-action-row">
                        ${data.liveUrl ? `
                            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-proj-action btn-proj-live">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                <span>Open Live Application</span>
                            </a>
                        ` : ''}
                        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-proj-action btn-proj-primary">
                            <i class="fa-brands fa-github"></i>
                            <span>View Repository on GitHub</span>
                        </a>
                        ${data.reportUrl ? `
                            <a href="${data.reportUrl}" target="_blank" rel="noopener noreferrer" class="btn-proj-action btn-proj-secondary" download>
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Download Project Documentation (PDF)</span>
                            </a>
                        ` : ''}
                    </div>
                `;
            } else if (type === 'leadership') {
                actionRowHtml = `
                    <div class="modal-action-row">
                        <span class="btn-proj-action btn-proj-primary" style="pointer-events: none;">
                            <i class="fa-solid fa-building-columns"></i>
                            <span>Amal Jyothi College of Engineering • Campus Leadership</span>
                        </span>
                    </div>
                `;
            }

            const featuresHeading = (type === 'leadership') ? 'Key Responsibilities & Highlights' : 'Key Capabilities & Core Features';
            const techHeading = (type === 'leadership') ? 'Core Competencies & Skills' : 'Technologies & Libraries';

            modalContent.innerHTML = `
                <div class="modal-header-block">
                    <div class="modal-badge-row">
                        <span class="proj-num-pill ${badgeClass}">${numLabel}</span>
                        <span class="proj-category-tag ${badgeClass}">${data.category}</span>
                    </div>
                    <h3 class="modal-title" id="modal-project-title">${data.title}</h3>
                </div>

                ${statsHtml}

                ${mediaHtml}

                <div class="modal-section">
                    <h4 class="modal-section-title"><i class="fa-solid fa-circle-info"></i> ${type === 'leadership' ? 'Initiative Overview & Vision' : 'Executive Summary & Vision'}</h4>
                    <p class="modal-about-text">${data.about}</p>
                </div>

                <div class="modal-section">
                    <h4 class="modal-section-title"><i class="fa-solid fa-star"></i> ${featuresHeading}</h4>
                    <ul class="modal-features-list">
                        ${data.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>

                ${labsHtml}

                ${archHtml}

                ${pipelineHtml}

                <div class="modal-section">
                    <h4 class="modal-section-title"><i class="fa-solid fa-code"></i> ${techHeading}</h4>
                    <div class="modal-tags-cloud">
                        ${data.technologies.map(t => `<span class="tech-tag ${tagClass}">${t}</span>`).join('')}
                    </div>
                </div>

                ${actionRowHtml}
            `;

            // Setup Media Switcher Event Listeners
            if (hasMediaShowcase) {
                const tabBtns = modalContent.querySelectorAll('.modal-media-tab-btn');
                const viewport = modalContent.querySelector('#modal-media-viewport');
                const captionEl = modalContent.querySelector('#modal-media-caption span');

                tabBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const mediaIdx = parseInt(btn.getAttribute('data-media-idx'), 10);
                        const media = data.mediaItems[mediaIdx];
                        if (!media || !viewport) return;

                        // Pause any currently playing video
                        const activeVideo = viewport.querySelector('video');
                        if (activeVideo) {
                            activeVideo.pause();
                        }

                        // Update tabs
                        tabBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Switch viewport content
                        if (media.type === 'video') {
                            viewport.innerHTML = `
                                <video controls autoplay class="modal-media-video" poster="${media.poster || ''}">
                                    <source src="${media.src}" type="video/mp4">
                                    Your browser does not support HTML5 video.
                                </video>
                            `;
                        } else {
                            viewport.innerHTML = `
                                <img src="${media.src}" alt="${media.title || data.title}" class="modal-media-img" loading="lazy">
                            `;
                        }

                        // Update caption
                        if (captionEl) {
                            captionEl.textContent = media.caption || media.title || '';
                        }
                    });
                });
            }
        }

        function pauseModalVideos() {
            if (!modalContent) return;
            const videos = modalContent.querySelectorAll('video');
            videos.forEach(v => {
                v.pause();
            });
        }

        function openModal(type, index) {
            renderDetailModal(type, index);
            if (projectModal) {
                projectModal.classList.add('is-open');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            pauseModalVideos();
            if (projectModal) {
                projectModal.classList.remove('is-open');
                projectModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }

        // Event listener for opening project details modal
        document.addEventListener('click', (e) => {
            const modalBtn = e.target.closest('.btn-open-modal');
            if (modalBtn) {
                e.preventDefault();
                e.stopPropagation();
                const modalType = modalBtn.getAttribute('data-modal-type') || 'project';
                const projIdx = parseInt(modalBtn.getAttribute('data-project'), 10);
                const leadIdx = parseInt(modalBtn.getAttribute('data-leadership'), 10);
                const targetIdx = (modalType === 'leadership') ? leadIdx : projIdx;

                if (!isNaN(targetIdx)) {
                    openModal(modalType, targetIdx);
                }
            }
        });

        // Close modal button
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
            });
        }

        // Close on clicking backdrop
        if (projectModal) {
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    closeModal();
                }
            });
        }

        // Close on Escape key press
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-open')) {
                closeModal();
            }
        });

    // --- 6. Profile Card 3D Content Flip ---
    const cardPanesStage = document.getElementById('card-panes-stage');
    const cardTabButtons = document.querySelectorAll('.card-tab-btn');
    const cardTabPanes = document.querySelectorAll('.tab-content-pane');
    const tabOrder = ['profile', 'focus', 'toolkit'];
    let currentTabIndex = 0;
    let isFlipping = false;

    if (cardPanesStage && cardTabButtons.length > 0 && cardTabPanes.length > 0) {
        cardTabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                const targetIndex = tabOrder.indexOf(targetTab);

                if (targetIndex === currentTabIndex || isFlipping) return;

                const isMovingForward = targetIndex > currentTabIndex;

                cardTabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (isReducedMotion) {
                    cardTabPanes.forEach(pane => {
                        pane.classList.toggle('active', pane.id === `pane-${targetTab}`);
                    });
                    currentTabIndex = targetIndex;
                    return;
                }

                isFlipping = true;
                const outClass = isMovingForward ? 'flip-out-right' : 'flip-out-left';
                const inClass = isMovingForward ? 'flip-in-right' : 'flip-in-left';

                cardPanesStage.className = 'card-panes-stage ' + outClass;

                setTimeout(() => {
                    cardTabPanes.forEach(pane => {
                        pane.classList.toggle('active', pane.id === `pane-${targetTab}`);
                    });

                    currentTabIndex = targetIndex;
                    cardPanesStage.className = 'card-panes-stage ' + inClass;
                    void cardPanesStage.offsetWidth;
                    cardPanesStage.className = 'card-panes-stage flip-settle';

                    setTimeout(() => {
                        cardPanesStage.className = 'card-panes-stage';
                        isFlipping = false;
                    }, 240);
                }, 170);
            });
        });
    }

    // --- 7. Skills Toolkit Context Hover ---
    const toolkitItems = document.querySelectorAll('.tc-item');
    const contextMsg = document.getElementById('toolkit-context-msg');

    if (toolkitItems.length > 0 && contextMsg) {
        toolkitItems.forEach(item => {
            const appInfo = item.getAttribute('data-app');
            const skillName = item.querySelector('.tc-name')?.textContent || '';

            const showContext = () => {
                toolkitItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                contextMsg.innerHTML = `<strong>${skillName}:</strong> ${appInfo}`;
            };

            item.addEventListener('mouseenter', showContext);
            item.addEventListener('click', showContext);
        });
    }

    // --- 8. Mobile Navigation Toggle & Backdrop ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');

    function closeMobileNav() {
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (navBackdrop) {
                navBackdrop.classList.remove('open');
            }
            if (navToggleBtn) {
                navToggleBtn.setAttribute('aria-expanded', 'false');
                navToggleBtn.classList.remove('is-active');
            }
            document.body.style.overflow = '';
        }
    }

    function openMobileNav() {
        if (navLinks) {
            navLinks.classList.add('open');
            if (navBackdrop) {
                navBackdrop.classList.add('open');
            }
            if (navToggleBtn) {
                navToggleBtn.setAttribute('aria-expanded', 'true');
                navToggleBtn.classList.add('is-active');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    if (navToggleBtn && navLinks) {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Close when clicking backdrop
        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => {
                closeMobileNav();
            });
        }

        // Close when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileNav();
            }
        });

        // Close on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                closeMobileNav();
            }
        });
    }

    // --- 9. Smooth Scroll & Active Nav Tracking ---
    const internalNavLinks = document.querySelectorAll('a[href^="#"]');
    internalNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const isMobile = window.innerWidth <= 768;
                const navOffset = isMobile ? 68 : 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-item[href^="#"]');

    function highlightActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav, { passive: true });
    highlightActiveNav();

    // --- 9b. Mobile Floating Back to Top Button ---
    const mobileFloatTopBtn = document.getElementById('mobile-float-top-btn');
    if (mobileFloatTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 380) {
                mobileFloatTopBtn.classList.add('is-visible');
            } else {
                mobileFloatTopBtn.classList.remove('is-visible');
            }
        }, { passive: true });

        mobileFloatTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 10. Contact Form Simulation ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>';
            }

            setTimeout(() => {
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }

                if (formFeedback) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = '<i class="fa-solid fa-check"></i> Thank you! Your message has been received.';

                    setTimeout(() => {
                        formFeedback.textContent = '';
                        formFeedback.className = 'form-feedback';
                    }, 5000);
                }
            }, 600);
        });
    }

    // --- 11. Projects & Leadership Filtering & Universal Lightbox ---
    function setupCardFiltering(pillsSelector, cardsSelector) {
        const pills = document.querySelectorAll(pillsSelector);
        const cards = document.querySelectorAll(cardsSelector);

        if (pills.length === 0 || cards.length === 0) return;

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const filter = pill.getAttribute('data-filter');

                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                cards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    const match = filter === 'all' || cardCat === filter || (cardCat && cardCat.split(/\s+/).includes(filter));
                    if (match) {
                        card.classList.remove('is-filtered-out');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s var(--ease-editorial)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    } else {
                        card.classList.add('is-filtered-out');
                    }
                });
            });
        });
    }

    // Initialize filter tabs for both sections
    setupCardFiltering('.project-filter-pills .filter-pill', '#projects .project-card');
    setupCardFiltering('#leadership .leadership-filter-pills .filter-pill', '#leadership .leadership-card');

    // Universal Media Lightbox (Images & Videos)
    const lightbox = document.getElementById('leadership-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    function openLightbox(src, tag, caption, type, poster) {
        if (!lightbox) return;
        const isVideo = type === 'video' || (src && (src.endsWith('.mp4') || src.endsWith('.webm')));

        if (isVideo) {
            if (lightboxImg) {
                lightboxImg.style.display = 'none';
                lightboxImg.src = '';
            }
            if (lightboxVideo) {
                lightboxVideo.style.display = 'block';
                lightboxVideo.poster = poster || '';
                lightboxVideo.src = src;
                lightboxVideo.load();
                lightboxVideo.play().catch(() => {});
            }
        } else {
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
                lightboxVideo.style.display = 'none';
            }
            if (lightboxImg) {
                lightboxImg.style.display = 'block';
                lightboxImg.src = src;
                lightboxImg.alt = caption || 'Preview Image';
            }
        }

        if (lightboxTag) lightboxTag.textContent = tag || 'Media Preview';
        if (lightboxCaption) lightboxCaption.textContent = caption || '';

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
        }
        if (lightboxImg) {
            lightboxImg.style.display = 'block';
            lightboxImg.src = '';
        }
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    const allGalleryItems = document.querySelectorAll('.lc-gallery-item');
    allGalleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const fullSrc = item.getAttribute('data-full') || item.querySelector('img')?.src;
            const tag = item.getAttribute('data-tag') || 'Initiative Preview';
            const caption = item.getAttribute('data-caption') || '';
            const type = item.getAttribute('data-type') || (fullSrc && fullSrc.endsWith('.mp4') ? 'video' : 'image');
            const poster = item.getAttribute('data-poster') || item.querySelector('img')?.src || '';

            if (fullSrc) {
                openLightbox(fullSrc, tag, caption, type, poster);
            }
        });
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeLightbox();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
    // All card detail actions handled via universal modal dialog (.btn-open-modal)
});


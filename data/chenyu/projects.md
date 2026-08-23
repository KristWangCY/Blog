# Projects

## TI 2026 Dota 2 Analytics and Prediction Research

Chenyu built a research-only Dota 2 analytics and prediction system for The International 2026, covering professional matches from 7 April to 14 August 2026 and a frozen post-event Grand Final evaluation.

The project combined:
- OpenDota match and full pick/ban collection
- official schedule and result verification
- match-ID, roster, duplicate, conflict, anomaly, and hash audits
- strict chronological validation and feature-time controls
- Elo, pre-match v3, and post-draft model comparison
- hero-priority and exact BP action evaluation
- four DeepSeek analyst roles coordinated and audited by Codex

The controlled dataset contained 1,054 maps, including 147 TI maps. The final model review found that v3 did not outperform Elo, the post-draft model added no validated incremental value, and calibration did not pass. The system therefore remains research-only and does not publish match probabilities, championship probabilities, team rankings, or betting advice.

The Grand Final ended Team Spirit 3-2 Team Vision. The BP postmortem found useful focus-pool overlap but weak exact first-phase ban and first-pick prediction. The public release preserves this negative result instead of presenting the model as successful.

Public project:
- GitHub: https://github.com/KristWangCY/TI2026-Dota2-Analytics
- Technical postmortem: /blog/ti-2026-dota2-analytics-postmortem
- Chinese postmortem: /blog/ti-2026-dota2-analytics-postmortem-cn

Technologies and methods:
- Node.js 22
- OpenDota API
- chronological validation
- Elo and probabilistic model evaluation
- data quality and leakage testing
- AI-agent governance

---
## Personal AI Blog and RAG Agent — Chenyu Notes

Chenyu built a personal AI-native blog platform called "Chenyu Notes" using Next.js, TypeScript, and Tailwind CSS.

The platform combines:
- blogging
- AI-generated content
- weather intelligence
- financial market monitoring
- personal AI assistant systems

One of the core features is "Ask Chenyu", a RAG-based AI agent designed to answer visitor questions about Chenyu’s background, projects, research, and experience.

The system architecture includes:
- Next.js frontend
- API routes
- DeepSeek API integration
- markdown-based knowledge base
- retrieval augmented generation (RAG)
- AI chat interface

Technologies used:
- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI-compatible APIs
- DeepSeek API

Key focus areas:
- AI-native user experience
- personal AI identity systems
- knowledge retrieval
- AI portfolio systems

---

## Ethereum Price Prediction and Quantitative Research System

Chenyu developed a machine learning pipeline for cryptocurrency market prediction focused on Ethereum (ETH).

The project combined:
- market price data
- technical indicators
- on-chain blockchain analytics
- sentiment analysis
- machine learning models

The dataset included:
- Binance market data
- Dune Analytics on-chain metrics
- sentiment indicators
- engineered technical factors

Machine learning models used:
- Linear Regression
- Random Forest
- XGBoost
- ensemble stacking models

Evaluation metrics included:
- RMSE
- MAE
- R² score
- strategy backtesting
- drawdown analysis

The project explored:
- crypto quantitative trading
- DeFi market prediction
- factor investing
- machine learning for finance

Technologies used:
- Python
- pandas
- scikit-learn
- XGBoost
- matplotlib

---

## Crypto Sentiment Analysis Pipeline

Chenyu developed a sentiment analysis pipeline for cryptocurrency markets using Reddit comment data and large language model APIs.

The system processed:
- Reddit comments
- social media discussions
- crypto market sentiment
- market narratives

The pipeline included:
- text cleaning
- sentiment scoring
- feature engineering
- factor aggregation
- quantitative validation

The project explored:
- NLP for finance
- LLM-enhanced analytics
- crypto sentiment factors
- AI-driven market analysis

Technologies used:
- Python
- pandas
- NLP pipelines
- DeepSeek API
- machine learning models

---

## AI-Powered CRM Intelligence System at BMW China Leasing

Chenyu worked on an AI-powered CRM intelligence platform during his time at BMW China Leasing.

The system focused on:
- customer analytics
- AI-powered issue resolution
- financial information extraction
- CRM workflow automation
- operational analytics

Responsibilities included:
- SQL and Python data workflows
- analytics dashboard development
- AI workflow integration
- stakeholder communication
- business analytics

The project involved collaboration between:
- BMW China Leasing
- AI product development teams
- business stakeholders
- technical teams

Technologies used:
- SQL
- Python
- ETL workflows
- CRM systems
- analytics dashboards

---

## BMW AFC Real-Time Interaction Tracker

Chenyu developed a monitoring and analytics solution for AI agent performance at BMW.

The project focused on:
- AI interaction tracking
- operational monitoring
- real-time analytics
- workflow visualization
- AI performance evaluation

The system was designed to:
- monitor customer interactions
- track AI workflow quality
- improve operational efficiency
- support business reporting

Technologies used:
- Python
- SQL
- dashboard systems
- analytics pipelines

---

## Vehicle-to-Grid (V2G) Pilot Project at Mercedes-Benz Group China

Chenyu contributed to a Vehicle-to-Grid (V2G) pilot project involving smart charging infrastructure and energy market integration.

The project focused on:
- EV charging systems
- smart energy infrastructure
- digital mobility
- energy market integration
- product requirement analysis

Responsibilities included:
- requirement analysis
- supplier communication
- project coordination
- business process support
- digital solution analysis

The project explored:
- sustainable mobility
- energy systems
- smart charging networks
- automotive innovation

Technologies and concepts involved:
- V2G systems
- EV charging
- energy analytics
- Agile workflows

---

## Panda Waste Management AI Strategy Project

Chenyu participated in a large-scale AI and data strategy project based on Panda Waste Management.

The project focused on:
- circular economy optimization
- fleet operation analytics
- customer experience improvement
- AI-driven waste management
- enterprise data strategy

The solution proposed:
- AI-powered customer service systems
- predictive analytics
- business intelligence systems
- large language model integration
- operational optimization

The project involved:
- data acquisition design
- analytics architecture
- AI implementation strategy
- enterprise data workflows

Technologies and concepts:
- business analytics
- AI strategy
- big data systems
- machine learning
- optimization frameworks

---

## CourtVision — NBA Analytics Project

CourtVision was a sports analytics project focused on NBA player prediction and salary analysis.

The project involved:
- NBA All-Star prediction
- salary trend analysis
- machine learning classification
- sports analytics
- data visualization

The system analyzed:
- player statistics
- performance metrics
- salary information
- historical NBA data

Technologies used:
- R
- machine learning models
- Tableau
- statistical analytics

---

## SmartBank Customer Analytics Project

SmartBank was a customer segmentation and marketing optimization project based on banking customer data.

The project focused on:
- customer segmentation
- predictive analytics
- marketing optimization
- customer targeting
- business intelligence

Technologies used:
- R
- Tableau
- statistical analytics
- clustering techniques

---

## PersonalizeYourFitbitJourney

This project analyzed Fitbit user data to improve user engagement and personalization.

The project involved:
- health data analytics
- user segmentation
- engagement analysis
- dashboard visualization
- behavioral analytics

Technologies used:
- Tableau
- data analytics
- visualization systems

---

## AI Market Briefing System

Chenyu built an AI-powered market briefing feature integrated into his blog platform.

The system collects:
- financial news
- crypto market updates
- macroeconomic signals
- weather data
- AI-generated insights

The system combines:
- API integrations
- AI summarization
- market monitoring
- automated content generation

Technologies used:
- Next.js
- DeepSeek API
- AI summarization
- market data APIs
- frontend dashboard systems
```

## Dissertation Research — LLMs and Blockchain Analytics for DeFi Markets

Chenyu's dissertation research is titled:

"Leveraging Large Language Models and Blockchain Analytics for Quantitative Insights in Decentralized Finance (DeFi) Markets"

The research combines:
- large language models (LLMs)
- blockchain analytics
- quantitative finance
- machine learning
- DeFi market prediction

The project explores:
- crypto market forecasting
- on-chain behavioral analysis
- sentiment-driven trading factors
- machine learning based prediction systems
- AI-enhanced financial analytics

The research pipeline includes:
- market data collection
- blockchain feature engineering
- sentiment analysis
- predictive modeling
- strategy backtesting

Technologies and models involved:
- Python
- XGBoost
- Random Forest
- Linear Regression
- ensemble learning
- blockchain APIs
- Dune Analytics
- DeepSeek API

---

## DeepSeek-Powered Financial NLP System

Chenyu developed experimental NLP systems using DeepSeek APIs for financial and cryptocurrency analysis.

The project explored:
- LLM-enhanced sentiment analysis
- financial text processing
- crypto narrative extraction
- AI-generated market summaries
- NLP pipelines for trading research

The system processed:
- Reddit discussions
- financial news
- crypto community sentiment
- social media narratives

Core research areas:
- financial NLP
- AI-assisted trading research
- LLM applications in quantitative finance
- automated signal generation

---

## Ethereum On-Chain Analytics System

Chenyu developed blockchain analytics pipelines focused on Ethereum network activity.

The project involved:
- on-chain data collection
- gas fee analytics
- wallet activity analysis
- transaction behavior monitoring
- blockchain factor engineering

The system used:
- Dune Analytics
- Ethereum APIs
- on-chain metrics
- quantitative indicators

Key analytics areas:
- gas fee behavior
- network activity
- DeFi participation
- blockchain sentiment indicators

---

## Quantitative Alpha Factor Research

Chenyu conducted research into quantitative alpha factor generation and evaluation.

The work explored:
- factor investing
- alpha mining
- market microstructure signals
- volume-price relationships
- signal optimization

Example research topics:
- volume deviation factors
- momentum signals
- volatility factors
- ranking-based alpha expressions
- subindustry neutralization

The research included:
- factor testing
- performance evaluation
- backtesting
- portfolio construction
- strategy optimization

Technologies and methods:
- quantitative modeling
- Python
- statistical analysis
- machine learning
- factor engineering

---

## AI Agent Product Development Project

Before joining BMW China Leasing, Chenyu worked at an AI product development company focused on enterprise AI systems.

The project involved:
- LLM-based AI agents
- CRM integration
- customer support automation
- AI workflow systems
- enterprise AI products

Responsibilities included:
- Agile product delivery
- stakeholder communication
- workflow design
- AI feature coordination
- business requirement analysis

The AI system focused on:
- customer issue resolution
- financial information extraction
- automated CRM support
- enterprise operational efficiency

---

## Weather Intelligence and AI Advisory System

Chenyu developed an AI-enhanced weather intelligence module integrated into his personal platform.

The system combines:
- weather APIs
- geolocation systems
- AI-generated recommendations
- real-time monitoring

The feature provides:
- weather condition tracking
- AI-generated weather advice
- user interaction systems
- dynamic frontend visualization

Technologies used:
- Next.js
- weather APIs
- DeepSeek API
- TypeScript
- Tailwind CSS

---

## AI-Enhanced Personal Knowledge System

Chenyu is building an experimental personal AI ecosystem combining:
- personal knowledge bases
- RAG systems
- AI-native interfaces
- portfolio intelligence
- AI-assisted retrieval

The project explores:
- AI identity systems
- AI-native resumes
- intelligent knowledge retrieval
- personal AI agents
- interactive portfolio systems

Core technologies:
- retrieval augmented generation (RAG)
- vector search
- LLM APIs
- markdown knowledge systems
- AI chat interfaces

---

## Financial Market Monitoring Dashboard

Chenyu developed monitoring systems for:
- cryptocurrency markets
- quantitative trading signals
- macroeconomic trends
- AI-generated market insights

The dashboard combines:
- live market data
- AI summarization
- signal tracking
- analytics visualization
- automated insight generation

The project focuses on:
- trader workflows
- market intelligence
- quantitative research support
- AI-enhanced analytics

---

## Business Decision Optimization Research

Chenyu studied and implemented optimization models related to business decision systems and operational research.

Research areas included:
- optimization algorithms
- operational efficiency
- scheduling systems
- resource allocation
- mathematical modeling

One implementation involved:
- operating room scheduling optimization
- ICU occupancy balancing
- Solver-based optimization models
- healthcare analytics

Technologies used:
- Excel Solver
- optimization frameworks
- mathematical modeling
- operations research techniques

---

## AI Strategy and Responsible AI Research

Chenyu has participated in research and workshops involving:
- responsible AI
- AI governance
- AI ethics
- business AI strategy
- AI regulation

Topics explored include:
- trustworthiness in AI
- bias mitigation
- AI standardization
- enterprise AI governance
- responsible deployment of AI systems

This research was influenced by:
- academic workshops
- enterprise AI case studies
- industry analytics discussions
- AI governance frameworks
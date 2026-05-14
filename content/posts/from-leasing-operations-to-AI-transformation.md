---
title: "From Leasing Operations to AI Transformation"
subtitle: "Enterprise AI Solution for Automotive Finance Workflow Automation."
category: "AI Projects"
description: "A real-world experience building AI-driven customer servicing workflows within automotive finance and leasing operations."
date: "2026-05-05"
pinned: false
---

## Background:

When I was studying at University College Cork as a visiting student, I took courses in Physics, Chemistry, and Computer Science, which made perfect sense because my bachelor’s major was Materials Science and Engineering, with a minor in Computer Science.

One course I remember particularly clearly was Advanced Condensed Matter Physics, taught by Séamus Davis, a brilliant professor in the field.

I was deeply attracted to his theoretical teaching style. However, the course was designed for postgraduate students, while I was only in my third year at my home university. As a result, there was a significant amount of mathematics and theoretical knowledge that I needed to learn in advance.

The process was extremely challenging. My background was in engineering rather than theoretical physics or mathematics, so I had to put in a great deal of effort. During that period, I also read many books related to quantum physics.

At one point, I was trying to find a relevant book in the library, so I searched for “quantum.” I was intending to find "quantum physics", but I ended up getting the "quantum finance". That was the first time I accidentally came across the concept of quantum finance.

At the time, I still had a very traditional engineering mindset. I believed engineering was the best discipline because it was practical and directly applicable to the real world. As a result, I did not initially understand much of what the book was discussing.

However, perhaps because I naturally enjoyed mathematics, I noticed what seemed to be an error in one of the formulas. I became curious and started trying to figure out what had happened. After spending a great deal of time exploring concepts that initially felt meaningless to me, I gradually realised that I was actually more suited to statistics than traditional engineering. Even within physics, I found myself more interested in Statistical Thermodynamics.

It felt like discovering an entirely new world.

At that moment, I realised—quite spontaneously and without any particular prerequisite—that this was the direction I truly wanted to pursue.

That realization eventually led me to apply for a Business Analyst Internship at BMW Group Leasing, where I was accepted.

---

## Project Overview:

At BMW Group Leasing, I participated in my first professional AI project. Looking back, it was still highly innovative for June 2023, only a few months after the public release of OpenAI ChatGPT.

The project focused on developing an LLM-based AI Agent for customer service operations in automotive finance and leasing.

Our team built the AI Agent using a large corpus of historical conversations between the customer service department and leasing customers. The goal was to automate the identification of customer intents and improve response efficiency in financial service scenarios.

### Target:

At that time, our objective was to enable the AI Agent to interact with customers by identifying key intents from natural language conversations.

For example, if a customer said:

<div align="center">

**“I want to pay off my loan early.”**

</div>

the AI Agent would extract the intent “early repayment” and match it to predefined business workflows and response templates stored in our Oracle database system.

We designed a large number of intent triggers covering common automotive finance service requests, including:

**Loan Servicing:**

<div align="center">
repayment, overdue, settlement, billing.
</div>

**Repayment Processing:**

<div align="center">
repayment processing, repayment status, inquiry payment, collection automatic, 

deduction payment, reconciliation, installment management.
</div>

**Early Settlement:**

<div align="center">
early repayment, early settlement, prepayment request.
</div>

**Delinquency Handling:**

<div align="center">
delinquency management, overdue account servicing,debt collection workflows, payment recovery process.
</div>

**Loan Origination:**

<div align="center">
loan origination, customer onboarding, credit application workflow, financing approval process.
</div>

**Contract Management:**

<div align="center">

leasing contract lifecycle, contract servicing, financing agreements, contract amendments.

</div>

The system combined NLP-based intent recognition with structured financial workflow logic, allowing the AI Agent to route customers toward the correct business process automatically.

The result is also favourable, the rate of transferring to human agent eventually gets higher than 50%. It has been a very successful product at that time.

---

## Product Lifecyle:

**1. Business Problem Identification**

Before the project was launched, BMW Group Leasing’s customer service department faced increasing operational pressure caused by large volumes of repetitive customer inquiries. 

Many customer requests were highly standardized, such as repayment inquiries, early settlement requests, overdue notifications, and contract servicing questions.

Traditional customer service workflows relied heavily on human agents manually identifying customer intent and routing requests to corresponding financial workflows.

**2. Requirement Analysis and Data Preparation**

The requirement analysis phase was one of the most critical parts of the entire AI Agent project. Since the system was designed for automotive finance customer service operations, the project required close collaboration between business teams, customer service departments, compliance teams, and technical developers.

At the beginning of the project, a large amount of effort was dedicated to creating and refining **Requirement Documents (RDs)**, which served as the foundation for both technical development and business workflow alignment.

The Requirement Documents were designed to clearly define:

<div align="center">

1.Business objectives

2.Customer service scenarios

3.Intent classification logic

4.Financial workflow mappings

5.System integration requirements

6.Escalation rules to human agents

7.Compliance and operational constraints

</div>

One major challenge during the requirement analysis phase was that customer conversations in real-world financial service environments were highly unstructured. Customers rarely used standardized financial terminology when describing their issues.

For example, different customers could express the same intent in many different ways:

<div align="center">

“I want to pay off my car loan early.”

“How much do I still owe?”

“Can I settle everything this month?”

“I want to clear the remaining balance.”

</div>

Although these expressions were different, they all needed to be mapped to similar repayment or early settlement workflows.

As a result, the Requirement Documents included extensive intent mapping tables, where business analysts and customer service experts categorized large volumes of historical customer conversations into standardized intent groups.

The Requirement Documents became a critical communication bridge between technical engineers and financial business teams. Since many developers did not fully understand automotive finance operations, the documentation helped translate complex business processes into structured technical logic that could be implemented within the AI Agent system.

Throughout the project lifecycle, the Requirement Documents were continuously updated as new customer scenarios, operational exceptions, and workflow optimizations were identified during testing and deployment phases.

**3. AI Agent Design and Development**

After the data preparation phase, the development team designed the architecture of the AI Agent system.

The solution combined:

<div align="center">

1.NLP-based intent recognition

2.LLM conversational capabilities

3.Oracle database workflow matching

4.Rule-based financial process logic

</div>

When customers submitted natural language requests, the AI Agent would: 

1.Analyze the customer message

2.Extract the underlying business intent

3.Match the intent to predefined financial workflows

4.Retrieve the appropriate response template or operational process

5.Route the request automatically

For example:

<div align="center">

“I want to pay off my loan early.”

</div>

would trigger the:

<div align="center">

Early Repayment / Early Settlement Workflow

</div>

The system was designed to support high-frequency automotive finance service scenarios while maintaining operational consistency and compliance requirements.

**4. Testing and Iteration**

During development, the AI Agent went through multiple rounds of testing and continuous iteration before it was gradually introduced into real customer service operations. Since the project was designed for automotive finance servicing, testing was not only about whether the model could technically recognize customer intent, but also whether the entire system could function reliably within real business workflows and customer communication scenarios.

One of the biggest challenges during testing came from the way customers actually communicate in real life. Unlike structured business terminology used internally by financial institutions, customers often described their problems in highly informal, emotional, or incomplete ways. For example, instead of directly mentioning “early settlement” or “repayment processing,” customers might simply say things like:

<div align="center">

“I can’t afford this month’s payment.”
“Can somebody help me delay the bill?”
“I already paid but the system still says overdue.”

</div>

Although these expressions sounded simple, they could involve multiple overlapping business processes such as delinquency handling, repayment reconciliation, installment management, or billing disputes. Because of this, a large amount of effort was spent refining intent trigger libraries, retraining datasets, adjusting workflow mappings, and improving the NLP recognition logic continuously throughout the project lifecycle.

At the technical level, the project first entered the **SAT (System Acceptance Testing)** phase, which focused on validating the stability and reliability of the AI Agent system. The development team tested the integration between the AI Agent and the Oracle workflow database, verified whether customer intents could correctly trigger predefined financial workflows, and monitored system performance under large volumes of simulated customer requests. Edge cases such as incomplete inputs, mixed intents, and unexpected dialogue behaviors were also tested to ensure the system could operate reliably in real financial servicing environments.

After passing technical validation, the project moved into the **UAT (User Acceptance Testing)** phase, which focused more on real business usability. Customer service agents participated directly in testing because they understood real customer communication patterns best. During UAT, agents intentionally used informal language, emotional complaints, and complex repayment scenarios to challenge the AI Agent. Their feedback helped evaluate whether responses sounded natural, whether workflow routing matched operational processes, and whether escalation timing to human agents was appropriate.

In addition to SAT and UAT, the team also conducted internal self-user testing. Team members simulated leasing customers and interacted directly with the AI Agent to observe the conversation flow from an end-user perspective. This helped identify subtle issues such as repetitive replies, awkward transitions, and conversational dead ends. Repeated internal testing became an important part of improving both conversational quality and workflow reliability before deployment.

The entire testing and iteration process was highly collaborative between business teams, customer service departments, and technical developers. Many workflow rules and intent classifications were continuously adjusted based on real operational feedback. Over time, the AI Agent gradually became more stable, more accurate, and better aligned with real automotive finance customer service operations before its final production deployment.

**5. Deployment, Maintenance, and Business Impact**

After successful testing and validation, the AI Agent was gradually deployed into BMW Group Leasing’s customer service operations. The deployment process focused on ensuring stable integration between the AI Agent, existing customer service systems, and the Oracle workflow database that stored predefined financial servicing processes and response templates.

The Oracle database played an important role in the production environment. Once customer intent was identified by the AI Agent, the system would automatically match the intent to corresponding business workflows, repayment processes, or servicing templates stored within the Oracle system. This allowed the AI Agent to operate within structured financial servicing procedures rather than functioning as a standalone chatbot.

Following deployment, the system significantly improved the efficiency of handling repetitive customer inquiries and reduced the workload of human customer service agents. A large portion of standard servicing requests could be automatically identified and routed before escalation to human support.

As a result, customer response efficiency improved, service scalability increased, operational costs were reduced, and human agents were able to focus more on complex customer cases requiring manual judgment.

One of the most successful outcomes was the improvement in customer routing efficiency. The final transfer rate to human agents exceeded 50%, which was considered a highly successful result for an early-stage enterprise LLM application in 2023.

After deployment, the project also entered a continuous maintenance and optimization phase. Since customer communication patterns and financial servicing scenarios constantly evolved, the AI Agent required regular updates and issue monitoring.

The team mainly used **Jira and Confluence** to manage maintenance workflows and collect operational feedback. Jira was used to track bugs, customer service issues, workflow optimization requests, and AI Agent performance tickets. Meanwhile, Confluence served as a centralized platform for documenting business workflows, intent mappings, testing records, and operational knowledge sharing across teams.

This maintenance process allowed technical teams, product managers, and customer service departments to collaborate efficiently on resolving issues and continuously improving the AI Agent’s conversational and workflow capabilities over time.

Overall, the project demonstrated the practical potential of combining Large Language Models with structured financial workflow systems in real-world automotive finance operations.

## Review:

Through this project, I gained both technical and business experience from participating in a real-world enterprise AI product development lifecycle.

From a product and business perspective, I developed a stronger understanding of requirement documentation, workflow analysis, and the UAT process. Working closely with customer service and business teams also helped me build practical knowledge of automotive leasing and financial servicing operations.

From a technical perspective, I gained hands-on experience using Python and SQL for data processing, conversation data preparation, and workflow-related analysis. I also learned how enterprise systems were deployed and integrated with Oracle databases to support structured financial servicing workflows. In addition, I became familiar with training and optimizing conversation corpora for NLP and LLM-based intent recognition systems.

During the maintenance and collaboration phase, I regularly used Jira and Confluence to track tickets, document workflows, manage issues, and support communication across technical and business teams. This helped me better understand Agile collaboration and enterprise project management processes.

The project also strengthened many soft skills, including cross-functional communication, stakeholder collaboration, requirement analysis, problem-solving, and the ability to translate complex business requirements into structured technical solutions. Working in a fast-paced AI project environment improved both my adaptability and my ability to collaborate effectively with technical developers, product managers, and operational teams.
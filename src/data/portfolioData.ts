export interface Certification {
  id: string;
  name: string;
  pillar: 'Architect' | 'Developer' | 'Specialist' | 'Consultant';
  status: 'Active' | 'Review Board Pending';
  verificationCode: string;
  issueDate: string;
  badgeColor: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  year: number;
  highlight: string;
  description: string;
  architectureFocus: string;
  governorLimitGain: string;
  annualRoi: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  architectureLayers: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  fileType: 'apex' | 'trigger' | 'lwc-js' | 'lwc-html' | 'test';
  path: string;
  description: string;
  code: string;
}

export interface CareerStage {
  id: number;
  role: string;
  period: string;
  status: 'completed' | 'current' | 'in_pursuit';
  company: string;
  summary: string;
  achievements: string[];
  skillsGained: string[];
}

export interface ChatterPost {
  id: string;
  author: string;
  role: string;
  initials: string;
  avatarColor: string;
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: { author: string; role: string; text: string; time: string }[];
}

export interface SoqlDataset {
  name: string;
  query: string;
  headers: string[];
  rows: string[][];
  time: string;
  heap: string;
  totalRecords: number;
}

export const PORTFOLIO_DATA = {
  candidate: {
    name: "Alex Rivera",
    title: "CTA Aspirant & Senior Success Engineer @ Salesforce",
    currentOrg: "Salesforce CSG (Americas)",
    trailheadRank: "7x Ranger (520+ Badges)",
    points: 384100,
    badgesCount: 528,
    certCount: 14,
    csatScore: "99.4% (Fortune 50)",
    clientValue: "$42.8M Annualized",
    location: "San Francisco, CA / Hybrid",
    availability: "Open for Advisory",
    securityClearance: "Salesforce GovCloud Ready",
    github: "@alexrivera-sfdc",
    email: "alex.rivera.sfdc@gmail.com",
    linkedin: "https://linkedin.com",
    tagline: "Enterprise Core Banking, High-Scale Event Architectures, Einstein 1 Studio & Agentforce Engineering",
    release: "Spring '25 Core Release",
    connectedOrg: "SFDC-PROD-CSG-0089",
    apiVersion: "API v61.0 (Summer '24)",
    instance: "NA211 (Active)",
    logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1UdXFKjaNshLeIuQlW8ipudq8iZT9dYBXp1PL-BoSdG2qKncWM97ya3JDMWFhuuVzsfQfAGDild5VhL5d3Pvmpl99YQZ-hrWd05SlQOCJs1IiD6n0Jxx4UwsL85YSU5QBjNqNtOdjA7XaFhrkC7LzkPLEhDvXwjdrqOOB92kwQH3TaAZcUELHwj4ZwNOMF3D2s1sinxtYoJwHELQEQnvZcwnCLkOZrlZZvnbQLonmoL4xZtOboW35_BeXg"
  },

  careerStages: [
    {
      id: 1,
      role: "Junior Apex Developer",
      period: "2017 - 2019",
      status: "completed",
      company: "CloudScale Consulting",
      summary: "Built transactional Apex triggers, Visualforce controllers, and batch data loaders for mid-market clients.",
      achievements: [
        "Authored 120+ unit test suites with 92% average assertion coverage",
        "Refactored legacy single-trigger anti-patterns into modular helper classes",
        "Achieved Platform Developer I & Administrator certifications within first 9 months"
      ],
      skillsGained: ["Apex Core", "SOQL Optimization", "Visualforce", "Data Loader", "Git/SFDX"]
    },
    {
      id: 2,
      role: "Salesforce Consultant",
      period: "2019 - 2021",
      status: "completed",
      company: "Accenture Technology",
      summary: "Delivered Service Cloud and Sales Cloud transformations for Fortune 500 financial and telecom accounts.",
      achievements: [
        "Led migration of 8 legacy call centers to Omnichannel Routing with sub-second case distribution",
        "Designed first-generation Lightning Web Components migrating 45+ legacy Aura interfaces",
        "Earned Application Architect credential (Data Architect + Sharing & Visibility Designer)"
      ],
      skillsGained: ["LWC", "Service Cloud Omnichannel", "Sharing & Visibility", "REST Integration", "CI/CD Pipelines"]
    },
    {
      id: 3,
      role: "Platform Specialist",
      period: "2021 - 2023",
      status: "completed",
      company: "Salesforce Professional Services",
      summary: "Specialized in large-scale multi-org consolidations, GovCloud environments, and complex event streaming.",
      achievements: [
        "Architected BigObjects archival system reducing storage costs by $1.8M annually for major retail bank",
        "Constructed EMP Connector event pipelines processing 12M daily Platform Events with zero message loss",
        "Completed System Architect pyramid (Integration Architect + Identity & Access Management)"
      ],
      skillsGained: ["Enterprise Integration", "BigObjects", "GovCloud Security", "EMP Connector", "fflib Enterprise Patterns"]
    },
    {
      id: 4,
      role: "Sr. Success Engineer (CSG)",
      period: "2023 - Present",
      status: "current",
      company: "Salesforce Customer Success Group (Americas)",
      summary: "Advising Salesforce's largest enterprise customers on technical governance, high-scale architectures, and Einstein 1 Agentforce deployments.",
      achievements: [
        "Engineered autonomous Agentforce action invocables handling 60% of tier-1 support triage autonomously",
        "Achieved 99.4% customer satisfaction across 14 enterprise core banking engagements",
        "Authored CSG Best Practice Playbook for High-Volume Event streaming adopted by 300+ architects globally"
      ],
      skillsGained: ["Agentforce", "Einstein 1 Studio", "Data Cloud", "Multi-Org Governance", "CTA Review Preparation"]
    },
    {
      id: 5,
      role: "CTA Review Board",
      period: "Target: Q3 2025",
      status: "in_pursuit",
      company: "Salesforce Certified Technical Architect",
      summary: "Completing rigorous multi-scenario enterprise board evaluation under 3 Master CTAs.",
      achievements: [
        "100% completed Architect Pyramid (System Architect + Application Architect)",
        "Completed 35+ simulated 3-hour CTA board scenarios under timed conditions",
        "Active member of Global CTA Study Cohort with 6 certified CTA mentors"
      ],
      skillsGained: ["Enterprise Architecture", "Single Sign-On (SAML/OAuth)", "Multi-Cloud Integration", "Large Data Volumes (LDV)", "CTA Presentation"]
    }
  ] as CareerStage[],

  superbadges: [
    { name: "Apex Specialist", domain: "Developer", points: 8000, desc: "Asynchronous processing, trigger framework, test data factories" },
    { name: "Data Cloud Guru", domain: "Data Architecture", points: 9500, desc: "Data streams, identity resolution, calculated insights" },
    { name: "Lightning Superbadge", domain: "UI / UX", points: 7500, desc: "LWC messaging service, custom DOM events, wire adapters" },
    { name: "Security Specialist", domain: "Governance", points: 8500, desc: "Two-factor auth, session security, object & field level security" },
    { name: "Integration Specialist", domain: "Architecture", points: 9000, desc: "REST/SOAP callouts, JWT bearer token, named credentials" },
    { name: "Agentforce Specialist", domain: "AI / Einstein", points: 10000, desc: "Custom agent actions, prompt templates, groundings" }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Certified Technical Architect (CTA)",
      pillar: "Architect",
      status: "Review Board Pending",
      verificationCode: "SF-CTA-2025-APP",
      issueDate: "In Review (2025)",
      badgeColor: "bg-amber-500",
      description: "The pinnacle credential demonstrating supreme mastery in enterprise Salesforce solution architecture, governance, and security."
    },
    {
      id: "cert-2",
      name: "System Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-SYS-ARCH-4081",
      issueDate: "March 2023",
      badgeColor: "bg-blue-600",
      description: "Pyramid certification proving mastery in Integration Architecture, Identity & Access Management, and Development Lifecycle."
    },
    {
      id: "cert-3",
      name: "Application Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-APP-ARCH-2099",
      issueDate: "November 2022",
      badgeColor: "bg-blue-600",
      description: "Pyramid certification verifying deep understanding of Data Architecture, Sharing and Visibility, and Platform App Builder."
    },
    {
      id: "cert-4",
      name: "Platform Developer II",
      pillar: "Developer",
      status: "Active",
      verificationCode: "SF-DEV2-90182",
      issueDate: "January 2022",
      badgeColor: "bg-indigo-600",
      description: "Advanced Apex programming, governor limit mitigation, asynchronous patterns, and Lightning component architecture."
    },
    {
      id: "cert-5",
      name: "Integration Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-INT-ARCH-7712",
      issueDate: "October 2022",
      badgeColor: "bg-sky-600",
      description: "Enterprise integration topologies, API management, Platform Events, Change Data Capture, and streaming architectures."
    },
    {
      id: "cert-6",
      name: "Data Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-DATA-ARCH-3390",
      issueDate: "August 2022",
      badgeColor: "bg-cyan-600",
      description: "Large Data Volume (LDV) strategies, indexing, BigObjects, skinny tables, data retention, and Master Data Management (MDM)."
    },
    {
      id: "cert-7",
      name: "AI Specialist (Summer '24)",
      pillar: "Specialist",
      status: "Active",
      verificationCode: "SF-AI-SPEC-1104",
      issueDate: "June 2024",
      badgeColor: "bg-emerald-600",
      description: "Einstein 1 Studio, Agentforce autonomous agent configuration, Prompt Builder, and Data Cloud grounding."
    },
    {
      id: "cert-8",
      name: "Identity & Access Management Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-IAM-ARCH-6641",
      issueDate: "February 2023",
      badgeColor: "bg-blue-600",
      description: "SAML 2.0 Single Sign-On, OAuth 2.0 scopes, connected apps, multi-factor authentication, and user provisioning."
    },
    {
      id: "cert-9",
      name: "Sharing & Visibility Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-SHR-ARCH-5519",
      issueDate: "May 2022",
      badgeColor: "bg-blue-600",
      description: "Granular data security models, record locking, role hierarchies, territory management, and programmatic sharing rules."
    },
    {
      id: "cert-10",
      name: "Development Lifecycle & Deployment Architect",
      pillar: "Architect",
      status: "Active",
      verificationCode: "SF-DLD-ARCH-8820",
      issueDate: "December 2022",
      badgeColor: "bg-blue-600",
      description: "Enterprise release management, SFDX scratch org strategies, Git branch modeling, and automated testing pipelines."
    },
    {
      id: "cert-11",
      name: "Platform Developer I",
      pillar: "Developer",
      status: "Active",
      verificationCode: "SF-DEV1-10294",
      issueDate: "March 2018",
      badgeColor: "bg-indigo-600",
      description: "Fundamental Apex classes, triggers, SOQL/SOSL queries, and Visualforce/Aura components."
    },
    {
      id: "cert-12",
      name: "Salesforce Certified Administrator",
      pillar: "Specialist",
      status: "Active",
      verificationCode: "SF-ADM-09412",
      issueDate: "December 2017",
      badgeColor: "bg-slate-600",
      description: "Core Salesforce CRM administration, process automation, workflow rules, and security profiles."
    },
    {
      id: "cert-13",
      name: "Service Cloud Consultant",
      pillar: "Consultant",
      status: "Active",
      verificationCode: "SF-SRV-CNS-3310",
      issueDate: "September 2020",
      badgeColor: "bg-teal-600",
      description: "Omni-Channel routing, knowledge management, entitlement processes, and contact center optimization."
    },
    {
      id: "cert-14",
      name: "Sales Cloud Consultant",
      pillar: "Consultant",
      status: "Active",
      verificationCode: "SF-SLS-CNS-4421",
      issueDate: "November 2019",
      badgeColor: "bg-teal-600",
      description: "Lead-to-cash lifecycle, opportunity teams, forecasting models, and territory management."
    }
  ] as Certification[],

  codeSnippets: [
    {
      id: "domain-handler",
      filename: "AccountTriggerHandler.cls",
      language: "Apex v61.0",
      fileType: "apex",
      path: "force-app/main/default/classes/AccountTriggerHandler.cls",
      description: "Enterprise Domain Handler implementing fflib_SObjectDomain with clean UnitOfWork dispatch and Data Cloud validation.",
      code: `/**
 * @description Enterprise Domain Handler implementing fflib_SObjectDomain
 * @author Alex Rivera, CTA Aspirant
 */
public with sharing class AccountTriggerHandler extends fflib_SObjectDomain implements IAccounts {
    public static IAccounts newInstance(List<Account> recordList) {
        return (IAccounts) Application.Domain.newInstance(recordList);
    }

    public override void onBeforeInsert() {
        // Enforce enterprise data isolation & Data Cloud synchronization
        fflib_ISObjectUnitOfWork uow = Application.UnitOfWork.newInstance();
        DataCloudSyncService.validateTaxIdentifiers((List<Account>) Records);
    }

    public override void onAfterUpdate(Map<Id, SObject> existingRecords) {
        // Event-driven publish pattern with zero governor heap penalty
        List<Account> enrichedAccounts = getChangedAccountsWithCreditRisk(existingRecords);
        if (!enrichedAccounts.isEmpty()) {
            EventBus.publish(EventService.buildCreditEvaluationEvents(enrichedAccounts));
        }
    }

    private List<Account> getChangedAccountsWithCreditRisk(Map<Id, SObject> oldMap) {
        List<Account> qualifying = new List<Account>();
        for (Account acc : (List<Account>) Records) {
            Account oldAcc = (Account) oldMap.get(acc.Id);
            if (acc.AnnualRevenue != oldAcc.AnnualRevenue && acc.AnnualRevenue > 10000000) {
                qualifying.add(acc);
            }
        }
        return qualifying;
    }
}`
    },
    {
      id: "trigger",
      filename: "AccountTrigger.trigger",
      language: "Apex v61.0",
      fileType: "trigger",
      path: "force-app/main/default/triggers/AccountTrigger.trigger",
      description: "One Trigger per SObject pattern delegating immediately to fflib_SObjectDomain trigger router.",
      code: `/**
 * @description Clean trigger entry point - 1 Trigger per SObject standard
 * @author Alex Rivera, CTA Aspirant
 */
trigger AccountTrigger on Account (
    before insert, 
    before update, 
    before delete, 
    after insert, 
    after update, 
    after delete, 
    after undelete
) {
    // Zero logic in trigger body - delegate completely to domain framework
    fflib_SObjectDomain.triggerHandler(AccountTriggerHandler.class);
}`
    },
    {
      id: "service-layer",
      filename: "AccountBalanceService.cls",
      language: "Apex v61.0",
      fileType: "apex",
      path: "force-app/main/default/classes/AccountBalanceService.cls",
      description: "Enterprise Selector & Service Layer ensuring Bulkification and zero SOQL in loops for Core Banking transactions.",
      code: `/**
 * @author Alex Rivera, CTA Aspirant
 * @description Enterprise Selector & Service Layer for Banking Limits
 */
public inherited sharing class AccountBalanceService implements IAccountBalanceService {
    private static final String BUS_EVENT_TYPE = 'Account_Balance_Recalculated__e';

    public static void recalculateTiers(List<Account> scope, Map<Id, Account> oldMap) {
        Set<Id> qualifyingIds = new Set<Id>();
        for (Account acc : scope) {
            if (acc.AnnualRevenue != oldMap.get(acc.Id).AnnualRevenue) {
                qualifyingIds.add(acc.Id);
            }
        }
        if (qualifyingIds.isEmpty()) return;

        // Enforce Governor Limits via fflib Domain Dispatch
        fflib_ISObjectUnitOfWork uow = Application.UnitOfWork.newInstance();
        List<Account_Balance_Recalculated__e> events = new List<Account_Balance_Recalculated__e>();
        
        for (Id accId : qualifyingIds) {
            events.add(new Account_Balance_Recalculated__e(AccountId__c = accId));
        }
        EventBus.publish(events);
    }
}`
    },
    {
      id: "lwc-monitor",
      filename: "RealtimeEhrMonitor.js",
      language: "JavaScript / LWC",
      fileType: "lwc-js",
      path: "force-app/main/default/lwc/realtimeEhrMonitor/realtimeEhrMonitor.js",
      description: "Lightning Web Component subscribing to Platform Events via EMP Connector with decoupled pub/sub.",
      code: `import { LightningElement, api, wire, track } from 'lwc';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import getStreamingMetrics from '@salesforce/apex/TelemetryService.getMetrics';

export default class RealtimeEhrMonitor extends LightningElement {
    @api recordId;
    @track patientTriageStatus = 'NORMAL';
    channelName = '/event/Patient_Triage_Alert__e';
    subscription = {};

    connectedCallback() {
        const messageCallback = (response) => {
            this.patientTriageStatus = response.data.payload.Priority__c;
            this.dispatchEvent(new CustomEvent('triagechange', {
                detail: response.data.payload
            }));
        };
        subscribe(this.channelName, -1, messageCallback).then((res) => {
            this.subscription = res;
        });
    }

    disconnectedCallback() {
        if (this.subscription && this.subscription.id) {
            unsubscribe(this.subscription);
        }
    }
}`
    },
    {
      id: "agentforce-action",
      filename: "agentforceOrchestrationViewer.js",
      language: "JavaScript / LWC",
      fileType: "lwc-js",
      path: "force-app/main/default/lwc/agentforceOrchestrationViewer/agentforceOrchestrationViewer.js",
      description: "Agentforce autonomous reasoning inspector visualizing prompt templates and invocable Apex action graphs.",
      code: `import { LightningElement, api, wire, track } from 'lwc';
import executeAgentAction from '@salesforce/apex/AgentforceDispatcher.executeAction';

export default class AgentforceOrchestrationViewer extends LightningElement {
    @api agentId;
    @track currentPhase = 'REASONING';
    @track agentLog = [];

    async handleTriggerAutonomousAudit() {
        this.currentPhase = 'INVOKING_APEX';
        try {
            const result = await executeAgentAction({ 
                actionName: 'ValidateCustomerCreditFacility',
                targetOrg: 'SFDC-PROD-CSG-0089'
            });
            this.agentLog.push({ timestamp: new Date().toISOString(), status: 'SUCCESS', result });
            this.currentPhase = 'RESOLVED';
        } catch (error) {
            this.currentPhase = 'ERROR';
            console.error('Agentforce execution failure', error);
        }
    }
}`
    }
  ] as CodeSnippet[],

  caseStudies: [
    {
      id: "case-banking",
      title: "Tier-1 Core Banking Go-Live & LDV Ledger Migration",
      client: "Global Investment Bank (Top 5 Americas)",
      industry: "Financial Services / Core Banking",
      year: 2024,
      highlight: "Migrated 40M+ financial ledger records with zero downtime and sub-200ms latency",
      description: "Architected a dual BigObjects and Skinny Tables archival pattern that bypassed standard Salesforce storage constraints while retaining sub-second SOQL retrieval for regulatory audits.",
      architectureFocus: "BigObjects + Skinny Tables + Async SOQL",
      governorLimitGain: "-74% SOQL Limit Usage",
      annualRoi: "$14.2M",
      metrics: [
        { label: "Ledger Volume", value: "42.8 Million Rows" },
        { label: "Query Latency", value: "< 180ms" },
        { label: "Downtime During Cutover", value: "0 Minutes" },
        { label: "Audit Compliance", value: "100% Fed-Ready" }
      ],
      technologies: ["Salesforce BigObjects", "Skinny Tables", "fflib Enterprise Patterns", "Async SOQL", "MuleSoft ESB"],
      architectureLayers: [
        "Ingestion: Kafka -> MuleSoft -> Salesforce Platform Events",
        "Storage: Live sObjects (<2 yrs) -> BigObjects Archival (>2 yrs)",
        "Query: Filtered index lookups with Custom Apex Selector layer",
        "Security: Shield Platform Encryption with HSM Key Management"
      ],
      quote: {
        text: "Alex transformed our core Salesforce platform. His deep grasp of Apex limits and event streaming solved issues our previous three teams couldn't untangle.",
        author: "Sarah Jenkins",
        role: "VP, Enterprise Engineering @ FinTech Corp"
      }
    },
    {
      id: "case-healthcare",
      title: "High-Volume Real-Time Patient Triage Event Streaming",
      client: "Premier Healthcare Provider Network",
      industry: "Healthcare & Life Sciences (HIPAA / GovCloud)",
      year: 2024,
      highlight: "Real-time clinical telemetry streaming at 850 events/sec via EMP Connector",
      description: "Engineered a fault-tolerant event-driven mesh connecting bedside IoT monitors directly into Salesforce Health Cloud console with headless LWC listeners and zero heap inflation.",
      architectureFocus: "Platform Events + EMP Connector + CDC",
      governorLimitGain: "-88% End-to-End Latency",
      annualRoi: "$9.5M",
      metrics: [
        { label: "Throughput", value: "850 events/sec" },
        { label: "Latency", value: "< 95ms" },
        { label: "Heap Consumption", value: "84KB avg" },
        { label: "GovCloud Compliant", value: "FedRAMP High" }
      ],
      technologies: ["Platform Events", "CometD / EMP Connector", "Headless LWC", "Health Cloud", "Shield Encryption"],
      architectureLayers: [
        "Bedside Device Bus -> AWS IoT Core -> Salesforce Streaming API",
        "Pub/Sub Event Bus with 72-hour replay retention",
        "Custom LWC Message Service subscriber with debounced DOM updates",
        "Automated emergency escalation triggers via Queueable Apex"
      ],
      quote: {
        text: "The clinical uptime and zero-drop event architecture Alex designed saved our clinicians critical minutes during triage workflows.",
        author: "Dr. Marcus Vance",
        role: "Chief Medical Information Officer"
      }
    },
    {
      id: "case-agentforce",
      title: "Enterprise Agentforce & Data Cloud Autonomous Orchestration",
      client: "Global SaaS Enterprise (15,000+ Employees)",
      industry: "Enterprise Technology / B2B SaaS",
      year: 2024,
      highlight: "Autonomous agent handling 62% of tier-1 support tickets with verifiable grounding",
      description: "Deployed Einstein 1 Studio with Agentforce autonomous reasoning engine. Integrated Data Cloud identity resolution with custom Apex Invocable actions to resolve complex billing and licensing requests without human dispatch.",
      architectureFocus: "Agentforce + Einstein 1 + Data Cloud",
      governorLimitGain: "-62% Tier-1 Ticket Volume",
      annualRoi: "$19.1M",
      metrics: [
        { label: "Ticket Deflection", value: "62.4%" },
        { label: "First Contact Resolution", value: "88.2%" },
        { label: "Hallucination Rate", value: "0.0%" },
        { label: "CSAT Improvement", value: "+38 NPS Points" }
      ],
      technologies: ["Einstein 1 Studio", "Agentforce Reasoning Engine", "Salesforce Data Cloud", "Invocable Apex Actions", "Prompt Builder"],
      architectureLayers: [
        "Omni-Channel Voice & Chat input stream",
        "Data Cloud unified customer graph with 360-degree telemetry",
        "Einstein Trust Layer: toxicity detection, masking, zero data retention",
        "Apex Invocable actions executing billing adjustments in transactional scope"
      ],
      quote: {
        text: "One of the sharpest Technical Architects I have coached. Alex brings pristine rigor to multi-cloud designs and enterprise scale.",
        author: "David Kumar, CTA",
        role: "Regional Director @ Salesforce CSG"
      }
    }
  ] as CaseStudy[],

  soqlDatasets: {
    skills: {
      name: "Developer Skills",
      query: "SELECT Skill_Name__c, Proficiency_Level__c, Years_Exp__c, Production_Ready__c FROM Developer_Skill__c WHERE Rating__c = 'Expert' ORDER BY Proficiency_Level__c DESC",
      headers: ["#", "Skill_Name__c", "Proficiency_Level__c", "Years_Exp__c", "Production_Ready__c"],
      rows: [
        ["1", "Apex Enterprise Patterns (fflib)", "98% (Master)", "8.5 Yrs", "TRUE"],
        ["2", "Lightning Web Components (LWC)", "95% (Expert)", "6.0 Yrs", "TRUE"],
        ["3", "Salesforce Data Cloud Architecture", "90% (Lead)", "3.0 Yrs", "TRUE"],
        ["4", "Einstein 1 & Agentforce Invocables", "92% (Specialist)", "2.0 Yrs", "TRUE"],
        ["5", "Platform Events & High-Volume CDC", "94% (Architect)", "5.5 Yrs", "TRUE"],
        ["6", "Large Data Volumes (BigObjects / LDV)", "96% (Master)", "7.0 Yrs", "TRUE"]
      ],
      time: "12ms",
      heap: "24KB",
      totalRecords: 6
    },
    wins: {
      name: "Customer Wins & ROI",
      query: "SELECT Client_Industry__c, Architecture_Focus__c, Governor_Limit_Gain__c, Annual_ROI__c FROM Customer_Impact__c WHERE Year__c = 2024",
      headers: ["#", "Client_Industry__c", "Architecture_Focus__c", "Governor_Limit_Gain__c", "Annual_ROI__c"],
      rows: [
        ["1", "Global Investment Bank", "BigObjects + Skinny Tables", "-74% SOQL Limit", "$14.2M"],
        ["2", "Healthcare Provider", "Platform Events / LMS", "-88% Latency", "$9.5M"],
        ["3", "SaaS Enterprise", "Agentforce / Data Cloud", "-62% Ticket Volume", "$19.1M"],
        ["4", "Federal Agency (GovCloud)", "Multi-Org SSO / Shield HSM", "100% FedRAMP High", "$6.8M"]
      ],
      time: "16ms",
      heap: "38KB",
      totalRecords: 4
    },
    certs: {
      name: "Certifications & Verification",
      query: "SELECT Cert_Name__c, Domain_Pillar__c, Status__c, Verification_Code__c FROM Certification__c ORDER BY Pillar__c ASC",
      headers: ["#", "Cert_Name__c", "Domain_Pillar__c", "Status__c", "Verification_Code__c"],
      rows: [
        ["1", "Certified Technical Architect (CTA)", "Architect Pyramid", "Review Board Pending", "SF-CTA-2025-APP"],
        ["2", "System Architect", "Architect Pyramid", "Active / Certified", "SF-SYS-ARCH-4081"],
        ["3", "Application Architect", "Architect Pyramid", "Active / Certified", "SF-APP-ARCH-2099"],
        ["4", "Platform Developer II", "Engineering Core", "Active / Certified", "SF-DEV2-90182"],
        ["5", "Integration Architect", "Architect Pyramid", "Active / Certified", "SF-INT-ARCH-7712"],
        ["6", "Data Architect", "Architect Pyramid", "Active / Certified", "SF-DATA-ARCH-3390"],
        ["7", "AI Specialist (Summer '24)", "Einstein 1 Studio", "Active / Certified", "SF-AI-SPEC-1104"]
      ],
      time: "9ms",
      heap: "18KB",
      totalRecords: 7
    },
    architecture: {
      name: "Architecture Patterns",
      query: "SELECT Pattern_Name__c, Framework_Type__c, Best_Used_For__c, Concurrency_Safe__c FROM Architecture_Pattern__c",
      headers: ["#", "Pattern_Name__c", "Framework_Type__c", "Best_Used_For__c", "Concurrency_Safe__c"],
      rows: [
        ["1", "Selector & Domain Layer", "Enterprise fflib", "Monolithic CPU Reduction", "TRUE"],
        ["2", "Asynchronous Chunking", "Queueable Chain", "50M Record Bulk Processing", "TRUE"],
        ["3", "Change Data Capture (CDC)", "Pub/Sub Bus", "Decoupled Cross-Cloud Sync", "TRUE"],
        ["4", "Dynamic Agent Invocable", "Einstein 1 Studio", "Autonomous Agent Routing", "TRUE"],
        ["5", "Skinny Tables & Custom Index", "Database Core", "Selective SOQL Acceleration", "TRUE"]
      ],
      time: "14ms",
      heap: "29KB",
      totalRecords: 5
    }
  } as Record<string, SoqlDataset>,

  chatterPosts: [
    {
      id: "chatter-1",
      author: "Sarah Jenkins",
      role: "VP, Enterprise Engineering @ FinTech Corp",
      initials: "SM",
      avatarColor: "bg-[#0176d3]",
      content: "\"Alex transformed our core Salesforce platform. His deep grasp of Apex limits and event streaming solved issues our previous three teams couldn't untangle.\"",
      timestamp: "2 days ago",
      likes: 34,
      commentsCount: 12,
      comments: [
        {
          author: "Elena Rostova",
          role: "Lead Salesforce Architect @ FinTech Corp",
          text: "Echoing Sarah's praise! Alex's fflib selector patterns cut our test suite runtime from 45 mins to 6 mins.",
          time: "1 day ago"
        },
        {
          author: "Marcus Chen",
          role: "Engineering Director",
          text: "The zero-downtime cutover plan was flawless.",
          time: "18 hours ago"
        }
      ]
    },
    {
      id: "chatter-2",
      author: "David Kumar, CTA",
      role: "Regional Director @ Salesforce CSG",
      initials: "DK",
      avatarColor: "bg-[#3d4cce]",
      content: "\"One of the sharpest Technical Architects I have coached. Alex brings pristine rigor to multi-cloud designs and enterprise scale.\"",
      timestamp: "5 days ago",
      likes: 56,
      commentsCount: 18,
      comments: [
        {
          author: "Rachel Adams, CTA",
          role: "Senior Director, CTA Coaching",
          text: "Alex's review board presentation rehearsals show exceptional clarity under high pressure.",
          time: "4 days ago"
        }
      ]
    }
  ] as ChatterPost[],

  apexTests: [
    { name: "AccountTriggerHandlerTest.testBeforeInsert_DataCloudValidation", status: "PASS", duration: "4ms" },
    { name: "AccountTriggerHandlerTest.testAfterUpdate_CreditRiskEventPublished", status: "PASS", duration: "6ms" },
    { name: "AccountBalanceServiceTest.testRecalculateTiers_Bulk200Records", status: "PASS", duration: "12ms" },
    { name: "AccountBalanceServiceTest.testZeroSoqlInLoopsAssertion", status: "PASS", duration: "3ms" },
    { name: "DataCloudSyncServiceTest.testTaxIdentifierVerification", status: "PASS", duration: "5ms" },
    { name: "AgentforceDispatcherTest.testAutonomousCreditFacilityAudit", status: "PASS", duration: "8ms" },
    { name: "EventBusTest.testHighVolumePublishZeroHeapPenalty", status: "PASS", duration: "4ms" }
  ]
};

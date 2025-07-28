// components/insights/EducationClientRenderer.tsx
"use client";

import React, { useState } from "react";
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiExternalLink, 
  FiFileText, 
  FiInfo, 
  FiAlertTriangle, 
  FiCheck, 
  FiX,
  FiBook,
  FiShield,
  FiUser,
  FiShoppingBag,
  FiHome,
  FiGlobe,
  FiHeart,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiSmartphone,
  FiClock,
  FiList
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from 'dompurify';

// Custom icon components
const ComparisonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M8 3v18m8-18v18M3 8h4m10 0h4M3 16h4m10 0h4"/>
  </svg>
);

const educationSections = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    description: "Comprehensive guide to constitutional and legal protections in India",
    icon: <FiShield className="text-blue-500" />,
    items: [
      {
        topic: "Fundamental Rights (Articles 14-32)",
        explanation: `<strong>The Constitution of India guarantees six fundamental rights to all citizens:
        1. <strong>Right to Equality (Articles 14-18)
        2. <strong>Right to Freedom (Articles 19-22)
        3. <strong>Right Against Exploitation (Articles 23-24)
        4. <strong>Right to Freedom of Religion (Articles 25-28)
        5. <strong>Cultural and Educational Rights (Articles 29-30)
        6. <strong>Right to Constitutional Remedies (Article 32)

        Landmark Cases:
        - Kesavananda Bharati v. State of Kerala (1973): Established basic structure doctrine
        - Maneka Gandhi v. Union of India (1978): Expanded right to life under Article 21
        - Justice K.S. Puttaswamy v. Union of India (2017): Recognized right to privacy`,
        relatedLaws: ["Article 14-32 of Constitution", "Protection of Human Rights Act, 1993"],
        quickTips: [
          "Article 32 allows direct approach to Supreme Court for rights violation",
          "Right to life includes right to clean environment (Subhash Kumar v. State of Bihar)",
          "Police must follow DK Basu guidelines during arrest"
        ]
      },
      {
        topic: "Arrest Procedures (BNSS Sections 35-42)",
        explanation: `<strong>Key safeguards under Bharatiya Nagarik Suraksha Sanhita:</strong>
        1. Arrest memo mandatory with digital copy to family/lawyer within 2 hrs <strong>(Sec 35)</strong>
        2. Medical examination within 48 hours of arrest <strong>(Sec 36)</strong>
        3. No custody beyond 24 hrs without magistrate approval <strong>(Sec 37)</strong>
        4. Right to legal aid from moment of arrest <strong>(Sec 38)</strong>

        <strong>Comparison with old CrPC:</strong>
        - <strong>CrPC Section 50:</strong> Basic arrest rights
        - <strong>BNSS Section 35: Digital documentation and tracking
        - New requirement: Video recording of arrest in heinous crimes`,
        comparison: [
          {
            title: "Right to Inform",
            old: "CrPC Section 50: Oral information",
            new: "BNSS Section 35: Written + digital notice"
          },
          {
            title: "Custody Limits",
            old: "CrPC Section 57: 24 hrs generally",
            new: "BNSS Section 37: Stricter magistrate oversight"
          }
        ],
        caseLaws: [
          "D.K. Basu v. State of West Bengal (1997): Arrest guidelines",
          "Arnesh Kumar v. State of Bihar (2014): Anti-arrest misuse"
        ]
      }
    ]
  },
  {
    id: "everyday-law",
    title: "Everyday Legal Matters",
    description: "Essential legal knowledge for common situations affecting citizens",
    icon: <FiShoppingBag className="text-purple-500" />,
    items: [
      {
        topic: "Consumer Protection (Act 2019)",
        explanation: `Key provisions of Consumer Protection Act 2019:
        1. Covers goods, services and e-commerce
        2. Establishes Central Consumer Protection Authority
        3. Product liability provisions
        4. Mediation as first recourse
        5. E-filing of complaints

        Jurisdiction:
        - District Commission: Claims up to ₹1 crore
        - State Commission: ₹1-10 crore
        - National Commission: Above ₹10 crore

        Case Examples:
        - Indian Medical Association v. V.P. Shantha (1995): Medical services under CPA
        - Laxmi Engineering Works v. PSG Industrial Institute (1995): Deficiency in service`,
        relatedLaws: ["Consumer Protection Act 2019", "Legal Metrology Act 2009"],
        quickTips: [
          "Keep all bills and warranty cards",
          "File complaint within 2 years of dispute",
          "Use National Consumer Helpline: 1915"
        ]
      },
      {
        topic: "Rental Agreements",
        explanation: `Essential clauses in rental agreements:
        1. Rent amount and escalation clause
        2. Security deposit terms (max 2 months rent in many states)
        3. Maintenance responsibilities
        4. Lock-in period and notice requirements
        5. Subletting conditions

        State-specific Rent Control Acts provide additional protections:
        - Delhi Rent Act: 1995
        - Maharashtra Rent Control Act: 1999
        - Model Tenancy Act 2021 (for new agreements)

        Landmark Cases:
        - Gian Devi Anand v. Jeevan Kumar (1985): Tenant protection
        - Bharat Sales Ltd. v. LIC (1998): Eviction procedures`,
        quickTips: [
          "Always register agreement if term >11 months",
          "Take photos of property during handover",
          "Pay rent via bank transfer for proof"
        ]
      }
    ]
  },
  {
    id: "new-criminal-laws",
    title: "BNS, BNSS & BSA (2023)",
    description: "Complete analysis of India's reformed criminal justice system",
    icon: <FiBook className="text-red-500" />,
    items: [
      {
        topic: "Major Substantive Changes (BNS)",
        explanation: `Key changes in Bharatiya Nyaya Sanhita:
        1. Sedition replaced with "Acts against sovereignty" (Sec 152)
        2. Organized crime chapter added (Sec 111-120)
        3. Mob lynching punishable by death (Sec 103(2))
        4. Community service introduced for petty crimes (Sec 23)
        5. Gender-neutral rape laws (Sec 69)

        Comparison with IPC:
        - IPC Section 377: Decriminalized (Navtej Singh Johar v. UOI)
        - BNS Section 69: Expanded sexual offenses
        - New offense: Sexual intercourse by deceit (Sec 72)`,
        comparison: [
          {
            title: "Murder",
            old: "IPC 302: Death or life imprisonment",
            new: "BNS 101: Same + organized crime murder"
          },
          {
            title: "Rape",
            old: "IPC 376: Gender-specific",
            new: "BNS 69: Gender-neutral"
          }
        ],
        caseLaws: [
          "Joseph Shine v. Union of India (2018): Adultery decriminalized",
          "Independent Thought v. Union of India (2017): Marital rape of minors"
        ]
      },
      {
        topic: "Digital Evidence (BSA Sections 61-67)",
        explanation: `Revolutionary changes in Bharatiya Sakshya Adhiniyam:
        1. Electronic records primary evidence (Sec 61)
        2. No need for Section 65B certificate
        3. 32 types of electronic evidence recognized
        4. Hash verification for digital documents (Sec 63)
        5. Presumption of genuineness for official e-records (Sec 67)

        Practical Implications:
        - CCTV footage directly admissible
        - WhatsApp chats can be primary evidence
        - Cryptocurrency transactions provable
        - Email headers sufficient for authentication

        Case Reference:
        - Arjun Panditrao v. Kailash Kushanrao (2020): Clarified 65B requirement`,
        quickTips: [
          "Preserve original devices",
          "Capture metadata with screenshots",
          "Use government-certified timestamps"
        ]
      }
    ]
  },
  {
    id: "legal-processes",
    title: "Legal Procedures Guide",
    description: "Step-by-step walkthrough of common judicial processes",
    icon: <FiFileText className="text-green-500" />,
    items: [
      {
        topic: "Filing an FIR (BNSS Sections 173-175)",
        explanation: `Complete process under new BNSS:
        1. Can file at any police station (Zero FIR concept)
        2. Mandatory digital registration and tracking
        3. Refusal punishable with 1 year imprisonment
        4. Preliminary enquiry allowed only for non-cognizable offenses (max 14 days)
        5. Status updates to complainant every 14 days

        Documents Needed:
        - Written complaint
        - Identity proof
        - Supporting documents (if any)

        Case Laws:
        - Lalita Kumari v. Govt of UP (2013): Mandatory FIR registration
        - Priyanka Srivastava v. State of UP (2015): Penalty for false FIR`,
        quickTips: [
          "Get FIR receipt immediately",
          "Follow up via citizen portal",
          "Approach SP if FIR refused"
        ]
      },
      {
        topic: "Court Hierarchy and Appeals",
        explanation: `Indian judicial system structure:
        1. District Courts:
           - Civil Judge (Junior Division)
           - Civil Judge (Senior Division)
           - Additional District Judge
           - District Judge
        
        2. High Courts:
           - Original and appellate jurisdiction
           - Can issue writs under Article 226
        
        3. Supreme Court:
           - Final appellate court
           - Constitutional matters under Article 32
           - Special Leave Petitions under Article 136

        Appeal Process:
        - Magistrate's order → Sessions Court → High Court → Supreme Court
        - Time limits vary by case type (typically 30-90 days)`,
        relatedLaws: ["CrPC Appeals (Sections 372-394)", "Civil Procedure Code Order XLI"]
      }
    ]
  },
  {
    id: "digital-rights",
    title: "Digital & Cyber Laws",
    description: "Understanding your rights and obligations in digital spaces",
    icon: <FiSmartphone className="text-indigo-500" />,
    items: [
      {
        topic: "IT Act and Digital Privacy",
        explanation: `Key provisions of Information Technology Act:
        1. Section 43: Compensation for computer damage
        2. Section 66: Computer related offenses
        3. Section 66A: Struck down in Shreya Singhal case
        4. Section 67: Obscene content online
        5. Section 69: Interception powers

        Digital Personal Data Protection Act 2023:
        - Right to access and correct data
        - Right to erasure
        - Data fiduciary obligations
        - Penalties up to ₹500 crore

        Case Laws:
        - Justice K.S. Puttaswamy v. Union of India (2017): Right to privacy
        - Shreya Singhal v. Union of India (2015): Struck down 66A`,
        quickTips: [
          "Use strong passwords and 2FA",
          "Read privacy policies carefully",
          "Report cybercrime to cybercrime.gov.in"
        ]
      },
      {
        topic: "Social Media Legal Boundaries",
        explanation: `Legal limits on social media use:
        1. Defamation (Section 499 IPC)
        2. Hate speech (Section 153A IPC)
        3. Fake news (Section 54 Disaster Management Act)
        4. Impersonation (Section 66D IT Act)
        5. Copyright violation (Section 51 Copyright Act)

        Intermediary Guidelines 2021:
        - Grievance redressal officer mandatory
        - Traceability of messages in certain cases
        - Monthly compliance reports

        Case Examples:
        - Facebook v. Union of India (2022): Intermediary liability
        - Sabu Mathew George v. Union of India (2017): Online content regulation`
      }
    ]
  },
  {
    id: "family-law",
    title: "Family & Personal Laws",
    description: "Legal framework governing relationships and personal matters",
    icon: <FiUsers className="text-pink-500" />,
    items: [
      {
        topic: "Marriage and Divorce",
        explanation: `Key laws governing marriage:
        1. Hindu Marriage Act 1955
        2. Special Marriage Act 1954
        3. Muslim Personal Law
        4. Christian Marriage Act 1872

        Divorce grounds:
        - Mutual consent (Section 13B HMA)
        - Cruelty, adultery, desertion (Section 13)
        - Irretrievable breakdown (added via judicial interpretation)

        Maintenance:
        - Section 125 CrPC: Maintenance for wives/children
        - Hindu Adoptions and Maintenance Act 1956

        Landmark Cases:
        - Shamima Farooqui v. Shahid Khan (2015): Maintenance rights
        - Naveen Kohli v. Neelu Kohli (2006): Cruelty in divorce`,
        quickTips: [
          "Register marriage mandatorily in many states",
          "Alimony depends on spouse's income and living standards",
          "Mediation compulsory before contested divorce"
        ]
      },
      {
        topic: "Child Custody and Protection",
        explanation: `Legal principles for custody:
        1. Welfare of child is paramount
        2. Guardians and Wards Act 1890
        3. Hindu Minority and Guardianship Act 1956
        4. POCSO Act 2012 for child protection

        Custody types:
        - Physical vs legal custody
        - Joint vs sole custody
        - Visitation rights

        Recent Developments:
        - Shared parenting encouraged
        - Child's preference considered (if >12 years)
        - Video conferencing for custody hearings

        Case Laws:
        - Githa Hariharan v. RBI (1999): Mother as natural guardian
        - Yashita Sahu v. State of Rajasthan (2020): Hague Convention on child abduction`
      }
    ]
  },
  {
    id: "property-law",
    title: "Property & Real Estate",
    description: "Legal aspects of property ownership and transactions",
    icon: <FiHome className="text-amber-500" />,
    items: [
      {
        topic: "Property Purchase Process",
        explanation: `Step-by-step property buying checklist:
        1. Title Verification:
           - 30 years chain of title
           - Encumbrance certificate
           - Mutation records
        
        2. Legal Due Diligence:
           - Approved building plans
           - NOC from authorities
           - RERA registration if applicable
        
        3. Registration:
           - Stamp duty payment (state-specific rates)
           - Registration under Section 17 of Registration Act
           - PAN mandatory for transactions >₹5 lakh

        Key Documents:
        - Sale deed
        - Khata certificate
        - Property tax receipts
        - Occupancy certificate`,
        relatedLaws: ["Transfer of Property Act 1882", "Registration Act 1908", "RERA Act 2016"],
        quickTips: [
          "Verify seller's identity with Aadhaar",
          "Check for pending litigation on property",
          "Get possession certificate from builder"
        ]
      },
      {
        topic: "Land Dispute Resolution",
        explanation: `Common property disputes and remedies:
        1. Boundary disputes:
           - File suit for declaration and injunction
           - Survey commissioner can be appointed
        
        2. Title disputes:
           - File title suit under Specific Relief Act
           - Seek declaration of ownership
        
        3. Tenant eviction:
           - State rent control laws apply
           - Notice period as per agreement
        
        Alternative Dispute Resolution:
        - Lok Adalats for settlement
        - Mediation through court-annexed centers
        - Arbitration for contractual disputes

        Case Laws:
        - Maria Margarida Sequeira Fernandes v. Erasmo Jack (2012): Burden of proof in property cases
        - Suraj Lamp v. State of Haryana (2011): GPA sales validity`
      }
    ]
  },
  {
    id: "employment-law",
    title: "Employment & Workplace",
    description: "Rights and regulations in professional environments",
    icon: <FiBriefcase className="text-teal-500" />,
    items: [
      {
        topic: "Employee Rights and Benefits",
        explanation: `Key labor laws and protections:
        1. Minimum Wages Act 1948:
           - State-specific minimum wages
           - Revised every 6 months
        
        2. Industrial Disputes Act 1947:
           - Retrenchment compensation
           - Layoff procedures
        
        3. EPF Act 1952:
           - 12% employer contribution
           - Pension and insurance benefits
        
        4. Maternity Benefit Act 2017:
           - 26 weeks paid leave
           - Creche facility mandatory for 50+ employees

        Recent Reforms:
        - Code on Wages 2019
        - Occupational Safety Code
        - Social Security Code`,
        quickTips: [
          "Pay slips must show all deductions",
          "Gratuity payable after 5 years service",
          "File complaint with labor commissioner for violations"
        ]
      },
      {
        topic: "POSH Act Compliance",
        explanation: `Sexual Harassment at Workplace Act 2013:
        1. Mandatory for all organizations with 10+ employees
        2. Requirements:
           - Internal Complaints Committee
           - Annual reports to district officer
           - Awareness programs
        
        3. Complaint process:
           - Written complaint within 3 months
           - Inquiry within 90 days
           - Confidentiality mandatory
        
        4. Consequences:
           - Termination of employment
           - Criminal prosecution under IPC
           - Compensation to victim

        Case Laws:
        - Vishaka v. State of Rajasthan (1997): Laid foundation for POSH
        - Apparel Export Council v. A.K. Chopra (1999): Expanded harassment definition`
      }
    ]
  },
  {
    id: "financial-law",
    title: "Financial Regulations",
    description: "Legal framework for banking and financial transactions",
    icon: <FiDollarSign className="text-lime-500" />,
    items: [
      {
        topic: "Banking and Loan Rights",
        explanation: `Consumer protections in banking:
        1. RBI Ombudsman Scheme:
           - Covers deficiencies in service
           - Compensation up to ₹20 lakh
        
        2. Fair Practices Code:
           - Transparent interest rates
           - No undue harassment for recovery
           - Notice before account closure
        
        3. Loan Rights:
           - Foreclosure charges capped
           - No prepayment penalty on floating rate loans
           - Moratorium benefits as per RBI guidelines

        Case Laws:
        - ICICI Bank v. Shanti Devi Sharma (2008): Unfair banking practices
        - Vishnubhai Mafatlal Patel v. Bank of India (2021): Loan recovery procedures`,
        quickTips: [
          "Check loan agreement for hidden charges",
          "Use SARFAESI Act protections for home loans",
          "Approach banking ombudsman for unresolved complaints"
        ]
      },
      {
        topic: "Cheque Bounce Procedures",
        explanation: `Process under Negotiable Instruments Act:
        1. Legal notice within 30 days of bounce
        2. Pay or face case within 15 days
        3. File complaint under Section 138
        4. Trial process:
           - Summary trial generally
           - Evidence via affidavit
           - Compensation up to twice cheque amount
        
        Defenses Available:
        - Insufficient funds notice not received
        - Cheque issued as security
        - Signature forged

        Case Laws:
        - Dashrath Rupsingh Rathod v. State of Maharashtra (2014): Jurisdiction rules
        - MSR Leathers v. S. Palaniappan (2013): Multiple prosecutions allowed`
      }
    ]
  },
  // components/insights/EducationClientRenderer.tsx - Added Glossary Section
{
  id: "legal-glossary",
  title: "Legal Glossary (A-Z)",
  description: "Comprehensive dictionary of legal terms and definitions",
  icon: <FiList className="text-indigo-500" />,
  items: [
    {
      topic: "A-C",
      explanation: `1. <strong>Affidavit</strong>: A written statement confirmed by oath or affirmation (BSA Section 57)
      2. Bail: Temporary release of an accused person awaiting trial (BNSS Section 479)
      3. Cognizable Offense: Serious crime where police can arrest without warrant (BNSS Section 173)
      4. Decree: Final order of a court in civil cases (CPC Section 2(2))
      5. Ex parte: Proceeding where one party is absent`,
      relatedLaws: ["BNSS", "BSA", "CPC"]
    },
    {
      topic: "D-F",
      explanation: `1. Deposition: Witness testimony recorded under oath
      2. FIR: First Information Report (BNSS Section 173)
      3. Garnishee: Third party holding debtor's property
      4. Habeas Corpus: Writ to produce detained person
      5. Injunction: Court order to do/not do something`,
      caseLaws: [
        "DK Basu v. State of WB (Habeas Corpus)",
        "Ram Jethmalani v. Union of India (FIR)"
      ]
    },
    {
      topic: "G-I",
      explanation: `1. Guardian: Person appointed to care for minor/incapacitated person
      2. IPC: Indian Penal Code (now replaced by BNS)
      3. Jurisdiction: Court's authority to hear cases
      4. Kidnapping: Unlawfully taking someone away (BNS Section 83)
      5. Lien: Right to retain property until debt paid`,
      comparison: [
        {
          title: "IPC",
          old: "Section 359-374: Kidnapping",
          new: "BNS Section 83-87: Enhanced punishments"
        }
      ]
    },
    {
      topic: "J-L",
      explanation: `1. Judgment: Final court decision in a case
      2. Know Your Customer (KYC): Banking identification process
      3. Legal Heir: Person entitled to inherit property
      4. Mandamus: Writ commanding public duty performance
      5. Negligence: Failure to exercise reasonable care`,
      quickTips: [
        "Judgments available online at indiankanoon.org",
        "Legal heir certificates issued by Tahsildar"
      ]
    },
    {
      topic: "M-O",
      explanation: `1. Mediation: Alternative dispute resolution method
      2. Notary: Official authorized to verify documents
      3. Oath: Solemn promise to tell truth (BSA Section 6)
      4. Plaintiff: Party who initiates lawsuit
      5. Quash: To annul or make void`,
      relatedLaws: ["BSA Section 6", "Legal Services Authorities Act 1987"]
    },
    {
      topic: "P-R",
      explanation: `1. Power of Attorney: Authorization to act for another
      2. Quo Warranto: Writ challenging authority
      3. Ratification: Approval of unauthorized act
      4. Stay Order: Court order halting proceedings
      5. Tort: Civil wrong requiring compensation`,
      caseLaws: [
        "State of Rajasthan v. Basant Nahata (Power of Attorney)",
        "Rudal Shah v. State of Bihar (Tort)"
      ]
    },
    {
      topic: "S-U",
      explanation: `1. Subpoena: Court order to testify/produce evidence
      2. Testamentary: Relating to wills
      3. Ultra Vires: Beyond legal authority
      4. Void: Having no legal effect
      5. Warrant: Court authorization for arrest/search`,
      quickTips: [
        "Subpoenas must be obeyed unless quashed",
        "Search warrants require reasonable grounds"
      ]
    },
    {
      topic: "V-Z",
      explanation: `1. Vakalatnama: Document authorizing lawyer
      2. Will: Legal declaration of property distribution
      3. Xeno: Prefix meaning foreign (e.g., xenophobia)
      4. Year and a Day Rule: Old common law doctrine
      5. Zero FIR: FIR registered irrespective of jurisdiction (BNSS Section 173)`,
      relatedLaws: ["BNSS Section 173", "Indian Succession Act 1925"]
    }
  ]
},
  {
    id: "myth-busters",
    title: "Legal Myth Busters",
    description: "Debunking common misconceptions about Indian laws",
    icon: <FiAlertTriangle className="text-yellow-500" />,
    items: [
      {
        topic: "Common Legal Myths",
        truth: false,
        explanation: `Myth 1: "Police can't investigate without FIR"
        Fact: Preliminary enquiry allowed for non-cognizable offenses (BNSS 175)
        
        Myth 2: "Women can't be arrested at night"
        Fact: No blanket prohibition; safeguards apply to all (BNSS 35)
        
        Myth 3: "Court marriage is different from religious marriage"
        Fact: All marriages have equal legal status (Special Marriage Act)
        
        Myth 4: "Tenant becomes owner after 12 years"
        Fact: Adverse possession requires hostile possession plus court decree`,
        caseLaws: [
          "State of Haryana v. Bhajan Lal (1992): FIR not always mandatory",
          "Rajeev Verma v. State (2014): Night arrest procedures"
        ]
      },
      {
        topic: "New Laws Misconceptions",
        truth: false,
        explanation: `Myth 1: "BNS makes all sexual acts between consenting adults illegal"
        Fact: Only non-consensual acts punishable (BNS 69)
        
        Myth 2: "BSA requires special certification for digital evidence"
        Fact: BSA 61 removes 65B certificate requirement
        
        Myth 3: "BNSS allows police to detain without charges"
        Fact: BNSS 173 makes FIR mandatory for cognizable offenses
        
        Myth 4: "Community service replaces all fines"
        Fact: Only for petty offenses (BNS 23)`,
        relatedLaws: ["BNS Section 23", "BNSS Section 173", "BSA Section 61"]
      }
    ]
  },
  {
    id: "glossary",
    title: "Legal Terminology",
    description: "Comprehensive dictionary of legal terms and phrases",
    icon: <FiList className="text-gray-500" />,
    items: [
      {
        topic: "Key Legal Terms",
        explanation: `1. BNS: Bharatiya Nyaya Sanhita (replaces IPC)
        2. BNSS: Bharatiya Nagarik Suraksha Sanhita (replaces CrPC)
        3. BSA: Bharatiya Sakshya Adhiniyam (replaces Evidence Act)
        
        4. Cognizable Offense: Police can arrest without warrant
        5. Non-cognizable: Requires court order for arrest
        
        6. FIR: First Information Report
        7. Charge Sheet: Final police report
        
        8. Bail: Temporary release pending trial
        9. Anticipatory Bail: Pre-arrest protection`,
        quickTips: [
          "Latin terms: Habeas corpus, Sub judice, Res judicata",
          "Legal maxims: Ignorantia juris non excusat, Ubi jus ibi remedium"
        ]
      },
      {
        topic: "Court Terminology",
        explanation: `1. Plaint: Civil case petition
        2. Written Statement: Defendant's reply
        
        3. Ex parte: Proceeding in absence of party
        4. Adjournment: Postponement of hearing
        
        5. Decree: Court's final order (civil)
        6. Judgment: Court's final decision (criminal)
        
        7. Appeal: Challenge to higher court
        8. Revision: Supervisory jurisdiction
        
        9. Stay Order: Temporary halt to proceedings
        10. Contempt: Disobeying court orders`
      }
    ]
  },
  {
    id: "templates",
    title: "Legal Documents",
    description: "Ready-to-use templates for common legal needs",
    icon: <FiFileText className="text-violet-500" />,
    items: [
      {
        topic: "Common Legal Formats",
        explanation: `1. RTI Application Format:
           - To: Public Information Officer
           - Subject: Application under RTI Act 2005
           - Points of information requested
           - ₹10 postal order attached
        
        2. Legal Notice Format:
           - From/To details
           - Subject matter
           - Grievance details
           - Relief sought
           - Time given for compliance
        
        3. Affidavit Structure:
           - Court/authority name
           - Personal details
           - Factual statements
           - Verification clause
           - Notarization`,
        quickTips: [
          "Use plain paper for affidavits (no stamp paper needed)",
          "Keep legal notices concise and factual",
          "Maintain copies of all submitted documents"
        ]
      },
      {
        topic: "Consumer Complaint Format",
        explanation: `Essential elements:
        1. Complainant and opposite party details
        2. Jurisdiction grounds
        3. Chronology of events
        4. Deficiency in service details
        5. Documents attached:
           - Bills/receipts
           - Correspondence copies
           - Warranty cards
        6. Relief claimed:
           - Replacement/repair
           - Refund
           - Compensation
        
        Filing Options:
        - District Consumer Forum
        - Online via edaakhil.nic.in
        - National Consumer Helpline mediation`
      }
    ]
  }
];

const EducationCard = ({ item, isOpen, toggle }: { item: any, isOpen: boolean, toggle: () => void }) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? 'rgba(239, 246, 255, 0.5)' : 'rgba(255, 255, 255, 1)',
        borderColor: isOpen ? '#3b82f6' : '#e5e7eb'
      }}
      className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'ring-1 ring-blue-500' : 'hover:shadow-md'} dark:bg-gray-800 dark:border-gray-700`}
    >
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.topic}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-blue-500"
        >
          <FiChevronDown size={24} />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            {/* {item.explanation && (
              <div className="prose prose-blue dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.explanation}</p>
              </div>
            )} */}
            
{item.explanation && (
  <div 
    className="prose prose-blue dark:prose-invert max-w-none mb-6"
    dangerouslySetInnerHTML={{ 
      __html: DOMPurify.sanitize(item.explanation.replace(/\n/g, '<br />')) 
    }}
  />
)}

            {item.subtopics && (
              <div className="space-y-4 mb-6">
                {item.subtopics.map((sub: any, i: number) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      {sub.icon && <div className="flex-shrink-0 pt-1">{sub.icon}</div>}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{sub.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{sub.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {item.comparison && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Comparison: Old vs New Law</h4>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg dark:ring-gray-600">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aspect</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Before (IPC/CrPC)</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">After (BNS/BNSS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {item.comparison.map((comp: any, i: number) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">{comp.title}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.old}</td>
                          <td className="whitespace-pre-line px-3 py-4 text-sm text-gray-700 dark:text-gray-300">{comp.new}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {item.truth !== undefined && (
              <div className={`p-4 rounded-xl mb-6 ${item.truth ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded-full ${item.truth ? 'bg-green-100 text-green-600 dark:bg-green-800/30' : 'bg-red-100 text-red-600 dark:bg-red-800/30'}`}>
                    {item.truth ? <FiCheck size={18} /> : <FiX size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Myth: {item.topic}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">
                      <span className="font-semibold">Fact:</span> {item.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {item.relatedLaws && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Legal References</h4>
                <div className="flex flex-wrap gap-2">
                  {item.relatedLaws.map((law: string, i: number) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {law}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {item.quickTips && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Practical Tips</h4>
                <ul className="space-y-3">
                  {item.quickTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1">
                        <div className="p-1 rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
                          <FiCheck size={14} />
                        </div>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function EducationClientRenderer({ id }: { id: string }) {
  const section = educationSections.find((s) => s.id === id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  if (!section) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Section not found</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">The requested legal education section does not exist.</p>
    </div>
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center md:text-left"
      >
        <div className="inline-flex items-center justify-center md:justify-start p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-6">
          {section.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          {section.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
          {section.description}
        </p>
      </motion.header>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-6"
      >
        {section.items.map((item, index) => (
          <EducationCard 
            key={index}
            item={item}
            isOpen={!!openItems[index]}
            toggle={() => toggleItem(index)}
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <FiExternalLink className="text-blue-500" size={28} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Need Legal Help?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Connect with legal experts or download official documents:
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://legalaffairs.gov.in/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Law
                <FiExternalLink className="ml-2" />
              </a>
              <a 
                href="https://www.indiacode.nic.in/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                India Code
                <FiExternalLink className="ml-2" />
              </a>
              <a 
                href="https://districts.ecourts.gov.in/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                eCourts Portal
                <FiExternalLink className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
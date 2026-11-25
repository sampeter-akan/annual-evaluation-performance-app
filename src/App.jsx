import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Sliders,
  FileText,
  CheckCircle2,
  Award,
  BarChart3,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  ClipboardList,
  Scale,
  X,
  Check
} from 'lucide-react';

// --- RUBRIC DEFINITIONS FROM OFFICIAL APPRAISAL BRIEF ---
const SECTION_A_CRITERIA = [
  {
    id: 'responsibility',
    code: '(i)',
    name: 'Responsibility',
    applicableToggle: false,
    rubrics: {
      5: 'Seeks and accepts responsibility at all times',
      4: 'Very willing to accept responsibility',
      3: 'Accepts responsibility as it comes',
      2: 'Inclined to refer up matters he could himself decide',
      1: 'Avoids taking responsibility'
    }
  },
  {
    id: 'relationsColleagues',
    code: '(ii)',
    name: 'Relations with Colleagues',
    applicableToggle: false,
    rubrics: {
      5: 'Wins and retains the highest regard of all',
      4: 'Generally liked and respected',
      3: 'Gets on well with every one',
      2: 'Not very easy in his relationships',
      1: 'A difficult colleague'
    }
  },
  {
    id: 'contactPublic',
    code: '(iii)',
    name: 'Contact with Public',
    applicableToggle: true,
    rubrics: {
      5: 'Outstandingly effective in dealing with them',
      4: 'Considerate and firm as required',
      3: 'Handles them quite well',
      2: 'Manner tends to be unfortunate',
      1: 'Poor at dealing with them'
    }
  }
];

const SECTION_B_CRITERIA = [
  {
    id: 'output',
    code: '(iv)',
    name: 'Output',
    applicableToggle: false,
    rubrics: {
      5: 'Outstanding in the amount of work he does',
      4: 'Gets through a great deal of work',
      3: 'Output satisfactory',
      2: 'Does rather less than expected',
      1: 'Output regularly insufficient'
    }
  },
  {
    id: 'quality',
    code: '(v)',
    name: 'Quality',
    applicableToggle: false,
    rubrics: {
      5: 'Distinguished for accurate and thorough work',
      4: 'Maintains a high standard',
      3: 'Work is generally of good quality',
      2: 'Performance is uneven',
      1: 'Consistent low standard of work'
    }
  },
  {
    id: 'reliability',
    code: '(vi)',
    name: 'Reliability',
    applicableToggle: false,
    rubrics: {
      5: 'Can always be trusted to work effectively without supervision',
      4: 'Can usually be trusted to work at effective standard without supervision',
      3: 'Needs only occasional supervision',
      2: 'A steady worker, needs regular but not undue supervision',
      1: 'Cannot be depended on; Unreliable'
    }
  },
  {
    id: 'initiative',
    code: '(vii)',
    name: 'Initiative',
    applicableToggle: false,
    rubrics: {
      5: 'Highly resourceful, sees things to be done and does them; often thinks of new ideas',
      4: 'Usually alert for opportunities to improve work; will act on own initiative when necessary',
      3: 'Makes suggestions on areas on improvement',
      2: 'Usually has to be told what to do; seldom does anything on his own initiative',
      1: 'Always waits to be told what to do'
    }
  },
  {
    id: 'expressionPaper',
    code: '(viii)',
    name: 'Expression on Paper',
    applicableToggle: false,
    rubrics: {
      5: 'Brilliant on paper',
      4: 'Written work always clear, cogent and well set out',
      3: 'Generally expresses self clearly and concisely',
      2: 'Written work is just good enough to get by',
      1: 'Cannot express self clearly on paper'
    }
  },
  {
    id: 'oralExpression',
    code: '(ix)',
    name: 'Oral Expression',
    applicableToggle: false,
    rubrics: {
      5: 'Extremely effective',
      4: 'Puts his points across convincingly',
      3: 'Expresses himself adequately',
      2: 'Barely competent',
      1: 'Ineffective'
    }
  },
  {
    id: 'willingnessEnthusiasm',
    code: '(x)',
    name: 'Willingness & Enthusiasm',
    applicableToggle: false,
    rubrics: {
      5: 'Readiness to act with zeal; always works enthusiastically, can be trusted to do best at all times and try out new methods',
      4: 'Shows an interest in his Job; can be relied on to co-operate in any new methods or in difficult conditions',
      3: 'Willing and enthusiastic about jobs and tasks which appeal to him',
      2: 'Does what he is told and no more unless encouraged',
      1: 'Generally indifferent'
    }
  },
  {
    id: 'careEquipment',
    code: '(xi)',
    name: 'Care of Equipment & Housekeeping',
    applicableToggle: true,
    rubrics: {
      5: "Is fully alive to the need for safe-guarding Authority's property and goes out of his way to do so. Clean working habit. An example to the rest of the team",
      4: 'Usually maintains a high standard of care and cleanliness',
      3: 'Is a reasonably clean and careful worker with plant and equipment',
      2: 'Carries out specific instructions and maintains an acceptable minimum standard of working habits',
      1: 'An untidy and careless worker'
    }
  },
  {
    id: 'safety',
    code: '(xii)',
    name: 'Safety Consciousness',
    applicableToggle: true,
    rubrics: {
      5: 'Meticulously observes and encourages others to observe the safety instructions and brings potential hazards to the notice of management.',
      4: 'Very interested in accident prevention and sets a good example',
      3: 'Adopts a careful attitude towards safety',
      2: 'Carries out specific safety requirements',
      1: 'Adopts a careless attitude towards safety'
    }
  },
  {
    id: 'punctuality',
    code: '(xiii)',
    name: 'Punctuality',
    applicableToggle: false,
    rubrics: {
      5: 'Regularly punctual at work',
      4: 'Reasonably punctual',
      3: 'Late with reasonable notification',
      2: 'Late frequently',
      1: 'No regard for punctuality'
    }
  },
  {
    id: 'managementStaff',
    code: '(xiv)',
    name: 'Management of Staff',
    applicableToggle: true,
    rubrics: {
      5: 'Manages effectively to produce results',
      4: 'Averagely effective',
      3: 'Fairly effective',
      2: 'Just effective',
      1: 'Ineffective'
    }
  },
  {
    id: 'judgment',
    code: '(xv)',
    name: 'Judgment',
    applicableToggle: false,
    rubrics: {
      5: 'Decisions or proposals consistently sound',
      4: 'Dilatory but sound',
      3: 'Fairly sound',
      2: 'Half baked',
      1: 'Faulty/unsound'
    }
  }
];

const INITIAL_EMPLOYEES = [
  {
    id: 'emp-001',
    appraisalYear: '2026',
    periodLabel: 'January 2026 – December 2026',
    part1: {
      surname: 'OKONKWO',
      firstName: 'Chinedu',
      otherNames: 'Emmanuel',
      dob: '1986-04-14',
      location: 'Regional Grid Control Center - South',
      exitDate: '',
      department: 'System Operations & Reliability',
      section: '330kV Transmission Dispatch',
      staffNo: 'ENG-2026-0418',
      telephone: '+234-803-555-0192',
      qualifications: [
        'M.Sc. Electrical Power Systems Engineering (2018)',
        'COREN Registered Engineer — Reg. No. R.41,892',
        'Certified Cloud & SCADA Telemetry Specialist (2026 - Obtained in Period)'
      ],
      firstAppointmentDate: '2012-09-03',
      presentGrade: 'Principal Operations Engineer (GL 14)',
      gradeAppointmentDate: '2023-01-01',
      salaryCodeAndSalary: 'GL14 / Step 4 — $78,500 p.a.',
      coveringDuties: [
        { position: 'Ag. Assistant General Manager (System Control)', duration: '6 Weeks', date: '2026-07-01 to 2026-08-12' }
      ],
      coursesAttended: [
        { courseAndPlace: 'Advanced Grid Stability & Fault Analytics (London, UK)', duration: '2 Weeks', date: '2026-05-10' },
        { courseAndPlace: 'Enterprise Incident Command & Safety Leadership (Abuja)', duration: '5 Days', date: '2026-09-14' }
      ],
      absences: [
        { reason: 'Approved Annual Leave', period: '2026-10-05 to 2026-10-16', days: 10 }
      ]
    },
    part2Tasks: [
      { id: 1, task: 'Maintain 99.98% 330kV transmission corridor dispatch reliability across 14 substations', startDate: '2026-01-05', expectedDate: '2026-12-20', signedOff: true },
      { id: 2, task: 'Lead real-time frequency stabilization & load-shedding automation protocol rollout', startDate: '2026-02-01', expectedDate: '2026-06-30', signedOff: true },
      { id: 3, task: 'Mentor 6 junior shift control engineers on emergency black-start restoration drills', startDate: '2026-03-10', expectedDate: '2026-11-15', signedOff: true },
      { id: 4, task: 'Zero lost-time safety incidents across high-voltage switching operations', startDate: '2026-01-02', expectedDate: '2026-12-31', signedOff: true },
      { id: 5, task: 'Deliver quarterly executive outage root-cause & telemetry audit reports', startDate: '2026-01-15', expectedDate: '2026-12-15', signedOff: true }
    ],
    part3Targets: [
      { id: 1, target: 'Achieved 99.991% corridor uptime with zero cascading trip events', rating: 'E' },
      { id: 2, target: 'Completed automated frequency response telemetry deployment 3 weeks ahead of schedule', rating: 'E' },
      { id: 3, target: 'Certified all 6 junior engineers on black-start simulation assessments', rating: 'M' },
      { id: 4, target: 'Maintained 100% safety compliance record across 420+ switching permits', rating: 'E' },
      { id: 5, target: 'Submitted all 4 quarterly executive audit reports on or before deadline', rating: 'M' }
    ],
    employeeComments: 'I have reviewed this evaluation with my Reporting Officer and concur with the recorded achievements and developmental priorities.',
    employeeSignDate: '2026-12-18',
    scores: {
      responsibility: 5,
      relationsColleagues: 4,
      contactPublic: 4,
      output: 5,
      quality: 5,
      reliability: 5,
      initiative: 4,
      expressionPaper: 4,
      oralExpression: 5,
      willingnessEnthusiasm: 5,
      careEquipment: 5,
      safety: 5,
      punctuality: 5,
      managementStaff: 4,
      judgment: 5
    },
    applicability: {
      contactPublic: true,
      careEquipment: true,
      safety: true,
      managementStaff: true
    },
    remarks: {
      responsibility: 'Stepped up seamlessly while acting as AGM System Control during peak load season.',
      safety: 'Exemplary adherence to lockout/tagout protocols.'
    },
    part4: {
      skillGaps: [
        'Enterprise financial budgeting & capital expenditure modeling',
        'Cross-border regulatory tariff negotiations'
      ],
      suggestedTraining: [
        'Executive Financial Management for Engineering Leaders (6-Week Program)',
        'International Power Pool Regulatory Framework Workshop'
      ],
      incrementOverride: 'AUTO',
      deferredDuration: '',
      normalPromotabilityOverride: 'AUTO',
      specialPromotionTarget: 'Assistant General Manager (Grid Operations) — GL 15',
      specialPromotionReasons: 'Demonstrated sustained executive readiness during 6-week acting capacity and delivered top-decile operational reliability.',
      strengths: 'Exceptional technical judgment under high-pressure grid contingencies, decisive leadership, and uncompromising safety discipline.',
      weaknesses: 'Can delegate routine documentation earlier to free up strategic planning bandwidth.',
      reportingOfficerName: 'Engr. Amina Bello, FNSE',
      reportingOfficerDesignation: 'General Manager, System Operations',
      reportingOfficerDate: '2026-12-19',
      countersigningRemarks: 'I fully concur with the Reporting Officer. I have observed Engr. Okonkwo weekly during executive operational briefings and confirm his readiness for senior leadership.',
      countersigningAgreement: 'Agree',
      observationFrequency: 'Weekly / Bi-weekly operational reviews',
      broughtToAttention: true,
      countersigningName: 'Dr. Tunde Adeyemi',
      countersigningDesignation: 'Executive Director, Technical Services',
      countersigningDate: '2026-12-21'
    }
  },
  {
    id: 'emp-002',
    appraisalYear: '2026',
    periodLabel: 'January 2026 – December 2026',
    part1: {
      surname: 'MENSAH',
      firstName: 'Abena',
      otherNames: 'Grace',
      dob: '1991-08-22',
      location: 'Corporate Headquarters - Cloud & Digital Hub',
      exitDate: '',
      department: 'Enterprise Cloud & DevOps Infrastructure',
      section: 'Platform Reliability Engineering',
      staffNo: 'ICT-2026-0894',
      telephone: '+233-24-555-0831',
      qualifications: [
        'B.Sc. Computer Science (First Class Honours)',
        'AWS Certified Solutions Architect – Professional (2026 - Obtained in Period)',
        'Certified Kubernetes Administrator (CKA)'
      ],
      firstAppointmentDate: '2019-03-15',
      presentGrade: 'Senior Cloud Platform Engineer (GL 12)',
      gradeAppointmentDate: '2024-01-01',
      salaryCodeAndSalary: 'GL12 / Step 3 — $64,200 p.a.',
      coveringDuties: [],
      coursesAttended: [
        { courseAndPlace: 'Zero-Trust Cloud Security & FinOps Optimization (Virtual / AWS)', duration: '1 Week', date: '2026-04-18' }
      ],
      absences: [
        { reason: 'Approved Study & Exam Leave', period: '2026-06-15 to 2026-06-19', days: 5 }
      ]
    },
    part2Tasks: [
      { id: 1, task: 'Migrate 18 legacy enterprise billing microservices to multi-AZ Kubernetes clusters', startDate: '2026-01-12', expectedDate: '2026-08-30', signedOff: true },
      { id: 2, task: 'Implement automated CI/CD security scanning & secrets rotation across 45 repositories', startDate: '2026-02-15', expectedDate: '2026-07-31', signedOff: true },
      { id: 3, task: 'Reduce monthly cloud compute & storage spend by 18% via autoscaling policies', startDate: '2026-03-01', expectedDate: '2026-11-30', signedOff: true },
      { id: 4, task: 'Author enterprise disaster recovery runbooks and conduct bi-annual chaos drills', startDate: '2026-04-01', expectedDate: '2026-12-10', signedOff: true }
    ],
    part3Targets: [
      { id: 1, target: 'Migrated 18/18 microservices with zero customer-facing downtime', rating: 'E' },
      { id: 2, target: '100% CI/CD secret hygiene enforcement across all active production repos', rating: 'M' },
      { id: 3, target: 'Achieved 14.5% cloud cost reduction (slightly below 18% target due to Q4 traffic surge)', rating: 'M' },
      { id: 4, target: 'Completed DR runbooks and executed Q2 & Q4 failover drills within RTO targets', rating: 'M' }
    ],
    employeeComments: 'Grateful for the sponsorship toward my AWS Solutions Architect Professional certification this year.',
    employeeSignDate: '2026-12-17',
    scores: {
      responsibility: 4,
      relationsColleagues: 5,
      contactPublic: 3,
      output: 4,
      quality: 4,
      reliability: 4,
      initiative: 5,
      expressionPaper: 4,
      oralExpression: 4,
      willingnessEnthusiasm: 4,
      careEquipment: 4,
      safety: 4,
      punctuality: 4,
      managementStaff: 3,
      judgment: 4
    },
    applicability: {
      contactPublic: false,
      careEquipment: true,
      safety: false,
      managementStaff: false
    },
    remarks: {
      initiative: 'Proactively introduced automated FinOps dashboards that identified idle staging clusters.'
    },
    part4: {
      skillGaps: [
        'Direct supervisory management of multi-engineer squads',
        'Executive vendor contract negotiation'
      ],
      suggestedTraining: [
        'Technical Team Lead & People Management Bootcamp',
        'Enterprise IT Vendor & SLA Negotiation Workshop'
      ],
      incrementOverride: 'AUTO',
      deferredDuration: '',
      normalPromotabilityOverride: 'AUTO',
      specialPromotionTarget: '',
      specialPromotionReasons: '',
      strengths: 'Strong architectural automation mindset, collaborative team spirit, and high documentation clarity.',
      weaknesses: 'Needs greater exposure to leading cross-departmental stakeholder meetings.',
      reportingOfficerName: 'Samuel Peter, MSc',
      reportingOfficerDesignation: 'Head of Cloud Architecture & DevOps',
      reportingOfficerDate: '2026-12-18',
      countersigningRemarks: 'Confirmed. Ms. Mensah is a reliable technical contributor well suited for progression to Principal Engineer track.',
      countersigningAgreement: 'Agree',
      observationFrequency: 'Monthly architecture sprint reviews',
      broughtToAttention: true,
      countersigningName: 'Mrs. Folake Ogunleye',
      countersigningDesignation: 'Chief Information Officer',
      countersigningDate: '2026-12-20'
    }
  },
  {
    id: 'emp-003',
    appraisalYear: '2026',
    periodLabel: 'January 2026 – December 2026',
    part1: {
      surname: 'IBRAHIM',
      firstName: 'Musa',
      otherNames: 'Danladi',
      dob: '1994-11-09',
      location: 'Northern Distribution Depot',
      exitDate: '',
      department: 'Supply Chain & Fleet Logistics',
      section: 'Inventory & Heavy Equipment Maintenance',
      staffNo: 'LOG-2026-1129',
      telephone: '+234-809-555-0477',
      qualifications: [
        'HND Mechanical Engineering (2017)',
        'Associate Member, Chartered Institute of Logistics & Transport'
      ],
      firstAppointmentDate: '2021-06-01',
      presentGrade: 'Logistics & Fleet Officer II (GL 09)',
      gradeAppointmentDate: '2024-06-01',
      salaryCodeAndSalary: 'GL09 / Step 2 — $41,000 p.a.',
      coveringDuties: [],
      coursesAttended: [
        { courseAndPlace: 'Warehouse ERP Inventory Reconciliation (Kano)', duration: '3 Days', date: '2026-03-22' }
      ],
      absences: [
        { reason: 'Unexcused / Late Medical Notification', period: '2026-08-03 to 2026-08-06', days: 4 },
        { reason: 'Annual Leave', period: '2026-11-02 to 2026-11-11', days: 8 }
      ]
    },
    part2Tasks: [
      { id: 1, task: 'Maintain daily ERP stock reconciliation for 1,200+ spare part SKUs', startDate: '2026-01-05', expectedDate: '2026-12-20', signedOff: true },
      { id: 2, task: 'Enforce preventive maintenance schedules for 28 utility fleet vehicles', startDate: '2026-01-10', expectedDate: '2026-12-15', signedOff: true },
      { id: 3, task: 'Reduce spare-part dispatch turnaround time from 48 hours to 24 hours', startDate: '2026-02-01', expectedDate: '2026-09-30', signedOff: true }
    ],
    part3Targets: [
      { id: 1, target: 'ERP stock accuracy stood at 91% against 98% corporate benchmark', rating: 'N' },
      { id: 2, target: 'Completed 22 of 28 scheduled preventive fleet services on time', rating: 'M' },
      { id: 3, target: 'Average dispatch turnaround remained at 39 hours due to manual paperwork delays', rating: 'N' }
    ],
    employeeComments: 'I acknowledge the feedback regarding ERP timeliness and punctuality and will adhere strictly to my improvement plan.',
    employeeSignDate: '2026-12-16',
    scores: {
      responsibility: 2,
      relationsColleagues: 3,
      contactPublic: 3,
      output: 2,
      quality: 2,
      reliability: 2,
      initiative: 2,
      expressionPaper: 2,
      oralExpression: 3,
      willingnessEnthusiasm: 3,
      careEquipment: 3,
      safety: 3,
      punctuality: 2,
      managementStaff: 2,
      judgment: 2
    },
    applicability: {
      contactPublic: true,
      careEquipment: true,
      safety: true,
      managementStaff: false
    },
    remarks: {
      punctuality: 'Cautioned twice in Q3 regarding morning shift arrival times.',
      reliability: 'Requires frequent supervisory follow-up to close weekly stock audits.'
    },
    part4: {
      skillGaps: [
        'ERP inventory data entry accuracy & reconciliation discipline',
        'Time management, shift punctuality & proactive reporting'
      ],
      suggestedTraining: [
        'Hands-on SAP/ERP Inventory Control Intensive Refresher',
        'Workplace Accountability & Time Management Coaching'
      ],
      incrementOverride: 'AUTO',
      deferredDuration: '6 Months',
      normalPromotabilityOverride: 'AUTO',
      specialPromotionTarget: '',
      specialPromotionReasons: '',
      strengths: 'Courteous with depot visitors and demonstrates good hands-on mechanical familiarity.',
      weaknesses: 'Inconsistent follow-through on deadlines, frequent late arrivals, and recurring stock audit variances.',
      reportingOfficerName: 'Mr. Victor Okafor',
      reportingOfficerDesignation: 'Regional Logistics Manager',
      reportingOfficerDate: '2026-12-17',
      countersigningRemarks: 'Concur with a 6-month structured Performance Improvement Plan (PIP) prior to reconsidering annual increment.',
      countersigningAgreement: 'Agree',
      observationFrequency: 'Bi-weekly depot inspections',
      broughtToAttention: true,
      countersigningName: 'Alhaji Suleiman Musa',
      countersigningDesignation: 'Director, Supply Chain & Administration',
      countersigningDate: '2026-12-19'
    }
  }
];

function createBlankEmployee(form) {
  return {
    id: `emp-${Date.now()}`,
    appraisalYear: form.appraisalYear || '2026',
    periodLabel: `January ${form.appraisalYear || '2026'} – December ${form.appraisalYear || '2026'}`,
    part1: {
      surname: (form.surname || 'DOE').toUpperCase(),
      firstName: form.firstName || 'Jane',
      otherNames: form.otherNames || '',
      dob: form.dob || '1990-01-01',
      location: form.location || 'Headquarters',
      exitDate: '',
      department: form.department || 'Operations',
      section: form.section || 'General Unit',
      staffNo: form.staffNo || `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      telephone: form.telephone || '',
      qualifications: [form.qualification || 'B.Sc. / HND Relevant Discipline'],
      firstAppointmentDate: form.firstAppointmentDate || '2022-01-10',
      presentGrade: form.presentGrade || 'Officer I (GL 10)',
      gradeAppointmentDate: form.gradeAppointmentDate || '2024-01-01',
      salaryCodeAndSalary: form.salaryCodeAndSalary || 'GL10 / Step 1',
      coveringDuties: [],
      coursesAttended: [],
      absences: []
    },
    part2Tasks: [
      { id: 1, task: 'Execute core departmental operational deliverables within SLA timelines', startDate: `${form.appraisalYear || '2026'}-01-05`, expectedDate: `${form.appraisalYear || '2026'}-12-15`, signedOff: true },
      { id: 2, task: 'Maintain quality assurance, documentation, and compliance standards', startDate: `${form.appraisalYear || '2026'}-01-10`, expectedDate: `${form.appraisalYear || '2026'}-12-20`, signedOff: true }
    ],
    part3Targets: [
      { id: 1, target: 'Delivered assigned operational KPIs within agreed schedule', rating: 'M' },
      { id: 2, target: 'Maintained compliance with quality and safety standards', rating: 'M' }
    ],
    employeeComments: '',
    employeeSignDate: `${form.appraisalYear || '2026'}-12-15`,
    scores: {
      responsibility: 3,
      relationsColleagues: 3,
      contactPublic: 3,
      output: 3,
      quality: 3,
      reliability: 3,
      initiative: 3,
      expressionPaper: 3,
      oralExpression: 3,
      willingnessEnthusiasm: 3,
      careEquipment: 3,
      safety: 3,
      punctuality: 3,
      managementStaff: 3,
      judgment: 3
    },
    applicability: {
      contactPublic: true,
      careEquipment: true,
      safety: true,
      managementStaff: false
    },
    remarks: {},
    part4: {
      skillGaps: [''],
      suggestedTraining: [''],
      incrementOverride: 'AUTO',
      deferredDuration: '',
      normalPromotabilityOverride: 'AUTO',
      specialPromotionTarget: '',
      specialPromotionReasons: '',
      strengths: '',
      weaknesses: '',
      reportingOfficerName: '',
      reportingOfficerDesignation: '',
      reportingOfficerDate: `${form.appraisalYear || '2026'}-12-18`,
      countersigningRemarks: '',
      countersigningAgreement: 'Agree',
      observationFrequency: 'Monthly reviews',
      broughtToAttention: true,
      countersigningName: '',
      countersigningDesignation: '',
      countersigningDate: `${form.appraisalYear || '2026'}-12-20`
    }
  };
}

// --- SCORING ENGINE ---
function computeEmployeeMetrics(emp, weightA) {
  const weightB = 100 - weightA;

  const activeA = SECTION_A_CRITERIA.filter(
    (c) => !c.applicableToggle || emp.applicability[c.id]
  );
  const activeB = SECTION_B_CRITERIA.filter(
    (c) => !c.applicableToggle || emp.applicability[c.id]
  );

  const sumA = activeA.reduce((acc, c) => acc + (emp.scores[c.id] || 3), 0);
  const avgA = activeA.length > 0 ? sumA / activeA.length : 0;

  const sumB = activeB.reduce((acc, c) => acc + (emp.scores[c.id] || 3), 0);
  const avgB = activeB.length > 0 ? sumB / activeB.length : 0;

  const weightedComposite = avgA * (weightA / 100) + avgB * (weightB / 100);
  const percentageScore = (weightedComposite / 5) * 100;

  // Target stats (Part III)
  const validTargets = emp.part3Targets.filter((t) => t.target.trim().length > 0);
  const exceededCount = validTargets.filter((t) => t.rating === 'E').length;
  const metCount = validTargets.filter((t) => t.rating === 'M').length;
  const notMetCount = validTargets.filter((t) => t.rating === 'N').length;

  // Automated Decision Support
  let autoIncrement = 'Awarded Normal';
  let autoPromotability = 'Fitted';
  let tierLabel = 'Meets Expectations';
  let tierBadgeColor = 'bg-sky-500/20 text-sky-200 border-sky-400/40';

  if (weightedComposite >= 4.5) {
    autoIncrement = 'Awarded Double';
    autoPromotability = 'Well Fitted';
    tierLabel = 'Distinguished / Exceptional';
    tierBadgeColor = 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40';
  } else if (weightedComposite >= 3.75) {
    autoIncrement = 'Awarded Normal';
    autoPromotability = 'Well Fitted';
    tierLabel = 'Exceeds Expectations';
    tierBadgeColor = 'bg-sky-500/20 text-sky-200 border-sky-400/40';
  } else if (weightedComposite >= 3.0) {
    autoIncrement = 'Awarded Normal';
    autoPromotability = 'Fitted';
    tierLabel = 'Competent / Satisfactory';
    tierBadgeColor = 'bg-blue-500/20 text-blue-200 border-blue-400/40';
  } else if (weightedComposite >= 2.25) {
    autoIncrement = 'Deferred';
    autoPromotability = 'Not Fitted';
    tierLabel = 'Needs Improvement (PIP)';
    tierBadgeColor = 'bg-amber-500/20 text-amber-200 border-amber-400/40';
  } else {
    autoIncrement = 'Withheld';
    autoPromotability = 'Not Fitted';
    tierLabel = 'Unsatisfactory';
    tierBadgeColor = 'bg-rose-500/20 text-rose-200 border-rose-400/40';
  }

  const effectiveIncrement =
    emp.part4.incrementOverride === 'AUTO' ? autoIncrement : emp.part4.incrementOverride;
  const effectivePromotability =
    emp.part4.normalPromotabilityOverride === 'AUTO'
      ? autoPromotability
      : emp.part4.normalPromotabilityOverride;

  return {
    avgA,
    avgB,
    activeACount: activeA.length,
    activeBCount: activeB.length,
    weightedComposite,
    percentageScore,
    exceededCount,
    metCount,
    notMetCount,
    totalTargets: validTargets.length,
    autoIncrement,
    autoPromotability,
    effectiveIncrement,
    effectivePromotability,
    tierLabel,
    tierBadgeColor
  };
}

// --- SVG RADAR CHART COMPONENT ---
function CompetencyRadarChart({ emp, compareEmp }) {
  const axes = [
    { label: 'Responsibility', val: emp.scores.responsibility, compVal: compareEmp?.scores.responsibility },
    { label: 'Colleagues', val: emp.scores.relationsColleagues, compVal: compareEmp?.scores.relationsColleagues },
    { label: 'Output', val: emp.scores.output, compVal: compareEmp?.scores.output },
    { label: 'Quality', val: emp.scores.quality, compVal: compareEmp?.scores.quality },
    { label: 'Reliability', val: emp.scores.reliability, compVal: compareEmp?.scores.reliability },
    { label: 'Initiative', val: emp.scores.initiative, compVal: compareEmp?.scores.initiative },
    { label: 'Communication', val: (emp.scores.expressionPaper + emp.scores.oralExpression) / 2, compVal: compareEmp ? (compareEmp.scores.expressionPaper + compareEmp.scores.oralExpression) / 2 : null },
    { label: 'Enthusiasm', val: emp.scores.willingnessEnthusiasm, compVal: compareEmp?.scores.willingnessEnthusiasm },
    { label: 'Punctuality', val: emp.scores.punctuality, compVal: compareEmp?.scores.punctuality },
    { label: 'Judgment', val: emp.scores.judgment, compVal: compareEmp?.scores.judgment }
  ];

  const size = 320;
  const center = size / 2;
  const maxRadius = 105;
  const levels = [1, 2, 3, 4, 5];

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const r = (value / 5) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const primaryPoints = axes
    .map((a, i) => {
      const pt = getPoint(i, a.val);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  const comparePoints = compareEmp
    ? axes
        .map((a, i) => {
          const pt = getPoint(i, a.compVal || 0);
          return `${pt.x},${pt.y}`;
        })
        .join(' ')
    : '';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] h-auto overflow-visible">
        <defs>
          <linearGradient id="radarPrimaryFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {levels.map((lvl) => {
          const ringPts = axes
            .map((_, i) => {
              const pt = getPoint(i, lvl);
              return `${pt.x},${pt.y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvl}
              points={ringPts}
              fill="none"
              stroke={lvl === 3 ? '#94a3b8' : '#e2e8f0'}
              strokeWidth={lvl === 3 ? '1.2' : '1'}
              strokeDasharray={lvl === 3 ? '3 3' : 'none'}
            />
          );
        })}

        {axes.map((a, i) => {
          const outer = getPoint(i, 5);
          const labelPt = getPoint(i, 6.05);
          return (
            <g key={a.label}>
              <line
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-600 text-[9.5px] font-semibold"
              >
                {a.label}
              </text>
            </g>
          );
        })}

        {compareEmp && (
          <polygon
            points={comparePoints}
            fill="rgba(225, 29, 72, 0.14)"
            stroke="#e11d48"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        )}

        <polygon
          points={primaryPoints}
          fill="url(#radarPrimaryFill)"
          stroke="#0284c7"
          strokeWidth="2.5"
        />

        {axes.map((a, i) => {
          const pt = getPoint(i, a.val);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#0284c7"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-600 inline-block"></span>
          {emp.part1.firstName} {emp.part1.surname}
        </span>
        {compareEmp && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
            {compareEmp.part1.firstName} {compareEmp.part1.surname}
          </span>
        )}
      </div>
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('annual_eval_app_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EMPLOYEES;
  });

  const [selectedEmpId, setSelectedEmpId] = useState(employees[0].id);
  const [weightA, setWeightA] = useState(30);
  const [activeTab, setActiveTab] = useState('simulator');
  const [compareOverlayId, setCompareOverlayId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({
    surname: '',
    firstName: '',
    otherNames: '',
    staffNo: '',
    department: '',
    section: '',
    location: '',
    presentGrade: '',
    salaryCodeAndSalary: '',
    appraisalYear: '2026',
    qualification: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('annual_eval_app_v1', JSON.stringify(employees));
    } catch (e) {
      console.error(e);
    }
  }, [employees]);

  const currentEmp = useMemo(
    () => employees.find((e) => e.id === selectedEmpId) || employees[0],
    [employees, selectedEmpId]
  );

  const compareOverlayEmp = useMemo(
    () => employees.find((e) => e.id === compareOverlayId) || null,
    [employees, compareOverlayId]
  );

  const metrics = useMemo(
    () => computeEmployeeMetrics(currentEmp, weightA),
    [currentEmp, weightA]
  );

  const weightB = 100 - weightA;

  // --- UPDATERS ---
  const updateCurrentEmployee = (updater) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === currentEmp.id ? updater(emp) : emp))
    );
  };

  const handleScoreChange = (criterionId, value) => {
    const numericVal = Number(value);
    updateCurrentEmployee((emp) => ({
      ...emp,
      scores: {
        ...emp.scores,
        [criterionId]: numericVal
      }
    }));
  };

  const handleToggleApplicable = (criterionId) => {
    updateCurrentEmployee((emp) => ({
      ...emp,
      applicability: {
        ...emp.applicability,
        [criterionId]: !emp.applicability[criterionId]
      }
    }));
  };

  const handlePart1Change = (field, value) => {
    updateCurrentEmployee((emp) => ({
      ...emp,
      part1: {
        ...emp.part1,
        [field]: value
      }
    }));
  };

  const handlePart4Change = (field, value) => {
    updateCurrentEmployee((emp) => ({
      ...emp,
      part4: {
        ...emp.part4,
        [field]: value
      }
    }));
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all appraisal records and sliders back to the default enterprise dataset?')) {
      setEmployees(INITIAL_EMPLOYEES);
      setSelectedEmpId(INITIAL_EMPLOYEES[0].id);
      setWeightA(30);
      setCompareOverlayId('');
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newStaffForm.surname.trim() || !newStaffForm.firstName.trim()) return;
    const created = createBlankEmployee(newStaffForm);
    setEmployees((prev) => [...prev, created]);
    setSelectedEmpId(created.id);
    setShowAddModal(false);
    setNewStaffForm({
      surname: '',
      firstName: '',
      otherNames: '',
      staffNo: '',
      department: '',
      section: '',
      location: '',
      presentGrade: '',
      salaryCodeAndSalary: '',
      appraisalYear: '2026',
      qualification: ''
    });
  };

  const getScoreColorClass = (score) => {
    if (score >= 5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score === 4) return 'text-sky-600 bg-sky-50 border-sky-200';
    if (score === 3) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score === 2) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* TOP EXECUTIVE HEADER */}
      <header className="bg-gradient-to-r from-sky-950 via-slate-900 to-rose-950 text-white border-b border-white/10 shadow-lg no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Brand & Context */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>Enterprise Staff Appraisal & Decision Simulator</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white">
                  FY {currentEmp.appraisalYear}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 bg-gradient-to-r from-white via-sky-100 to-rose-200 bg-clip-text text-transparent">
                Annual Evaluation Performance App
              </h1>
            </div>

            {/* Staff Selector & Global Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center bg-white/10 border border-white/15 rounded-lg px-3 py-1.5">
                <Users className="w-4 h-4 text-sky-300 mr-2 shrink-0" />
                <select
                  aria-label="Select Staff Member"
                  value={currentEmp.id}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="bg-transparent text-sm font-medium text-white focus:outline-none pr-2 cursor-pointer"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id} className="text-slate-900 bg-white">
                      {emp.part1.surname}, {emp.part1.firstName} ({emp.part1.staffNo})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-500 to-rose-600 hover:from-sky-400 hover:to-rose-500 text-white shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Staff</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('report');
                  setTimeout(() => window.print(), 150);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-sky-300" />
                <span>Export Report</span>
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                title="Reset to default sample data"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-rose-500/30 text-slate-200 border border-white/15 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-rose-300" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO EXECUTIVE SCORECARD BANNER */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 no-print">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-rose-950 text-white p-6 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Composite Score Block */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/15 pb-5 lg:pb-0 lg:pr-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                  Weighted Evaluation Score
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${metrics.tierBadgeColor}`}>
                  {metrics.tierLabel}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-white to-rose-300 bg-clip-text text-transparent">
                  {metrics.weightedComposite.toFixed(2)}
                </span>
                <span className="text-xl font-semibold text-slate-400">/ 5.00</span>
                <span className="ml-auto text-lg font-bold text-sky-300">
                  {metrics.percentageScore.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
                <span>
                  <strong className="text-white">{currentEmp.part1.firstName} {currentEmp.part1.surname}</strong> • {currentEmp.part1.presentGrade}
                </span>
                <span className="text-rose-300 font-medium">
                  Period: Jan {currentEmp.appraisalYear} – Dec {currentEmp.appraisalYear}
                </span>
              </div>

              {/* Overall Progress Meter */}
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-rose-500 transition-all duration-200"
                  style={{ width: `${Math.min(100, Math.max(0, metrics.percentageScore))}%` }}
                />
              </div>
            </div>

            {/* Right 4 KPI Sub-Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* KPI 1: Section A */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-sky-300 font-semibold">
                  <span>A. CHARACTER & PERSONALITY</span>
                  <span>Weight: {weightA}%</span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white">
                    {metrics.avgA.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                  </span>
                  <span className="text-xs text-slate-300">
                    {metrics.activeACount} active criteria
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Weighted Contribution: <strong className="text-sky-300">+{(metrics.avgA * (weightA / 100)).toFixed(2)} pts</strong>
                </div>
              </div>

              {/* KPI 2: Section B */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
                  <span>B. PERFORMANCE OF DUTIES</span>
                  <span>Weight: {weightB}%</span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white">
                    {metrics.avgB.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                  </span>
                  <span className="text-xs text-slate-300">
                    {metrics.activeBCount} active criteria
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Weighted Contribution: <strong className="text-rose-300">+{(metrics.avgB * (weightB / 100)).toFixed(2)} pts</strong>
                </div>
              </div>

              {/* KPI 3: Part III Targets */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span>PART III TARGETS ATTAINED</span>
                  <span>{metrics.totalTargets} Targets</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-bold">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    E: {metrics.exceededCount}
                  </span>
                  <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    M: {metrics.metCount}
                  </span>
                  <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                    N: {metrics.notMetCount}
                  </span>
                </div>
              </div>

              {/* KPI 4: Automated Recommendation */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span>PART IV DECISION ENGINE</span>
                  <span>{currentEmp.part4.incrementOverride === 'AUTO' ? 'Live Auto' : 'Manual Override'}</span>
                </div>
                <div className="mt-1.5 text-sm font-bold text-white truncate">
                  Increment: <span className="text-sky-300">{metrics.effectiveIncrement}</span>
                </div>
                <div className="mt-0.5 text-xs text-slate-300 truncate">
                  Promotability: <strong className="text-rose-300">{metrics.effectivePromotability}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 no-print">
        <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
          {[
            { id: 'simulator', label: 'Interactive Scoring Simulator', icon: Sliders },
            { id: 'part1', label: 'Part I: Personal & Employment', icon: UserCheck },
            { id: 'part2_3', label: 'Part II & III: Tasks & Targets', icon: ClipboardList },
            { id: 'part4', label: 'Part IV: Training & Decisions', icon: Award },
            { id: 'compare', label: 'Side-by-Side Staff Comparison', icon: BarChart3 },
            { id: 'report', label: 'Official Appraisal Form View', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-sky-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-12">
        {/* TAB 1: INTERACTIVE SCORING SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* CATEGORY WEIGHTING SLIDER BAR */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-sky-600" />
                    <span>Category Relative Weighting Simulator (Section A vs. Section B)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Drag the slider to adjust the policy weight between Character & Personality and Performance of Duties.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm font-bold">
                  <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                    Section A: {weightA}%
                  </span>
                  <span className="text-slate-400">/</span>
                  <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                    Section B: {weightB}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-sky-700 w-24">Character (A)</span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={weightA}
                  onChange={(e) => setWeightA(Number(e.target.value))}
                  className="w-full h-2.5 bg-gradient-to-r from-sky-500 to-rose-500 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <span className="text-xs font-semibold text-rose-700 w-24 text-right">Duties (B)</span>
              </div>
            </div>

            {/* TWO-COLUMN SIMULATOR WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT 7 COLUMNS: INTERACTIVE SLIDERS */}
              <div className="lg:col-span-7 space-y-6">
                {/* SECTION A CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-600 to-sky-800 px-5 py-3.5 text-white flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider">
                        A. Character and Personality
                      </h3>
                      <p className="text-xs text-sky-100">
                        Behavioral conduct, responsibility & interpersonal effectiveness (1–5 Scale)
                      </p>
                    </div>
                    <span className="text-lg font-extrabold bg-white/15 px-3 py-1 rounded-lg">
                      Avg: {metrics.avgA.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-5 divide-y divide-slate-100">
                    {SECTION_A_CRITERIA.map((criterion) => {
                      const isApplicable = !criterion.applicableToggle || currentEmp.applicability[criterion.id];
                      const currentScore = currentEmp.scores[criterion.id] || 3;
                      return (
                        <div key={criterion.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                                {criterion.code}
                              </span>
                              <span className="font-bold text-sm text-slate-900">
                                {criterion.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {criterion.applicableToggle && (
                                <button
                                  type="button"
                                  onClick={() => handleToggleApplicable(criterion.id)}
                                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition cursor-pointer ${
                                    isApplicable
                                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                                      : 'bg-slate-100 text-slate-500 border-slate-200'
                                  }`}
                                >
                                  {isApplicable ? 'Applicable' : 'N/A (Excluded)'}
                                </button>
                              )}

                              {isApplicable && (
                                <span
                                  className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${getScoreColorClass(
                                    currentScore
                                  )}`}
                                >
                                  Score: {currentScore} / 5
                                </span>
                              )}
                            </div>
                          </div>

                          {isApplicable ? (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400">1</span>
                                <input
                                  type="range"
                                  min="1"
                                  max="5"
                                  step="1"
                                  value={currentScore}
                                  onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                                />
                                <span className="text-xs font-bold text-slate-400">5</span>
                              </div>
                              <p className="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg px-3 py-2">
                                <strong className="text-slate-800">Level {currentScore} Descriptor:</strong>{' '}
                                {criterion.rubrics[currentScore]}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs italic text-slate-400">
                              Marked Not Applicable for this role; excluded from Section A average.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION B CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-700 to-rose-900 px-5 py-3.5 text-white flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider">
                        B. Performance of Duties
                      </h3>
                      <p className="text-xs text-rose-100">
                        Core job execution, output, quality, safety, punctuality & leadership (1–5 Scale)
                      </p>
                    </div>
                    <span className="text-lg font-extrabold bg-white/15 px-3 py-1 rounded-lg">
                      Avg: {metrics.avgB.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-5 divide-y divide-slate-100">
                    {SECTION_B_CRITERIA.map((criterion) => {
                      const isApplicable = !criterion.applicableToggle || currentEmp.applicability[criterion.id];
                      const currentScore = currentEmp.scores[criterion.id] || 3;
                      return (
                        <div key={criterion.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                                {criterion.code}
                              </span>
                              <span className="font-bold text-sm text-slate-900">
                                {criterion.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {criterion.applicableToggle && (
                                <button
                                  type="button"
                                  onClick={() => handleToggleApplicable(criterion.id)}
                                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition cursor-pointer ${
                                    isApplicable
                                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                                      : 'bg-slate-100 text-slate-500 border-slate-200'
                                  }`}
                                >
                                  {isApplicable ? 'Applicable' : 'N/A (Excluded)'}
                                </button>
                              )}

                              {isApplicable && (
                                <span
                                  className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${getScoreColorClass(
                                    currentScore
                                  )}`}
                                >
                                  Score: {currentScore} / 5
                                </span>
                              )}
                            </div>
                          </div>

                          {isApplicable ? (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400">1</span>
                                <input
                                  type="range"
                                  min="1"
                                  max="5"
                                  step="1"
                                  value={currentScore}
                                  onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                />
                                <span className="text-xs font-bold text-slate-400">5</span>
                              </div>
                              <p className="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg px-3 py-2">
                                <strong className="text-slate-800">Level {currentScore} Descriptor:</strong>{' '}
                                {criterion.rubrics[currentScore]}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs italic text-slate-400">
                              Marked Not Applicable for this role; excluded from Section B average.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT 5 COLUMNS: STICKY LIVE VISUALIZATION PANEL */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
                {/* Radar Profile Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Multi-Axis Competency Radar
                      </h3>
                      <p className="text-xs text-slate-500">
                        Real-time behavioral & operational profile
                      </p>
                    </div>

                    <select
                      aria-label="Overlay Staff Comparison"
                      value={compareOverlayId}
                      onChange={(e) => setCompareOverlayId(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-none"
                    >
                      <option value="">Overlay Peer: None</option>
                      {employees
                        .filter((e) => e.id !== currentEmp.id)
                        .map((e) => (
                          <option key={e.id} value={e.id}>
                            vs. {e.part1.firstName} {e.part1.surname}
                          </option>
                        ))}
                    </select>
                  </div>

                  <CompetencyRadarChart emp={currentEmp} compareEmp={compareOverlayEmp} />
                </div>

                {/* Weighted Breakdown Bar Visualization */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-sm text-slate-900 mb-3">
                    Weighted Score Contribution Breakdown
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-sky-700">Section A: Character ({weightA}% weight)</span>
                        <span className="text-slate-800">
                          {(metrics.avgA * (weightA / 100)).toFixed(2)} / {(5 * (weightA / 100)).toFixed(2)} pts
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-600 transition-all duration-200"
                          style={{ width: `${(metrics.avgA / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-rose-700">Section B: Performance of Duties ({weightB}% weight)</span>
                        <span className="text-slate-800">
                          {(metrics.avgB * (weightB / 100)).toFixed(2)} / {(5 * (weightB / 100)).toFixed(2)} pts
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-600 transition-all duration-200"
                          style={{ width: `${(metrics.avgB / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Decision Box */}
                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                      <div className="text-[11px] font-semibold uppercase text-sky-700">
                        Recommended Increment
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {metrics.effectiveIncrement}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                      <div className="text-[11px] font-semibold uppercase text-rose-700">
                        Promotability Status
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {metrics.effectivePromotability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PART I PERSONAL & EMPLOYMENT HISTORY */}
        {activeTab === 'part1' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Part I (To be completed by the employee whose performance is being evaluated)
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  Personal History, Qualifications & Employment Record
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600">Appraisal Year:</label>
                <input
                  type="text"
                  value={currentEmp.appraisalYear}
                  onChange={(e) =>
                    updateCurrentEmployee((emp) => ({
                      ...emp,
                      appraisalYear: e.target.value,
                      periodLabel: `January ${e.target.value} – December ${e.target.value}`
                    }))
                  }
                  className="w-24 border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Bio/Demographic Grid */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                1. Bio / Demographic Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Surname', key: 'surname' },
                  { label: 'First Name', key: 'firstName' },
                  { label: 'Other Names', key: 'otherNames' },
                  { label: 'Date of Birth', key: 'dob', type: 'date' },
                  { label: 'Location', key: 'location' },
                  { label: 'Exit Date (if applicable)', key: 'exitDate', type: 'date' },
                  { label: 'Department', key: 'department' },
                  { label: 'Section', key: 'section' },
                  { label: 'Staff No.', key: 'staffNo' },
                  { label: 'Telephone No.', key: 'telephone' }
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type || 'text'}
                      value={currentEmp.part1[field.key] || ''}
                      onChange={(e) => handlePart1Change(field.key, e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Employment History */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                2. Employment History
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Date of First Appointment', key: 'firstAppointmentDate', type: 'date' },
                  { label: 'Present Substantive Grade', key: 'presentGrade' },
                  { label: 'Date Appointed to Substantive Grade', key: 'gradeAppointmentDate', type: 'date' },
                  { label: 'Salary Code and Present Salary', key: 'salaryCodeAndSalary' }
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type || 'text'}
                      value={currentEmp.part1[field.key] || ''}
                      onChange={(e) => handlePart1Change(field.key, e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  3. Qualifications (Degrees, Professional Memberships & No., Diplomas, Certificates)
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    handlePart1Change('qualifications', [...currentEmp.part1.qualifications, ''])
                  }
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
                >
                  + Add Qualification
                </button>
              </div>
              <div className="space-y-2">
                {currentEmp.part1.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-5">{idx + 1}.</span>
                    <input
                      type="text"
                      value={q}
                      placeholder="Enter degree, membership number, or certificate..."
                      onChange={(e) => {
                        const updated = [...currentEmp.part1.qualifications];
                        updated[idx] = e.target.value;
                        handlePart1Change('qualifications', updated);
                      }}
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Covering of Duty */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  4. Covering of Duty Held During Appraisal Period
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    handlePart1Change('coveringDuties', [
                      ...currentEmp.part1.coveringDuties,
                      { position: '', duration: '', date: '' }
                    ])
                  }
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
                >
                  + Add Covering Duty
                </button>
              </div>
              {currentEmp.part1.coveringDuties.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No acting or covering duties recorded.</p>
              ) : (
                <div className="space-y-2">
                  {currentEmp.part1.coveringDuties.map((cd, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="Position(s) Covered"
                        value={cd.position}
                        onChange={(e) => {
                          const updated = [...currentEmp.part1.coveringDuties];
                          updated[idx] = { ...cd, position: e.target.value };
                          handlePart1Change('coveringDuties', updated);
                        }}
                        className="col-span-6 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={cd.duration}
                        onChange={(e) => {
                          const updated = [...currentEmp.part1.coveringDuties];
                          updated[idx] = { ...cd, duration: e.target.value };
                          handlePart1Change('coveringDuties', updated);
                        }}
                        className="col-span-3 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Date / Period"
                        value={cd.date}
                        onChange={(e) => {
                          const updated = [...currentEmp.part1.coveringDuties];
                          updated[idx] = { ...cd, date: e.target.value };
                          handlePart1Change('coveringDuties', updated);
                        }}
                        className="col-span-3 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Courses & Absences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              {/* Courses Attended */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    5. Courses Attended During Period
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      handlePart1Change('coursesAttended', [
                        ...currentEmp.part1.coursesAttended,
                        { courseAndPlace: '', duration: '', date: '' }
                      ])
                    }
                    className="text-xs font-semibold text-sky-600 cursor-pointer"
                  >
                    + Add Course
                  </button>
                </div>
                {currentEmp.part1.coursesAttended.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No courses recorded.</p>
                ) : (
                  <div className="space-y-2">
                    {currentEmp.part1.coursesAttended.map((c, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Course & Place"
                          value={c.courseAndPlace}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.coursesAttended];
                            updated[idx] = { ...c, courseAndPlace: e.target.value };
                            handlePart1Change('coursesAttended', updated);
                          }}
                          className="col-span-6 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Duration"
                          value={c.duration}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.coursesAttended];
                            updated[idx] = { ...c, duration: e.target.value };
                            handlePart1Change('coursesAttended', updated);
                          }}
                          className="col-span-3 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Date"
                          value={c.date}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.coursesAttended];
                            updated[idx] = { ...c, date: e.target.value };
                            handlePart1Change('coursesAttended', updated);
                          }}
                          className="col-span-3 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Absence Records */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    6. Days Absent During Period of Report
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      handlePart1Change('absences', [
                        ...currentEmp.part1.absences,
                        { reason: '', period: '', days: 0 }
                      ])
                    }
                    className="text-xs font-semibold text-rose-600 cursor-pointer"
                  >
                    + Add Absence Record
                  </button>
                </div>
                {currentEmp.part1.absences.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Zero absences recorded.</p>
                ) : (
                  <div className="space-y-2">
                    {currentEmp.part1.absences.map((a, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Reason for Absence"
                          value={a.reason}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.absences];
                            updated[idx] = { ...a, reason: e.target.value };
                            handlePart1Change('absences', updated);
                          }}
                          className="col-span-5 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Period"
                          value={a.period}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.absences];
                            updated[idx] = { ...a, period: e.target.value };
                            handlePart1Change('absences', updated);
                          }}
                          className="col-span-5 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="number"
                          placeholder="Days"
                          value={a.days}
                          onChange={(e) => {
                            const updated = [...currentEmp.part1.absences];
                            updated[idx] = { ...a, days: Number(e.target.value) };
                            handlePart1Change('absences', updated);
                          }}
                          className="col-span-2 border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PART II & PART III TASKS & TARGETS */}
        {activeTab === 'part2_3' && (
          <div className="space-y-6">
            {/* PART II: MAJOR TASKS ASSIGNED */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                    Part II • Present Job (Up to 15 Major Tasks Assigned)
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    Major Tasks Assigned & Dual Sign-Off Schedule
                  </h2>
                </div>
                {currentEmp.part2Tasks.length < 15 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateCurrentEmployee((emp) => ({
                        ...emp,
                        part2Tasks: [
                          ...emp.part2Tasks,
                          {
                            id: emp.part2Tasks.length + 1,
                            task: '',
                            startDate: `${emp.appraisalYear}-01-10`,
                            expectedDate: `${emp.appraisalYear}-12-15`,
                            signedOff: true
                          }
                        ]
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 cursor-pointer"
                  >
                    + Add Task ({currentEmp.part2Tasks.length}/15)
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                      <th className="py-2.5 px-3 w-12">#</th>
                      <th className="py-2.5 px-3">Major Task Assigned</th>
                      <th className="py-2.5 px-3 w-36">Start Date</th>
                      <th className="py-2.5 px-3 w-36">Expected Completion</th>
                      <th className="py-2.5 px-3 w-32 text-center">Dual Sign-Off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {currentEmp.part2Tasks.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="py-2.5 px-3 font-bold text-slate-400">{idx + 1}.</td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={item.task}
                            placeholder="Describe assigned task..."
                            onChange={(e) => {
                              const updated = [...currentEmp.part2Tasks];
                              updated[idx] = { ...item, task: e.target.value };
                              updateCurrentEmployee((emp) => ({ ...emp, part2Tasks: updated }));
                            }}
                            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="date"
                            value={item.startDate}
                            onChange={(e) => {
                              const updated = [...currentEmp.part2Tasks];
                              updated[idx] = { ...item, startDate: e.target.value };
                              updateCurrentEmployee((emp) => ({ ...emp, part2Tasks: updated }));
                            }}
                            className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="date"
                            value={item.expectedDate}
                            onChange={(e) => {
                              const updated = [...currentEmp.part2Tasks];
                              updated[idx] = { ...item, expectedDate: e.target.value };
                              updateCurrentEmployee((emp) => ({ ...emp, part2Tasks: updated }));
                            }}
                            className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...currentEmp.part2Tasks];
                              updated[idx] = { ...item, signedOff: !item.signedOff };
                              updateCurrentEmployee((emp) => ({ ...emp, part2Tasks: updated }));
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                              item.signedOff
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{item.signedOff ? 'Agreed' : 'Pending'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PART III: TARGETS MET (E / M / N) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Part III • Targets Met During Period of Report (Key: E = Exceeded, M = Met, N = Not Met)
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    Target Attainment & Employee Certification
                  </h2>
                </div>
                {currentEmp.part3Targets.length < 15 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateCurrentEmployee((emp) => ({
                        ...emp,
                        part3Targets: [
                          ...emp.part3Targets,
                          { id: emp.part3Targets.length + 1, target: '', rating: 'M' }
                        ]
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 cursor-pointer"
                  >
                    + Add Target ({currentEmp.part3Targets.length}/15)
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {currentEmp.part3Targets.map((t, idx) => (
                  <div
                    key={t.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <span className="text-xs font-bold text-slate-500 w-6">{idx + 1}.</span>
                    <input
                      type="text"
                      value={t.target}
                      placeholder="State target met in order of importance..."
                      onChange={(e) => {
                        const updated = [...currentEmp.part3Targets];
                        updated[idx] = { ...t, target: e.target.value };
                        updateCurrentEmployee((emp) => ({ ...emp, part3Targets: updated }));
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
                    />
                    <div className="flex items-center gap-1.5 shrink-0">
                      {[
                        { code: 'E', label: 'Exceeded', activeClass: 'bg-emerald-600 text-white border-emerald-600' },
                        { code: 'M', label: 'Met', activeClass: 'bg-sky-600 text-white border-sky-600' },
                        { code: 'N', label: 'Not Met', activeClass: 'bg-rose-600 text-white border-rose-600' }
                      ].map((opt) => (
                        <button
                          key={opt.code}
                          type="button"
                          onClick={() => {
                            const updated = [...currentEmp.part3Targets];
                            updated[idx] = { ...t, rating: opt.code };
                            updateCurrentEmployee((emp) => ({ ...emp, part3Targets: updated }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            t.rating === opt.code
                              ? opt.activeClass
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt.code} — {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Employee Certification Box */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Employee Certification & Comments ("I certify that I have seen the contents of this Report and that my supervisor has discussed them with me")
                </label>
                <textarea
                  rows={2}
                  value={currentEmp.employeeComments}
                  onChange={(e) =>
                    updateCurrentEmployee((emp) => ({ ...emp, employeeComments: e.target.value }))
                  }
                  placeholder="Optional comments by employee reported on..."
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PART IV TRAINING NEEDS, INCREMENT & PROMOTABILITY */}
        {activeTab === 'part4' && (
          <div className="space-y-6">
            {/* Training Needs & Skill Gaps (1-7) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                    Part IV • Reporting Officer Developmental Plan
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    Skill Gaps Identified & Recommended Training (Up to 7 Items)
                  </h2>
                </div>
                {currentEmp.part4.skillGaps.length < 7 && (
                  <button
                    type="button"
                    onClick={() =>
                      handlePart4Change('skillGaps', [...currentEmp.part4.skillGaps, ''])
                    }
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 cursor-pointer"
                  >
                    + Add Skill Gap Row
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {currentEmp.part4.skillGaps.map((gap, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Skill Gap / Deficiency #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={gap}
                        placeholder="Identify skill gap or deficiency..."
                        onChange={(e) => {
                          const updated = [...currentEmp.part4.skillGaps];
                          updated[idx] = e.target.value;
                          handlePart4Change('skillGaps', updated);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Suggested Training to Bridge Gap #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={currentEmp.part4.suggestedTraining[idx] || ''}
                        placeholder="Specify training course or intervention..."
                        onChange={(e) => {
                          const updated = [...currentEmp.part4.suggestedTraining];
                          updated[idx] = e.target.value;
                          handlePart4Change('suggestedTraining', updated);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Increment & Promotability Decisions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Increment Recommendation */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  <span>Annual Increment Recommendation</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Live Decision Engine suggests <strong className="text-sky-700">{metrics.autoIncrement}</strong> based on composite score <strong>{metrics.weightedComposite.toFixed(2)}</strong>. You may keep Auto or override below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { value: 'AUTO', label: `Auto Engine (${metrics.autoIncrement})` },
                    { value: 'Awarded Normal', label: 'Awarded Normal' },
                    { value: 'Awarded Double', label: 'Awarded Double' },
                    { value: 'Deferred', label: 'Deferred' },
                    { value: 'Withheld', label: 'Withheld' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handlePart4Change('incrementOverride', opt.value)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition cursor-pointer ${
                        currentEmp.part4.incrementOverride === opt.value
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {metrics.effectiveIncrement === 'Deferred' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Deferred Duration (e.g., 6 Months)
                    </label>
                    <input
                      type="text"
                      value={currentEmp.part4.deferredDuration}
                      onChange={(e) => handlePart4Change('deferredDuration', e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Promotability (Normal & Special) */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-rose-600" />
                  <span>Promotability Assessment (Normal & Special)</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    (a) Normal Promotion Readiness
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'AUTO', label: `Auto (${metrics.autoPromotability})` },
                      { value: 'Well Fitted', label: 'Well Fitted' },
                      { value: 'Fitted', label: 'Fitted' },
                      { value: 'Not Fitted', label: 'Not Fitted' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handlePart4Change('normalPromotabilityOverride', opt.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition cursor-pointer ${
                          currentEmp.part4.normalPromotabilityOverride === opt.value
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    (b) Special Promotion Target Grade / Cadre (if recommended)
                  </label>
                  <input
                    type="text"
                    value={currentEmp.part4.specialPromotionTarget}
                    placeholder="e.g., Grade skipping or selection for senior cadre..."
                    onChange={(e) => handlePart4Change('specialPromotionTarget', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* General Remarks & Countersigning Officer */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
              <h3 className="font-bold text-base text-slate-900">
                General Remarks & Countersigning Officer Verification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-700 uppercase mb-1">
                    Particular Strengths
                  </label>
                  <textarea
                    rows={3}
                    value={currentEmp.part4.strengths}
                    onChange={(e) => handlePart4Change('strengths', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-700 uppercase mb-1">
                    Weaknesses / Areas for Improvement
                  </label>
                  <textarea
                    rows={3}
                    value={currentEmp.part4.weaknesses}
                    onChange={(e) => handlePart4Change('weaknesses', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Reporting Officer Name
                  </label>
                  <input
                    type="text"
                    value={currentEmp.part4.reportingOfficerName}
                    onChange={(e) => handlePart4Change('reportingOfficerName', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Reporting Officer Designation
                  </label>
                  <input
                    type="text"
                    value={currentEmp.part4.reportingOfficerDesignation}
                    onChange={(e) => handlePart4Change('reportingOfficerDesignation', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Reporting Date
                  </label>
                  <input
                    type="date"
                    value={currentEmp.part4.reportingOfficerDate}
                    onChange={(e) => handlePart4Change('reportingOfficerDate', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Countersigning Officer's Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={currentEmp.part4.countersigningRemarks}
                    onChange={(e) => handlePart4Change('countersigningRemarks', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Countersigning Officer Name (Block Letters)
                    </label>
                    <input
                      type="text"
                      value={currentEmp.part4.countersigningName}
                      onChange={(e) => handlePart4Change('countersigningName', e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Countersigning Designation
                    </label>
                    <input
                      type="text"
                      value={currentEmp.part4.countersigningDesignation}
                      onChange={(e) => handlePart4Change('countersigningDesignation', e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Countersigning Date
                    </label>
                    <input
                      type="date"
                      value={currentEmp.part4.countersigningDate}
                      onChange={(e) => handlePart4Change('countersigningDate', e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SIDE-BY-SIDE STAFF COMPARISON */}
        {activeTab === 'compare' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Enterprise Staff Side-by-Side Performance Comparison
                </h2>
                <p className="text-xs text-slate-500">
                  Comparing all {employees.length} evaluated employees under current policy weights (Section A: {weightA}% / Section B: {weightB}%).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Employee</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-xs uppercase text-slate-500">
                    <th className="py-3 px-4">Evaluation Metric / Dimension</th>
                    {employees.map((emp) => (
                      <th key={emp.id} className="py-3 px-4 min-w-[200px]">
                        <div className="font-bold text-slate-900 text-sm">
                          {emp.part1.firstName} {emp.part1.surname}
                        </div>
                        <div className="text-[11px] font-normal text-slate-500">
                          {emp.part1.staffNo} • {emp.part1.department}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr className="bg-slate-50/80 font-bold">
                    <td className="py-3 px-4 text-slate-800">Weighted Composite Score (/ 5.00)</td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4">
                          <span className="text-lg font-extrabold text-sky-700">
                            {m.weightedComposite.toFixed(2)}
                          </span>{' '}
                          <span className="text-xs text-slate-500">({m.percentageScore.toFixed(1)}%)</span>
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      Section A: Character & Personality Avg ({weightA}%)
                    </td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4 font-bold text-sky-600">
                          {m.avgA.toFixed(2)} / 5.00
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      Section B: Performance of Duties Avg ({weightB}%)
                    </td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4 font-bold text-rose-600">
                          {m.avgB.toFixed(2)} / 5.00
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      Part III Targets (Exceeded / Met / Not Met)
                    </td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4 text-xs font-bold">
                          <span className="text-emerald-600">E:{m.exceededCount}</span> •{' '}
                          <span className="text-sky-600">M:{m.metCount}</span> •{' '}
                          <span className="text-rose-600">N:{m.notMetCount}</span>
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">Increment Recommendation</td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4 font-bold text-slate-900">
                          {m.effectiveIncrement}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">Promotability Status</td>
                    {employees.map((emp) => {
                      const m = computeEmployeeMetrics(emp, weightA);
                      return (
                        <td key={emp.id} className="py-3 px-4 font-bold text-rose-700">
                          {m.effectivePromotability}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700">Action</td>
                    {employees.map((emp) => (
                      <td key={emp.id} className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEmpId(emp.id);
                            setActiveTab('simulator');
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-sky-700 cursor-pointer"
                        >
                          Open in Simulator
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: OFFICIAL PRINTABLE APPRAISAL REPORT */}
        {activeTab === 'report' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-300 p-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                  Annual Staff Performance Evaluation Report
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  Evaluation Period: {currentEmp.periodLabel} • Confidential Enterprise Record
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-sky-700 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

            {/* Part I Summary */}
            <div>
              <h3 className="text-xs font-extrabold uppercase bg-slate-100 px-3 py-1.5 border border-slate-300">
                Part I — Personal & Employment Particulars
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 border-x border-b border-slate-300 text-xs">
                <div><strong>Name:</strong> {currentEmp.part1.surname}, {currentEmp.part1.firstName} {currentEmp.part1.otherNames}</div>
                <div><strong>Staff No:</strong> {currentEmp.part1.staffNo}</div>
                <div><strong>Date of Birth:</strong> {currentEmp.part1.dob}</div>
                <div><strong>Department:</strong> {currentEmp.part1.department}</div>
                <div><strong>Section:</strong> {currentEmp.part1.section}</div>
                <div><strong>Location:</strong> {currentEmp.part1.location}</div>
                <div><strong>Substantive Grade:</strong> {currentEmp.part1.presentGrade}</div>
                <div><strong>Salary Code:</strong> {currentEmp.part1.salaryCodeAndSalary}</div>
                <div><strong>First Appointment:</strong> {currentEmp.part1.firstAppointmentDate}</div>
              </div>
            </div>

            {/* Part II & III Summary */}
            <div>
              <h3 className="text-xs font-extrabold uppercase bg-slate-100 px-3 py-1.5 border border-slate-300">
                Part II & III — Assigned Tasks & Targets Achieved (E = Exceeded, M = Met, N = Not Met)
              </h3>
              <table className="w-full text-xs border-collapse border-x border-b border-slate-300">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-300">
                    <th className="p-2 text-left border-r border-slate-300 w-10">#</th>
                    <th className="p-2 text-left border-r border-slate-300">Target / Deliverable</th>
                    <th className="p-2 text-center w-24">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmp.part3Targets.map((t, i) => (
                    <tr key={t.id} className="border-b border-slate-200">
                      <td className="p-2 border-r border-slate-300">{i + 1}</td>
                      <td className="p-2 border-r border-slate-300">{t.target}</td>
                      <td className="p-2 text-center font-bold">{t.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Assessment of Performance Summary */}
            <div>
              <h3 className="text-xs font-extrabold uppercase bg-slate-100 px-3 py-1.5 border border-slate-300">
                Assessment of Performance — Weighted Score Summary (A: {weightA}% | B: {weightB}%)
              </h3>
              <div className="grid grid-cols-3 gap-4 p-3 border-x border-b border-slate-300 text-xs">
                <div><strong>Section A (Character):</strong> {metrics.avgA.toFixed(2)} / 5.00</div>
                <div><strong>Section B (Duties):</strong> {metrics.avgB.toFixed(2)} / 5.00</div>
                <div><strong>Composite Weighted Score:</strong> {metrics.weightedComposite.toFixed(2)} / 5.00 ({metrics.percentageScore.toFixed(1)}%)</div>
              </div>
            </div>

            {/* Part IV Summary & Signatures */}
            <div>
              <h3 className="text-xs font-extrabold uppercase bg-slate-100 px-3 py-1.5 border border-slate-300">
                Part IV — Recommendations & Sign-Off
              </h3>
              <div className="p-3 border-x border-b border-slate-300 text-xs space-y-2">
                <div><strong>Increment Recommendation:</strong> {metrics.effectiveIncrement}</div>
                <div><strong>Promotability Status:</strong> {metrics.effectivePromotability}</div>
                <div><strong>Strengths:</strong> {currentEmp.part4.strengths}</div>
                <div><strong>Weaknesses:</strong> {currentEmp.part4.weaknesses}</div>
                <div className="grid grid-cols-2 gap-6 pt-4 mt-4 border-t border-slate-200">
                  <div>
                    <p className="font-bold">Reporting Officer: {currentEmp.part4.reportingOfficerName}</p>
                    <p className="text-slate-500">{currentEmp.part4.reportingOfficerDesignation} • Date: {currentEmp.part4.reportingOfficerDate}</p>
                  </div>
                  <div>
                    <p className="font-bold">Countersigning Officer: {currentEmp.part4.countersigningName}</p>
                    <p className="text-slate-500">{currentEmp.part4.countersigningDesignation} • Date: {currentEmp.part4.countersigningDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EXECUTIVE COPYRIGHT & ARCHITECT ATTRIBUTION FOOTER */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              &copy; {new Date().getFullYear()} Samuel Peter&trade;. All Rights Reserved.
            </span>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            Conceived &amp; Engineered by{' '}
            <span className="font-semibold text-sky-300">Samuel Peter</span>, Lead Solution Architect
          </div>
        </div>
      </footer>

      {/* ADD STAFF MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-700 to-rose-700 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Add Staff Member to Annual Evaluation</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Surname *
                  </label>
                  <input
                    required
                    type="text"
                    value={newStaffForm.surname}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, surname: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={newStaffForm.firstName}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, firstName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Staff No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ENG-2026-0912"
                    value={newStaffForm.staffNo}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, staffNo: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Appraisal Year
                  </label>
                  <input
                    type="text"
                    value={newStaffForm.appraisalYear}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, appraisalYear: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newStaffForm.department}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, department: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Substantive Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Engineer (GL 12)"
                    value={newStaffForm.presentGrade}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, presentGrade: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-600 to-rose-600 text-white hover:opacity-95 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Staff Appraisal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

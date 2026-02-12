import { useState, useMemo } from 'react';
import { Estimate } from '../types';

export const initialEstimate: Estimate = {
  role: 'Ти — досвідчений Senior Business Analyst та Technical Architect в IT-аутсорс компанії. Твоє завдання: на основі транскрипції дзвінка СЕО Віталіка та опису задачі з Upwork скласти базове Технічне Завдання (ТЗ).',
  project_info: {
    name: '',
    type: 'MVP',
    audience: 'B2B',
    goal: '',
  },
  platforms: { types: [], custom: '' },
  users: { standard_roles: [], specific_roles: [] },
  features: { auth: 'Email/Password', user_stories: [], monetization: 'None (Internal)' },
  tech_stack: { backend: [], frontend: [], mobile: [], database: [] },
  management: {
    task_manager: 'Jira',
    communication_channels: [],
  },
  design: { status: 'From Scratch (UX+UI)', custom_details: '' },
  integrations: { selected: [], custom: [] },
  constraints: {
    load: 'Up to 100 (Start/MVP)',
    budget_segment: 'Medium (Balance, Custom dev, Scalable)',
    timeline: 'Standard (Regular cycle)',
    priority: 'Quality/Scalability',
    input_status: 'Idea Only',
    technical_freedom: 'Advisory',
  },
  roadmap: {
    strategy: 'Single Release',
    lifecycle: 'Support & Maintenance',
  },
  additional: { legacy: 'No, from scratch', references: '' },
};

export const useEstimate = () => {
  const [data, setData] = useState<Estimate>(initialEstimate);
  const [activeTab, setActiveTab] = useState<'xml' | 'markdown'>('markdown');
  const [tempStory, setTempStory] = useState('');
  const [tempRole, setTempRole] = useState('');
  const [tempTech, setTempTech] = useState('');

  const updateField = (section: keyof Estimate, field: string, value: any) => {
    setData((prev) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: value } }));
  };

  const toggleArrayItem = (section: keyof Estimate, field: string, item: string) => {
    const arr = (data[section] as any)[field] as string[];
    const nextArr = arr.includes(item) ? arr.filter((i: string) => i !== item) : [...arr, item];
    updateField(section, field, nextArr);
  };

  const addItem = (
    section: keyof Estimate,
    field: string,
    value: string,
    setter: (v: string) => void,
  ) => {
    if (!value.trim()) return;
    const arr = (data[section] as any)[field] as string[];
    updateField(section, field, [...arr, value.trim()]);
    setter('');
  };

  const removeItem = (section: keyof Estimate, field: string, index: number) => {
    const arr = [...(data[section] as any)[field]] as string[];
    arr.splice(index, 1);
    updateField(section, field, arr);
  };

  const fullXmlOutput = useMemo(() => {
    const toXml = (obj: any, indent = 1): string => {
      const sp = '  '.repeat(indent);
      return Object.entries(obj)
        .map(([key, val]) => {
          if (Array.isArray(val)) {
            return `${sp}<${key}>\n${val.map((v) => `${sp}  <item>${v}</item>`).join('\n')}\n${sp}</${key}>`;
          }
          if (typeof val === 'object' && val !== null) {
            return `${sp}<${key}>\n${toXml(val, indent + 1)}\n${sp}</${key}>`;
          }
          return `${sp}<${key}>${val}</${key}>`;
        })
        .join('\n');
    };
    return `<?xml version="1.0" encoding="UTF-8"?>\n<project_specification>\n${toXml(data)}</project_specification>`;
  }, [data]);

  const fullMarkdownOutput = useMemo(() => {
    const {
      role,
      project_info,
      platforms,
      users,
      features,
      tech_stack,
      management,
      design,
      integrations,
      constraints,
      roadmap,
      additional,
    } = data;
    return `## 0. Role / Persona
${role}

## 1. Business Context
- **Name:** ${project_info.name || 'Untitled'}
- **Type:** ${project_info.type}
- **Audience:** ${project_info.audience}
- **Main Goal:** ${project_info.goal || 'Not specified'}

## 2. Platforms
${platforms.types.map((t) => `- ${t}`).join('\n')}

## 3. User Roles
- **Standard:** ${users.standard_roles.join(', ')}
- **Specific:** ${users.specific_roles.join(', ')}

## 4. Features & Stories
- **Auth:** ${features.auth}
- **Monetization:** ${features.monetization}
- **Scenarios:**
${features.user_stories.map((s) => `  - ${s}`).join('\n')}

## 5. Technology Stack
- **Backend:** ${tech_stack.backend.join(', ')}
- **Frontend:** ${tech_stack.frontend.join(', ')}
- **Mobile:** ${tech_stack.mobile.join(', ')}
- **DB:** ${tech_stack.database.join(', ')}

## 6. Management & Communication
- **Task Manager:** ${management.task_manager}
- **Channels:** ${management.communication_channels.join(', ')}

## 7. Design & Integration
- **Design Status:** ${design.status}
- **Integrations:** ${integrations.selected.join(', ')}

## 8. Project Constraints
- **Budget:** ${constraints.budget_segment}
- **Timeline:** ${constraints.timeline}
- **Priority (Triangle):** ${constraints.priority}
- **Input Status:** ${constraints.input_status}
- **Technical Freedom:** ${constraints.technical_freedom}

## 9. Technical Constraints
- **Expected Load:** ${constraints.load}

## 10. Roadmap Strategy
- **Strategy:** ${roadmap.strategy}
- **Lifecycle:** ${roadmap.lifecycle}

## 11. Additional
- **Legacy:** ${additional.legacy}
- **References:** ${additional.references}
`;
  }, [data]);

  const copy = () => {
    navigator.clipboard.writeText(activeTab === 'xml' ? fullXmlOutput : fullMarkdownOutput);
    alert('Copied to clipboard!');
  };

  return {
    data,
    activeTab,
    setActiveTab,
    tempStory,
    setTempStory,
    tempRole,
    setTempRole,
    tempTech,
    setTempTech,
    updateField,
    toggleArrayItem,
    addItem,
    removeItem,
    fullXmlOutput,
    fullMarkdownOutput,
    copy,
  };
};

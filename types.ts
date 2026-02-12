export interface Estimate {
  role: string;
  project_info: {
    name: string;
    type: string;
    audience: string;
    goal: string;
  };
  platforms: {
    types: string[];
    custom: string;
  };
  users: {
    standard_roles: string[];
    specific_roles: string[];
  };
  features: {
    auth: string;
    user_stories: string[];
    monetization: string;
  };
  tech_stack: {
    backend: string[];
    frontend: string[];
    mobile: string[];
    database: string[];
  };
  management: {
    task_manager: string;
    communication_channels: string[];
  };
  design: {
    status: string;
    custom_details: string;
  };
  integrations: {
    selected: string[];
    custom: string[];
  };
  constraints: {
    load: string;
    budget_segment: string;
    timeline: string;
    priority: string;
    input_status: string;
    technical_freedom: string;
  };

  roadmap: {
    strategy: string;
    lifecycle: string;
  };
  additional: {
    legacy: string;
    references: string;
  };
}

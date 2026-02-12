import React from 'react';
import { Estimate } from '../../types';
import { Section } from '../Section';
import * as C from '../../constants';

interface FormPanelProps {
  data: Estimate;
  tempRole: string;
  setTempRole: (v: string) => void;
  tempStory: string;
  setTempStory: (v: string) => void;
  tempTech: string;
  setTempTech: (v: string) => void;
  updateField: (section: keyof Estimate, field: string, value: any) => void;
  toggleArrayItem: (section: keyof Estimate, field: string, item: string) => void;
  addItem: (
    section: keyof Estimate,
    field: string,
    value: string,
    setter: (v: string) => void,
  ) => void;
  removeItem: (section: keyof Estimate, field: string, index: number) => void;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  data,
  tempRole,
  setTempRole,
  tempStory,
  setTempStory,
  tempTech,
  setTempTech,
  updateField,
  toggleArrayItem,
  addItem,
  removeItem,
}) => {
  return (
    <div className="w-1/2 overflow-y-auto p-6 space-y-4 border-r border-slate-800 bg-slate-900/20">
      <Section title="1. Context & Business Goals" icon="🎯">
        <div className="mb-3 space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase">
            Системна роль (Hardcoded)
          </label>
          <div className="bg-slate-800/50 p-2 rounded border border-dashed border-slate-700 text-[10px] text-slate-400 leading-relaxed italic">
            {data.role}
          </div>
        </div>
        <input
          type="text"
          placeholder="Назва проекту"
          className="w-full bg-slate-800 p-2 rounded border border-slate-700 mb-3"
          value={data.project_info.name}
          onChange={(e) => updateField('project_info', 'name', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Тип продукту</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.project_info.type}
              onChange={(e) => updateField('project_info', 'type', e.target.value)}>
              {C.PROJECT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">
              Цільова аудиторія
            </label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.project_info.audience}
              onChange={(e) => updateField('project_info', 'audience', e.target.value)}>
              {C.AUDIENCES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          placeholder="Головна мета (Проблема)"
          className="w-full bg-slate-800 p-2 rounded border border-slate-700 h-20 text-sm"
          value={data.project_info.goal}
          onChange={(e) => updateField('project_info', 'goal', e.target.value)}
        />
      </Section>

      <Section title="2. Platforms" icon="📱">
        <div className="flex flex-wrap gap-2">
          {C.PLATFORM_TYPES.map((p) => (
            <button
              key={p}
              onClick={() => toggleArrayItem('platforms', 'types', p)}
              className={`px-3 py-1.5 rounded text-xs border transition-all ${data.platforms.types.includes(p) ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {p}
            </button>
          ))}
        </div>
      </Section>

      <Section title="3. Users & Roles" icon="👥">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {C.STANDARD_ROLES.map((r) => (
              <button
                key={r}
                onClick={() => toggleArrayItem('users', 'standard_roles', r)}
                className={`px-3 py-1.5 rounded text-xs border ${data.users.standard_roles.includes(r) ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-700'}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Додати специфічну роль..."
                className="flex-1 bg-slate-800 p-2 rounded border border-slate-700 text-sm"
                value={tempRole}
                onChange={(e) => setTempRole(e.target.value)}
              />
              <button
                onClick={() => addItem('users', 'specific_roles', tempRole, setTempRole)}
                className="bg-slate-700 px-4 rounded text-white">
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.users.specific_roles.map((r, i) => (
                <span
                  key={i}
                  className="bg-slate-800 px-2 py-1 rounded text-[10px] flex items-center gap-2 border border-slate-700 text-slate-300">
                  {r}{' '}
                  <button
                    onClick={() => removeItem('users', 'specific_roles', i)}
                    className="text-red-500 hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="4. Functional Requirements" icon="⚙️">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Авторизація</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={data.features.auth}
              onChange={(e) => updateField('features', 'auth', e.target.value)}>
              {C.AUTH_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Монетизація</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={data.features.monetization}
              onChange={(e) => updateField('features', 'monetization', e.target.value)}>
              {C.MONETIZATION_MODELS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-slate-500 font-bold uppercase">
            User Stories / Сценарії
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="н-р: Користувач логіниться -> обирає товар..."
              className="flex-1 bg-slate-800 p-2 rounded border border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={tempStory}
              onChange={(e) => setTempStory(e.target.value)}
            />
            <button
              onClick={() => addItem('features', 'user_stories', tempStory, setTempStory)}
              className="bg-slate-700 px-4 rounded text-white">
              +
            </button>
          </div>
          <div className="space-y-1">
            {data.features.user_stories.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-800/50 p-2 rounded text-xs border border-slate-700 group">
                <span className="truncate text-slate-300">{s}</span>
                <button
                  onClick={() => removeItem('features', 'user_stories', i)}
                  className="text-slate-500 hover:text-red-500 px-2">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="5. Tech Stack" icon="💻">
        <div className="space-y-4">
          <div className="flex gap-2 mb-2 p-2 bg-slate-800/20 rounded-lg border border-slate-800">
            <input
              type="text"
              placeholder="Кастомна тех-ія (н-р: GraphQL, Tailwind)"
              className="flex-1 bg-slate-800 p-2 rounded border border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={tempTech}
              onChange={(e) => setTempTech(e.target.value)}
            />
            <div className="flex gap-1">
              <button
                onClick={() => addItem('tech_stack', 'backend', tempTech, setTempTech)}
                className="bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded text-[10px] border border-emerald-800 hover:bg-emerald-800/50 transition-colors">
                +Back
              </button>
              <button
                onClick={() => addItem('tech_stack', 'frontend', tempTech, setTempTech)}
                className="bg-indigo-900/40 text-indigo-400 px-2 py-1 rounded text-[10px] border border-indigo-800 hover:bg-indigo-800/50 transition-colors">
                +Front
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">
              Бекенд
            </label>
            <div className="flex flex-wrap gap-1">
              {C.TECH_BACKEND.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleArrayItem('tech_stack', 'backend', t)}
                  className={`px-2 py-1 rounded text-[10px] border transition-colors ${data.tech_stack.backend.includes(t) ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {t}
                </button>
              ))}
              {data.tech_stack.backend
                .filter((t) => !C.TECH_BACKEND.includes(t))
                .map((t, i) => (
                  <button
                    key={i}
                    onClick={() => toggleArrayItem('tech_stack', 'backend', t)}
                    className="px-2 py-1 rounded text-[10px] border bg-emerald-600 border-emerald-400 text-white">
                    {t}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">
              Фронтенд
            </label>
            <div className="flex flex-wrap gap-1">
              {C.TECH_FRONTEND.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleArrayItem('tech_stack', 'frontend', t)}
                  className={`px-2 py-1 rounded text-[10px] border transition-colors ${data.tech_stack.frontend.includes(t) ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {t}
                </button>
              ))}
              {data.tech_stack.frontend
                .filter((t) => !C.TECH_FRONTEND.includes(t))
                .map((t, i) => (
                  <button
                    key={i}
                    onClick={() => toggleArrayItem('tech_stack', 'frontend', t)}
                    className="px-2 py-1 rounded text-[10px] border bg-indigo-600 border-indigo-400 text-white">
                    {t}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">
              Мобільна розробка
            </label>
            <div className="flex flex-wrap gap-1">
              {C.TECH_MOBILE.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleArrayItem('tech_stack', 'mobile', t)}
                  className={`px-2 py-1 rounded text-[10px] border transition-colors ${data.tech_stack.mobile.includes(t) ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="6. Management" icon="📋">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Таск-менеджер</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.management.task_manager}
              onChange={(e) => updateField('management', 'task_manager', e.target.value)}>
              {C.TASK_MANAGERS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Канали зв'язку</label>
            <div className="flex flex-wrap gap-2">
              {C.COMMUNICATION_CHANNELS.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleArrayItem('management', 'communication_channels', c)}
                  className={`px-3 py-1.5 rounded text-xs border transition-all ${data.management.communication_channels.includes(c) ? 'bg-cyan-600 border-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="7. Design & Integrations" icon="🎨">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Статус дизайну</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.design.status}
              onChange={(e) => updateField('design', 'status', e.target.value)}>
              {C.DESIGN_STATUS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">
              Ключові інтеграції
            </label>
            <div className="flex flex-wrap gap-2">
              {C.INTEGRATION_CATEGORIES.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleArrayItem('integrations', 'selected', i)}
                  className={`px-3 py-1.5 rounded text-xs border transition-all ${data.integrations.selected.includes(i) ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="8. Project Constraints" icon="⚖️">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">
              Бюджетний сегмент
            </label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.constraints.budget_segment}
              onChange={(e) => updateField('constraints', 'budget_segment', e.target.value)}>
              {C.BUDGET_SEGMENTS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Терміни</label>
              <select
                className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
                value={data.constraints.timeline}
                onChange={(e) => updateField('constraints', 'timeline', e.target.value)}>
                {C.TIMELINE_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">
                Пріоритет (Project Triangle)
              </label>
              <select
                className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
                value={data.constraints.priority}
                onChange={(e) => updateField('constraints', 'priority', e.target.value)}>
                {C.PROJECT_PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Стан вимог</label>
              <select
                className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
                value={data.constraints.input_status}
                onChange={(e) => updateField('constraints', 'input_status', e.target.value)}>
                {C.INPUT_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">
                Технічна свобода
              </label>
              <select
                className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
                value={data.constraints.technical_freedom}
                onChange={(e) => updateField('constraints', 'technical_freedom', e.target.value)}>
                {C.TECHNICAL_FREEDOM.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Section>

      <Section title="9. Technical Constraints" icon="🛠️">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase">
            Очікуване навантаження
          </label>
          <select
            className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
            value={data.constraints.load}
            onChange={(e) => updateField('constraints', 'load', e.target.value)}>
            {C.LOAD_LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section title="10. Roadmap Strategy" icon="🗺️">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">
              Стратегія запуску
            </label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.roadmap.strategy}
              onChange={(e) => updateField('roadmap', 'strategy', e.target.value)}>
              {C.ROADMAP_STRATEGIES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Життєвий цикл</label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.roadmap.lifecycle}
              onChange={(e) => updateField('roadmap', 'lifecycle', e.target.value)}>
              {C.LIFECYCLE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      <Section title="11. Additional" icon="📂">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 font-bold uppercase">
              Спадщина (Legacy Code)
            </label>
            <select
              className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm"
              value={data.additional.legacy}
              onChange={(e) => updateField('additional', 'legacy', e.target.value)}>
              <option>No, from scratch</option>
              <option>Yes, repo exists (audit required)</option>
            </select>
          </div>
          <textarea
            placeholder="Конкуренти / Референси"
            className="w-full bg-slate-800 p-2 rounded border border-slate-700 h-20 text-sm"
            value={data.additional.references}
            onChange={(e) => updateField('additional', 'references', e.target.value)}
          />
        </div>
      </Section>
    </div>
  );
};

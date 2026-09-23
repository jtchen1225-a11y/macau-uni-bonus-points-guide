// Macau University Bonus Points Guide Application Logic

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    selectedTags: new Set(),
    activeFilter: 'all',
    searchQuery: '',
    checkedMilestones: JSON.parse(localStorage.getItem('macau_milestones_checked') || '{}'),
    activeModalUni: null
  };

  const tagsContainer = document.getElementById('tags-container');
  const calcResultsContainer = document.getElementById('calc-results-container');
  const selectedCountEl = document.getElementById('selected-count');
  const matrixTableBody = document.getElementById('matrix-table-body');
  const uniCardsContainer = document.getElementById('uni-cards-container');
  const faqContainer = document.getElementById('faq-container');
  const timelineContainer = document.getElementById('timeline-container');
  const uniModal = document.getElementById('uni-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const searchInput = document.getElementById('global-search');
  const resetBtn = document.getElementById('reset-calc-btn');
  const presetSciBtn = document.getElementById('preset-sci');
  const presetArtsBtn = document.getElementById('preset-arts');
  const presetSportsBtn = document.getElementById('preset-sports');
  const printBtn = document.getElementById('print-btn');

  init();

  function init() {
    renderTags();
    calculateAndRenderResults();
    renderMatrix();
    renderUniCards();
    renderFaqs();
    renderMilestones();
    setupEventListeners();
    lucide.createIcons();
  }

  // 1. Render Calculator Tags
  function renderTags() {
    if (!tagsContainer) return;
    const groups = {};
    UNI_DATABASE.calculatorTags.forEach(tag => {
      if (!groups[tag.group]) groups[tag.group] = [];
      groups[tag.group].push(tag);
    });

    let html = '';
    for (const [groupName, tags] of Object.entries(groups)) {
      html += `
        <div class="mb-5 last:mb-0">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <span class="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
            ${groupName}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${tags.map(tag => {
              const isSelected = state.selectedTags.has(tag.id);
              return `
                <button 
                  type="button"
                  data-tag-id="${tag.id}"
                  class="tag-toggle-btn text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 select-none ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/80 text-blue-950 shadow-sm ring-1 ring-blue-600' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  }"
                >
                  <div class="mt-0.5 p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}">
                    <i data-lucide="${tag.icon}" class="w-4 h-4"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-sm leading-snug flex items-center justify-between gap-1">
                      <span>${tag.label}</span>
                      ${isSelected ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-blue-600 shrink-0"></i>' : ''}
                    </div>
                    <div class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">${tag.desc}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    tagsContainer.innerHTML = html;
    if (selectedCountEl) {
      selectedCountEl.textContent = state.selectedTags.size;
    }
    lucide.createIcons();
  }

  // 2. Calculate and Render Results
  function calculateAndRenderResults() {
    if (!calcResultsContainer) return;

    if (state.selectedTags.size === 0) {
      calcResultsContainer.innerHTML = `
        <div class="text-center py-12 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <i data-lucide="sparkles" class="w-7 h-7"></i>
          </div>
          <h4 class="text-base font-bold text-slate-800">尚未勾選任何獎項或資格</h4>
          <p class="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            請在左側勾選您持有的高中獲獎、演講辯論、體育專長、語言考試或在校排名，系統將為您即時計算澳門各大學的加分、豁免與推薦優惠！
          </p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    const selectedTagObjects = UNI_DATABASE.calculatorTags.filter(t => state.selectedTags.has(t.id));

    const uniResults = UNI_DATABASE.universities.map(uni => {
      const matchedPerUni = [];
      selectedTagObjects.forEach(tag => {
        const m = tag.matches.find(match => match.uniId === uni.id);
        if (m) {
          matchedPerUni.push({
            tagLabel: tag.label,
            tagGroup: tag.group,
            type: m.type,
            value: m.value,
            detail: m.detail
          });
        }
      });

      let scoreBadge = '';
      let highlightNote = '';

      if (uni.id === 'um') {
        const bonusItems = matchedPerUni.filter(m => m.type === 'bonus');
        const exemptItems = matchedPerUni.filter(m => m.type === 'exemption');
        const recItems = matchedPerUni.filter(m => m.type === 'recommend');
        if (bonusItems.length > 0) {
          scoreBadge = `預估加分：+20 至 50分/科 (跨類累計)`;
        } else if (exemptItems.length > 0) {
          scoreBadge = `享有重要科目豁免資格`;
        } else if (recItems.length > 0) {
          scoreBadge = `建議走校長推薦保送途徑`;
        }
        highlightNote = `【澳大核心亮點】單一類別上限 60 分，跨類（科普+人文+體育+義工）可累計加分！1月必須同步上傳比賽章程與名單。`;
      } else if (uni.id === 'mpu') {
        const hasDebate = matchedPerUni.some(m => m.tagLabel.includes('辯論') || m.tagLabel.includes('演講'));
        const hasSports = matchedPerUni.some(m => m.tagLabel.includes('體育') || m.tagLabel.includes('代表隊'));
        if (hasDebate) {
          scoreBadge = `演辯精英專項：每項筆試加 20 分！`;
        } else if (hasSports) {
          scoreBadge = `體育精英專項：最高加 50 分！`;
        } else {
          scoreBadge = `綜合加分 10 至 30 分`;
        }
        highlightNote = `【澳理大亮點】演辯正選直接每科加 20 分，體育國際賽前十名加 10-50 分！`;
      } else if (uni.id === 'utm') {
        scoreBadge = `優先錄取審核 / 筆試綜合加權`;
        highlightNote = `【澳旅大亮點】常識問答（匯業盃）、青年義工獎、合作中學畢業生均享專屬優惠！`;
      } else if (uni.id === 'must') {
        const hasArtOrSport = matchedPerUni.some(m => m.tagGroup === '藝術與音樂' || m.tagGroup === '體育運動');
        if (hasArtOrSport) {
          scoreBadge = `特長生降分錄取 + 優先首選專業`;
        } else {
          scoreBadge = `四校聯考加分 / 保薦生優先評選`;
        }
        highlightNote = `【澳科大亮點】藝術團與校隊特長生優惠力度全澳最大，文化課門檻大幅放寬並享全免/半免獎學金！`;
      } else if (uni.id === 'cityu') {
        scoreBadge = `校長推薦專項 / 競賽加分審批`;
        highlightNote = `【城大亮點】班級前 10 名享首年全額免學費，獲獎證書享志願分配加分優待。`;
      } else if (uni.id === 'kwnc') {
        scoreBadge = `免筆試直進面試 / 推薦生首選`;
        highlightNote = `【鏡湖護院亮點】持四校聯考成績免考院內中英筆試，義工時數於面試佔極大優勢。`;
      } else if (uni.id === 'usj') {
        scoreBadge = `校長推薦：最高四年全免學費`;
        highlightNote = `【聖大亮點】全英語國際化教學，優秀推薦生四年全額學費減免 (100%)。`;
      } else {
        scoreBadge = `直升推薦 / 學費專項減免`;
        highlightNote = `【管院/中西亮點】合作中學校友直升學費津貼。`;
      }

      return { uni, matchedCount: matchedPerUni.length, matchedPerUni, scoreBadge, highlightNote };
    });

    uniResults.sort((a, b) => b.matchedCount - a.matchedCount);

    let html = `
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span>匹配結果分析</span>
          <span class="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">${uniResults.filter(r => r.matchedCount > 0).length} 所高校有適用優惠</span>
        </h4>
        <span class="text-xs text-slate-400">依匹配度排序</span>
      </div>
      <div class="space-y-3.5">
    `;

    uniResults.forEach(({ uni, matchedCount, matchedPerUni, scoreBadge, highlightNote }) => {
      const hasMatch = matchedCount > 0;
      html += `
        <div class="p-4 rounded-xl border transition-all ${
          hasMatch ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300' : 'bg-slate-50/60 border-slate-200/60 opacity-60'
        }">
          <div class="flex items-start justify-between gap-3 mb-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-base text-slate-900">${uni.name}</span>
                <span class="text-xs px-2 py-0.5 rounded font-medium ${
                  uni.type === 'public' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }">${uni.type === 'public' ? '公立' : '私立'}</span>
                <span class="text-xs text-slate-400 font-mono">${uni.shortName}</span>
              </div>
              <div class="text-xs text-slate-500 mt-0.5">${uni.tagline}</div>
            </div>
            ${hasMatch ? `
              <span class="shrink-0 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-xs">
                ${scoreBadge}
              </span>
            ` : '<span class="text-xs text-slate-400">暫無專屬條款</span>'}
          </div>

          ${hasMatch ? `
            <div class="bg-blue-50/60 border border-blue-100 rounded-lg p-2.5 my-2.5 text-xs text-blue-900 leading-relaxed">
              <i data-lucide="info" class="w-3.5 h-3.5 inline-block mr-1 text-blue-600 -mt-0.5"></i>
              ${highlightNote}
            </div>

            <div class="space-y-1.5 mt-2">
              <div class="text-xs font-semibold text-slate-700">您符合的具體加分與權益：</div>
              ${matchedPerUni.map(m => `
                <div class="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50 border border-slate-100">
                  <span class="text-slate-700 font-medium truncate pr-2">
                    <span class="inline-block w-1.5 h-1.5 rounded-full ${m.type === 'bonus' ? 'bg-amber-500' : m.type === 'exemption' ? 'bg-emerald-500' : 'bg-blue-500'} mr-1.5"></span>
                    ${m.tagLabel}
                  </span>
                  <div class="text-right shrink-0">
                    <span class="font-bold ${m.type === 'bonus' ? 'text-amber-700' : m.type === 'exemption' ? 'text-emerald-700' : 'text-blue-700'}">
                      ${m.value}
                    </span>
                    <span class="text-slate-400 text-[11px] block sm:inline sm:ml-1">(${m.detail})</span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-mono">申報時限：${uni.bonusScheme.applyPeriod.split('時')[0]}</span>
            <button 
              type="button"
              data-open-uni="${uni.id}" 
              class="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              查看該校完整章程 <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    calcResultsContainer.innerHTML = html;
    lucide.createIcons();
  }

  // 3. Render Comparison Matrix Table
  function renderMatrix() {
    if (!matrixTableBody) return;

    let unis = UNI_DATABASE.universities;
    if (state.activeFilter === 'public') {
      unis = unis.filter(u => u.type === 'public');
    } else if (state.activeFilter === 'private') {
      unis = unis.filter(u => u.type === 'private');
    }

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      unis = unis.filter(u => 
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.bonusScheme.title.toLowerCase().includes(q) ||
        u.bonusScheme.categories.some(c => c.name.toLowerCase().includes(q) || c.examples.toLowerCase().includes(q))
      );
    }

    matrixTableBody.innerHTML = unis.map(uni => `
      <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
        <td class="p-4 align-top">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            ${uni.name}
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              uni.type === 'public' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
            }">${uni.type === 'public' ? '公立' : '私立'}</span>
          </div>
          <div class="text-xs text-slate-400 font-mono mt-0.5">${uni.enName}</div>
          <div class="text-xs text-blue-600 font-semibold mt-1">${uni.ranking}</div>
          <button 
            type="button" 
            data-open-uni="${uni.id}" 
            class="mt-2 text-xs text-slate-500 hover:text-blue-600 underline font-medium block cursor-pointer"
          >
            詳細規章細則 &rarr;
          </button>
        </td>

        <td class="p-4 align-top">
          <div class="font-bold text-amber-700 text-sm">${uni.bonusScheme.pointsRange}</div>
          <div class="text-xs font-semibold text-slate-700 mt-1">${uni.bonusScheme.title}</div>
          <div class="text-xs text-slate-500 mt-1.5 bg-amber-50/70 border border-amber-200/60 p-2 rounded-lg leading-relaxed">
            <strong>上限規則：</strong>${uni.bonusScheme.maxRule}
          </div>
        </td>

        <td class="p-4 align-top">
          <div class="space-y-1.5">
            ${uni.exemptions.map(ex => `
              <div class="text-xs">
                <span class="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  ${ex.subject}
                </span>
                <p class="text-slate-600 text-[11px] mt-0.5 leading-snug">${ex.criteria}</p>
              </div>
            `).join('')}
          </div>
        </td>

        <td class="p-4 align-top">
          <div class="text-xs">
            <span class="font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
              ${uni.recommendation.name}
            </span>
            <div class="text-slate-700 mt-1 leading-snug">
              <strong>門檻：</strong>${uni.recommendation.target}
            </div>
            <div class="text-slate-500 mt-1 leading-snug">
              <strong>優惠：</strong>${uni.recommendation.benefits}
            </div>
          </div>
        </td>

        <td class="p-4 align-top">
          <div class="text-xs text-rose-700 font-semibold flex items-start gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 mt-0.5 shrink-0"></i>
            <span>${uni.bonusScheme.applyPeriod}</span>
          </div>
          <div class="text-[11px] text-slate-500 mt-1">
            電話：${uni.contact.phone}
          </div>
          <a href="${uni.contact.website}" target="_blank" rel="noopener noreferrer" class="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
            官方註冊處 <i data-lucide="external-link" class="w-3 h-3"></i>
          </a>
        </td>
      </tr>
    `).join('');

    lucide.createIcons();
  }

  // 4. Render University Profile Cards
  function renderUniCards() {
    if (!uniCardsContainer) return;

    uniCardsContainer.innerHTML = UNI_DATABASE.universities.map(uni => `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 card-hover flex flex-col justify-between" id="card-${uni.id}">
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-black text-slate-900">${uni.name}</h4>
                <span class="px-2 py-0.5 text-xs font-semibold rounded ${
                  uni.type === 'public' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }">${uni.type === 'public' ? '公立' : '私立'}</span>
              </div>
              <p class="text-xs text-slate-400 font-mono">${uni.enName}</p>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg shrink-0">
              創校 ${uni.founded} 年
            </span>
          </div>

          <p class="text-xs font-medium text-blue-700 mb-4 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 leading-relaxed">
            ${uni.tagline}
          </p>

          <div class="space-y-3 mb-5">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">加分計劃核心分值</span>
              <div class="text-sm font-black text-amber-600">${uni.bonusScheme.pointsRange}</div>
              <div class="text-xs text-slate-600 mt-0.5">${uni.bonusScheme.maxRule}</div>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">認可加分類別</span>
              <div class="flex flex-wrap gap-1.5">
                ${uni.bonusScheme.categories.map(c => `
                  <span class="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                    ${c.name}
                  </span>
                `).join('')}
              </div>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">四校聯考免試豁免</span>
              <div class="text-xs text-slate-600 space-y-1">
                ${uni.exemptions.map(ex => `
                  <div class="flex items-start gap-1">
                    <span class="font-semibold text-slate-800 shrink-0">• ${ex.subject}：</span>
                    <span class="text-slate-600 text-[11px]">${ex.criteria}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-mono">${uni.contact.phone}</span>
          <button 
            type="button"
            data-open-uni="${uni.id}"
            class="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            查看完整簡章 <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  }

  // 5. Render FAQs Accordion
  function renderFaqs() {
    if (!faqContainer) return;

    faqContainer.innerHTML = UNI_DATABASE.faqs.map((faq, idx) => `
      <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button 
          type="button" 
          class="faq-toggle-btn w-full p-4 text-left font-bold text-sm text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors cursor-pointer"
          data-faq-idx="${idx}"
        >
          <span class="flex items-center gap-2.5">
            <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center shrink-0 font-mono">Q${idx + 1}</span>
            <span>${faq.q}</span>
          </span>
          <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform faq-icon shrink-0"></i>
        </button>
        <div class="faq-content hidden px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
          <div class="pl-8 leading-relaxed">${faq.a}</div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  }

  // 6. Render Timeline & Checklist
  function renderMilestones() {
    if (!timelineContainer) return;

    timelineContainer.innerHTML = UNI_DATABASE.milestones.map((ms, msIdx) => `
      <div class="relative pl-8 pb-8 last:pb-0">
        <div class="absolute left-3 top-3 bottom-0 w-0.5 bg-slate-200 last:hidden"></div>
        <div class="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-blue-600 shadow-sm"></div>

        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600">${ms.period}</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded ${
              ms.badgeColor === 'red' ? 'bg-rose-100 text-rose-800 pulse-badge' : 'bg-slate-100 text-slate-700'
            }">${ms.tag}</span>
          </div>

          <h5 class="text-sm font-bold text-slate-900 mb-1">${ms.title}</h5>
          <p class="text-xs text-slate-600 mb-3">${ms.summary}</p>

          <div class="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500">家長與考生必備待辦事項：</div>
            ${ms.actionItems.map((item, itemIdx) => {
              const checkKey = `${msIdx}_${itemIdx}`;
              const isChecked = !!state.checkedMilestones[checkKey];
              return `
                <label class="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    data-check-key="${checkKey}" 
                    class="milestone-checkbox mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    ${isChecked ? 'checked' : ''}
                  />
                  <span class="${isChecked ? 'line-through text-slate-400' : ''}">${item}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  }

  // 7. Modal Handling
  function openUniModal(uniId) {
    const uni = UNI_DATABASE.universities.find(u => u.id === uniId);
    if (!uni || !modalContent) return;

    modalContent.innerHTML = `
      <div class="p-6">
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-black text-slate-900">${uni.name}</h3>
              <span class="px-2 py-0.5 text-xs font-bold rounded ${
                uni.type === 'public' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
              }">${uni.type === 'public' ? '公立高等院校' : '私立高等院校'}</span>
            </div>
            <p class="text-xs text-slate-400 font-mono mt-0.5">${uni.enName}</p>
          </div>
          <span class="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
            ${uni.ranking}
          </span>
        </div>

        <div class="my-5 p-3.5 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-950 leading-relaxed">
          <strong>辦學特色：</strong>${uni.tagline}
        </div>

        <div class="space-y-5 text-xs">
          <div>
            <h4 class="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-amber-600"></i>
              ${uni.bonusScheme.title}
            </h4>
            <div class="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl space-y-2">
              <div><strong>加分幅度：</strong><span class="text-amber-700 font-bold">${uni.bonusScheme.pointsRange}</span></div>
              <div><strong>累計與上限規則：</strong>${uni.bonusScheme.maxRule}</div>
              <div><strong>申報關鍵時間：</strong><span class="text-rose-700 font-bold">${uni.bonusScheme.applyPeriod}</span></div>
              <div><strong>適用對象：</strong>${uni.bonusScheme.target}</div>
            </div>

            <div class="mt-3">
              <span class="font-bold text-slate-800 block mb-1.5">審批與執行細則：</span>
              <ul class="list-disc pl-4 space-y-1 text-slate-600">
                ${uni.bonusScheme.coreRules.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>

            <div class="mt-3">
              <span class="font-bold text-slate-800 block mb-1.5">涵蓋之具體類別與範例：</span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                ${uni.bonusScheme.categories.map(c => `
                  <div class="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <div class="font-bold text-slate-800 flex justify-between">
                      <span>${c.name}</span>
                      <span class="text-amber-600">${c.points}</span>
                    </div>
                    <div class="text-[11px] text-slate-500 mt-1 leading-snug">${c.examples}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <h4 class="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <i data-lucide="check-square" class="w-4 h-4 text-emerald-600"></i>
              四校聯考 / 入學筆試豁免標準
            </h4>
            <div class="space-y-2">
              ${uni.exemptions.map(ex => `
                <div class="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                  <div class="font-bold text-emerald-800">${ex.subject}</div>
                  <div class="text-slate-600 text-[11px] mt-0.5">${ex.criteria}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <h4 class="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <i data-lucide="star" class="w-4 h-4 text-purple-600"></i>
              ${uni.recommendation.name}
            </h4>
            <div class="p-3 bg-purple-50/50 border border-purple-100 rounded-lg space-y-1.5 text-slate-700">
              <div><strong>推薦標準：</strong>${uni.recommendation.target}</div>
              <div><strong>錄取與獎學金優待：</strong>${uni.recommendation.benefits}</div>
              <div><strong>推薦時間：</strong>${uni.recommendation.timeline}</div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-3.5 rounded-xl">
            <div>
              <div class="font-bold text-slate-800">官方招生與註冊處聯絡方式：</div>
              <div class="text-slate-500 mt-0.5">電話：${uni.contact.phone} | 電郵：${uni.contact.email}</div>
            </div>
            <a 
              href="${uni.contact.website}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1"
            >
              進入官方招生專頁 <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    uniModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();
  }

  function closeUniModal() {
    if (!uniModal) return;
    uniModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  // Presets
  function presetSci() {
    state.selectedTags.clear();
    state.selectedTags.add('sci_robotics');
    state.selectedTags.add('sci_math_olympiad');
    state.selectedTags.add('lang_ielts_toefl');
    renderTags();
    calculateAndRenderResults();
  }

  function presetArts() {
    state.selectedTags.clear();
    state.selectedTags.add('humanities_debate');
    state.selectedTags.add('humanities_speech');
    state.selectedTags.add('general_huiye');
    renderTags();
    calculateAndRenderResults();
  }

  function presetSports() {
    state.selectedTags.clear();
    state.selectedTags.add('sports_macau_rep');
    state.selectedTags.add('service_volunteer');
    renderTags();
    calculateAndRenderResults();
  }

  // Event Listeners
  function setupEventListeners() {
    if (tagsContainer) {
      tagsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag-toggle-btn');
        if (!btn) return;
        const tagId = btn.getAttribute('data-tag-id');
        if (state.selectedTags.has(tagId)) {
          state.selectedTags.delete(tagId);
        } else {
          state.selectedTags.add(tagId);
        }
        renderTags();
        calculateAndRenderResults();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.selectedTags.clear();
        renderTags();
        calculateAndRenderResults();
      });
    }

    if (presetSciBtn) presetSciBtn.addEventListener('click', presetSci);
    if (presetArtsBtn) presetArtsBtn.addEventListener('click', presetArts);
    if (presetSportsBtn) presetSportsBtn.addEventListener('click', presetSports);

    const filterBtns = document.querySelectorAll('.filter-tab-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700');
        });
        btn.classList.remove('bg-white', 'text-slate-700');
        btn.classList.add('bg-blue-600', 'text-white');

        state.activeFilter = btn.getAttribute('data-filter');
        renderMatrix();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderMatrix();
      });
    }

    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-open-uni]');
      if (openBtn) {
        const uniId = openBtn.getAttribute('data-open-uni');
        openUniModal(uniId);
      }
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeUniModal);
    if (uniModal) {
      uniModal.addEventListener('click', (e) => {
        if (e.target === uniModal) closeUniModal();
      });
    }

    if (faqContainer) {
      faqContainer.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.faq-toggle-btn');
        if (!toggleBtn) return;
        const parent = toggleBtn.parentElement;
        const content = parent.querySelector('.faq-content');
        const icon = toggleBtn.querySelector('.faq-icon');

        const isClosed = content.classList.contains('hidden');
        if (isClosed) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    }

    if (timelineContainer) {
      timelineContainer.addEventListener('change', (e) => {
        const chk = e.target.closest('.milestone-checkbox');
        if (!chk) return;
        const key = chk.getAttribute('data-check-key');
        state.checkedMilestones[key] = chk.checked;
        localStorage.setItem('macau_milestones_checked', JSON.stringify(state.checkedMilestones));
        renderMilestones();
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
});

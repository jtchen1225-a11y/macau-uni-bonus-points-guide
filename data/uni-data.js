/**
 * 澳門所有大學升學加分與優惠政策結構化數據庫
 * 專為應屆畢業生與家長查詢、對比、試算設計
 */

const UNI_DATABASE = {
  metadata: {
    title: "澳門高等院校升學加分與優惠全景指南",
    lastUpdated: "2026-09-23",
    targetAudience: "澳門應屆高中畢業生與家長",
    jaeInfo: {
      name: "澳門四高校聯合入學考試 (JAE)",
      members: ["澳門大學", "澳門理工大學", "澳門旅遊大學", "澳門科技大學"],
      examSubjects: ["中文 (JC01)", "英文 (JE01)", "數學正卷 (JM01)", "數學附加卷 (JM02)", "葡文 (JP01)"],
      importantNote: "【重要提醒】四校聯考並非統一志願分發！四校各自獨立受理報名、各自制定錄取標準、各自審批加分並獨立發布錄取結果。"
    }
  },

  universities: [
    {
      id: "um",
      name: "澳門大學",
      enName: "University of Macau",
      shortName: "澳大 (UM)",
      type: "public",
      founded: 1981,
      ranking: "THE 全球前 200 / 澳門綜合最高學府",
      badgeColor: "blue",
      tagline: "國際化公立綜合性大學，加分體系最規範、範疇最廣泛",
      bonusScheme: {
        title: "入學考試加分計劃 (Bonus Points Scheme)",
        pointsRange: "指定錄取考科額外加 20 至 50 分",
        maxRule: "同一類別加分上限 60 分；不同類別可累計加分！",
        applyPeriod: "每年 1 月報考四校聯考（澳大入學考試）時於網上報名系統同步申報",
        target: "澳門本地中學應屆高中三年級畢業生，且報考當年度入學考試者",
        coreRules: [
          "申請人必須已完成當年度澳門大學入學考試的報名手續。",
          "加分加在申請人報考專業所要求的入學筆試科目上（專設試除外）。",
          "單一類別內加分最高不得超過 60 分，但跨類別（如科普+演辯+義工）可同時累計！",
          "必須上載獲獎證書；若賽事未在官方認可清單內，必須一併上載該項比賽的正式章程及獲獎名單，否則不予處理。",
          "獲錄取後必須在指定期限內攜帶證書正本至註冊處核驗，查獲不實直接取消學籍。"
        ],
        categories: [
          {
            name: "學術類別（科普範疇）",
            points: "20 - 50 分",
            examples: "全國/全澳青少年科技創新大賽、機器人科普選拔賽、學界數學/物理/化學比賽個人獎、中銀科創菁英挑戰賽、電子裝置製作比賽、全國中小學信息技術創新大賽。"
          },
          {
            name: "學術類別（人文範疇）",
            points: "20 - 50 分",
            examples: "中學校際辯論比賽、全澳學生朗誦比賽、澳門青少年外交知識競賽、全澳英語演講大賽、「學憲法講憲法」演講比賽、作文與文史競賽。"
          },
          {
            name: "體育類別",
            points: "20 - 50 分",
            examples: "高中三年內代表澳門或作為澳門學界代表參與各項正規體育賽事。另設有層級更高的「傑出運動員入學計劃」。"
          },
          {
            name: "音樂與藝術舞蹈",
            points: "20 - 50 分",
            examples: "指定專業認證機構（如中央音樂學院、英國皇家音樂學院等）等級考級高級別合格或重要賽事獲獎。"
          },
          {
            name: "全人發展與義工服務",
            points: "20 - 30 分",
            examples: "教青局青年義工獎勵計劃累積時數獲獎、熱心社會公益證明、參與澳門大學夏令營表現優異。"
          }
        ]
      },
      exemptions: [
        {
          subject: "英文科 (JE01) 及英文面試",
          criteria: "雅思 (IELTS) 學術類總分達 6.0 或以上；或托福 (TOEFL iBT) 達 80 分以上（考試日起兩年內有效）。"
        },
        {
          subject: "數學正卷 (JM01) 及附加卷 (JM02)",
          criteria: "高中最後三年內獲教青局主辦之「全澳學界數學比賽」高中組個人賽一等獎或二等獎。"
        },
        {
          subject: "中文科 (JC01)",
          criteria: "高中最後三年內未曾修讀「中國語文及文學」課程者（但若報讀以中文授課專業則不可申請豁免）。"
        }
      ],
      recommendation: {
        name: "校長推薦入學計劃 (Principals' Recommended Admission Scheme)",
        target: "品學兼優之澳門應屆高三學生，通常為各中學年級排名前 10% - 15% 或具顯著特長者。",
        benefits: "免入學筆試優先錄取；高機率獲頒「大蓮花獎學金」、「金蓮花獎學金」或「銀蓮花獎學金」（免全額學費+住宿費）。",
        timeline: "每年 9 月至 10 月中旬由中學推薦，11 月面試，12 月放榜。"
      },
      contact: {
        website: "https://reg.um.edu.mo/admissions/macao-students/admission-examination/bonus-points-scheme/",
        phone: "+853 8822 4007",
        email: "admission@um.edu.mo"
      }
    },

    {
      id: "mpu",
      name: "澳門理工大學",
      enName: "Macao Polytechnic University",
      shortName: "澳理大 (MPU)",
      type: "public",
      founded: 1991,
      ranking: "公立應用型大學 / 藝術體育、計算機與護理強校",
      badgeColor: "emerald",
      tagline: "注重實踐應用與專才，設有演辯與體育精英專項加分通道",
      bonusScheme: {
        title: "入學考試加分計劃 (Bonus Points Scheme)",
        pointsRange: "入學筆試每項科目加 10 至 50 分",
        maxRule: "各專案依評審委員會核定累計，直接計入甄選考量",
        applyPeriod: "每年 1 月於報名入學考試時同步在 OAS 系統申報",
        target: "報讀澳理大學士學位課程且參加筆試之澳門本地考生",
        coreRules: [
          "演辯精英：入學筆試每項可加 20 分（須為演講前三名或辯論隊正選隊員）。",
          "體育精英：入學筆試每項可獲加 10 至 50 分不等（近3年獲奧委會或國際單項體育聯會認可賽事前10名或澳門代表）。",
          "全人發展：在科技發明、社會公益、文化藝術等多元維度具傑出表現者加 10 至 30 分。",
          "各項加分必須於報名期間上傳完整證明，經招生委員會嚴格核驗後生效。"
        ],
        categories: [
          {
            name: "演辯精英加分計劃",
            points: "每科加 20 分",
            examples: "高中階段曾獲高中組演講比賽冠軍、亞軍、季軍；或具備中學校際辯論隊正式正選隊員資格。"
          },
          {
            name: "體育精英加分計劃",
            points: "每科加 10 - 50 分",
            examples: "最近三年內曾參加獲國際奧委會 (IOC) 承認、由國際單項體育聯會組織或認可的正式比賽獲前 10 名，或代表澳門特區隊參賽。"
          },
          {
            name: "全人發展加分計劃",
            points: "每科加 10 - 30 分",
            examples: "在科普創新、社會義工、社團領導力、音樂藝術等範疇具備官方表彰或優異證明。"
          }
        ]
      },
      exemptions: [
        {
          subject: "英文科 (JE01)",
          criteria: "雅思 6.0 或以上；托福 iBT 79 分或以上；或獲全澳英語演講比賽、全國「21世紀杯」英語演講比賽高中組/公開組任何獎項。"
        },
        {
          subject: "數學正卷 (JM01)",
          criteria: "全國奧林匹克數學比賽（高中組）任何獎項；全澳校際數學比賽（高中組）任何獎項；港澳數學奧林匹克公開賽《港澳盃》（高中組）任何獎項。"
        },
        {
          subject: "葡文 A 卷 (JP01)",
          criteria: "持有受歐盟「歐洲語言共同參考框架 (CEFR)」認可的 C1 級葡文能力證明。"
        }
      ],
      recommendation: {
        name: "中學校長推薦入學計劃",
        target: "澳門中學校長推薦之應屆品學兼優畢業生（通常為排名前 15%-20%）。",
        benefits: "免筆試優先錄取首選志願；合資格者直接評選全額或半額新生入學獎學金。",
        timeline: "每年 9 月至 10 月中旬接受推薦，11 月放榜。"
      },
      contact: {
        website: "https://www.mpu.edu.mo/admission",
        phone: "+853 8599 6111 / 6103",
        email: "admission@mpu.edu.mo"
      }
    },

    {
      id: "utm",
      name: "澳門旅遊大學",
      enName: "Macao University of Tourism",
      shortName: "澳旅大 (UTM / 原IFTM)",
      type: "public",
      founded: 1995,
      ranking: "QS 款待及休閒管理亞洲及全球名列前茅",
      badgeColor: "amber",
      tagline: "公立文旅款待名校，加分廣納各類常識問答、義工及合作中學人才",
      bonusScheme: {
        title: "額外加分與優先錄取考量",
        pointsRange: "筆試綜合評估加分 / 志願排位優先考慮",
        maxRule: "多項獲獎可同時提交，由招生委員會綜合折算入學權重",
        applyPeriod: "每年 1 月四校聯考筆試途徑報考時提交證明",
        target: "參加四校聯考報考澳旅大之本地考生",
        coreRules: [
          "持各類校際、省級、國家級或國際級比賽個人或團體獎項，均可申報加分。",
          "特別鼓勵文旅、社會服務與常識類比賽獲獎者。",
          "持有澳旅大合作中學課程修讀證明可享專屬升學優惠。"
        ],
        categories: [
          {
            name: "認可競賽與技能大獎",
            points: "優先錄取 / 筆試加分",
            examples: "在校際、省級、國家級或國際級比賽中獲得個人或團體獎項者。"
          },
          {
            name: "常識問答與文史工程",
            points: "專項加分優待",
            examples: "參與「匯業盃中學生常識問答比賽」並獲獎；參與「中國文化常識達標工程」並獲獎。"
          },
          {
            name: "青年義工與全人發展",
            points: "審查優先權重",
            examples: "參與澳門特區政府教青局「青年義工獎勵計劃」並獲獎者。"
          },
          {
            name: "專業先導與校本合作",
            points: "專業錄取優惠",
            examples: "高中階段曾修讀旅遊服務相關科目；或參與澳旅大「創意‧薈」比賽獲獎；或為澳旅大合作中學課程畢業生。"
          }
        ]
      },
      exemptions: [
        {
          subject: "英文科 (JE01)",
          criteria: "雅思 (IELTS) 6.0 或以上（單項不低於 5.5）；托福 iBT 79 分或以上；多益 (TOEIC) 聽讀 750 + 說寫 300；或 IGCSE 英文達相應等級。"
        },
        {
          subject: "數學正卷 (JM01)",
          criteria: "全澳學界數學比賽個人獎項；國際或全國奧數高中組個人獎項；或 IGCSE O Level 數學達 A (7分)。"
        }
      ],
      recommendation: {
        name: "校長推薦直接入學計劃",
        target: "高中在校成績排名前 30% 或經中學校長特別推薦之應屆畢業生。",
        benefits: "免參加四校聯考筆試，直接進入面試甄選；獲獎學金優先評選資格。",
        timeline: "每年 9 月至 11 月提交直接入學申請。"
      },
      contact: {
        website: "https://www.utm.edu.mo/admission",
        phone: "+853 8598 3041 / 1280",
        email: "admission@utm.edu.mo"
      }
    },

    {
      id: "must",
      name: "澳門科技大學",
      enName: "Macau University of Science and Technology",
      shortName: "澳科大 (MUST)",
      type: "private",
      founded: 2000,
      ranking: "THE 全球 250-300 強 / 澳門最大規模綜合私立大學",
      badgeColor: "indigo",
      tagline: "四校聯考成員校，特長生（藝術體育）優惠政策最宏大、保薦名額多",
      bonusScheme: {
        title: "特長生招生優待、競賽加分與豁免",
        pointsRange: "文化課成績大幅優惠放寬、優先錄取第一志願專業",
        maxRule: "特長考核優秀者享降分錄取與優先獎學金雙重福利",
        applyPeriod: "保薦特長生 9-11 月；四校聯考入學考 1 月",
        target: "持澳門居民身份證之應屆高中生，具備藝術、體育或學術專長者",
        coreRules: [
          "特長生設藝術團（舞蹈、聲樂、器樂、主持、打擊樂）及校隊（各類球類、擊劍、武術、龍舟等）。",
          "通過特長生審核者，在錄取時綜合評定特長水平，文化分顯著降分或優先選專業。",
          "四校聯考途徑中，對匯業盃等認可賽事獲獎者給予加分優惠。",
          "符合英語資格者可申請豁免英文筆試。"
        ],
        categories: [
          {
            name: "藝術特長專項（藝術團）",
            points: "降分/優先錄取首選志願",
            examples: "舞蹈、聲樂、西洋樂、民族樂、管樂、電聲樂、打擊樂、播音主持等，具專業級證書或多年訓練獲獎經驗。"
          },
          {
            name: "體育特長專項（校隊）",
            points: "降分/優先錄取首選志願",
            examples: "籃球、足球、羽毛球、乒乓球、排球、網球、擊劍、武術、龍舟、賽艇等運動健將。"
          },
          {
            name: "學術競賽專案",
            points: "聯考審核加分",
            examples: "匯業盃中學生常識問答比賽獲獎、全澳/全國各類科技創新或學術比賽獲獎。"
          }
        ]
      },
      exemptions: [
        {
          subject: "英文筆試",
          criteria: "托福 (TOEFL iBT) 80 分以上；或雅思 (IELTS) 6.0 分以上（兩年有效期內）。"
        },
        {
          subject: "中文筆試",
          criteria: "高中最後三年未修讀「中國語文及文學」課程者（中文授課課程除外）。"
        }
      ],
      recommendation: {
        name: "澳門中學保薦生入學計劃",
        target: "品學兼優、中五或高中平時成績排名全級前 20% 之應屆生；或成績未達標但具特殊專長經校長特薦者。",
        benefits: "免入學筆試優先錄取；豁免報名費；優先參與全免/半免學費入學獎學金評審。",
        timeline: "每年 9 月至 11 月經由所屬中學統一保薦並於 OAS 報名。"
      },
      contact: {
        website: "https://oas.must.edu.mo/admission",
        phone: "+853 8897 2221",
        email: "admission@must.edu.mo"
      }
    },

    {
      id: "cityu",
      name: "澳門城市大學",
      enName: "City University of Macau",
      shortName: "澳城大 (CityU)",
      type: "private",
      founded: 1981,
      ranking: "都會型綜合大學 / 商科、心理學、文化遺產特色",
      badgeColor: "purple",
      tagline: "重視本地學生發展，設校長推薦獎學金與競賽特長錄取加分審批",
      bonusScheme: {
        title: "保送推薦獎學金與競賽加分審批",
        pointsRange: "評核加分、優先錄取、頒發高額入學獎學金",
        maxRule: "個別專案由招生委員會依成績單與獲獎資歷審核",
        applyPeriod: "每年秋季至翌年 3 月本地生招生各批次",
        target: "澳門本地應屆中學畢業生",
        coreRules: [
          "認可四校聯考成績作為入學免試與評估依據。",
          "持有體育、藝術、科普或社會服務獲獎證書者，在審批志願時享有綜合加分優待。",
          "設有「中學校長推薦入學獎學金」與「優秀學生首年學費全免獎學金」（班級前10名）。"
        ],
        categories: [
          {
            name: "校長推薦入學計劃",
            points: "優先錄取 + 獎學金",
            examples: "獲中學校長推薦且品學兼優者，優先錄取並可獲高達 MOP 10,000 校長推薦獎學金。"
          },
          {
            name: "優秀學業表現",
            points: "首年學費全免",
            examples: "高中班級學期成績排名前 10 名者，具備競爭首年全額免學費獎學金資格。"
          },
          {
            name: "特長與文體競賽",
            points: "錄取綜合加分",
            examples: "在體育校隊、音樂表演、全澳徵文、科技創新獲獎者，提交獲獎證書享受加分審批。"
          }
        ]
      },
      exemptions: [
        {
          subject: "入學筆試",
          criteria: "四校聯考各科達標者免校內獨立筆試直接進入評估面試；持合格公開試（DSE、IB、A-Level等）免試直錄。"
        }
      ],
      recommendation: {
        name: "校長推薦生入學計劃",
        target: "經澳門各中學校長推薦之應屆生。",
        benefits: "免試審核錄取，優先分配第一志願專業，頒發校長推薦專項獎學金。",
        timeline: "每年 10 月至 12 月。"
      },
      contact: {
        website: "https://ado.cityu.edu.mo/",
        phone: "+853 8590 2333",
        email: "ado@cityu.edu.mo"
      }
    },

    {
      id: "kwnc",
      name: "澳門鏡湖護理學院",
      enName: "Kiang Wu Nursing College of Macau",
      shortName: "鏡湖護院 (KWNC)",
      type: "private",
      founded: 1923,
      ranking: "百年護理名校 / 澳門護理與健康教育核心基地",
      badgeColor: "rose",
      tagline: "醫療護理專業首選，聯考免筆試直進面試，推薦生優先錄取",
      bonusScheme: {
        title: "推薦生保送、聯考免筆試與專項政策",
        pointsRange: "免筆試直接面試 / 考核優待",
        maxRule: "面試與綜合考評為護理專業核心錄取指標",
        applyPeriod: "推薦生 9-10 月；公開報名/聯考 1-3 月",
        target: "有志從事護理及健康醫療行業之澳門應屆生",
        coreRules: [
          "中學校長推薦生可直接免參加筆試，提早面試並鎖定錄取名額。",
          "持有澳門四校聯考各科達標成績者，免除學院自行舉辦的筆試（中英文），直接憑聯考成績進入面試階段。",
          "對橫琴/大灣區相關背景或特長優秀者設有加分審查機制。"
        ],
        categories: [
          {
            name: "中學校長推薦生",
            points: "免除筆試優先錄取",
            examples: "品格優良、熱愛護理事業、有愛心與責任感的高三應屆生。"
          },
          {
            name: "四校聯考優秀生",
            points: "免筆試直接面試",
            examples: "四校聯考中文、英文、數學科目達到學院規定標準者。"
          },
          {
            name: "醫療義工與專長",
            points: "面試綜合加分",
            examples: "具備紅十字會急救證書、醫療衛生志願服務時數或優秀社團經歷。"
          }
        ]
      },
      exemptions: [
        {
          subject: "學院自主筆試（中文、英文）",
          criteria: "憑四校聯考達標成績或符合推薦生資格者，直接豁免筆試。"
        }
      ],
      recommendation: {
        name: "校長推薦入學計劃",
        target: "由所讀中學校長具名推薦，具備護理人員愛心、耐心與品德。",
        benefits: "免除筆試考核，優先安排專業入學面試，可獲鏡湖醫院或政府護理助學金支持。",
        timeline: "每年 9 月下旬至 10 月中旬。"
      },
      contact: {
        website: "http://www.kwnc.edu.mo",
        phone: "+853 8295 6228",
        email: "admit@kwnc.edu.mo"
      }
    },

    {
      id: "usj",
      name: "聖若瑟大學",
      enName: "University of Saint Joseph",
      shortName: "聖大 (USJ)",
      type: "private",
      founded: 1996,
      ranking: "國際化天主教大學 / 全英語教學與歐洲學位接軌",
      badgeColor: "sky",
      tagline: "全英語國際化校園，校長推薦直接享受四年全額或半額學費獎學金",
      bonusScheme: {
        title: "校長推薦保送優惠與全額學費獎學金",
        pointsRange: "四年全免學費 (100%) 或半額學費 (50%) 減免",
        maxRule: "經面試及推薦評定，GPA 達標後各學年持續續發",
        applyPeriod: "每年 9 月至 12 月（公開招生前優先審核）",
        target: "品學兼優、具備英語能力或領導才能之澳門應屆生",
        coreRules: [
          "設有「校長推薦入學計劃 (Principals' Recommended Admission)」。",
          "推薦對象涵蓋：學術優異者、具顯著領導才能者、在文體或社區領域表現傑出者。",
          "獲錄取學生可獲頒四年全額學費減免或半額學費減免入學獎學金。"
        ],
        categories: [
          {
            name: "全額學費獎學金",
            points: "四年學費 100% 減免",
            examples: "在校成績優秀、面試評分極高且具備傑出綜合素質之受薦生。"
          },
          {
            name: "半額學費獎學金",
            points: "四年學費 50% 減免",
            examples: "具備出色領導力或文藝體育特長之受薦生。"
          },
          {
            name: "社群與低收入家庭資助",
            points: "專項生活與學費補貼",
            examples: "針對澳門本地低收入家庭或天主教教區中學畢業生專項助學金。"
          }
        ]
      },
      exemptions: [
        {
          subject: "常規入學考試",
          criteria: "經校長推薦或持認可國際/聯考成績者，免除常規考試，以英語面試為核心評估。"
        }
      ],
      recommendation: {
        name: "校長推薦入學計劃",
        target: "由澳門本地中學校長推薦之優秀畢業生。",
        benefits: "公開招生前提早鎖定學位；評選 100% 或 50% 四年學費獎學金。",
        timeline: "每年 9 月至 12 月。"
      },
      contact: {
        website: "https://www.usj.edu.mo",
        phone: "+853 8592 5677",
        email: "student.recruitment@usj.edu.mo"
      }
    },

    {
      id: "mim_mmc",
      name: "澳門管理學院 / 中西創新學院",
      enName: "Macau Institute of Management / Millennium Institute of Macau",
      shortName: "管院 / 中西 (MIM / MMC)",
      type: "private",
      founded: 1988,
      ranking: "管理專業與數智文旅應用型高校",
      badgeColor: "slate",
      tagline: "靈活實務課程，提供中學校友專屬獎學金與在職升學支持",
      bonusScheme: {
        title: "本地高中畢業生扶持與專項獎助學金",
        pointsRange: "直接錄取面試 / 學費津貼獎勵",
        maxRule: "持澳門高中畢業證書與成績單即可申辦",
        applyPeriod: "全年滾動及應屆升學季",
        target: "澳門應屆畢業生或希望半工半讀之學生",
        coreRules: [
          "承認高中三年平時成績與四校聯考成績。",
          "設有多項合作中學直升學費減免與就讀獎學金。"
        ],
        categories: [
          {
            name: "直升入學優惠",
            points: "免試直錄",
            examples: "憑澳門正規中學畢業證書及高中成績單申請。"
          }
        ]
      },
      exemptions: [
        {
          subject: "入學筆試",
          criteria: "憑高中成績或四校聯考各科及格成績免除筆試。"
        }
      ],
      recommendation: {
        name: "中學推薦直升方案",
        target: "應屆高中畢業生。",
        benefits: "免除繁瑣考試手續，快速確認錄取資格並享有學費優惠政策。",
        timeline: "每年春季至夏季。"
      },
      contact: {
        website: "https://www.mma.org.mo / https://www.mmc.edu.mo",
        phone: "+853 2832 3233",
        email: "admission@mma.org.mo"
      }
    }
  ],

  calculatorTags: [
    {
      id: "sci_robotics",
      group: "科普與數理",
      icon: "cpu",
      label: "科技創新 / 機器人科普比賽獲獎",
      desc: "全國/全澳青少年科技創新大賽、青少年機器人選拔賽、通訊博物館電子製作等獎項",
      matches: [
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "學術類別（科普範疇），單類上限60分" },
        { uniId: "mpu", type: "bonus", value: "加 10 - 30 分", detail: "全人發展加分計劃審核" },
        { uniId: "utm", type: "bonus", value: "優先錄取考量", detail: "認可賽事個人或團體獲獎" },
        { uniId: "must", type: "bonus", value: "綜合加分", detail: "科技創新競賽加分與保薦考量" }
      ]
    },
    {
      id: "sci_math_olympiad",
      group: "科普與數理",
      icon: "calculator",
      label: "全澳學界數學比賽個人一/二等獎 或 奧數高中組獲獎",
      desc: "教青局全澳學界數學比賽高中組個人一/二等獎、全國/國際數學奧賽、港澳盃獲獎",
      matches: [
        { uniId: "um", type: "exemption", value: "豁免數學正卷+附加卷", detail: "直接免考 JM01 及 JM02" },
        { uniId: "mpu", type: "exemption", value: "豁免數學正卷", detail: "免考聯考數學正卷 JM01" },
        { uniId: "utm", type: "exemption", value: "豁免數學正卷", detail: "免考聯考數學科" },
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "若不申請豁免可申報科普類加分" }
      ]
    },
    {
      id: "humanities_debate",
      group: "演說與人文",
      icon: "mic",
      label: "中學校際辯論比賽 或 具辯論隊正選資格",
      desc: "全澳中學生校際辯論比賽獲獎，或獲校方證明具備正選辯手資格",
      matches: [
        { uniId: "mpu", type: "bonus", value: "每項加 20 分", detail: "演辯精英加分計劃（入學筆試每項均加20分！）" },
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "學術類別（人文範疇）加分" },
        { uniId: "utm", type: "bonus", value: "優先錄取加分", detail: "認可校際競賽獲獎加分" },
        { uniId: "cityu", type: "bonus", value: "特長加分審批", detail: "文藝思辨特長加分" }
      ]
    },
    {
      id: "humanities_speech",
      group: "演說與人文",
      icon: "volume-2",
      label: "全澳/全國演講朗誦或外交知識競賽獲獎",
      desc: "演講比賽冠亞季軍、朗誦比賽優異、外交知識競賽、憲法演講等",
      matches: [
        { uniId: "mpu", type: "bonus", value: "每項加 20 分", detail: "演講高中組前三名符合演辯精英加分" },
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "學術類別（人文範疇）" },
        { uniId: "utm", type: "bonus", value: "常識及演說優待", detail: "優先甄選參考" },
        { uniId: "must", type: "bonus", value: "藝術團主持特長", detail: "可同時報考特長生主持類享有大幅優惠" }
      ]
    },
    {
      id: "general_huiye",
      group: "常識與文史",
      icon: "award",
      label: "匯業盃常識問答 或 中國文化常識達標工程獲獎",
      desc: "歷年澳門中學代表性賽事獲獎",
      matches: [
        { uniId: "utm", type: "bonus", value: "專屬加分優待", detail: "官方指定加分賽事" },
        { uniId: "must", type: "bonus", value: "匯業盃加分計劃", detail: "官方入學規則列明之加分賽事" },
        { uniId: "um", type: "bonus", value: "加 20 - 30 分", detail: "人文學術類別審批加分" }
      ]
    },
    {
      id: "sports_macau_rep",
      group: "體育運動",
      icon: "trophy",
      label: "澳門代表隊選手 或 學界比賽前三名 / 代表隊",
      desc: "高中三年內代表澳門特區參賽、學界各單項體育賽事主力選手",
      matches: [
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "體育類別加分，另可申報傑出運動員計劃" },
        { uniId: "mpu", type: "bonus", value: "每項加 10 - 50 分", detail: "體育精英加分計劃（奧委會/國際聯會認可前10名最高加50分）" },
        { uniId: "must", type: "bonus", value: "校隊特長生大幅降分", detail: "優先錄取第一志願專業並頒發全額/半額獎學金" },
        { uniId: "cityu", type: "bonus", value: "體育特長綜合加分", detail: "體育精英專項審批" }
      ]
    },
    {
      id: "music_art_cert",
      group: "藝術與音樂",
      icon: "music",
      label: "音樂考級高級別（英皇/央音）或 舞蹈藝術大賽獲獎",
      desc: "鋼琴、管弦樂、民樂考級高級（8級以上）或全澳舞蹈大賽獲獎",
      matches: [
        { uniId: "um", type: "bonus", value: "加 20 - 50 分", detail: "音樂藝術類別加分" },
        { uniId: "must", type: "bonus", value: "藝術團降分特長生", detail: "聲樂、舞蹈、器樂享受優先錄取與特長生獎學金" },
        { uniId: "mpu", type: "bonus", value: "加 10 - 30 分", detail: "全人發展專項審批" }
      ]
    },
    {
      id: "service_volunteer",
      group: "社會服務與全人",
      icon: "heart",
      label: "教青局「青年義工獎勵計劃」獲獎 或 澳大夏令營優異",
      desc: "累積各級義工獎勵（金/銀/銅/彩虹獎等）、澳大夏令營傑出表現",
      matches: [
        { uniId: "um", type: "bonus", value: "加 20 - 30 分", detail: "全人發展類別（義工/夏令營專項）" },
        { uniId: "utm", type: "bonus", value: "官方加分優待", detail: "明確列入澳旅大青年義工加分名單" },
        { uniId: "kwnc", type: "bonus", value: "護理面試高額加分", detail: "社會愛心與奉獻精神極大提升錄取機會" }
      ]
    },
    {
      id: "lang_ielts_toefl",
      group: "外語公開考試",
      icon: "globe",
      label: "雅思 (IELTS) 6.0+ 或 托福 (TOEFL iBT) 80+",
      desc: "國際標準化英語測評有效成績（兩年內有效）",
      matches: [
        { uniId: "um", type: "exemption", value: "豁免英文科筆試 (JE01)", detail: "免考聯考英文筆試及英文面試" },
        { uniId: "mpu", type: "exemption", value: "豁免英文科筆試 (JE01)", detail: "免考聯考英文筆試" },
        { uniId: "utm", type: "exemption", value: "豁免英文科筆試 (JE01)", detail: "雅思6.0(各單項5.5+)免考英文" },
        { uniId: "must", type: "exemption", value: "豁免英文科筆試", detail: "托福80+/雅思6.0+免英文筆試" }
      ]
    },
    {
      id: "academics_top_rank",
      group: "在校排名與成績",
      icon: "star",
      label: "高中平時成績年級前 10% - 20%",
      desc: "高一至高三或中五成績名列前茅，品學兼優",
      matches: [
        { uniId: "um", type: "recommend", value: "校長推薦保送", detail: "免筆試直錄，爭取大蓮花/金蓮花免學費獎學金" },
        { uniId: "mpu", type: "recommend", value: "校長推薦保送", detail: "免筆試直錄，全額/半額獎學金" },
        { uniId: "utm", type: "recommend", value: "前30%直接入學", detail: "免聯考筆試直接進入面試" },
        { uniId: "must", type: "recommend", value: "保薦生優先錄取", detail: "前20%保薦生免筆試，全免/半免學費" },
        { uniId: "cityu", type: "recommend", value: "班級前10首年免學費", detail: "校長推薦專項獎學金" },
        { uniId: "usj", type: "recommend", value: "四年全額免學費", detail: "校長推薦卓越生四年全免" }
      ]
    }
  ],

  faqs: [
    {
      q: "四校聯考是「統一志願分發（像內地高考或台灣聯招）」嗎？",
      a: "【絕非統招！】這是家長與學生最常誤解的第一點！四校聯考只負責四所大學（澳大、澳理大、澳旅大、澳科大）共同委託的考試出題與監考。考試結束後，**各大學完全獨立錄取、各自制定錄取分數線、各自審批加分，並各自向學生單獨發出錄取通知**。因此，如果你想報考這四所學校，必須在 1 月份**分別向四所大學的網上報名系統獨立提交申請**，只報一所是不會被其他學校看到的！"
    },
    {
      q: "「加分計劃」什麼時候申請？考完聯考拿到分數再拿獎狀補辦可以嗎？",
      a: "【絕對不行！逾期完全不接受補辦！】以澳門大學及澳門理工大學為例，加分計劃必須在**每年 1 月份入學考試報名期間**，於各自的網上報名系統中主動勾選申請，並上載獎狀證書、賽事章程及官方獲獎名單。一旦報名截止系統關閉，即使你在 3 月聯考或 5 月放榜時拿出再高級的獎項，校方也一律不予追溯加分！"
    },
    {
      q: "同一類別裡我拿了 3 個獎，加分可以一直疊加嗎？不同類別呢？",
      a: "以澳門大學規定為例：在**同一個類別內（例如科普類），加分設有 60 分的最高上限**，不會無限制疊加。但**跨類別（不同範疇）是可以累計加分的**！例如：你同時擁有「科普比賽獲獎（加30分）」+「校際辯論賽（加20分）」+「義工服務（加20分）」，三個不同類別的分數可以跨類同時累計，這對爭取熱門專業（如法學、心理、計算機、商科）具有極強的競爭優勢！"
    },
    {
      q: "加分是加在「總成績」上，還是加在「單一考試科目」上？",
      a: "在澳門大學，加分是**直接加在報考專業所要求的指定入學筆試科目**上（每科可加 20 至 50 分，上限 60 分）。例如若你的目標專業計中文與英文分，加分將依審核分配至對應考科；在澳門理工大學，演辯精英加分則是「入學筆試每項科目加 20 分」，直接拉高科目分數等級。"
    },
    {
      q: "「豁免考試」跟「加分計劃」有什麼差別？可以同時享用嗎？",
      a: "兩者機制完全不同，但可相輔相成：<br>① **豁免考試**：指持有國際認可證書（如雅思 6.0 / 托福 80 豁免英文科；學界數學個人一/二等獎豁免數學正卷與附加卷），可以直接不用坐在考場考該科目，由大學依換算標準給予合格或對應高分，減輕備考壓力。<br>② **加分計劃**：是你去參加入學考試，在卷面成績基礎上額外加 20-50 分。<br>兩者不衝突，例如你豁免了英文科，依然可以在中文或數學科上憑科普或演辯獎項享受加分！"
    },
    {
      q: "我已經拿到學校校長推薦保送了，還需要管加分計劃或報考聯考嗎？",
      a: "強烈建議採取**「保送正取確認後再決定，若有疑慮做雙保險」**策略！<br>① 如果你在 12 月保送放榜已被第一心儀大學的第一心儀專業正取，並已確認繳費留位，恭喜你已提早「上岸」，無需再參加聯考。<br>② 但如果保送分配到的不是最喜歡的專業（調劑），或者你想挑戰排名更高的大學（例如保送上了其他學校，但想考澳大最熱門的法學或商科），那麼在 1 月份報考四校聯考並同步啟動「加分計劃」，就是你逆襲翻盤的最強雙保險武器！"
    },
    {
      q: "比賽獎狀只有獎狀照片，找不到當年的「比賽章程」和「獲獎公佈名單」怎麼辦？",
      a: "【必須提早準備！】澳門大學等高校審核極其嚴格，官方明確規定：若所獲獎項不在校方預設的常規賽事列表內，**必須同時提交比賽主辦機構發布的章程（證明參賽資格、級別與規則）以及官方發布的得獎者名冊**，若資料不全直接作廢不予處理！建議高三同學及家長在每年 11 月至 12 月就提前聯絡中學指導老師或主辦機構官方網站，將 PDF 章程與新聞通告截圖存檔備用。"
    },
    {
      q: "私立大學（澳科大、澳城大、聖若瑟、鏡湖護院）的優惠政策是什麼？",
      a: "澳門私立高校體系與公立高校不同，更多偏向**「保薦生名額充裕」、「特長生大幅降分」與「高額入學獎學金」**：<br>① **澳門科技大學**：特長生（藝術團、校隊）優惠力度全澳最大，文化課門檻顯著降低，優先挑選志願專業；保薦生前 20% 免筆試。<br>② **聖若瑟大學**：校長推薦生可直接角逐四年 100% 全免學費入學獎學金。<br>③ **澳門城市大學**：設有校長推薦獎學金及班級前 10 名首年學費全免獎學金。<br>④ **鏡湖護理學院**：憑聯考達標成績或推薦生直接免考院內中英文筆試，專注面試。"
    }
  ],

  milestones: [
    {
      period: "高三上學期 9 月 - 10 月",
      title: "【校長推薦與保送黃金期】中學內部初審與推薦",
      tag: "保送推薦",
      badgeColor: "amber",
      summary: "各大學校長推薦入學計劃相繼啟動（澳大、澳理大、澳旅大、澳科大、聖大等）。",
      actionItems: [
        "向班主任及升學輔導老師諮詢本校推薦名額分配標準（通常看高一高二平時成績）。",
        "備齊個人陳述 (Personal Statement)、在校成績單、高一至高三獲獎證明全集。",
        "藝術、體育特長生準備個人演示影片 (Video Portfolio) 及參賽等級證明（特別是澳科大特長生）。"
      ]
    },
    {
      period: "高三上學期 11 月 - 12 月",
      title: "【保送面試與結果公佈】提前上岸或準備轉戰聯考",
      tag: "提早錄取",
      badgeColor: "emerald",
      summary: "各高校進行保送生面試，12 月陸續公佈錄取名單與新生獎學金候選結果。",
      actionItems: [
        "獲正取滿意專業者：按學校通知於規定期限內繳交確認留位費，完成入學手續。",
        "未獲推薦或專業不理想者：立刻調整策略，轉入「四校聯考 + 加分計劃」衝刺準備。"
      ]
    },
    {
      period: "高三上學期 1 月 (致命關鍵月！)",
      title: "【四校聯考報名 + 加分計劃網上申報 + 豁免申請】",
      tag: "全澳申報",
      badgeColor: "red",
      summary: "四校聯考報名系統開放。加分計劃及考試豁免必須在此窗口期內於各校系統同步完成！",
      actionItems: [
        "【至關重要】分別登入欲報讀之大學報名系統（澳大、澳理大、澳旅大、澳科大各自獨立報名）。",
        "在報名表內勾選「入學考試加分計劃 (Bonus Points Scheme)」。",
        "上載獲獎證書高清掃描件、比賽章程 PDF 及獲獎公佈名單截圖。",
        "持有雅思 6.0+、托福 80+ 或奧數二等獎以上者，同步遞交「豁免入學筆試申請表」。"
      ]
    },
    {
      period: "高三下學期 3 月下旬",
      title: "【四校聯考筆試舉行】",
      tag: "全澳筆試",
      badgeColor: "blue",
      summary: "中文、英文、數學正卷、數學附加卷開考；各校自設科目（如專設試）按排程舉行。",
      actionItems: [
        "下載並列印四校聯考准考證及各校考生須知。",
        "若已獲英語或數學科豁免，核實准考證標註並可免赴該科考場。"
      ]
    },
    {
      period: "高三下學期 4 月 - 5 月上旬",
      title: "【聯考放榜 + 加分審批出爐 + 第一輪錄取公佈】",
      tag: "收穫放榜",
      badgeColor: "purple",
      summary: "公佈四校聯考成績、各專業錄取分數線與加分審批結果，各大學獨立發送錄取通知。",
      actionItems: [
        "登入各校註冊處系統查詢最終核定加分分值及科目錄取情況。",
        "加分獲錄取者，務必依學校要求攜帶所有獲獎證書及文件正本前往註冊處現場核驗！",
        "在截止日前繳納學費保證金以鎖定心儀大學學籍。"
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UNI_DATABASE;
}

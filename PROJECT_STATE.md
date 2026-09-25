# 專案狀態與交接紀錄 (PROJECT_STATE.md)

## 📌 專案核心目標 (Project Goals)
* **專案名稱**：澳門所有大學加分計劃與升學優惠全景對比指南 (2026/2027+)
* **目標受眾**：澳門應屆高中三年級畢業生、家長、升學輔導主任
* **核心價值**：打破高校加分資訊差，將澳大、理大、旅大、科大、城大、鏡湖護院、聖若瑟、管院等全澳 8 所高等院校之特長生加分、競賽豁免、保送免試條款透明化。
* **技術棧**：原生純前端 (Zero-build Vanilla JS + Tailwind CSS + Lucide Icons + Print CSS)，極速無依賴。
* **在線部署**：
  - 🌐 **GitHub Pages**：[https://jtchen1225-a11y.github.io/macau-uni-bonus-points-guide/](https://jtchen1225-a11y.github.io/macau-uni-bonus-points-guide/)
  - 🔗 **專屬短網址**：[https://www.daydaystudy.top/macau](https://www.daydaystudy.top/macau)
  - 💻 **GitHub 倉庫**：[https://github.com/jtchen1225-a11y/macau-uni-bonus-points-guide](https://github.com/jtchen1225-a11y/macau-uni-bonus-points-guide)

---

## 🚦 當前進度階段 (Current Stage)
* **當前狀態**：✅ **正式發布上線 (Production Ready)**
* **短網址綁定**：✅ 已完成並加入自動化同步管線

---

## 📋 待辦事項清單 (Checklist)
- [x] 全澳 8 所高等院校 2026/2027+ 加分與豁免政策全面梳理
- [x] 8 所大學完整資料庫建構 (`data/uni-data.js`)
- [x] 現代化響應式 UI 設計與純前端架構 (`index.html`, `app.js`)
- [x] 互動式「加分資格一鍵試算與匹配器」（支援 10 類特長標籤與快捷組合）
- [x] 全景橫向深度對比矩陣（支援公私立分類篩選與全文即時搜尋）
- [x] 家長與畢業生 8 大防踩坑 Q&A 知識庫
- [x] 升學關鍵時程與互動檢核清單（支援 LocalStorage 狀態保存）
- [x] 列印 A4 友善模式（隱藏介面控制項，一鍵產生紙質/PDF手冊）
- [x] GitHub Actions CI/CD 自動構建與 GitHub Pages 發布
- [x] 自動短網址整合（`www.daydaystudy.top/macau`）與全自動同步管線

---

## 📝 跨電腦交接日誌 (Session Handover Logs)

### 🌙 2026-09-26 00:30 (收工存檔)
- **本次完成重點**：
  1. 完成澳門 8 所大學升學加分與優惠指南專案開發與測試驗證。
  2. 透過 GitHub Actions 自動構建部署上線，並確認 Pages 正常運行。
  3. 整合 `daydaystudy-short-url` 短網址系統，配置自訂網域 `www.daydaystudy.top`。
  4. 建立一鍵自動化同步腳本 `sync_github.py` 與 Windows 桌面快捷批處理檔 `一鍵同步GitHub短網址.bat`，全面同步 28 個 GitHub 倉庫（共 58 筆短網址）。
  5. 產生專屬極短網址 `https://www.daydaystudy.top/macau`。
  6. 永久固化全域指令「以後只要有部署到 GITHUB，馬上給短網址」至 `GEMINI.md`。
- **當前保留狀態 / 待注意**：
  - GitHub Pages 正在為 `daydaystudy.top` 簽發 Let's Encrypt SSL 憑證，DNS 解析已驗證 100% 正確，預計 15-30 分鐘內完全就緒。
  - HTTP 訪問（`http://www.daydaystudy.top/macau`）或瀏覽器點擊「仍要前往」均可即時正常轉跳。
- **下次開工建議入口**：
  - 若需擴充試算維度或更新最新學年招生簡章：開啟 `data/uni-data.js`。
  - 若需將第二帳號 `mathruffian-dot`（100 個倉庫）加入短網址：直接執行桌面 `一鍵同步GitHub短網址.bat` 或在 WSL 執行 `python3 sync_github.py --all`。

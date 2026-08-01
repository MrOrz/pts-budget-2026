# 專案協作方式

這是「公視連署趨勢看板」(守護公視全民連署行動) 的網頁,原始是從 Claude Design 匯出的 `.dc.html` artifact。

## 分工方向

- **Claude Design**(claude.ai/design):使用者在這裡進行**說帖文案補充**與**互動設計**的迭代——文字內容、版面、視覺細節、互動行為的設計決策都發生在這裡。
  - 專案:`公視連署趨勢看板`,project_id `05c4f779-f9dc-4f20-afc5-a0b9ff1683fd`
  - 主要檔案:`守護公視連署趨勢.dc.html`
- **本機**(這個 repo):把 Claude Design 產生的 template 程式碼,改寫成一個可長期維護的 SPA(脫離 `.dc.html` / `dc-runtime` 那套 template 綁定寫法)。本機程式碼結構會跟 Claude Design 上的原始檔案逐漸分岔,不會是逐字同步的副本。
  - 目前入口:`index.html`(將持續演進成獨立可維護的 SPA,不必跟 `.dc.html` 保持檔案結構一致)
  - 部署方式:推上 GitHub,用 GitHub Pages 釋出

## 同步方向與流程

同步永遠是「**從 Claude Design 拉新內容 → 合併進本機 SPA**」,不會反向把本機的程式結構寫回 Claude Design。

進行同步時:

1. 透過 `claude_design` MCP(`mcp__claude_design__*` 工具)把 Claude Design 專案上 `守護公視連署趨勢.dc.html` 的最新版本讀下來。
2. 跟本機目前的版本(`index.html` 或屆時拆分後的 SPA 原始碼)做內容比對,找出差異——重點是抓出 Claude Design 那邊**新增/修改的文案、視覺樣式、互動設計**,而不是整份覆蓋。
3. 把這些新的視覺/文案/互動設計,合併進本機已經重構過的 SPA 程式碼裡,保留本機的程式結構與寫法慣例,不要整份用 Claude Design 的 template 寫法覆蓋本機的實作。
4. 合併時如果遇到不確定的地方(例如某段改動的意圖不明、本機結構跟遠端差異太大不知道怎麼對應、或改動看起來可能是有意或無意的),**先問使用者**,不要自己猜測後硬套。

# goals-frontend
MFEE22大專Goals-前端

## 開啟專案
1. `git clone https://github.com/hruuuuu/goals-frontend.git`
2. `yarn install`
3. `yarn start`
4. 開啟 http://localhost:3000

## 關於styles
- `index.scss` 只用來連結檔案
- 其餘的scss統一前綴加`_` 表示是被import的檔案
- `/styles/_variables`
  - 放變數
  - 可延用或依照個人習慣自行新增
  - 已經有引入boostrap scss 可自行更改變數(記得放在boostrap scss上面)
- `/styles/_global`
  - 放全域樣式
  - 可延用或依照個人習慣自行新增
  - 已經寫好的mixin可以直接include 就不用自己寫字體樣式

## 關於.env
- 在slack #檔案 裡面
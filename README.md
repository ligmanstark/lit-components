## Lit components + демо (vanilla / React / Vue)

### Установка и сборка компонентов
1) Установить зависимости и собрать бандл:
   ```bash
   cd [U PATH]/lit-components/lit
   npm install
   npm run build
   ```
   Результат: `lit/dist/lit-components.js` –  бандл (включает lit).

2) Если хотите использовать локальную копию в демо, скопируйте файл:
   ```bash
   cd [U PATH]/lit-components
   cp lit/dist/lit-components.js vanilla/lit-components.js
   cp lit/dist/lit-components.js react/lit-components.js
   cp lit/dist/lit-components.js vue/lit-components.js
   ```
   (В React/Vue проектах можно также импортировать напрямую из `../lit/dist/lit-components.js` без копирования.)

### Vanilla демо
```bash
cd [U PATH]/lit-components/vanilla
npx serve .   # или любой статический сервер
# открыть http://localhost:3000/
```
Главный файл: `vanilla/index.html` с подключением `./lit-components.js` и обработкой события `button-click`.

### React демо
```bash
cd [U PATH]/lit-components/react
npm install
npm run dev   # http://localhost:5173
```
JSX использует `<hello-greeting>` и `<lit-button>`, событие `button-click` ловится через `ref` и `addEventListener`.

### Vue демо
```bash
cd [U PATH]/lit-components/vue
npm install
npm run dev   # http://localhost:5173
```
В `App.vue` веб-компоненты подключены в шаблоне, событие `button-click` подписывается в `onMounted`.

### API компонентов
- `<lit-button>`: атрибуты `label`, `variant="primary|secondary"`, `disabled`; событие `button-click` (bubbles + composed).
- `<hello-greeting>`: атрибуты `name`, `message`.
- `<hello-greeting>`: атрибуты `path`, `isVisible`.

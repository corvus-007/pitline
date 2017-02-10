# PITLINE
Структура:
```
app/
|--scss/
   |--global/
   |--blocks/
   |--vendors/
   |--variables.scss
   |--functions.scss
   |--mixins.scss
   |--styles.scss
|--images/
   |--svg-icons/
   |--svg-symbols/ (для объединения в один файл symbols.svg)
|--js/
   |--plugins/
|--fonts/
|--blocks (инклюды)

build/
other/
   |--psd
```

## Установка
1. Перейти в родительскую папку проектов
2. Запустить консоль Git Bash
3. Ввести команду `git clone https://github.com/corvus-007/start-project pitline`
4. Перейти в каталог проекта `cd pitline`
5. Установить модули из package.json — `npm install`

## Запуск проекта
`npm start`
## Сборка проекта
`npm build`
## Удаление папки build
`gulp clean`


Из папки js/plugins/ объединяются js-файлы и помещаются в js/plugins.js
Из папки images/svg-symbols/ объединяются svg-файлы и помещаются в images/symbols.svg

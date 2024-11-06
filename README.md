# Руководство по проекту Benchmark

## Обзор проекта

Этот проект состоит из трех основных приложений:

1. **Приложение Next.js v14**: Приложение Next.js, работающее на порту **4000**.
2. **Приложение Remix v2**: Приложение Remix.js, работающее на порту **4040**.
3. **Сервер Benchmark**: Сервер для сравнения производительности приложений Next.js и Remix. Он работает на порту **3000**.

Эти сервисы контейнеризированы с использованием Docker Compose, что упрощает сборку и управление всеми компонентами проекта одновременно.

## Начало работы

### 1. Установка зависимостей

Установите все необходимые зависимости с помощью npm или yarn:

```
yarn install
# или
npm install
```

### 2. Сборка Docker-образов

Вы можете собрать Docker-образы, используя предоставленные npm-скрипты в файле `<span>package.json</span>`.

* **Сборка приложения Next.js v14**:
  ```
  yarn next-build:v14
  # или
  npm run next-build:v14
  ```
* **Сборка приложения Remix v2**:
  ```
  yarn remix-build:v2
  # или
  npm run remix-build:v2
  ```
* **Сборка сервера Benchmark**:
  ```
  yarn benchmark-build
  # или
  npm run benchmark-build
  ```
* **Сборка всех приложений**:
  ```
  yarn build:all
  # или
  npm run build:all
  ```

### 3. Запуск приложений

Чтобы запустить приложения, используйте следующую команду:

```
yarn benchmark:start
# или
npm run benchmark:start
```

Эта команда запустит все три сервиса с использованием Docker Compose.

### 4. Доступ к приложениям

После запуска сервисов вы можете получить доступ к приложениям в своем браузере, используя следующие URL:

* **Приложение Next.js v14**: [http://localhost:4000](http://localhost:4000)
* **Приложение Remix v2**: [http://localhost:4040](http://localhost:4040)
* **Сервер Benchmark**: [http://localhost:3000](http://localhost:3000)

## Переменные окружения

Переменные окружения, используемые в файле Docker Compose, включают следующие:

* **NEXT_V14_PORT**: Порт для приложения Next.js v14 (по умолчанию: **4000**).
* **REMIX_V2_PORT**: Порт для приложения Remix v2 (по умолчанию: **4040**).
* **BENCHMARK_SERVER_PORT**: Порт для сервера Benchmark (по умолчанию: **3000**).

Эти переменные определены в конфигурации Docker Compose и могут быть изменены при необходимости.

## Остановка приложений

Чтобы остановить запущенные сервисы, используйте следующую команду:

```
docker compose down
```

Эта команда остановит все контейнеры и освободит используемые порты.

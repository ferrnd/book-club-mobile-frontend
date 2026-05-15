# 📚 Clube do Livro — *Olhos D'Água* · Frontend

> **Projeto Integrador SENAI/SESI** — API REST bilíngue (PT/EN) para o aplicativo mobile do Clube do Livro, focado na obra *Olhos D'Água* de Conceição Evaristo.

---

## 📖 Sobre o Projeto

Este repositório é o frontend do **aplicativo mobile** desenvolvido pela equipe no Projeto Integrador entre **SENAI** (Desenvolvimento de Sistemas) e **SESI** (Língua Portuguesa e Inglês).

O objetivo é oferecer uma plataforma digital interativa para o estudo literário da obra **"Olhos D'Água"**, de Conceição Evaristo, com foco em preparar alunos para o vestibular por meio de conteúdos organizados, acessíveis e em dois idiomas.

O projeto é dividido em **5 equipes** (4 Web + 1 Mobile). Esta equipe é responsável pelo **mobile**, consumindo esta API com React Native.

---

## 🛠️ Stack

| Tecnologia | Finalidade |
|---|---|
| **Expo** | Framework |
| **Expo Router** | Navegação baseada em arquivos |

---

## 🗂️ Estrutura de Pastas

```
book-club-mobile-frontend/
├── assets/                #Imagens
│   ├──
│   └──
│
├── src/
|   ├── components
|   |    └── NavBar.jsx
│   ├── screens
│       └──
|       └──
|       └──
|       └──
|       └──
|       └──
|       └──
|       └──
├── .gitignore
├── app.json
├── App.jsx
├── index.js
├── package-lock.json
├── package.json
├── README.md

---

## 🌍 Bilinguismo (PT 🇧🇷 / EN 🇺🇸)

Um dos requisitos centrais do projeto é o suporte completo a **dois idiomas**. Todos os campos de texto no banco de dados existem em versão duplicada:

- Sufixo `_pt` → conteúdo em **Português**
- Sufixo `_en` → conteúdo em **Inglês**

**Exemplo no banco:**
```
titulo_pt  = "A Gente Combinamos de Não Esquecer"
titulo_en  = "We Agreed Not to Forget"

resumo_pt  = "Um conto sobre memória e identidade..."
resumo_en  = "A short story about memory and identity..."
```

O conteúdo em inglês foi **adaptado** pela equipe — não foi utilizada tradução automática, conforme exigência dos professores do SENAI.

O aplicativo mobile utilizará a preferência de idioma do usuário para decidir qual campo exibir.

---

## 🚀 Como Rodar

```terminal
# Criar a pasta
npx create-expo-app nome-da-pasta --template blank

# Entrar na pasta
cd nome-da-pasta

# Iniciar o Metro Bundler
npm start

# Gere o Prisma Client
npx prisma generate
```
---

## 👥 Integrantes Da Equipe
| Integrante | Curso | Função Principal |
| :--- | :--- | :--- |
| Fernando Santos | Desenvolvimento de Sistemas | Backend / DB / Frontend / Figma / Trello |
| Maria Eduarda Andrade| Desenvolvimento de Sistemas | Backend / DB / Figma|
| Cauã Tupinambá | Desenvolvimento de Sistemas | Backend / Trello |
| João Pedro Piva | Desenvolvimento de Sistemas | Backend / Trello|
| Daniel Casalli | Desenvolvimento de Sistemas | Frontend / Figma|
| Ana Clara Cremasco| Desenvolvimento de Sistemas | Frontend / Figma |

---

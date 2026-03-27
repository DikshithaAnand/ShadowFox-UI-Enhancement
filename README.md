# 🎙️ Voice-Based English ↔ Japanese Translator

> A production-ready **speech-to-speech translation system** that converts spoken English ↔ Japanese in real time with confidence metrics and synchronized playback.

---

## 📌 Overview

This project is an advanced **NLP + Speech Processing application** that enables seamless **voice-based translation between English and Japanese**.

Users can record speech directly in the browser, and the system performs:

1. 🎤 Speech-to-Text (ASR)
2. 🌐 Language Translation
3. 🔊 Text-to-Speech (TTS)
4. 📊 Confidence & Audio Quality Analysis
5. 🟨 Word-level audio synchronization

The system is designed for **accuracy, transparency, and real-world usability**.

---

## 🚀 Live Features

- 🎤 **Browser-based voice recording**
- 🧠 **High-accuracy transcription (Whisper)**
- 🌐 **English ↔ Japanese translation**
- 🔊 **Instant speech playback (no file storage)**
- 🟨 **Word-level highlighting synced with audio**
- 📊 **Confidence score (ASR reliability)**
- 🔇 **Silence ratio (audio quality insight)**
- 🖥️ **Interactive Streamlit UI**

---

## 🧠 What Makes This Project Unique

Unlike basic translator apps, this system focuses on **intelligent and explainable AI**:

- ✅ Displays **confidence scores (model reliability)**
- ✅ Provides **audio quality metrics**
- ✅ Uses **word-level timestamps for precise syncing**
- ✅ Avoids disk storage → **memory-efficient & deployable**
- ✅ Modular pipeline for **scalability and extension**

---

## 🏗️ System Architecture

```text
🎤 Voice Input
      ↓
🔇 Silence Removal (VAD)
      ↓
🧠 Speech Recognition (Whisper)
      ↓
📝 Text + Confidence + Word Timestamps
      ↓
🌐 Translation (EN ↔ JA)
      ↓
🔊 Text-to-Speech (gTTS)
      ↓
🟨 UI Playback + Word Highlighting

## 🛠️ Tech Stack

| Category            | Technology Used        |
|--------------------|------------------------|
| Language           | Python                 |
| UI Framework       | Streamlit              |
| Speech Recognition | OpenAI Whisper         |
| Translation        | Google Translate API   |
| Text-to-Speech     | gTTS                   |
| Audio Processing   | NumPy, SciPy           |
| Version Control    | Git, GitHub            |

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/DikshithaAnand/ShadowFox-UI-Enhancement
cd voi
```

## Run Locally
```bash
npm install
npm start
```

## Folder Structure
- `src/App.js` → Main UI logic
- `src/data.js` → Product data
- `src/styles.css` → Styling
- `public/index.html` → Root HTML

## Suggested Viva / Report Points
1. Improved product discovery using search, filter, and sort.
2. Reduced checkout friction using fewer steps.
3. Better mobile responsiveness.
4. User feedback form supports iterative UX improvement.

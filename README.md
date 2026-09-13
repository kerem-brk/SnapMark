# 📸 SnapMark Pro Studio — 4K Code, Markdown & Social Media Visual Suite

> **[TR]** Ray.so ve Carbon estetiğinin çok ötesinde; kod parçacıklarını, Markdown notlarını, tweet alıntılarını ve terminal komutlarını tek tıkla 4K kristal netliğinde görsellere ve WebM animasyon videolarına dönüştüren modern web stüdyosu.  
> **[EN]** Beyond Ray.so and Carbon: A modern web studio that turns code snippets, Markdown notes, social quotes, and terminal sessions into crisp 4K screenshots and animated WebM videos with one click.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-purple?style=flat-square)](https://web.dev/progressive-web-apps/)

---

## 📑 İçindekiler / Table of Contents
- [🇹🇷 Türkçe Kılavuz](#-türkçe-kılavuz)
  - [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
  - [Klavye Kısayolları](#-klavye-kısayolları)
  - [Kurulum ve Çalıştırma](#-kurulum-ve-çalıştırma)
  - [Ücretsiz Canlıya Alma (0 TL Hosting)](#-ücretsiz-canlıya-alma-0-tl-hosting)
  - [Teknoloji Mimarisi](#-teknoloji-mimarisi)
  - [Gizlilik & Güvenlik](#-gizlilik--güvenlik)
- [🇬🇧 English Guide](#-english-guide)
  - [Key Features](#-key-features)
  - [Keyboard Shortcuts](#-keyboard-shortcuts)
  - [Getting Started](#-getting-started)
  - [Free 0$ Cloud Deployment](#-free-0-cloud-deployment)
  - [Tech Stack & Architecture](#-tech-stack--architecture)
  - [Privacy & Security](#-privacy--security)

---

# 🇹🇷 Türkçe Kılavuz

## 🌟 Öne Çıkan Özellikler

### 1. 🎨 Çoklu İçerik Modları
* **Kod Modu:** 15+ programlama dili desteği (TypeScript, Rust, Python, Go, C#, CSS, SQL vb.), sözdizimi renklendirmesi ve çoklu dosya sekmeleri.
* **Diff (Karşılaştırma) Modu:** Kod değişikliklerini önce / sonra (yeşil `+` / kırmızı `-`) formatında profesyonelce sergileme.
* **Tweet / Sosyal Kart Modu:** Yazar adı, kullanıcı adı, profil fotoğrafı ve onaylı rozetiyle estetik tweet kartları.
* **Alıntı & Markdown Modu:** Düşünce, ilham verici alıntılar ve zengin tipografi afişleri.
* **Terminal (CLI) Modu:** `developer@snapmark:~`, `npm run build`, `docker up` gibi gerçekçi konsol çıktıları.

### 2. 🎞️ Animasyon & Video (WebM)
* **Canlı WebM Video Kaydı:** Daktilo (typewriter) efektini ve dalgalı degrade arka planları istemci tarafında doğrudan 25 FPS video olarak kaydetme ve indirme.
* **Hareketli Gradient Dalgaları (Animated Mesh):** GPU hızlandırmalı keyframe animasyonu ve hız kontrolü (Yavaş, Normal, Hızlı).

### 3. 📐 Sosyal Medya Hazır Tuval Boyutları
* **Twitter / X Gönderisi:** 1200 × 675 (16:9)
* **Instagram Story:** 1080 × 1920 (9:16)
* **Instagram Kare:** 1080 × 1080 (1:1)
* **LinkedIn Banner:** 1584 × 396
* **YouTube Thumbnail:** 1280 × 720
* **Özel En-Boy Oranı:** Serbest genişlik ve yükseklik ayarı.

### 4. 🎛️ Carousel & Slayt Yöneticisi
* Çoklu slayt desteği ve HTML5 Drag & Drop ile fareyle sürükleyip bırakarak sıralama.
* Tüm slaytları tek tıkla toplu ZIP arşivi olarak indirme.

### 5. 💎 Profesyonel İnce Ayarlar & Efektler
* **Sade İlk Açılış:** Varsayılan olarak tertemiz, minimal bir tuval; dilediğinizde efektleri tek tıkla aktif edebilirsiniz.
* **3D Eğim (Tilt) & Perspektif:** İnce gölge derinliğiyle kartı tuvalde 3 boyutlu eğme.
* **Degrade Kenarlık (Gradient Border):** İki renkli neon çerçeve çizgisi ve kalınlık ayarı.
* **Organik Doku (Grain Texture):** Analog film kumlanma katmanı.
* **Dinamik QR Kod Rozeti:** Kartın köşesine canlı taranabilir QR kod iliştirme.
* **Özel Marka Logosu & Filigran:** Kendi logonuzu yükleyip opaklık ve köşe konumu belirleme.
* **Pencere Başlık Stilleri:** macOS, Windows 11, Terminal ve Safari çerçeveleri.

### 6. ⚡ Hızlı Kullanım, Kısayollar ve Çoklu Dil
* **Çift Dilli Arayüz (TR / EN):** Üst çubuktaki dil düğmesiyle tek tıkla Türkçe veya İngilizceye geçiş.
* **Komut Paleti (`Ctrl + K`):** Tüm modlara, temalara, dışa aktarmaya ve formatlara klavyeden anında erişim.
* **Tam Ekran Sunum Modu (`F11`):** Dikkat dağıtıcı menüler olmadan slaytları tam ekran gezme ve sunma.
* **Sosyal Akış Simülasyonu:** Kartın Twitter, LinkedIn ve Instagram feedlerinde nasıl görüneceğini canlı inceleme.
* **PWA Masaüstü & Mobil:** Tarayıcıdan bağımsız, masaüstüne ya da telefona tek tıkla uygulama olarak kurabilme.

---

## ⌨️ Klavye Kısayolları

| Kısayol | İşlev |
| :--- | :--- |
| `Ctrl + S` | Yüksek Çözünürlüklü PNG İndir |
| `Ctrl + Shift + C` | Görseli Doğrudan Panoya Kopyala |
| `Ctrl + K` | Komut Paletini Aç |
| `F11` | Tam Ekran Sunum Modu |
| `Ctrl + Z` / `Ctrl + Y` | Geri Al (Undo) / İleri Al (Redo) |
| `Ctrl + 1..5` | Modlar Arası Hızlı Geçiş (Kod, Diff, Alıntı, Tweet, Terminal) |
| `Ctrl + Alt + ← / →` | Carousel Slaytları Arasında Gezinti |
| `?` | Kısayollar Yardım Penceresi |

---

## 🚀 Kurulum ve Çalıştırma

Gereksinimler: **Node.js 18+** ve **npm**

```bash
# 1. Proje dizinine gidin
cd 01-SnapMark

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcınızda açın:
# http://localhost:3000
```

### Canlı Üretim Derlemesi (Production Build)

```bash
npm run build
npm start
```

---

## 🌐 Ücretsiz Canlıya Alma (0 TL Hosting)

SnapMark tamamen istemci taraflı (client-side) çalıştığı için Vercel veya Netlify üzerinde **0 TL maliyetle ve ömür boyu ücretsiz** yayınlanabilir:

1. Projeyi GitHub hesabınıza yükleyin (`git push origin master`).
2. [Vercel.com](https://vercel.com) adresine ücretsiz GitHub hesabınızla giriş yapın.
3. **"Add New Project"** butonuna tıklayıp deponuzu seçin.
4. Framework olarak **Next.js** otomatik algılanır; **Deploy** butonuna basın.
5. 60 saniye içinde `https://snapmark-senin-adin.vercel.app` şeklinde ücretsiz HTTPS adresiniz hazır!

---

## 🛠️ Teknoloji Mimarisi

* **Framework:** Next.js 15 (App Router, Client & Server Components)
* **Dil:** TypeScript (Strict Type Safety)
* **Stil:** Tailwind CSS
* **İkon Seti:** Lucide React
* **Sözdizimi:** PrismJS
* **Tuval İşleyici:** `html-to-image`
* **Arşivleme:** JSZip
* **QR Kod:** `qrcode`
* **Video Kaydedici:** MediaStream & MediaRecorder API

---

## 🔒 Gizlilik & Güvenlik

* **%100 İstemci Taraflı (Client-Side):** Yazdığınız kodlar, özel API anahtarları, tweetler veya yüklediğiniz marka logoları **asla harici bir sunucuya gönderilmez**. Tüm işleme ve dışa aktarma doğrudan tarayıcınızın kendi yerel belleğinde gerçekleşir.

---
---

# 🇬🇧 English Guide

## 🌟 Key Features

### 1. 🎨 Multi-Content Modes
* **Code Mode:** 15+ language syntax highlighting (TypeScript, Rust, Python, Go, C#, CSS, SQL, etc.) with multi-file tabs.
* **Diff Mode:** Side-by-side or unified code changes with green additions (`+`) and red deletions (`-`).
* **Tweet / Social Card Mode:** Showcase tweets with verified badge, author name, handle, and avatar.
* **Quote & Markdown Mode:** Turn memorable thoughts, quotes, or markdown notes into high-impact typography posters.
* **Terminal (CLI) Mode:** Realistic developer terminal sessions (`developer@snapmark:~`, `git commit`, `docker compose up`).

### 2. 🎞️ Animation & Video Recording (WebM)
* **Client-Side Video Export:** Record typewriter animation and moving gradient backdrops into high-quality 25 FPS WebM videos without server roundtrips.
* **Animated Mesh Gradients:** GPU-accelerated gradient wave animations with customizable speed levels (Slow, Normal, Fast).

### 3. 📐 Preset Canvas Aspect Ratios
* **Twitter / X Post:** 1200 × 675 (16:9)
* **Instagram Story:** 1080 × 1920 (9:16)
* **Instagram Square:** 1080 × 1080 (1:1)
* **LinkedIn Banner:** 1584 × 396
* **YouTube Thumbnail:** 1280 × 720
* **Custom Aspect Ratio:** Freely adjustable width and height.

### 4. 🎛️ Carousel & Slide Studio
* Build multi-slide carousels for LinkedIn and Instagram swipe posts.
* Reorder slides via intuitive HTML5 drag-and-drop.
* Export all slides at once into a packaged ZIP archive.

### 5. 💎 Fine-Tuned Aesthetics & Effects
* **Minimal Clean Default:** Starts with a clean, distraction-free canvas out of the box so you can customize it to your taste.
* **3D Perspective Tilt:** Apply isometric tilt and shadow depth.
* **Gradient Border:** Dual-color neon gradient borders with adjustable stroke thickness.
* **Grain Texture Overlay:** Authentic analog film grain effect.
* **Dynamic QR Code:** Stamp a scannable QR badge directly onto your card corners.
* **Brand Logo & Watermark:** Upload your custom brand watermark, select opacity and placement.
* **Window Chrome Styles:** macOS dots, Windows 11 controls, Terminal header, and Safari bar.

### 6. ⚡ Productive Shortcuts, Command Palette & i18n
* **Bilingual UI (TR / EN):** One-click toggle in the header to switch between Turkish and English.
* **Command Palette (`Ctrl + K`):** Instantly search and execute any command, switch themes, and export.
* **Full-Screen Presenter (`F11`):** Showcase slides in full-screen mode without UI chrome.
* **Social Feed Simulation:** Preview your card in realistic Twitter, LinkedIn, and Instagram feeds before posting.
* **PWA (Progressive Web App):** Install directly to your desktop or mobile home screen.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + S` | Download High-Resolution PNG |
| `Ctrl + Shift + C` | Copy Image Directly to Clipboard |
| `Ctrl + K` | Open Command Palette |
| `F11` | Toggle Full-Screen Presentation Mode |
| `Ctrl + Z` / `Ctrl + Y` | Undo / Redo |
| `Ctrl + 1..5` | Quick Switch Modes (Code, Diff, Quote, Tweet, Terminal) |
| `Ctrl + Alt + ← / →` | Navigate Carousel Slides |
| `?` | Keyboard Shortcuts Cheatsheet |

---

## 🚀 Getting Started

Requirements: **Node.js 18+** and **npm**

```bash
# 1. Clone or navigate to the project directory
cd 01-SnapMark

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in your browser:
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Free 0$ Cloud Deployment

Because SnapMark runs 100% on the client side, you can host it forever for **free ($0/month)** on Vercel or Netlify:

1. Push your code to GitHub (`git push origin master`).
2. Log in to [Vercel.com](https://vercel.com) with your GitHub account.
3. Click **"Add New Project"** and import your SnapMark repository.
4. Next.js preset will be automatically detected. Click **Deploy**.
5. Your production HTTPS site is live in under a minute!

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 15 (App Router, Client & Server Components)
* **Language:** TypeScript (Strict Type Safety)
* **Styling:** Tailwind CSS
* **Iconography:** Lucide React
* **Syntax Engine:** PrismJS
* **Canvas Renderer:** `html-to-image`
* **Compression:** JSZip
* **QR Generation:** `qrcode`
* **Video Encoding:** MediaStream & MediaRecorder API

---

## 🔒 Privacy & Security

* **100% Client-Side:** Your source code snippets, secrets, tweets, and uploaded brand assets **never touch any external server**. All rendering and export happens locally in your browser memory.

---

## 📄 License

MIT © [Kerem Birçek](https://github.com/kerembircek)

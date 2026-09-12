# 📸 SnapMark Pro Studio — 4K Kod, Markdown & Medya Görsel Stüdyosu

> Ray.so ve Carbon estetiğinin çok ötesinde; kod parçacıklarını, Markdown notlarını, tweet alıntılarını ve terminal komutlarını tek tıkla 4K kristal netliğinde görsellere ve WebM animasyon videolarına dönüştüren modern web stüdyosu.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-purple?style=flat-square)](https://web.dev/progressive-web-apps/)

---

## 🌟 Öne Çıkan Süper Güçler

### 1. 🎨 Kristal Netliğinde Çoklu Modlar
* **Kod Modu:** 15+ programlama dili desteği (TypeScript, Rust, Python, Go, C#, CSS, SQL vb.), sözdizimi renklendirmesi ve çoklu dosya sekmeleri.
* **Diff (Karşılaştırma) Modu:** Kod değişikliklerini önce / sonra (yeşil `+` / kırmızı `-`) formatında profesyonelce sergileme.
* **Tweet / Sosyal Kart Modu:** Yazar adı, kullanıcı adı, profil fotoğrafı ve onaylı rozetiyle estetik tweet kartları.
* **Alıntı & Markdown Modu:** Düşünce, ilham verici alıntılar ve zengin tipografi afişleri.
* **Terminal (CLI) Modu:** `developer@snapmark:~`, `npm run build`, `docker up` gibi gerçekçi konsol çıktıları.

### 2. 🎞️ Animasyon & Video (WebM)
* **Canlı WebM Video Kaydı:** Daktilo (typewriter) efektini ve dalgalı degrade arka planları istemci tarafında doğrudan 25 FPS video olarak kaydetme ve indirme.
* **Hareketli Gradient Dalgaları (Animated Mesh):** GPU hızlandırmalı keyframe animasyonu ve hız kontrolü (Yavaş, Normal, Hızlı).

### 3. 📐 Sosyal Medya Hazır Boyutları
* **Twitter / X Gönderisi:** 1200 × 675 (16:9)
* **Instagram Story:** 1080 × 1920 (9:16)
* **Instagram Kare:** 1080 × 1080 (1:1)
* **LinkedIn Banner:** 1584 × 396
* **YouTube Thumbnail:** 1280 × 720

### 4. 🎛️ Carousel & Slayt Yöneticisi
* Çoklu slayt desteği ve HTML5 Drag & Drop ile fareyle sürükleyip bırakarak sıralama.
* Tüm slaytları tek tıkla toplu ZIP arşivi olarak indirme.

### 5. 💎 Profesyonel İnce Ayarlar
* **3D Eğim (Tilt) & Perspektif:** İnce gölge derinliğiyle kartı tuvalde eğme.
* **Degrade Kenarlık (Gradient Border):** İki renkli neon çerçeve çizgisi ve kalınlık ayarı.
* **Organik Doku (Grain Texture):** Analog film kumlanma katmanı.
* **Dinamik QR Kod Rozeti:** Kartın köşesine canlı taranabilir QR kod iliştirme.
* **Özel Marka Logosu & Filigran:** Kendi logonuzu yükleyip opaklık ve köşe konumu belirleme.
* **Pencere Başlık Stilleri:** macOS, Windows 11, Terminal ve Safari çerçeveleri.

### 6. ⚡ Hızlı Kullanım & Kısayollar
* **Komut Paleti (`Ctrl + K`):** Tüm modlara, temalara, dışa aktarmaya ve formatlara klavyeden anında erişim.
* **Tam Ekran Sunum Modu (`F11`):** Dikkat dağıtıcı menüler olmadan slaytları tam ekran gezme ve sunma.
* **Sosyal Akış Simülasyonu:** Kartın Twitter, LinkedIn ve Instagram feed'lerinde nasıl görüneceğini canlı inceleme.
* **Çift Dilli Arayüz (i18n):** Türkçe ↔ İngilizce arasında tek tıkla anında dil değişimi.
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

## 🚀 Kurulum ve Başlatma

Gereksinimler: **Node.js 18+** ve **npm**

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcınızda açın
http://localhost:3000
# Vitrin (Landing Page) için:
http://localhost:3000/landing
```

### Canlı Üretim Derlemesi (Production Build)

```bash
npm run build
npm start
```

---

## 🛠️ Mimari & Teknoloji Yığını

* **Framework:** Next.js 15 (App Router, Client & Server Components)
* **Dil:** TypeScript (Strict Type Safety)
* **Stil:** Tailwind CSS
* **İkon Seti:** Lucide React
* **Sözdizimi:** PrismJS
* **Tuval İşleyici:** `html-to-image`
* **Arşivleme:** JSZip
* **QR Üretici:** `qrcode`
* **Video Kaydedici:** MediaStream & MediaRecorder API

---

## 🔒 Gizlilik & Güvenlik

* **%100 İstemci Taraflı (Client-Side):** Yazdığınız kodlar, şifreler, tweet'ler veya yüklediğiniz özel logolar **asla bir sunucuya gitmez**. Her şey tamamen tarayıcınızın kendi belleğinde işlenir.

---

## 📄 Lisans

MIT © Kerem Birçek

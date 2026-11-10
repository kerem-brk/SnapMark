# SnapMark — Mimari Tasarım Şartnamesi (DESIGN.md)
**Sürüm:** 1.0.0  
**Tarih:** 27 Eylül 2026  
**Standart:** UI/UX Pro Max & Nexus Conductor Architecture  
**Metodoloji:** Quantora Site Factory Standards  
**Rol:** Kıdemli UI/UX & Tasarım Mimarı (Design Architect)

---

## 1. Yönetici Özeti ve Tasarım Felsefesi

SnapMark; geliştiriciler, teknik yazarlar, indie hacker'lar ve içerik üreticileri için tasarlanmış **yeni nesil, saf frontend, sıfır sunucu bağımlılıklı kod ve Markdown görselleştirme stüdyosudur**. Ray.so ve Carbon gibi klasik araçların ötesine geçerek; piksel netliğinde 2x/4x Retina render alma, çok modlu içerik desteği (Kod, Markdown/Diff, Tweet, CLI, Alıntı), sosyal medya vitrin formatları (16:9 Twitter/X, 4:5 LinkedIn, 1:1 Instagram) ve akıcı developer ergonomisi sunar.

### 1.1 Anti-AI-Slop Manifestosu & Katı Tasarım İlkeleri
- **Sıfır Anlamsız Süsleme (No Decorative Blobs):** Sayfanın hiçbir yerinde içerikle bağı olmayan yüzen renk lekeleri (blobs), gereksiz bulanık 3D objeler veya dikkat dağıtıcı neon parlamalar kullanılmaz.
- **Ray.so Sadeliği & Carbon Hassasiyeti:** Arayüzün merkezinde daima **kullanıcının içeriği (kod / markdown)** yer alır. UI kontrolleri içeriği gölgelemez, ona çerçeve oluşturur.
- **İkon Standardı:** Emojiler kesinlikle UI simgesi olarak kullanılmaz. Tüm sistemde **Lucide SVG (1.5px / 2.0px stroke)** vektörel ikonlar kullanılır.
- **Sıfır Sunucu & %100 Gizlilik:** Kod ve hassas veriler hiçbir uzak API'ye gönderilmez; tüm rasterizasyon `html-to-image` ve yerel HTML5 Canvas ile istemcide gerçekleşir.
- **Mikro-Etkileşim Disiplini:** Tıklanabilir tüm elemanlarda `cursor-pointer`, 150-200ms `cubic-bezier(0.16, 1, 0.3, 1)` akıcı geçişler ve klavye odak halkaları (visible focus ring) zorunludur.

---

## 2. Tasarım Sistemi & Renk/Tipografi Mimarisi

SnapMark tasarım sistemi, **Teenage Engineering & Dieter Rams Warm Alabaster** stüdyo estetiği ile **Dark Mode (OLED)** kart yüzeylerinin kusursuz kontrastına dayanır.

### 2.1 Renk Paleti (Design Tokens)

| Token İsmi | Hex Kodu | Semantik Kullanım Alanı |
|:---|:---|:---|
| **Studio Canvas (Alabaster)** | `#F4F1EA` | Ana tuval ve mühendislik ızgara zemin |
| **Studio Panel (Surface)** | `#FAF8F5` | Sol ayar paneli, üst çubuk, dock menü |
| **Border Neutral** | `#D6D0C4` | Stüdyo panel ve modül kenarlıkları |
| **Accent / CTA (Engineering Orange)**| `#FF4F00` | Birincil eylem (Export, Kopyala, İndir, Aktif Sekme) |
| **Card Surface (Dark OLED)** | `#0D1117` | Kod ve terminal kart gövdeleri |
| **Card Border** | `#30363D` | Kod kartı pencere çerçevesi |
| **Text Primary** | `#18181B` | Stüdyo başlıkları ve arayüz metinleri |
| **Text Muted** | `#57534E` | Açıklamalar, etiketler ve ikincil butonlar |
| **Diff Added (Green)** | `#10B981` | Eklenen kod satırları ve diff istatistiği |
| **Diff Removed (Red)** | `#EF4444` | Silinen kod satırları ve hata durumları |

### 2.2 Tipografi Mimarisi

Proje iki ana yazı tipi ailesine dayanır:

1. **Kod, Başlık ve Rozetler — JetBrains Mono:**
   - Font Family: `'JetBrains Mono', monospace`
   - Ağırlıklar: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`
   - OpenType Özellikleri: `font-feature-settings: "liga" 1, "calt" 1` (Kod ligatürleri aktif `=>`, `!==`, `===`)
2. **Kullanıcı Arayüzü & Etiketler — IBM Plex Sans:**
   - Font Family: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif`
   - Ağırlıklar: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`
   - Amacı: Okunabilirliği yüksek, endüstriyel ve teknik bir his uyandıran ergonomik UI metinleri.

### 2.3 Spacing ve Ritim Sistemi
- **8pt Grid Sistemi:** `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), `--space-lg` (24px), `--space-xl` (32px), `--space-2xl` (48px), `--space-3xl` (64px).
- **Yarıçaplar (Border Radius):** Kontrol elemanları için `8px` (`rounded-lg`), Kod pencereleri için `16px` (`rounded-2xl`), Büyük tuval çerçevesi için `20px` (`rounded-3xl`).
- **Derinlik & Gölgeler:**
  - *None:* Düz kartlar.
  - *Soft:* `0 10px 25px -5px rgba(0, 0, 0, 0.4)`
  - *Medium:* `0 20px 40px -10px rgba(0, 0, 0, 0.65)`
  - *Hard 3D:* `0 35px 60px -15px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(255, 255, 255, 0.1)`

---

## 3. Stüdyo Mimarisi (2 Panelli Sistem)

SnapMark stüdyo ekranı 3 ana bileşenden oluşur:
1. **Üst Eylem Çubuğu (Top Action Bar)**
2. **Sol Kontrol Paneli (Left Studio Controls)**
3. **Merkez / Sağ Canlı Tuval (Live Interactive Canvas)**

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [SnapMark ●]  [Code|Diff|Tweet|CLI]  [Aspect: Auto|16:9|4:5|1:1]   [Kopyala] [PNG 4K]  │ Top Bar
├─────────────────────────┬──────────────────────────────────────────────────────────────┤
│ KONTROL PANELİ          │ MERKEZ CANLI TUVAL                                           │
│                         │                                                              │
│ • Dil: [ TypeScript ▼ ] │   ┌──────────────────────────────────────────────────────┐   │
│ • Mesh Tema (8 Seçenek) │   │ Gradient Arka Plan Tuvali (Padding: 48px)            │   │
│   [Vercel] [Candy] ...  │   │  ┌────────────────────────────────────────────────┐  │   │
│ • Pencere Stili:        │   │  │ (● ● ●) untitled.ts                  TypeScript │  │   │
│   (macOS|Win|Minimal)   │   │  ├────────────────────────────────────────────────┤  │   │
│ • Padding: [ 48px ]     │   │  │ 1 | import { createSnap } from "snapmark";    │  │   │
│ • Yazı Boyutu: [ 14px ] │   │  │ 2 | export const retina = 4;                   │  │   │
│ • Satır No: [✓] Açık    │   │  │ 3 | // Canlı düzenlenebilir kod alanı...       │  │   │
│ • Gölge: [ Hard 3D ]    │   │  └────────────────────────────────────────────────┘  │   │
│ • Font: [JetBrains ▼]   │   └──────────────────────────────────────────────────────┘   │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

### 3.1 Üst Eylem Çubuğu (Global Header)
- **Marka Logosu:** Sol üstte "SnapMark" tipografik logosu ve yanında `#22C55E` nabız (pulse) gösteren yeşil durum noktası.
- **İçerik Modları (Segmented Control):**
  - `💻 Code`: Sözdizimi renklendirmeli kod editörü.
  - `⚡ Diff`: Önce/Sonra kod karşılaştırması.
  - `💬 Markdown / Quote`: Tipografik alıntı ve not kartı.
  - `🖥️ Terminal`: CLI konsol çıktısı (`developer@snapmark:~`).
- **En-Boy Oranı (Social Aspect Ratios):**
  - `Auto`: Kod içeriğinin uzunluğuna ve genişliğine göre doğal boyutlanma.
  - `16:9 Twitter/X`: 1200 × 675 ölçekli yatay sosyal medya kartı.
  - `4:5 LinkedIn`: 1080 × 1350 dikey profesyonel akış formatı (en yüksek etkileşim oranı).
  - `1:1 Instagram`: 1080 × 1080 kare gönderi formatı.
- **Dışa Aktarma Eylemleri (Export Hub):**
  - **Panoya Kopyala (`Ctrl+C`):** 2x çözünürlükte panoya doğrudan PNG blob kopyalar (tek tıkla Slack/Twitter/Discord'a yapıştırılabilir).
  - **PNG İndir (Retina 2x / 4K 4x):** İstemci tarafında `html-to-image` ile kayıpsız PNG oluşturur ve indirir.
  - **SVG İndir:** Vektörel formatta ölçeklenebilir çıktı.
  - **Komut Paleti Butonu:** `Ctrl+K` ipucu çipi ile hızlı arama menüsünü tetikler.

### 3.2 Sol Kontrol Paneli (Studio Controls)
Kontrol paneli, içerik üreticisinin ihtiyaç duyduğu tüm ayarları anlık geri bildirimle sunar:

1. **Dil Seçici (Language Picker):**
   - Desteklenen 13+ ana dil: TypeScript, JavaScript, Python, Rust, Go, C#, C++, HTML, CSS, JSON, SQL, Markdown, Bash.
   - Dil seçimi dosya uzantısını (`.ts`, `.rs`, `.py`) ve sözdizimi ayrıştırma kurallarını otomatik günceller.
2. **8 İmza Mesh Gradyan Seçici:**
   - `01. Vercel Dark (Signature)`: `linear-gradient(135deg, #0070F3 0%, #7928CA 50%, #000000 100%)`
   - `02. Cotton Candy`: `linear-gradient(135deg, #EC4899 0%, #A855F7 50%, #6366F1 100%)`
   - `03. Warm Sunset`: `linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #E11D48 100%)`
   - `04. Cyberpunk Neon`: `linear-gradient(135deg, #22D3EE 0%, #D946EF 50%, #FACC15 100%)`
   - `05. Emerald Forest`: `linear-gradient(135deg, #34D399 0%, #0D9488 50%, #155E75 100%)`
   - `06. Deep Ocean`: `linear-gradient(135deg, #2563EB 0%, #4338CA 50%, #0F172A 100%)`
   - `07. Aurora Borealis`: `linear-gradient(135deg, #4ADE80 0%, #06B6D4 50%, #9333EA 100%)`
   - `08. Hyper Violet`: `linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #C026D3 100%)`
3. **Pencere Başlığı Stili:**
   - `macOS`: Sol tarafta klasik Kırmızı (`#FF5F56`), Sarı (`#FFBD2E`), Yeşil (`#27C93F`) pencere butonları.
   - `Windows`: Sağ tarafta Küçült, Büyüt, Kapat ikonları (`_  □  ✕`).
   - `Minimalist`: Çerçevesiz, yalnızca ince odak çizgisi veya sade başlık çipi.
4. **Padding (Kenar Boşluğu) Seçici & Kaydırıcı:**
   - Hazır preset butonları: `16px`, `32px`, `48px`, `64px`, `96px`.
   - İnce ayar aralığı: `16px - 128px`.
5. **Gölge Yoğunluğu (Shadow Depth):**
   - `Yok (Flat)`: Sıfır gölge.
   - `Yumuşak (Soft)`: Hafif derinlik.
   - `Belirgin (Medium)`: Standart kart gölgesi.
   - `3D Derin (Hard)`: Retina netliğinde koyu zemin ayrımı sağlayan 60px difüzyon gölgesi.
6. **Yazı Boyutu (Font Size):**
   - `12px`, `14px`, `16px`, `18px`, `20px` arasında akıcı kaydırıcı.
7. **Satır Numaraları:**
   - Açık/Kapalı geçiş anahtarı (Toggle switch).

### 3.3 Sağ / Merkez Canlı Tuval (Live Interactive Canvas)
- **Etkileşimli Editör:** Kullanıcı kod alanına tıkladığında doğrudan metni düzenleyebilir; satır numaraları dinamik olarak metnin satır sayısıyla eşzamanlanır.
- **Canlı Dosya Başlığı:** `untitled.ts` alanı düzenlenebilir bir `contenteditable` veya text input'tur; kullanıcının girdiği dosya adına göre dil otomatik algılanabilir.
- **Sözdizimi Renklendirme Sistemi:**
  - Anahtar sözcükler (keywords: `import`, `export`, `function`, `const`): Canlı mor/pembe (`#C084FC`)
  - Fonksiyonlar (`createSnap`, `generateShowcase`): Gökyüzü mavisi (`#60A5FA`)
  - Tipler ve Arayüzler (`string`, `DeveloperCard`): Sarı/Altın (`#FBBF24`)
  - Karakter dizileri (strings): Zümrüt yeşili (`#34D399`)
  - Yorum satırları (comments): Nötr mat gri (`#64748B`)
- **Sosyal En-Boy Oranı Sınırlandırıcı:** 16:9, 4:5 veya 1:1 seçildiğinde dış taşıyıcı kutu CSS `aspect-ratio` kuralını benimser ve kartı merkezde mükemmel biçimde hizalar.

---

## 4. Klavye Kısayolları ve Erişilebilirlik (a11y)

| Kısayol | Eylem | Açıklama |
|:---|:---|:---|
| `Ctrl + K` / `Cmd + K` | Komut Paletini Aç | Hızlı arama, tema ve dil değiştirme modalı |
| `Ctrl + C` / `Cmd + C` | PNG'yi Panoya Kopyala | Editör dışındayken tüm kartı görsel olarak kopyalar |
| `Ctrl + Enter` / `Cmd + Enter` | 4K PNG İndir | Anında yüksek çözünürlüklü indirme |
| `Esc` | Modalları Kapat | Açık açılır menü veya pencereleri sonlandırır |
| `Tab` / `Shift + Tab` | Klavye Gezinmesi | Tüm buton ve inputlarda net odak halkası (`ring-2 ring-emerald-500`) |

---

## 5. İstemci Taraflı Render & Performans Standartları

- **HTML-to-Image / Canvas Entegrasyonu:**
  - Rasterizasyon sırasında `pixelRatio: 2` (Retina) veya `pixelRatio: 4` (4K Ultra HD) kullanılır.
  - SVG yabancı nesneler (foreignObject) veya saf Canvas drawing kullanılarak font kırpılmaları ve antialiasing sorunları önlenir.
- **Sıfır Dış Sunucu Gecikmesi:** Kullanıcının her tuşa basışında veya renk değişiminde CSS değişkenleri GPU katmanında anlık olarak yeniden çizilir (60 FPS).
- **Toast Bildirim Sistemi:** Başarılı kopyalama veya indirme işlemlerinde ekranın sağ alt köşesinde 3 saniye süreyle beliren yeşil onay ikonu içeren mikro bildirim.

---

## 6. Prototip & Uygulama Doğrulaması

Bu şartnameye tam uyumlu interaktif prototip `preview.html` dosyasında canlıya alınmıştır. Prototip; tüm renk paletini, 8 mesh gradyanını, macOS/Windows/Minimalist pencere başlıklarını, anlık padding/font boyutu kaydırıcılarını, en-boy oranı çerçevelerini ve Toast bildirimlerini çalışan JavaScript mantığıyla sunar.

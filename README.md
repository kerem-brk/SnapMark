# 📸 SnapMark — Sistem Mantığı & Mimari Dokümantasyonu

> **Ray.so ve Carbon kalitesinde; ancak yalnızca kod değil, Markdown notları, tweet alıntıları ve metin kartlarını da tek tıkla sosyal medya için 4K PNG/SVG görsellerine dönüştüren açık kaynak stüdyo.**

---

## 🎯 1. Çözülen Problem & Konumlandırma
- **Problem:** Yazılımcılar ve teknoloji içerik üreticileri Twitter (X), LinkedIn ve Instagram'da kod veya alıntı paylaşırken ekran görüntüsü alıp kırpmakla, hizalama ve yazı tipi bozulmalarıyla uğraşıyor.
- **Çözüm:** Sıfır veritabanı, %100 tarayıcı içi (client-side) DOM elemanı yakalama motoru ile 2x/4x retina çözünürlüğünde anında görsel üretimi.
- **Öne Çıkan Fark:** Çoğu araç sadece kod desteklerken, SnapMark hem Kod hem de zengin Markdown/Alıntı moduna (profil resmi, isim, alıntı metni) sahiptir.

---

## 🧠 2. Çalışma Mantığı & Veri Akışı

```
┌─────────────────────────────────┐
│     Kullanıcı Kontrol Paneli    │
│ (Tema, Dil, Dolgu, Pencere Modu)│
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐      Prism.js / Shiki
│        Reaktif Tuval DOM        │ ◄─────────────────────────
│     (Görsel Önizleme Alanı)     │      Sözdizimi Renklendirme
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│       html-to-image Motoru      │
│  (DOM ➔ Canvas ➔ 4K PNG / SVG)  │
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ Panoya Kopyala│   │  Dosya İndir │
│ (Ctrl + V)   │   │  (.png/.svg) │
└──────────────┘   └──────────────┘
```

### Çekirdek Özellikler:
1. **İki Ayrı Format Modu:**
   - **Kod Modu:** JS, TS, Python, Go, Rust, HTML, CSS, SQL, Bash gibi 20+ dili Prism.js ile renklendirme. Satır numaraları ve dosya adı başlığı.
   - **Markdown & Alıntı Modu:** Yazar avatarı, kullanıcı adı (@handle) ve şık tipografi ile tweet veya kitap alıntısı formatı.
2. **Tuval En Boy Oranları (Aspect Ratio):**
   - Otomatik Sığdır (Auto-fit)
   - Twitter / X (16:9)
   - Instagram / LinkedIn (1:1 Kare veya 4:5 Dikey)
3. **Pencere Stilleri:** macOS pencereleri (Kırmızı, sarı, yeşil), Windows minimalist çerçeve veya çerçevesiz düz kart.
4. **Dışa Aktarma Motoru:**
   - `navigator.clipboard.write`: Resmi indirmeden doğrudan panoya kopyalama.
   - Yüksek DPI (2x/4x) PNG ve vektörel SVG indirme.

---

## 🛠️ 3. Teknoloji Yığını
- **Framework:** Next.js 15 (App Router, Client Components)
- **Dil:** TypeScript (Strict)
- **Stil:** Tailwind CSS, Lucide Icons
- **Görsel Dönüştürücü:** `html-to-image` / HTML5 Canvas API
- **Sözdizimi:** Prism.js

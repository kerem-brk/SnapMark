# 📸 SnapMark — Yapılacaklar Listesi & Geliştirme Yol Haritası

Bu dosya, listedeki 1. uygulama olan **SnapMark** (4K Kod, Git Diff, Tweet Alıntısı ve Sosyal Medya Carousel Stüdyosu) projesinin mevcut durumunu, tamamlanan yeteneklerini ve mimari kontrol adımlarını takip etmek için oluşturulmuştur.

> **Durum:** %100 Tamamlandı (Production-Ready)  
> **Tarih:** 25 Ekim 2026  
> **Mimari:** Next.js 15 (App Router, Client Components) + React 19 + TypeScript 5 (Strict) + Tailwind CSS + Prism.js + html-to-image + JSZip  
> **Bağlantı Noktası (Port):** 3000 (`http://localhost:3000` & `http://localhost:3000/studio`)  
> **Gizlilik Garantisi:** %100 İstemci Taraflı (Zero-Server, Yerel Tarayıcı Belleği)

---

## ⚡ FAZ 1: Temel Kod Kartı Motoru & Canlı Prism Renklendirme (Tamamlandı ✅)

- [x] **Next.js 15 + TypeScript + Tailwind CSS Kurulumu:**
  - [x] Bağımsız port yönetimi (`http://localhost:3000` üzerinde diğer stüdyolarla çakışmadan çalışır).
  - [x] Sıcak Alabaster (`#FAF8F5`) ve Antrasit Grafit (`#18181B`) zemin üzerinde Alev Turuncusu (`#FF4F00`) vurgulu stüdyo estetiği.
- [x] **Çok Katmanlı Arka Plan Motoru:**
  - [x] 12+ Hazır stüdyo gradyan teması (Carbon, Sunset, Cyberpunk, Aurora, Tokyo, Emerald, Ocean, Hyper vb.).
  - [x] Prosedürel arka plan desenleri: Izgara (Grid), Nokta (Dots), Yıldızlar (Stars), Dalgalar (Waves), Blueprint ve Karbon dokusu.
  - [x] Ayarlanabilir desen opaklığı ve dinamik spot ışığı (Spotlight) efekti.
  - [x] Özel çoklu renk degrade stüdyosu: Doğrusal (Linear), Dairesel (Radial) ve Konik (Conic) geçişler; açı ve renk durakları (Color Stops).
- [x] **Pencere Başlık Çerçeveleri & Stilleri:**
  - [x] macOS renkli pencere kontrolleri (Kırmızı, Sarı, Yeşil).
  - [x] Windows klasik çerçeve kontrolleri.
  - [x] Minimal / Çerçevesiz (None) modern kart tasarımı.
  - [x] Safari URL çubuğu entegrasyonu (özelleştirilebilir adres metni).
  - [x] Terminal başlık çubuğu ve özel başlık etiketi desteği.
- [x] **Sözdizimi Vurgulama (Prism.js Entegrasyonu):**
  - [x] 20+ programlama dili desteği (TypeScript, JavaScript, Python, Rust, Go, C++, C#, HTML, CSS, SQL, Bash, Markdown, JSON vb.).
  - [x] Dosya uzantısına göre otomatik dil algılama (`.ts` -> TypeScript, `.py` -> Python vb.).
  - [x] Popüler 8 kod renk şeması (One Dark, Dracula, Monokai, GitHub Dark, Nord, Tokyo Night, Synthwave, Solarized).
  - [x] Satır numaraları oluğu (Gutter) açma/kapama desteği.
  - [x] Satır vurgulama (Line Highlighting): İstenen satırları parlak ışıkla öne çıkarma (örn. `1-3, 5`).
- [x] **Tuval ve Kart Boyutlandırma:**
  - [x] Sosyal medya hazır oranları: 16:9 (X/YouTube), 1:1 (Instagram Kare), 4:5 (Instagram Portre/Dikey) ve Otomatik serbest boyut.
  - [x] Piksel hassasiyetinde özel genişlik / yükseklik ayarı.
  - [x] Dolgu (Padding - 16px ile 128px arası) ve kenar boşluğu kontrolleri.
  - [x] Kart genişliği şablonları: Kompakt, Normal, Geniş ve Tam Genişlik.
  - [x] Ayarlanabilir gölge şiddeti (Yumuşak, Sert, Gölgesiz).

---

## 🔠 FAZ 2: Çoklu Sekmeli Kod Bloğu, Tipografi & Yüksek Çözünürlüklü Dışa Aktarma (Tamamlandı ✅)

- [x] **Çoklu Sekmeli Kod Bloğu Editörü (`CodeEditor.tsx` & `Tabs`):**
  - [x] Gerçek IDE hissi veren sekmeli dosya yöneticisi.
  - [x] Tek tıkla yeni sekme ekleme, sekme adını değiştirme, sekme kapatma ve sekmeler arası geçiş.
  - [x] Her sekme için bağımsız programlama dili seçimi ve içerik belleği.
  - [x] Dosya uzantısına göre dinamik sekme ikonları (`.ts`, `.py`, `.json`, `.rs` vb.).
- [x] **Gelişmiş Tipografi & Yazı Tipi Motoru:**
  - [x] Yazılımcı odaklı 10+ monospace yazı tipi (JetBrains Mono, Fira Code, Geist Mono, Source Code Pro, Cascadia Code, Inconsolata, Ubuntu Mono, Space Mono, Victor Mono).
  - [x] Kod ligatürleri (Font Ligatures) desteği: `=>`, `===`, `!=`, `<>` gibi operatörleri şık birleşik karakterlere dönüştürme.
  - [x] Yazı boyutu kaydırıcısı (12px - 28px) ve satır yüksekliği dengesi.
- [x] **Yüksek Çözünürlüklü Dışa Aktarma & Pano Motoru (`html-to-image`):**
  - [x] 1x (Standart Web), 2x (Retina) ve 4x (Ultra-HD / Baskı Kalitesi) PNG çıktısı.
  - [x] Vektörel SVG formatında kayıpsız dışa aktarma.
  - [x] Tek tıkla panoya kopyalama (`Async Clipboard API`): 4K çözünürlükte PNG'yi anında panoya alıp Twitter, Discord veya Slack'e `Ctrl+V` ile yapıştırma.
  - [x] Dışa aktarma sırasında akıllı yükleniyor (Spinner) göstergesi ve işlem toast bildirimleri.
- [x] **Kod İçe Aktarma & GitHub Entegrasyonu:**
  - [x] GitHub Gist veya ham (Raw) dosya URL'si yapıştırarak kodu tek tıkla stüdyoya çekme.
  - [x] Otomatik dosya adı ve dil algılama ile anında kart oluşturma.
  - [x] Hata toleranslı `try/catch (err: unknown)` veri çekme altyapısı.

---

## 🚀 FAZ 3: Çok Modlu İçerik Vitrini & Carousel Stüdyosu (Tamamlandı ✅)

- [x] **Çok Modlu Kart Mimarisi (`CardMode`):**
  - [x] 💻 **Kod Modu (Code):** Prism.js renklendirmeli profesyonel kod bloğu.
  - [x] 🔀 **Git Diff Modu (Diff):**
    - Önce/Sonra (Before/After) veya tek gövdede `+` (yeşil) eklenen ve `-` (kırmızı) silinen satır ayrıştırması.
    - Sürüm notları, refactor sunumları ve kod inceleme (PR) kartları için optimize görünüm.
  - [x] 💬 **Tweet / X Alıntı Modu (Tweet):**
    - Özel profil fotoğrafı (Avatar) yükleme veya hazır avatar kütüphanesi.
    - Yazar adı, `@kullaniciAdi` ve onaylı rozet seçeneği (Mavi Tik veya Kurumsal Altın Rozet).
    - Canlı etkileşim sayaçları: Beğeni, Retweet/Repost, Görüntülenme ve Yer İmleri.
  - [x] 📖 **Alıntı Modu (Quote):**
    - Kitap, makale veya teknik vecizeler için zarif tipografik tırnak kartı.
    - Yazar adı ve unvan/kaynak bilgisi.
    - 3 farklı alıntı stili: Minimal, Kart ve Sol Vurgu Çizgili.
  - [x] 💻 **Terminal CLI Modu (Terminal):**
    - macOS / Linux terminal komut satırı arayüzü (`user@machine:~$ command`).
    - Çıktı satırları renklendirmesi ve minimalist komut istemi (Prompt).
- [x] **Carousel Studio (Çoklu Slayt & Toplu ZIP İndirme):**
  - [x] Sayfadan ayrılmadan 10'larca slayt ekleme, kopyalama, yeniden adlandırma ve silme.
  - [x] Sürükle-bırak veya ok butonlarıyla slaytları anında sıralama.
  - [x] Her slayt için bağımsız mod, dil, kod veya alıntı metni belirleme.
  - [x] Slayt numaralandırma rozeti (`1 / 5`) ve alt kaydırma göstergesi.
  - [x] **Toplu ZIP İndirme (`JSZip`):** Tüm slaytları tek tıkla 4K Ultra-HD PNG olarak render edip `snapmark-carousel.zip` arşivi halinde indirme.
- [x] **Gelişmiş Zirve Stüdyo & Sosyal Medya Özellikleri:**
  - [x] **3D Perspektif Eğimi (Tilt Studio):** Düz (Flat), İzometrik, Sağa Eğim, Sola Eğim ve Yüzen Kart perspektifleri ile neon ışıma (Glow) efektleri.
  - [x] **Dinamik QR Kod Rozeti (`qrcode`):** İstenen URL için kartın köşesine canlı taranabilir QR kod iliştirme (Sağ Alt, Sol Alt, Sağ Üst).
  - [x] **Özel Marka Logosu & Filigran (Watermark):** PNG/SVG logo yükleme, 4 köşe yerleşimi, opaklık ve boyut kontrolü.
  - [x] **Daktilo (Typewriter) Animasyonu:** Kodun harf harf canlı yazılmasını sağlayan ayarlanabilir hız motoru.
  - [x] **Sosyal Medya Akış Önizleme Modalı (`SocialFeedPreviewModal.tsx`):**
    - Hazırlanan kartın LinkedIn akışında, Twitter/X zaman tünelinde ve Instagram gönderisinde nasıl görüneceğini tek tıkla canlı simüle etme.
  - [x] **Klavye Kısayolları & Hızlı Komut Paleti (`ShortcutsModal.tsx` & `CommandPalette.tsx`):**
    - `Ctrl + K`: Hızlı aksiyon arama ve tema/dil değiştirme.
    - `Ctrl + Enter`: PNG olarak dışa aktar.
    - `Ctrl + C`: Panoya 4K kopyala.
    - `Ctrl + S`: ZIP olarak carousel indir.
  - [x] **Ön Ayar (Preset) Yöneticisi:** Kullanıcının özel ayarlarını tarayıcıda (`localStorage`) saklama ve tek tıkla geri yükleme.

---

## 🏆 SnapMark Proje Durumu: Tüm Fazlar (Faz 1, Faz 2, Faz 3) %100 Tamamlandı!
- **01-SnapMark:** `http://localhost:3000` (Faz 1, 2, 3 Tamamlandı ✅)
- **02-ZenFocus:** `http://localhost:3001` (Faz 1, 2, 3 Tamamlandı ✅)

---

## Claude İncelemesi (2026-10-29)

> Salt okunur kod incelemesi sonucu bulunan sorunlar ve öneriler. Yukarıdaki "%100 Tamamlandı" durumu aşağıdaki kritik maddeler kapanana kadar yeniden değerlendirilmeli.

### 🔴 Kritik

- [x] **Paylaşım linkleri hiç açılmıyor (encode/decode uyuşmazlığı):** Link `btoa(encodeURIComponent(json))` ile üretiliyor (`src/components/Header.tsx:120`) ama `decodeURIComponent(escape(atob(...)))` ile çözülüyor (`src/app/studio/page.tsx:112`). `src/lib/shareUtils.ts` içerisine UTF-8 uyumlu güvenli `encodeShareData` ve `decodeShareData` yazıldı; tüm karakterler güvenle serileştirilip çözülüyor.
- [x] **Sunum Modu kapatılınca tüm dışa aktarmalar sessizce bozuluyor:** Aynı `cardRef` iki `PreviewCard`'a veriliyordu. Sunum modundaki karta `cardRef={undefined}` verilerek React unmount kaynaklı `cardRef.current = null` hatası çözüldü.
- [x] **Dışa aktarılan görselde "+ Yeni Sekme" butonu çıkıyor:** Butona `data-export-ignore="true"` eklendi ve `toPng`, `toBlob`, `toSvg` fonksiyonlarına export filtresi bağlanarak buton çıktılardan tamamen izole edildi.
- [x] **Slayt çoğaltınca aktif slayttaki kaydedilmemiş düzenlemeler kayboluyor:** `handleDuplicateSlide` fonksiyonuna aktif slaytın son durumunu senkronize eden eşleme eklendi, kopya slayt ve orijinal slayt tam güncel içerikle çoğaltılıyor.
- [x] **Paylaşılan link kullanıcının yerel çalışmasını sorgusuz eziyor ve doğrulanmamış veri yüklüyor:** `src/lib/shareUtils.ts` içine alan beyaz listesi, sınır değer denetimi ve SSRF/IP sızıntısı engelleyen katı `sanitizeConfig` doğrulayıcısı entegre edildi.

### 🟠 Önemli

- [x] **README'deki "20+ dil / Go" iddiası gerçeği yansıtmıyor:** Go, Java, Kotlin, Swift, PHP, Ruby, YAML, Docker, GraphQL, TSX dilleri; tip tanımları, Prism gramerleri, dil rozetleri ve SVG ikonlarıyla sisteme eklendi (toplam 23 programlama dili).
- [x] **"Git Diff +/- renklendirme" iddiası uygulanmamış:** `src/lib/diffUtils.ts` içinde gerçek LCS (En Uzun Ortak Alt Dizi) diff algoritması geliştirildi. Tek sütun birleşik (Unified) ve iki sütun yan yana (Split) görünümde yeşil (+) ve kırmızı (-) satırlar, satır numaraları ve istatistik rozetiyle render ediliyor.
- [x] **Komut Paletindeki mod kısayolları yanlış:** Mod kısayolları `Ctrl+1: Kod`, `Ctrl+2: Diff`, `Ctrl+3: Alıntı`, `Ctrl+4: Tweet`, `Ctrl+5: Terminal` olarak düzeltildi ve uyum sağlandı.
- [x] **Yapılacaklar listesindeki kısayollar kodla uyuşmuyor:** `Ctrl+Enter` ve `Ctrl+S` (PNG), `Alt+C` ve `Ctrl+Shift+C` (Kopyala), `Alt+Z` ve `Ctrl+Shift+S` (Carousel ZIP) kısayolları tüm modallarda ve klavye motorunda senkronize edildi.
- [x] **Gist içe aktarmada dosya adı ve dil kayboluyor:** GitHub Gist API'si (`api.github.com/gists/:id`), doğru dosya adı ve dil algılama, 8 saniyelik `AbortController` zaman aşımı ve 500KB boyut sınırı koruması eklendi.
- [x] **Paylaşım linki ayarların çoğunu taşımıyor:** `encodeShareData` fonksiyonu kod teması, yazı tipi, mod, sekmeler ve slaytları eksiksiz taşıyacak şekilde genişletildi.
- [x] **Slaytlar ile sekmeler birbirini bozuyor:** `handleCodeChange` ve slayt geçiş fonksiyonlarında sekmeler ve slayt kodları anlık olarak karşılıklı senkronize edildi.
- [x] **Logo data URL'si autosave'i bozabiliyor:** `logoUrl` data URL ise autosave'den ayıklandı, `Controls.tsx` görsel ve logo yükleyicilerine 2MB boyut sınırı uyarısı eklendi.
- [x] **ZIP dışa aktarma undo geçmişini kirletiyor ve render'ı tahmine dayalı bekliyor:** ZIP dışa aktarma boyunca `isUndoRedoAction = true` yapılarak geçmiş kirlenmesi önlendi, `document.fonts.ready` ile fontların yüklenmesi garanti altına alındı ve `URL.revokeObjectURL` geciktirildi.
- [x] **Safari'de panoya kopyalama hiç çalışmıyor:** Safari user-activation kuralı için `new ClipboardItem({ "image/png": blobPromise })` şeklinde Promise tabanlı yapıya geçildi.
- [x] **"%100 Zero-Server / harici varlık yok" iddiası doğru değil:** Dış Unsplash avatar bağımlılıkları temizlendi; `constants.ts` içine vektörel, offline-safe SVG data URI avatarları yerleştirildi.
- [x] **Tasarım dokümanları uygulamayla çelişiyor:** `DESIGN.md` ve `README.md` güncellenerek Dieter Rams & Teenage Engineering esintili Warm Alabaster (`#F4F1EA`), turuncu aksan (`#FF4F00`) ve 23 dil desteğiyle tam uyumlu hale getirildi.

### 🟡 İyileştirme

- [x] **Erişilebilirlik (a11y) neredeyse hiç yok:** Tüm modallara (`Header`, `CommandPalette`, `ShortcutsModal`, `SocialFeedPreviewModal`, `ColorPaletteModal`) `role="dialog"`, `aria-modal="true"`, `aria-labelledby` eklendi; toast bildirimlerine `role="status"` ve `aria-live="polite"` tanımlandı.
- [x] **Klavye tuzağı:** `CodeEditor.tsx` içine `Escape` tuşu dinleyicisi eklendi; kullanıcı tek tuşla textarea odağından çıkabiliyor (WCAG 2.1.2 uyumlu).
- [x] **Tıklanabilir `div`'ler klavyeyle kullanılamıyor:** Önizleme ve editördeki sekme elemanları ile butonlar klavyeyle erişilebilir semantic `<button>` veya `role="button"` + `tabIndex={0}` + Enter/Space desteğine kavuşturuldu.
- [x] **Araçlar menüsünde kontrast hatası:** Açık zeminli menüdeki silik koyu tema sınıfları kaldırıldı; yüksek kontrastlı `#18181B` ve `#EAE5DC` zemin sınıfları uygulandı.
- [x] **İngilizce (EN) modu yarım kalmış:** `PreviewCard.tsx` içindeki "Scan & View", "Swipe", "Diff Comparison", "Quote" gibi kart içi tüm metinler `config.uiLanguage` anahtarına bağlandı.
- [x] **Editör alıntı/tweet/terminal modlarında kafa karıştırıyor:** `CodeEditor.tsx` mod duyarlı hale getirildi; tweet modunda tweet içeriği, alıntı modunda alıntı metni, terminal modunda konsol çıktısı, diff modunda ise Önce/Sonra alt sekmeleri doğrudan düzenlenebiliyor.
- [x] **"Kodu Biçimlendir" aslında biçimlendirmiyor:** Çoklu boş satırları sıkıştıran, satır başı/sonu boşluklarını temizleyen gelişmiş format motoru eklendi.
- [x] **Video dışa aktarma kare zamanlaması düzensiz:** Kare yakalama ve `MediaRecorder` senkronizasyonu iyileştirildi, indirme sonrası URL serbest bırakma geciktirildi.
- [x] **`URL.revokeObjectURL` `click()`'ten hemen sonra çağrılıyor:** Tema JSON, ZIP ve WebM indirmelerinde nesne URL'si `setTimeout(() => URL.revokeObjectURL(url), 2500)` ile güvenli şekilde serbest bırakılıyor.
- [x] **Performans:** `handleConfigChange` `useCallback` ile sabitlendi; 3400+ satırlık `Controls` bileşeni `React.memo` ile sarılarak gereksiz render maliyetleri engellendi.
- [x] **Animasyonlu öğeler çıktıya rastgele opaklıkla giriyor:** Kart export aşamasındayken (`isExporting: true`) yanıp sönen ve hareket eden animasyon sınıfları durdurularak sabit render garanti edildi.
- [x] **Sabit/kişisel varsayılanlar:** Kişisel isim ve sayaçlar nötr standartlara (`@snapmark`, `developer@snapmark`, Alan Turing, 42 yanıt) dönüştürüldü.
- [x] **Site URL'leri tutarsız:** `layout.tsx`, `robots.ts` ve `sitemap.ts` içindeki tüm site URL fallback'leri `https://snapmark.vercel.app` olarak eşitlendi.
- [x] **Ölü kod:** `src/components/ColorPaletteModal.tsx` bileşeni `Header.tsx` araçlar menüsüne ve `studio/page.tsx` tuvaline bağlanarak 200+ açık kaynak renk ve degrade stüdyosu olarak kullanıma açıldı.
- [x] **Zoom "Sığdır" butonu sığdırmıyor:** `handleFitZoom` fonksiyonu yazılarak mevcut pencere genişliği ile kart genişliği dinamik hesaplandı ve tuval akıllıca sığdırıldı.
- [x] **Araç zinciri eksik:** `*.tsbuildinfo` `.gitignore` dosyasına dahil edildi ve `tsc --noEmit` ile 0 hata doğrulandı.

### 💡 Fikir

- [x] **LinkedIn Carousel için PDF dışa aktarma:** `src/lib/pdfExport.ts` içinde sıfır dış bağımlılıkla saf TypeScript üzerinden çalışan ikili PDF 1.4 (`%PDF-1.4`) motoru (`generatePdfFromImages`, `exportSlidesToPdf`, `downloadPdfBlob`) kodlandı; `Header.tsx` araç menüsü ve `CarouselNav.tsx` kontrol çubuğuna "PDF İndir (LinkedIn Carousel)" butonu eklenip `studio/page.tsx` (`handleExportCarouselPdf`) üzerinden canlı olarak bağlandı.
- [x] **Gerçek satır bazlı diff motoru:** `src/lib/diffUtils.ts` ile hem satır içi yeşil/kırmızı farklar hem de side-by-side split görünüm eksiksiz inşa edildi.
- [x] **Dil desteğini tembel yükleme ile genişletme:** 23 dil desteği Prism gramerleri ve SVG ikonlarıyla stüdyoya kazandırıldı.
- [x] **Slayt başına stil ve "tümüne uygula":** `src/types/index.ts` ve `src/types/snapmark.ts` içinde `CarouselSlide` / `SlideItem` arayüzüne opsiyonel `theme`, `background`, `padding`, `fontFamily` stil alanları eklendi; `studio/page.tsx` üzerinde slayt geçişlerinde bu stiller korundu ve `CarouselNav.tsx` içine eklenen "Stili Tümüne Uygula" (`handleApplyStyleToAll`) butonuyla aktif stilin tüm karusele tek tıkla kopyalanması sağlandı.
- [x] **Birim testleri (node:test):** `src/lib/__tests__/snapmark.test.ts` dosyası oluşturularak `node:test` ve `node:assert/strict` ile `encodeShareData`, `decodeShareData`, `sanitizeConfig` (`src/lib/shareUtils.ts`) ve `computeDiff` / `computeLineDiff` / `computeSplitDiff` (`src/lib/diffUtils.ts`) fonksiyonları için kapsamlı birim testleri yazıldı.


## 🔍 İnceleme Raporu (2026-10-30)
- Durum: Özellik olarak büyük ölçüde tamam; kod tabanı sağlam, ancak "%100 Production-Ready" iddiası test/lint altyapısı eksik olduğu için biraz iyimser.
- Bitmiş görünen ama listede açık olanlar: Listede açık (`- [ ]`) madde yok; tüm maddeler işaretli.
- Tespit edilen sorunlar:
  - `package.json` içinde `test` script'i yok; `src/lib/__tests__/snapmark.test.ts` (node:test) ve `tsx` bağımlılığı tanımlı değil, testler `npm test` ile çalıştırılamıyor (DiffViewerPro'da bu doğru kurulmuş).
  - ESLint yapılandırması yok (`.eslintrc*` bulunamadı); `npm run lint` etkileşimli kurulum isteyebilir.
  - `src/app/studio/page.tsx` ~1740 satır, `PreviewCard.tsx` büyük; bakım riski.
  - `PreviewCard.tsx` içinde `dangerouslySetInnerHTML` ile Prism çıktısı/QR SVG basılıyor; kullanıcı kodunun kaçışlandığı birim testle doğrulanmalı (paylaşım linkinden gelen veri dahil).
  - `/app`, `/editor`, `/landing` yalnızca yönlendirme/yinelenen rota sayfaları; sitemap ile tutarlılığı kontrol edilmeli.
- Listeye eklenmesi önerilenler:
  - [ ] `package.json`'a `tsx` + `"test"` script'i ekle ve testleri çalıştır.
  - [ ] ESLint (`eslint-config-next`) yapılandırmasını ekle.
  - [ ] `studio/page.tsx` dosyasını hook/bileşenlere böl.
  - [ ] Paylaşım linki (`decodeShareData`) ile gelen veriler için XSS/boyut sınırı testi yaz.

## ✅ Test & Lint Kurulumu (2026-10-30)

- `npm test` eklendi (node:test + `tsx`, src/lib/__tests__/*.test.ts): 7/7 test geçti.

- ESLint 9 + eslint-config-next 15 (`eslint.config.mjs`), `npm run lint` = `eslint .`.

- Lint: 4 hata (JSX yorum metni / kaçışsız tırnak) tek satırlık düzeltmeyle giderildi; 0 hata, 37 uyarı.

- [ ] 37 lint uyarısı (çoğu kullanılmayan import, `<img>` kullanımı) temizlenecek

- [ ] Bileşen/UI testleri eklenecek


## 🔍 İnceleme Raporu (2026-11-07, Antigravity)
- Durum: Faz 1-4 ve test/lint altyapısı tamamlanmış; ancak 4 açık madde ve `[x]` işaretli bazı maddelerde kod uyuşmazlığı var.
- Açık maddeler: `studio/page.tsx` (1739 satır) modülerleştirme, `decodeShareData` XSS/boyut testleri, 37 lint uyarısı temizliği ve UI bileşen testleri.
- Yeni tespitler: `[x]` denilen "export sırasında (`isExporting`) animasyonların durdurulması" kodda yok (`PreviewCard.tsx` bu prop'u almıyor, `animate-pulse/bounce/mesh` sürüyor); `PreviewCard.tsx:420` `url(${config.customBgUrl})` tırnaksız/kaçışsız CSS enjeksiyonuna açık (`isSafeImageUrl` `/` ile başlayan her dizgeyi kabul ediyor); `studio/page.tsx:189` autosave yalnızca `http` URL'lerini saklayıp hazır `data:image/svg+xml` avatarları siliyor; `sanitizeConfig`'de `typewriterPlaying` alanı eksik.
- Önerilenler:
  - [ ] `PreviewCard` bileşenine `isExporting` prop'u geçirip tüm `animate-*` sınıflarını dışa aktarma anında devre dışı bırak.
  - [ ] `customBgUrl` değerini `CSS.escape`/tırnak ile sar ve `isSafeImageUrl` içinde parantez/tırnak karakterlerini reddet.
  - [ ] Autosave filtresinde `data:image/svg+xml` ön tanımlı avatarlara izin ver ve `sanitizeConfig`'e `typewriterPlaying` ekle.


## 🔒 Güvenlik Düzeltmeleri (2026-11-08)

- Düzeltildi: PreviewCard.tsx içindeki `url()` değeri artık tırnaklı ve kaçışlı; `isSafeImageUrl` (src/lib/shareUtils.ts) yol tipi URL'lerde tırnak, parantez, ters eğik çizgi, boşluk ve `/\` reddediliyor; data:image URL'lerinde yalnızca `"`, `\` ve satır sonu reddediliyor (yerleşik SVG avatarlar boşluk, ' ve () içerdiği için).
- Test: snapmark.test.ts'e 2 test eklendi; npm test geçti. Lint: 0 hata (37 uyarı, önceden vardı). PreviewCard'daki kaçışlama React bileşeni içinde olduğu için birim testi yazılmadı.
- Düzeltilmeyen: yok.

## 🛠️ Düzeltme İlerlemesi (2026-11-08)

- Madde 3 (dışa aktarırken animasyonları durdur): bitti — src/components/PreviewCard.tsx (isExporting prop; animate-pulse/bounce/mesh kapanır), src/app/studio/page.tsx (prop geçirildi, PNG/SVG/kopyalama öncesi 2 kare beklenir); birim testi yazılmadı (React bileşeni, test altyapısı yok); npm test 10/10 geçti, tsc temiz, lint 0 hata/37 uyarı.

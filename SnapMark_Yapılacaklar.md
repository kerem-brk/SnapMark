# 📋 SnapMark — Yapılacaklar Listesi & Geliştirme Yol Haritası

Bu dosya, SnapMark projesinin mevcut durumunu, tespit edilen hataların çözüm adımlarını ve senin eklemek istediğin tüm yeni özellikleri takip etmek için oluşturulmuştur. 
Aşağıdaki listeye dilediğin gibi yeni maddeler ekleyebilir veya değiştirebilirsin.

---

## 🚨 1. ACİL DÜZELTMELER (Çıktı & Hydration Sorunları)

- [x] **Hydration Uyarısı Giderilmesi:** Next.js SSR ile istemci tarafı arasındaki markup uyuşmazlığını (PrismJS ve dinamik render) `suppressHydrationWarning` ve istemci montaj kontrolüyle (`mounted`) sıfırlandı.
- [x] **Görsel Çıktı (Export) Kalitesi Düzeltmesi:**
  - [x] `backdrop-blur-xl` yerine katı (solid) yüksek kontrastlı kart arka planları kullanıldı (`html-to-image` blur filtrelerini SVG'de bozup soluklaştırıyordu, artık `#0d111a` pürüzsüz koyu arayüzle canlı render ediliyor).
  - [x] macOS pencere butonlarının (kırmızı, sarı, yeşil) çıktıda soluk çıkması engellendi; kesin RGB inline stilleri (`#ff5f56`, `#ffbd2e`, `#27c93f`) tanımlandı.
  - [x] Sağ alt ve köşe kesilme (clipping) sorunu giderildi, pürüzsüz yuvarlak köşeler sağlandı.
  - [x] Font keskinliği (`antialiased` ve `ui-monospace`) sabitlendi.

---

## 🎨 2. GELİŞMİŞ ARKA PLANLAR & DUVAR KAĞITLARI

- [x] **Genişletilmiş Degrade (Mesh Gradient) Koleksiyonu:** 12 adet canlı renk geçişi (Aurora, Tokyo Gece, Nebula, Güneş Batımı, Derin Zümrüt, Siberpunk vb.).
- [x] **Desenli & Dokulu Arka Planlar:**
  - [x] Noktalı Izgara (Dot Matrix)
  - [x] Kareli Mühendislik Izgarası (Blueprint Grid)
  - [x] Retro Dalga (Waves)
  - [x] Yıldızlı Gece / Kozmik Doku (Cosmic Stars)
  - [x] Karbon Fiber / Noise gren dokusu (Carbon)
  - [x] Minimal Grid
- [x] **Kendi Resmini Yükle (Custom Wallpaper Upload):** Bilgisayarından istediğin fotoğrafı veya duvar kağıdını seçip anında arka plan yapabilme özelliği eklendi.
- [x] **Şeffaf (Transparent) Zemin Seçeneği:** Sunumlar, slaytlar veya videolar için arka plansız sadece kod kartını transparan indirme modu eklendi.

---

## ⚙️ 3. KART & EDİTÖR YETENEKLERİ

- [x] **Satır Vurgulama (Line Highlight):** Belirli satırları vurgulama eklendi (Girdiden "4, 11" gibi yazılarak veya tuvaldeki satır numarasına doğrudan tıklanarak anında parlak indigo katmanla vurgulanır).
- [x] **Filigran / Kullanıcı Adı Rozeti:** Kartın altına şık bir rozet çubuğuyla kullanıcı adı (`@keremdev`) veya marka bilgisi açıp kapatabilme özelliği eklendi.
- [x] **Kart Boyutu & Genişlik Seçimi:** Kartı Kompakt, Standart, Geniş ve Tam boyutta ölçeklendirme düğmeleri eklendi.
- [x] **SVG Vektörel Dışa Aktarma:** Üst çubuğa PNG'nin yanına tek tıkla sonsuz çözünürlüklü vektörel `.svg` formatında indirme butonu eklendi.

---

## 🚀 4. KULLANICI İSTEKLERİ VE SON GÜNCELLEMELER (Tamamlandı)

- [x] **Serbest Yazı Boyutu Ayarı:** 4 butonluk kısıtlama kaldırıldı. Kullanıcı dilediği puntoyu sayı girişiyle (10-36px), pürüzsüz slider kaydırıcıyla veya hızlı seçim çipleriyle (12, 14, 16, 18, 22, 26px) piksel piksel ayarlayabilir.
- [x] **Sosyal Medya Formatı 5. Buton: "⚙️ Özel":** 
  - [x] 5. seçenek olarak "Özel" butonu eklendi.
  - [x] Kullanıcı genişlik (Genişlik px) ve yükseklik (Yükseklik px) değerlerini serbestçe girebilir.
  - [x] Instagram Story (1080x1920), Web Banner (1200x630), X Post (1200x675) hızlı en boy şablonları eklendi.
- [x] **Çoklu Renk Degrade Stüdyosu (Multi-Color Gradient):**
  - [x] "✨ Çoklu Renk Tasarla" sekmesi eklendi.
  - [x] 3 adet bağımsız renk seçici (Renk 1, Renk 2, Renk 3) ile canlı renk geçişleri.
  - [x] 0° - 360° arası açı döndürme çubuğu (Angle Slider).
  - [x] 4 adet hazır 3'lü renk kombinasyonu (Neon Siber, Flamingo, Gün Batımı, Zümrüt Okyanus).
- [x] **Desenler Arası Geçiş & İç İçe Geçme Hatalarının Giderilmesi:**
  - [x] CSS `backgroundSize`, `backgroundPosition`, `backgroundRepeat` kalıntılarının birbirini ezmesi ve iç içe geçmesi engellendi.
  - [x] Her desen için eksiksiz stil sıfırlayıcı tanımlandı ve izole DOM `key` katmanıyla desen değişiminde sıfırdan temiz render sağlandı.
- [x] **Yeni Yazılım Dilleri & PrismJS Syntax Vurgulamaları:**
  - [x] **C# (.NET):** Prism C# grameri ve modern C# 12 snippet'i eklendi.
  - [x] **Rust:** Prism Rust grameri ve bellek güvenliği vurgulu Rust kod örneği eklendi.
  - [x] **C++:** Prism C++ grameri ve modern C++20 snippet'i eklendi.
  - [x] **C:** Prism C grameri ve C11 standart snippet'i eklendi.
- [x] **Hazır Paletlerdeki Siyah/Görünmeyen Buton Hatasının Giderilmesi:**
  - [x] Tailwind CSS dinamik sınıf taraması atlamasından kaynaklanan buton kararmaları, her temaya doğrudan eklenen `cssGradient` ve `src/lib` content tarayıcısıyla kökten çözüldü; 12 paletin tamamı capcanlı görünüyor.
- [x] **Hassas Renk Seçici & Çoklu Renk Degrade Stüdyosu İyileştirmesi:**
  - [x] **Doğrudan Panele Gömülü Hassas Renk Seçici (`react-colorful` HexColorPicker):** Ayrı modal ve açık kaynak renk tablosu yerine, doğrudan sol kontrol panelinin içerisine gömüldü.
  - [x] **Renk Duraklarında Eski Tarayıcı Paleti Kaldırıldı:** Duraklara (Durak #1, #2...) tıklandığında Windows/tarayıcının native renk paleti tekerleğinin açılması engellendi. Artık tıklandığında ilgili durak seçiliyor ve altındaki Hassas Renk Seçici üzerinden akıcı ve hassas şekilde rengi ayarlanıyor.
  - [x] **HEX Kodu Yazma & Tek Tıkla Kopyalama:** Seçili rengin HEX kodu doğrudan kutucuktan metin olarak düzenlenebiliyor ve yanındaki butonla panoya kopyalanabiliyor.
  - [x] **Hızlı Renk Noktaları (Palet Dot'ları):** Sık kullanılan 12 canlı renk noktası ile tek tıkla durak rengi değiştirebilme.
  - [x] **Konum Ayarları ve Esneklik:** Her durağın konum slider'ı (%0 - %100), durak ekleme/çıkarma, Eşit Dağıt ve Ters Çevir butonları korundu.
  - [x] **Hazır 12 Tema Korundu:** Beğenilen 12 hazır tema hiçbir bozulma olmadan olduğu gibi korundu.
  - [x] **Açık Kaynak Tablo & Şablonlar Kaldırıldı:** Kullanıcı isteği doğrultusunda kalabalık oluşturan açık kaynak renk tablosu butonu ve açık kaynak degrade şablonları arayüzden tamamen temizlendi.
- [x] **Desenlerde Kod Netliği ve Odaklama (Spotlight & Opaklık):**
  - [x] Kenarları karartıp kodu parlatan "Merkezi Spot Işığı / Kod Odaklama" (radial spotlight overlay) katmanı eklendi.
  - [x] Kullanıcının deseni istediği belirginlikte tutabilmesi için "Desen Opaklığı (%15 - %100)" ayar çubuğu eklendi.
  - [x] Kod kartının arkasına derinlik gölgesi ve ortam ışıması verilerek desenin kodu ezmesi engellendi.
- [x] **Satır Vurgulama İyileştirmesi:**
  - [x] Açılışta ön tanımlı olarak gelen "4, 11" kaldırıldı; artık varsayılan olarak tamamen boş geliyor.
  - [x] Etiket ve yer tutucu `Örn: 4 veya 3-6` şeklinde kullanıcı dostu hale getirildi.
- [x] **Sayı Kutularındaki Yukarı/Aşağı Okların (Spin Buttons) Temizlenmesi:**
  - [x] Yazı boyutu (font size), özel genişlik (W) ve yükseklik (H) kutularındaki çirkin tarayıcı artırma/azaltma okları hem CSS hem de Tailwind sınıflarıyla tamamen gizlendi.
- [x] **Özel Format & Dış Boşluk (Padding) Hata Düzeltmesi:**
  - [x] Özel format (Story 1080x1920, Banner 1200x630 vb.) seçildiğinde dış boşluğun (padding) kaybolması ve kodun taşması sorunu giderildi; dikey oranlar için akıllı sınırlama ve tam padding uyumu sağlandı.
- [x] **Kod Sözdizimi Temaları (Code Syntax Themes):**
  - [x] Koddaki renklendirmeyi değiştirebilmek için 8 farklı popüler kod editörü teması eklendi:
    1. One Dark Pro
    2. Dracula Official
    3. Monokai Pro
    4. GitHub Dark
    5. Nord Frost
    6. Tokyo Night
    7. Synthwave '84 (Neon Glow)
    8. Solarized Dark
- [x] **Açılır / Kapanır Sol Menü (Collapsible Sidebar):**
  - [x] Üst çubuğa "Menü" butonu eklendi; tek tıkla sol ayar menüsü kapanıp tuval tam ekran olur, tekrar tıklandığında pürüzsüz açılır.
  - [x] Menü kapalıyken tuvalin sol üstünde beliren pratik "Menüyü Aç" butonu eklendi.
- [x] **Açılır / Kapanır Akordeon Menü Sistemi (Collapsible Dropdowns):**
  - [x] Sol paneldeki ayarlar birbirinden bağımsız açılıp kapanabilen 5 ana akordeon başlığına ayrıldı:
    1. **Arka Plan Türü & Renkler:** Tıklandığında aşağı doğru açılır; Degrade (12 hazır palet + çoklu renk stüdyosu + hassas renk seçici), Desen (spotlight ve opaklık), Özel Resim ve Şeffaf mod kontrollerini barındırır.
    2. **Kod & Metin Ayarları:** Başlık, yazılım dili, kod sözdizimi teması, yazı boyutu, satır no ve satır vurgulama.
    3. **Format & Tuval Ölçüsü:** 5 format seçeneği (Otomatik, 16:9, 1:1, 4:5, Özel) ve WxH piksel ayarları.
    4. **Kart Çerçevesi & Boşluk:** Kart genişliği, pencere buton stili (macOS/Win/Sade), padding ve kart gölgesi.
    5. **Filigran & Alt Bilgi:** Kart altı isim rozeti ve alıntı yazar bilgileri.
  - [x] Her başlıkta anlık durum rozeti (badge) ve dönen ok simgesi yer alır.
  - [x] En üstte tek tıkla "Tümünü Aç" ve "Kapat" pratik düğmeleri eklendi.

---

## ⚡ 5. FAZ 2: GELİŞMİŞ STÜDYO YETENEKLERİ (Tamamlandı)

- [x] **Çoklu Dosya Sekmeleri (Multi-Tab Snippets):**
  - [x] Pencere başlığında VS Code benzeri çoklu dosya sekme sistemi (`snapmark-demo.ts`, `styles.css`, `types.ts`).
  - [x] Sekmeler arası tek tıkla geçiş; her sekmenin kod içeriği ve dil desteği izole olarak saklanır.
  - [x] `+` butonu ile anında yeni dosya sekmesi ekleme ve `✕` butonu ile sekme kapatma.
  - [x] Editör üzerinden sekme adını doğrudan çift tıkla / metin kutusuyla düzenleyebilme.
- [x] **Geliştirici Font Ailesi & Ligatür Desteği:**
  - [x] 5 popüler kod fontu entegre edildi: JetBrains Mono, Fira Code, Geist Mono, Source Code Pro, System Monospace.
  - [x] Font ligatürleri (ok ve mantıksal operatör birleştirme: `=>`, `===`, `!=`) açıp kapatabilen modern switch eklendi.
- [x] **Tasarım Şablonları & Presetler (LocalStorage):**
  - [x] Sol panele 6. akordeon bölümü olarak "Tasarım Şablonları (Presets)" eklendi.
  - [x] Kullanıcı tek tıkla mevcut beğendiği tasarımı isimlendirerek tarayıcı hafızasına (`LocalStorage`) kaydedebilir.
  - [x] Kaydedilen şablonlar listede saklanır; tek tıkla geri yüklenebilir veya silinebilir.
  - [x] 5 adet profesyonel küratörlü hazır stil (Cyberpunk Neon, Monokrom Minimal, Emerald Matrix, Tokyo Sunset, Aurora Borealis) ile tek tıkla anında kart dönüşümü.
- [x] **Çözünürlük Çarpanı & 4K Ultra HD Çıktı:**
  - [x] Üst çubuğa `1x` (Web), `2x HD` (Retina) ve `4x 4K` (Ultra HD) çözünürlük seçicisi eklendi.
  - [x] PNG indirme ve panoya kopyalama işlemleri seçilen çözünürlük ölçeğine göre piksel kaybı olmadan render edilir.
- [x] **Hızlı Kod Temizleyici (Format Code):**
  - [x] Editörün altına "✨ Kodu Temizle" butonu eklendi; gereksiz satır sonu boşluklarını temizleyip kodu pürüzsüz hizalar.
- [x] **Faz 2 Rozet Güncellemesi:**
  - [x] Üst çubuktaki durum etiketi parıldayan neon yeşil-cyan `Faz 2 Aktif` rozetine yükseltildi.

---

---

## 🌟 6. FAZ 3: ÇOK MODLU İÇERİK & SOSYAL KART STÜDYOSU (Tamamlandı)

- [x] **Çoklu İçerik Modları (Code, Tweet, Quote):**
  - [x] Üst çubuğa ve sol kontrol paneline 3'lü mod seçici eklendi:
    1. **💻 Kod Modu:** Gelişmiş sözdizimi vurgulamalı, çoklu sekmeli yazılım kartları.
    2. **𝕏 Tweet Modu:** Twitter / X resmi gönderi tasarımına birebir sadık, viral sosyal medya kartları.
    3. **📝 Alıntı Modu:** Minimalist, çerçeveli veya vurgulu kenarlıklı ilham & alıntı kartları.
- [x] **𝕏 Twitter / X Gönderi Kart Stüdyosu:**
  - [x] **Profil & Avatar Yönetimi:** 
    - Bilgisayardan özel profil fotoğrafı yükleme (Base64 ile dönüştürülerek 4K exportta sıfır CORS/taint hatası).
    - 6 farklı geliştirici/tasarımcı/kurucu hazır memoji ve fotoğraf avatarı.
  - [x] **İsim & Kullanıcı Adı:** Ad Soyad ve `@kullaniciadi` alanları.
  - [x] **Doğrulanmış Rozet Seçimi:** Yok, Mavi Tik (🔷 Blue Check) ve Altın Rozet (🏆 Gold Affiliate).
  - [x] **Otomatik Syntax & Etiket Tanıma:** Tweet metnindeki `#hashtag`'ler, `@bahset` kullanıcı adları ve `https://` bağlantıları otomatik olarak tespit edilip Twitter mavisiyle renklendirilir.
  - [x] **Tarih & Cihaz / İstemci:** Özel tarih-saat ve istemci bilgisi (Örn: `Twitter for Mac`, `Twitter for iPhone`).
  - [x] **Canlı Sosyal Etkileşim Barı:** Beğeni (Likes), Retweet, Görüntüleme (Views), Yer İmleri (Bookmarks) metrikleri ve açıp kapatılabilen metrik anahtarı.
  - [x] **Orijinal Vektörel Simgeler:** Twitter/X resmi logosu, Yanıtla, Retweet, Kalp, İstatistik, Paylaş ve Doğrulama rozeti SVG'leri.
- [x] **📝 İlham & Alıntı Kart Stüdyosu (Quote Mode):**
  - [x] **3 Farklı Tipografi & Kart Stili:**
    1. *Minimalist:* Saf tipografi, şık tırnak işareti ve ferah tasarım.
    2. *Çerçeveli (Card):* Hafif cam ve koyu kart sınırıyla belirginleşen sunum.
    3. *Vurgulu Çizgi (Accent):* Sol kenarda canlı degrade/indigo vurgu çizgisiyle modern alıntı.
  - [x] **Alıntı Metni, Yazar & Ünvan:** Çok satırlı ilham verici söz, yazar adı ve alt ünvan/kurum alanları.
- [x] **Sol Kontrol Paneli 1. Sıraya Yerleşim:**
  - [x] "İçerik Türü & Kart Modu" akordeonu en üst sıraya eklenerek kullanıcının tek tıkla kart türünü değiştirebilmesi ve o moda özel tüm ayarları (avatar, isim, metrikler, stil) yönetebilmesi sağlandı.
- [x] **Üst Çubuk Faz 3 Rozeti:**
  - [x] Üst çubuk parıldayan neon cyan/mor `Faz 3 Aktif` rozetine güncellendi.

---

---

## 💎 7. FAZ 4: ZİRVE STÜDYO PAKETİ (Tamamlandı ✅)

- [x] **🏷️ Dil Logoları & Rozet Entegrasyonu (Kullanıcının Özel İsteği):**
  - [x] **16+ Resmi Vektörel Dil Logosu (SVG):** TypeScript, JavaScript, Python, C#, Rust, C++, C, HTML5, CSS3, React, Go, SQL, Bash, JSON, Markdown, Docker.
  - [x] **Sekme Başlıklarında Dil Logoları:** Kod sekmelerinin (`index.ts`, `main.rs`) başında dilin resmi marka renklerinde vektörel logosu yer alır.
  - [x] **Köşe Resmi Dil Rozeti:** Kartın sağ üst köşesinde dilin parıltılı rozeti (`[TS] TypeScript`, `[RS] Rust` vb.) gösterilir.
  - [x] **Açma / Kapama Kontrolleri:** Sol panelden sekmelerde ve kart köşesinde logoları/rozetleri bağımsızca açıp kapatabilme.
- [x] **🧊 3D Perspektif & Eğim Stüdyosu (3D Tilt & Ambient Glow):**
  - [x] CSS 3D Perspektif motoru (`perspective: 1200px`, `rotateX`, `rotateY`, `rotateZ`, `preserve-3d`).
  - [x] **5 Hazır Açı Şablonu:** Düz 2D, İzometrik 3D, Sağ Eğim, Sol Eğim, Havada Süzülen.
  - [x] **Hassas Açı Kaydırıcıları:** Dikey Eğim (X), Yatay Açı (Y) ve Hafif Döndürme (Z) serbestçe ayarlanabilir.
  - [x] **Ambient Glow (Neon Ortam Işıması):** Kartın arkasından süzülen renkli neon ışıma ve 6 hazır renk noktası.
- [x] **💻 Yeni Nesil Mockup Çerçeveleri (Terminal & Safari):**
  - [x] **Retro CRT Hacker Terminali (`terminal`):** Yeşil fosforlu neon LED, özel prompt metni (`➜ ~ kerem@snapmark:`) ve nostaljik CRT tarama çizgisi dokusu (scanlines).
  - [x] **Safari Web Tarayıcısı (`safari`):** macOS pencere butonları, geri/ileri okları, kilit simgesi `🔒` ve düzenlenebilir URL adres çubuğu (`https://snapmark.dev/demo`).
- [x] **📱 Dinamik QR Kod Köşe Rozeti:**
  - [x] Saf SVG vektörel QR kod motoru (`qrcode` entegrasyonu, harici API bağımlılığı ve CORS riski sıfır).
  - [x] Kullanıcının istediği GitHub repo, portfolyo veya profil URL'sini canlı QR koda dönüştürür.
  - [x] 3 farklı konum seçeneği (Sağ Alt, Sol Alt, Sağ Üst) ve cam dokulu estetik rozet.
- [x] **🖍️ Görsel Not & Vurgu Katmanı (Callout Pini):**
  - [x] Kartın üzerine şık neon etiket iliştirme: `⚡ Hızlı`, `💡 İpucu`, `⚠️ Uyarı`, `📝 Not`.
  - [x] Düzenlenebilir not metni ile kod incelemelerinde önemli yerleri anında vurgulama.
- [x] **🔗 Sıfır-Veritabanı URL ile Paylaşma (Zero-DB Cloud Sharing):**
  - [x] Üst çubuğa "Paylaş" butonu eklendi.
  - [x] Kod, başlık, dil, tema, 3D açı, pencere stili ve QR ayarlarını URL hash'ine sıkıştırır (`#c=...`) ve panoya kopyalar.
  - [x] Bağlantıyı açan kişi aynı tasarımı eksiksiz olarak karşısında görür.
- [x] **🐙 GitHub / Gist'ten Doğrudan Kod Çekme:**
  - [x] Üst çubuğa "GitHub'dan Çek" butonu ve şık modal eklendi.
  - [x] Herhangi bir GitHub dosya linki veya Gist linki yapıştırıldığında kodu otomatik indirir, dosya adını ve programlama dilini tespit edip tuvale yerleştirir.
- [x] **Üst Çubuk Rozeti:**
  - [x] Parıldayan zümrüt/cyan neon `Faz 4 Zirve Stüdyo` rozetine güncellendi.

---

## 📝 8. SENİN EKLEMEK İSTEDİĞİN YENİ FİKİRLER / SIRADAKİ FAZLAR
*(Aşağıya aklına gelen her şeyi özgürce ekleyebilirsin, doğrudan plana dahil edilecektir)*

- [ ] **Sıradaki Geliştirmeler:**
  - [ ] Çoklu Slayt / Carousel Yönetimi (Instagram / LinkedIn Kaydırmalı Gönderi ZIP İndirici)
  - [ ] Canlı Daktilo (Typing) Oynatıcı & Video MP4 / WebM İndirici
- [ ] 
- [ ] 


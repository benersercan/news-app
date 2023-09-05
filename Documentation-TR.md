# NewsApp
BTC Pro Haber uygulaması

## Haber Kaynakları Listeleme Ekranı

## NewsSources Bileşeni

### Açıklama:
NewsSources bileşeni, belirli bir dilde (şu an için sadece İngilizce) mevcut olan haber kaynaklarını listeler. Bu bileşen, kullanıcının kategorilere göre haber kaynaklarını filtrelemesine olanak tanır.

**Kullanım:**
Bileşen, varsayılan olarak tüm İngilizce haber kaynaklarını listeler.

**Props:**
Bu bileşen herhangi bir prop almaz.

**Özellikler:**
-   sources: API'den dönen haber kaynaklarının listesi.
-   useEffect: Sayfa yüklendiğinde API'den haber kaynaklarını getirir.


## Haber Listeleme Ekranı :

## NewsList Bileşeni

### Tanım
NewsList bileşeni, belirli bir anahtar kelime için en son haber başlıklarını ve haber makalelerini gösterir. Aynı zamanda, otomatik yenileme seçeneği sunar, sonsuz kaydırma işlevselliği sağlar ve kullanıcının önceki sayfaya geri dönmesine olanak tanır.


**Özellikler**
-   **Öne Çıkan Başlıklar (Swiper)**: Öne çıkan haber başlıklarını gösterir. Otomatik hareket eder ve mobil cihazlarda veya küçük ekranlarda bir seferde bir başlık gösterirken, geniş ekranlarda üç başlık gösterir.
-   **Aranan Makaleler Listesi**: Arama terimine göre bulunan haber makalelerini gösterir.
-   **Otomatik Yenileme Modalı**: Kullanıcının otomatik yenileme seçeneğini seçip seçmemesini isteyen bir modal gösterir.
-   **Sonsuz Kaydırma**: Kullanıcı sayfayı kaydırdıkça daha fazla makale yüklenir.
-   **Geri Dön**: Kullanıcıyı önceki sayfaya yönlendiren bir buton.

**State Yapısı**
-   **topHeadlines**: Öne çıkan haber başlıklarını tutar.
-   **searchedArticles**: Arama terimine göre bulunan haber makalelerini tutar.
-   **loading**: Makalelerin yüklenip yüklenmediğini kontrol eder.
-   **hasMore**: Daha fazla makale olup olmadığını kontrol eder.
-   **page**: Sonsuz kaydırma için şu anki sayfa numarasını tutar.
-   **showModal**: Modal'ı gösterip göstermeme durumunu kontrol eder.
-   **autoRefresh**: Otomatik yenileme seçeneğinin aktif olup olmadığını kontrol eder.

**Fonksiyonlar**
-   **addToSet**: Eski ve yeni makaleleri birleştirmek için kullanılır. Yeniliklerin önce görünmesini sağlar.
-   **fetchNews**: Arama terimine göre haber makalelerini alır.
-   **loadMoreArticles**: Sonraki sayfa makalelerini yükler.
-   **handleModalChoice**: Kullanıcının modal üzerindeki seçimine göre otomatik yenileme seçeneğini ayarlar.
-   **goBack**: Kullanıcıyı önceki sayfaya yönlendirir.
-   **observer (useRef)**: Sonsuz kaydırma işlevselliği için Intersection Observer'ı tutar.
-   **lastArticleRef (useCallback)**: Son makalenin referansını tutar ve makale viewport'ta göründüğünde daha fazla makale yüklemek için tetikler.

**Kullanımı**
Bu bileşen, belirli bir arama terimi için haber makalelerini listelemek istediğinizde kullanılır. Öne çıkan haber başlıkları, swiper slider içinde gösterilir. Makaleler aşağıya doğru sonsuz bir şekilde kaydırılarak yüklenir.


**Haber Detay Ekranı**
**NewsDetail Komponenti**

**Açıklama:**
-   Seçilen haber makalesinin ayrıntılarını gösterir.
-   Kullanıcının makaleyi okuma listesine eklemesine veya okuma listesinden çıkarmasına olanak tanır.

**Özellikler:**
-   Seçilen haberi detaylı bir şekilde gösterir.
-   Haberin tamamına erişim için bir bağlantı içerir.
-   Kullanıcı, önceki sayfaya geri dönebilir.
-   Kullanıcı makaleyi okuma listesine ekleyebilir veya okuma listesinden çıkarabilir.

**Bağlantılar:**
-   useNews: Seçilen haber makalesi hakkındaki bilgilere erişim sağlar.
-   useNavigate: Sayfa yönlendirme işlevselliği için kullanılır.
-   Layout: Ana sayfa yapısı komponenti.

**Kullanım:**
Bu komponent, kullanıcının bir haber makalesini detaylı olarak incelemek için seçtiğinde kullanılır. Aynı zamanda kullanıcıya makaleyi okuma listesine eklemesi veya okuma listesinden çıkarması için butonlar sunar.


## Okuma Listesi Ekranı

## ReadingList Komponenti
### Özellikler:
-   Kullanıcının okuma listesindeki haberleri gösteren bir komponenttir.
-   Eğer kullanıcının okuma listesinde hiç haber yoksa, ana sayfaya yönlendirme yapabilecek bir butonla boş bir durum ekranı gösterilir.

**Kullanılan Komponentler ve Modüller:**
-  useNavigate: react-router-dom paketinden alınan bir kancadır. Yönlendirme işlevi sağlar.
-  useState, useEffect: React'ın yerleşik kancalarıdır. Durum yönetimi ve yan etki işlevleri için kullanılır.
-  PropTypes: Prop tiplerini doğrulamak için kullanılır.
-  Layout: Dış bir bileşendir ve bu bileşenin çerçevesini oluşturur.
-  FaFrown: react-icons/fa paketinden alınan bir ikondur. Okuma listesi boş olduğunda gösterilir.
-  localStorageKeys: Yerel depolama için anahtarları içeren bir sabittir.

**Kullanım:**
Bu komponent, kullanıcının okuma listesini incelemek için kullanılır. Liste boşsa, kullanıcıya bir mesaj ve ana sayfaya dönme seçeneği sunulur.


## ArticleItem Komponenti

### Özellikler:
-   Haberlerin listelenmesi için kullanılan öğe komponentidir.
-   Her öğe üzerine tıklanabilir ve kullanıcıyı ayrıntı sayfasına yönlendirir.
-   Haber okuma listesine eklenebilir veya okuma listesinden çıkarılabilir.

### Props:
-   article: Haber makalesi ile ilgili veriyi içerir.
-   title (String): Makalenin başlığı.
-   description (String): Makalenin açıklaması.
-   urlToImage (String): Makalenin görsel URL'si.
-   url (String): Makalenin tamamına erişim için URL.
-   publishedAt (String): Makalenin yayınlandığı tarih.

-   lastArticleRef: Sonsuz kaydırma için kullanılan bir referanstır.
-   isLastItem (Bool): Haber listesinin son öğesi olup olmadığını kontrol eder.
-   isReadingList (Bool): Öğenin okuma listesinde olup olmadığını kontrol eder.

**Kullanım:**
Bu komponent, haber listesi içinde her bir haber öğesini göstermek için kullanılır. Her öğe, kullanıcının tıklamasına tepki olarak ayrıntı sayfasına yönlendirme yapar.


### CustomModal Komponenti

## Özellikler:
-   Uygulamada modallerin gösterilmesi için kullanılır.
-   Gösterme ve kapatma işlevleri dinamiktir, yani bu komponenti kullanarak farklı içeriklere sahip modaller oluşturabilirsiniz.

### Props:
-   show: Modalin gösterilip gösterilmediğini belirten boolean değer.
-   onClose: Modalin kapatılmasını tetikleyen fonksiyon.
-   title: Modal başlığı.
-   children: Modal içeriği.

**Kullanılan Yardımcı Fonksiyon - Hook:**
-   useModal: Bir modalın gösterilip gösterilmediğini kontrol etmek için kullanılan bir hook'tur. isVisible modalın şu an gösterilip gösterilmediğini belirtir. show ve hide fonksiyonları ise sırasıyla modalı göstermek ve gizlemek için kullanılır.

**Kullanım:**
Bu komponent, uygulamanın her yerinde kolayca modaller oluşturabilmek için kullanılır. children prop'u sayesinde, modal içeriğini dinamik olarak değiştirebilirsiniz.


## Filter Bileşeni

## Tanım:
Bu komponent, haber kategorilerini filtrelemek için kullanılır. Kullanıcı, mevcut kategorilerden istediklerini seçerek, hangi kategorilerde haberleri görmek istediğini belirleyebilir.

## Props:
-onFilterApply: (function, required) Seçilen kategorilerin dışarı aktarılması için bir callback fonksiyonudur.

### Özellikler:
-   API dökümanına göre uygun kategorileri gösterir
-   İlgili kategori filtrelemesini uygulamak için Apply adında bir button içerir

## Card Bileşeni

## Tanım:
Bu komponent, bir haber kaynağını görsel bir kart olarak sunar.

## Props:
- source: (object, required) Haber kaynağının bilgilerini içeren obje.
- name: (string, required) Kaynağın adını içerir.
- description: (string) Kaynağın kısa bir açıklamasını içerir.


## useReadingList Hook
## Tanım:
useReadingList isimli bu özel kanca, bir kullanıcının okuma listesini yönetmek için kullanılır. Bu kanca, kullanıcının okuma listesindeki makaleleri almak, bir makale eklemek, bir makaleyi kaldırmak ve bir makalenin okuma listesinde olup olmadığını kontrol etmek için yardımcı işlevler sağlar.

### Kullanım:
Bu özel kancayı kullanarak, uygulama içerisinde kullanıcının okuma listesiyle ilgili işlemleri kolaylıkla gerçekleştirebilirsiniz.

### İşlevler ve Dönüş Değerleri:
- readingList: Kullanıcının okuma listesini içeren array
- addToReadingList(article): Verilen article nesnesini okuma listesine ekler ve bu listeyi yerel depolamada günceller.

- Parametre: article - Okuma listesine eklenecek makale nesnesi.
removeFromReadingList(articleUrl): Verilen articleUrl'ye sahip makaleyi okuma listesinden kaldırır ve bu listeyi yerel depolamada günceller.
- Parametre: articleUrl - Okuma listesinden kaldırılacak makalenin URL'si.
isInReadingList(articleUrl): Verilen articleUrl'ye sahip bir makalenin okuma listesinde olup olmadığını kontrol eder.
- Parametre: articleUrl - Kontrol edilecek makalenin URL'si.
Dönüş Değeri: true eğer makale okuma listesindeyse, false eğer değilse.
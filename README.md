# Cakir Insaat Web

Bu proje Vite + React + TypeScript ile hazirlanmistir.

## Lokal Calistirma

1. npm install
2. npm run dev

## Build

1. npm run build

## Mesaj Formu Aktivasyonu

Mesaj formu FormSubmit ile calisir.

1. Formu ilk kez gonderdiginde FormSubmit, endpointteki e-posta adresine bir aktivasyon maili yollar.
2. Maildeki "Activate Form" baglantisina bir kez tiklanmalidir.
3. Aktivasyondan sonra form gonderimleri normal sekilde iletilir.

Isterseniz endpoint adresini .env dosyasindan degistirebilirsiniz:

- VITE_CONTACT_ENDPOINT=https://formsubmit.co/ajax/sizin@eposta.com

## Otomatik Yayin (GitHub Pages)

Main branch'e her push sonrasi otomatik deploy calisir.

Workflow dosyasi:
- .github/workflows/deploy-pages.yml

## Domain Baglama

Domain satin alindiginda asagidaki adimlari uygulayin:

1. public/CNAME.example dosyasini public/CNAME olarak kopyalayin.
2. public/CNAME icine sadece domain adini yazin.
3. Degisikligi commit edip main branch'e pushlayin.
4. Domain saglayicinizda DNS kayitlarini girin:
   - CNAME kaydi: www -> vegasirius.github.io
   - A kayitlari (@):
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
5. GitHub repo ayarlarinda Pages altinda custom domain'i aktif edin.

Not:
- SSL sertifikasi GitHub Pages tarafinda otomatik tanimlanir.
- DNS yayilimi 5 dakika ile 24 saat arasi surebilir.

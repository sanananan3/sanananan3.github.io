# Jiyeon Joung — GitHub Pages Portfolio

정적 HTML/CSS/JavaScript만 사용한 포트폴리오입니다. 별도 빌드 없이 GitHub Pages에 바로 배포할 수 있습니다.

## 배포

1. GitHub에서 `sanananan3.github.io` 저장소 생성
2. 이 폴더 안의 파일을 저장소 최상단에 업로드
3. `Settings → Pages → Deploy from a branch → main / root` 선택
4. 잠시 후 `https://sanananan3.github.io/` 접속

## 구성

- `index.html`: 메인 포트폴리오
- `projects/agiledp.html`: AgileDP 논문 프로젝트 페이지
- `styles.css`: 전체 디자인과 반응형 레이아웃
- `script.js`: 프로젝트 필터, 이미지·영상 갤러리, 전체 화면 뷰어
- `assets/projects/`: 프로젝트별 이미지·영상
- `assets/documents/`: CV, 발표자료, PTMQ 보고서

## 프로젝트에 이미지·동영상 추가

각 프로젝트 폴더 안에 파일을 넣은 뒤, 해당 프로젝트의 `.gallery-thumbs` 안에 아래 버튼을 복사합니다.

### 이미지

```html
<button class="media-thumb"
  data-kind="image"
  data-src="assets/projects/PROJECT/image.jpg"
  data-title="제목"
  data-caption="설명">
  <img src="assets/projects/PROJECT/image.jpg" alt="이미지 설명">
</button>
```

### 동영상

```html
<button class="media-thumb"
  data-kind="video"
  data-src="assets/projects/PROJECT/demo.mp4"
  data-poster="assets/projects/PROJECT/demo-poster.jpg"
  data-title="제목"
  data-caption="설명">
  <img src="assets/projects/PROJECT/demo-poster.jpg" alt="영상 썸네일">
</button>
```

MP4는 H.264 형식을 권장합니다. 포스터는 영상 첫 프레임을 JPG로 저장해 사용하면 페이지가 더 빠르고 깔끔하게 표시됩니다.

## 공개 전 확인

- 연락처와 프로젝트 설명이 최신인지 확인
- 연구기관·회사 자료의 외부 공개 가능 여부 최종 확인
- 너무 큰 영상은 1080p H.264로 압축 권장

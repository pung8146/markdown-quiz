# 🤖 AI 퀴즈 생성기

**텍스트 문서를 AI가 분석하여 자동으로 학습용 퀴즈를 생성하는 도구입니다.**  
어떤 텍스트든 붙여넣으면 AI가 요약하고 다양한 유형의 퀴즈를 자동으로 만들어줍니다.

---

## ✨ 주요 기능

### 🤖 AI 기반 자동 퀴즈 생성

- **OpenAI GPT-4**를 활용한 지능형 퀴즈 생성
- 문서 내용을 분석하여 **자동 제목 및 태그 생성**
- 문서의 핵심 내용을 바탕으로 **요약** 제공

### 📝 다양한 문제 유형 지원

- **객관식 문제**: 4지선다 형태의 선택형 문제
- **참/거짓 문제**: O/X 형태의 간단한 문제
- **빈칸 추론**: 핵심 키워드를 추론하는 문제
- 문제 개수와 유형을 사용자가 직접 선택 가능

### 🏷️ 스마트 분류 시스템

- AI가 문서 내용을 분석하여 **자동 태그 생성**
- 상식, 기술, 건강, 교육, 생활 등 카테고리별 분류
- 태그별 색상 구분으로 직관적인 관리

### 📚 퀴즈 히스토리 관리

- 생성된 퀴즈를 체계적으로 관리
- 생성 날짜, 제목, 태그별 정렬 및 검색
- 원본 문서 미리보기 기능

### 🔐 사용자 인증 시스템

- **구글 OAuth 로그인**: 구글 계정으로 간편 로그인
- **이메일/비밀번호 로그인**: 전통적인 로그인 방식
- **게스트 모드**: 로그인 없이도 이용 가능
- **보호된 라우트**: 인증이 필요한 페이지 보호

### 🎯 클라우드 저장 & 동기화

- **로그인 시**: 퀴즈 데이터가 **Supabase 클라우드**에 안전하게 저장
- **게스트 모드**: 브라우저 로컬 저장소 활용
- 디바이스 간 데이터 동기화 지원

---

## 💡 사용 방법

### 1️⃣ 텍스트 입력

- 학습하고 싶은 내용을 텍스트 에디터에 붙여넣기
- 마크다운 문서, 블로그 글, 강의 노트 등 어떤 형태든 가능

### 2️⃣ 퀴즈 옵션 설정

- 생성할 문제 유형 선택 (객관식, 참/거짓, 빈칸추론)
- 문제 개수 설정 (1~20개)

### 3️⃣ AI 퀴즈 생성

- "퀴즈 생성하기" 버튼 클릭
- AI가 자동으로 제목, 태그, 요약, 퀴즈 생성

### 4️⃣ 퀴즈 풀기

- 생성된 퀴즈 페이지에서 문제 해결
- 정답 확인 및 해설 제공

---

## 🛠️ 기술 스택

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI/UX**: Tailwind CSS + Radix UI
- **AI**: OpenAI GPT-4 API
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel

---

## 🚀 개발 현황

### ✅ 완료된 기능

- AI 기반 퀴즈 자동 생성
- 자동 제목/태그 생성
- 다양한 문제 유형 지원
- 사용자 인증 시스템
- 클라우드 저장 및 히스토리 관리
- 반응형 UI 디자인

### 🔄 개발 중

- 퀴즈 결과 통계 및 분석
- 공유 기능
- 북마크 시스템

### 📋 향후 계획

- 모바일 앱 개발
- 협업 기능
- API 공개

---

## 📌 활용 사례

- **학습자료 복습**: 강의 노트를 퀴즈로 변환하여 자가학습
- **면접 준비**: 기술 문서를 문제로 만들어 면접 대비
- **팀 교육**: 회사 매뉴얼이나 가이드를 퀴즈로 교육
- **자격증 공부**: 참고서 내용을 문제화하여 반복 학습

---

## 설치 및 실행

1. **의존성 설치**:

```bash
npm install
```

2. **환경변수 설정**:
   `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

3. **개발 서버 실행**:

```bash
npm run dev
```

---

## 🔐 Supabase 설정

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 URL과 API 키 확인

### 2. 데이터베이스 스키마 생성

```sql
-- 퀴즈 기록 테이블
CREATE TABLE quiz_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(50),
  original_content TEXT NOT NULL,
  prompt_used TEXT NOT NULL,
  generated_quiz JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_quiz_records_user_id ON quiz_records(user_id);
CREATE INDEX idx_quiz_records_created_at ON quiz_records(created_at);
CREATE INDEX idx_quiz_records_tag ON quiz_records(tag);

-- RLS 활성화
ALTER TABLE quiz_records ENABLE ROW LEVEL SECURITY;

-- 사용자별 접근 정책
CREATE POLICY "Users can manage their own quiz records"
  ON quiz_records FOR ALL
  USING (auth.uid() = user_id);
```

### 3. OAuth 설정 (구글 로그인)

1. Supabase Dashboard > Authentication > Providers
2. Google 제공자 활성화
3. Google Cloud Console에서 OAuth 클라이언트 생성
4. 리디렉션 URL: `https://your-project.supabase.co/auth/v1/callback`

---

## 📄 라이선스

MIT License

---

## 🤝 기여하기

1. 이 저장소를 Fork
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

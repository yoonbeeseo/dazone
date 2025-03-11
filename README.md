# 대존: 아마존 클론 코딩

1. 상품 출력 하기
2. 상품 클릭 했을 때 디테일 페이지로 이동하기
3. 상품 가격 \* 상품 갯수 장바구니에 담기

4. 결제할 때 토스 페이먼츠로 비스무리한 결제 시스템 도입

5. 결제페이지에서 수량 수정 가능하게끔
6. 장바구니에서 결제할 아이템만 별도 선택 가능
7. 결제한 아이템만 장바구니에서 삭제 후 나의 주문 내역으로 이동

8. 회원가입
9. 인증번호 인증
10. 이름, 이메일, 비번 연락처

## 페이지 라우팅

1. 홈 화면

- 상단 대존 로고, 검색창, 나의공간, 카트
- 아이템 출력하기
- 검색어에 맞춰서 검색어와 유사 또는 일치한 아이템만 보여주기

2. 로그인 페이지

- 로그인 창 이메일 비번 그리고 회원가입 버튼

3. 회원가입 페이지

- 가입하기 버튼 + 인증번호 입력하기 (alert + 인증번호 입력)

4. 아이템 상세설명 페이지

- 아이템 가격, 수량 정보 등등등 사진들 담기 버튼

5. 장바구니 페이지

- 담아놓은 아이템 수량 변경
- 결제 기능 구현
- 토스 팝업창으로 결제

6. 주문 내역 페이지

- 주문 내역들 출력

7. 주문 상세 내역 페이지

- 구매한 물건 목록, 가격, 수량, 제품 정보

### 설치 라이브러리

1. rrd
2. zustand
3. tailwind
4. react-icons
5. vanilla extract
6. firebase + react-query

### tailwind

1. custom components + theme + utilities
2. dark mode 구현

### Zustand

장바구니, 결제내역, 주문내역, 페이지 전환시에도 페이지 내용 저장

### firebase => 실시간 데이터 fetching => listener : subscribe 리액트 스럽지 못함

react query => 데이터를 저장 해놓고 변경사항 없으면 그대로 갖다씀

인증관련 관리

회원가입 + 로그인 유지 + 구글 로그인

### React

state 관리
useState

동작 감지
useEffect

인풋관리
useRef

최적화 함수
useCallback

최적화 초기값 + 메세지
useMemo

전역상태
Context Api: useContext createContext

++++
Suspense, lazy loading 로딩 지연 처리하는 과정

useTransition 로딩시간을 관리하는 훅

useReducer state 관리하는 좋은 친구
redux 규칙을 따름

### typescript

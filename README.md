# 김도현 Blog

![김도현 Blog](https://res.cloudinary.com/dkhp8gzh3/image/upload/v1709770522/portfolio/haapudjb1zlaxzrzy7fc.png)

저의 블로그 웹사이트입니다. 저를 소개하고 배운 것을 잊지 않기 위해 기록해두고 있습니다.

이전까진 [Tistory 블로그](https://gomban.tistory.com/)에 글을 작성했었지만, 저만의 스타일을 갖는 블로그를 만들고 싶어서 Next.js를 사용하여 만들었습니다.

이 블로그는 지속적으로 업데이트하며 꾸준히 진행할 예정입니다.

## 기술 스택
- 코어: TypeScript, React, Next.js 14
- 스타일링: Tailwind CSS, shadcn-ui
- 패키지: PNPM
- 배포: Vercel

## 프로젝트 실행
1. **Fork or Clone the repository**

    프로젝트를 본인의 Github으로 Fork 하거나 Clone하여 내려받습니다.

2. **Installation**

    이 프로젝트는 `pnpm` 패키지 매니저를 사용하였습니다.  
    프로젝트 디렉토리에서 의존성 패키지를 설치합니다.
```bash
pnpm i
```

3. **Development**

    개발 서버를 실행하면 `localhost:3000`에서 확인할 수 있습니다.
```bash
pnpm dev
```

## 3rd-Party 라이브러리

### contentlayer ( Content Management )

contentlayer가 `/content` 디렉토리에 있는 `mdx` 파일을 관리합니다.  
관련 설정은 [/contentlayer.config.ts](./contentlayer.config.ts) 에서 확인할 수 있습니다.

파일 수정 시 자동으로 `Hot Reload` 되어 개발중인 웹 페이지에 반영됩니다.

mdx 파싱 및 스타일링을 위해 아래 라이브러리를 사용하였습니다.

- [remark-gfm](https://github.com/remarkjs/remark-gfm): markdown을 파싱하여 HTML로 변환합니다.
- [remark-breaks](https://github.com/remarkjs/remark-breaks): md 파일에서 줄바꿈하면 실제 줄바꿈으로 변환합니다. (공백이나 Escape 문자가 필요 없어집니다.)
- [remark-toc](https://github.com/remarkjs/remark-toc): Table of Contents를 생성합니다.
- [rehype-slug](https://github.com/rehypejs/rehype-slug): `<h1>` ~ `<h6>` 태그에 id를 부여합니다.
- [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings): `<h1>` ~ `<h6>` 태그에 부여된 id를 통해 자동으로 링크를 생성합니다.
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app/): 코드 블록을 스타일링합니다.

그 외에 Typography 스타일은 [/src/components/ui/mdx-components.tsx](./src/components/ui/mdx-components.tsx) 에서 정의하였습니다.

### Vercel Analytics

[Vercel Analytics](https://vercel.com/analytics)를 사용하여 웹사이트의 트래픽을 추적하고 있습니다.

만약 사용하지 않길 원하거나, Vercel에 배포할 예정이 아니라면 [/src/components/Provider.tsx](./src/components/Provider.tsx)에서 `Analytics` 컴포넌트를 제거해주세요.


## 이슈
- remark-gfm은 3.0.1 에서 업데이트 하면 안 됨. https://github.com/hashicorp/next-mdx-remote/issues/403
## Chuyen nhanh giua API va mock

File Next.js dang doc la `.env.local`.

Mac dinh hien tai:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5003/api
NEXT_PUBLIC_CONTENT_SOURCE=api
```

De doi nhanh:

```env
NEXT_PUBLIC_CONTENT_SOURCE=api
```

hoac

```env
NEXT_PUBLIC_CONTENT_SOURCE=mock
```

Preset san co:

- `.env.api.local`: dung backend that
- `.env.mock.local`: dung mock data

Sau khi doi file `.env.local`, restart lai frontend dev server.

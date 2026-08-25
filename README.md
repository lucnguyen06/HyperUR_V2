# HyperOS Data

A Vue.js application to display Xiaomi HyperOS ROM updates data from [HyperData](https://github.com/HegeKen/HyperData).

## Features

- Browse devices by brand (Xiaomi, Redmi, POCO)
- Search devices by name or code
- View recent ROM updates
- Multi-language support (English/Chinese)
- Responsive design

**Pure HTML/JS/CSS Version (Recommended)**

A lightweight version using only vanilla HTML, JavaScript, and CSS — no build tools required.

```bash
# Serve with any static server
npx serve public -p 3000

# Or use Python
python -m http.server 3000 --directory public

# Or open directly in browser
# Navigate to public/index.html
```

### Features

- Full SPA routing with hash navigation
- EN/VI internationalization
- Dark/Light theme toggle
- Device browser with search and brand filter
- User authentication (localStorage)
- Serial key management (localStorage)
- Fully responsive design

## Data Source

Data is fetched from [HegeKen/HyperData](https://github.com/HegeKen/HyperData) GitHub repository.

## License

GPL-3.0

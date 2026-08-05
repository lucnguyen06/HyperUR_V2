import { createI18n } from 'vue-i18n'

const en = {
  nav: {
    home: 'Home',
    download: 'Download',
    guide: 'Guide',
    changelog: 'Changelog',
    donate: 'Donate',
    login: 'Login'
  },
  hero: {
    eyebrow: '🇻🇳 STOCK-BASED CUSTOM ROM — XIAOMI',
    title1: 'Optimize your',
    title2: 'experience.',
    desc: 'Enjoy perfect smoothness, unlocked gaming frame rates, and fully working banking apps. Welcome to {brand}.',
    cta1: 'View Supported Devices',
    cta2: 'Read Guide'
  },
  builds: {
    kicker: 'BUILDS',
    title: 'Built on vendor stock firmware',
    items: {
      hyperos: { name: 'HyperOS', tag: 'Xiaomi' }
    }
  },
  guide: {
    kicker: 'FLASH GUIDE',
    title: 'Install in four steps',
    steps: {
      s1: { title: 'Identify device', desc: 'Confirm exact model, region and base Android version before flashing.' },
      s2: { title: 'Download build', desc: 'Pick the right stock-based build for Xiaomi.' },
      s3: { title: 'Verify & flash', desc: 'Check hash, follow clean/dirty flash instructions inside the build thread.' },
      s4: { title: 'Boot & verify', desc: 'First boot, check camera, signal, fast-charge, OTA and restore your data.' }
    }
  },
  compare: {
    kicker: 'STOCK VS MOD',
    title: 'What changes?',
    stock: 'Stock ROM',
    mod: 'HyperUR',
    rows: {
      r1: { topic: 'Daily experience', stock: 'Heavy, vendor bloat', mod: 'Lightweight & smooth' },
      r2: { topic: 'Camera & signal', stock: 'Vendor tuned', mod: 'Untouched, stock parity' },
      r3: { topic: 'Customization', stock: 'Locked down', mod: 'Deep tweaks, no limits' },
      r4: { topic: 'Updates', stock: 'Vendor schedule', mod: 'Frequent community OTA' }
    }
  },
  faq: {
    kicker: 'FAQ',
    title: 'Frequently asked questions',
    items: {
      q1: { q: 'Is this an AOSP ROM?', a: 'No. It is built directly on top of vendor stock firmware (HyperOS), so hardware features like camera, modem, fast-charge and fingerprint stay intact.' },
      q2: { q: 'Will I lose warranty or need an unlocked bootloader?', a: 'Yes, an unlocked bootloader is required to flash. This may affect warranty depending on your region and vendor — read the guide before flashing.' },
      q3: { q: 'Do banking apps work after flashing?', a: 'Yes. The bootloader unlock status is hidden by default, so banking and e-wallet apps work out of the box without workarounds.' },
      q4: { q: 'Is my device supported?', a: 'Support depends on the vendor stock base available for your model. Check the Download page for the exact model and base Android version.' }
    }
  },
  cta: {
    title: 'Ready to refine your phone?',
    cta1: 'Download ROM',
    cta2: 'Join Community'
  },
  pages: {
    coming_soon: 'Feature under development',
    guide: { title: 'Installation Guide', desc: 'Step-by-step flash instructions for each vendor' },
    changelog: { title: 'Changelog', desc: 'Build history and recent updates' },
    donate: { title: 'Donate', desc: 'Support the ROM development team' },
    serial: { title: 'Serial Key Registration', desc: 'Register your serial to receive update notifications' },
    login: { title: 'Login / Register', desc: 'Sign in or create a new account' }
  },
  footer: {
    brand: 'HyperUR',
    tagline: 'Stock-based custom ROM refined from Xiaomi.',
    cols: {
      nav: { title: 'Navigation', home: 'Home', download: 'Download', guide: 'Guide' },
      community: { title: 'Community', changelog: 'Changelog', donate: 'Donate' },
      account: { title: 'Account', login: 'Login', register: 'Register' }
    },
    byline: 'BY UR TEAM',
    copy: '© 2026 HYPERUR. ALL RIGHTS RESERVED.',
    social: {
      title: 'Community',
      channel: 'Update Channel',
      chat: 'Chat Group',
      devs: 'Developers',
      dev1: 'Usagi',
      dev2: 'Rio'
    }
  }
}

const vi = {
  nav: {
    home: 'Trang Chủ',
    download: 'Tải ROM',
    guide: 'Hướng Dẫn',
    changelog: 'Changelog',
    donate: 'Ủng Hộ',
    login: 'Đăng Nhập'
  },
  hero: {
    eyebrow: '🇻🇳 STOCK-BASED CUSTOM ROM',
    title1: 'Tối ưu',
    title2: 'trải nghiệm.',
    desc: 'Mượt mà hoàn hảo, mở khoá FPS gaming, và các app ngân hàng chạy đầy đủ. Chào mừng đến với {brand}.',
    cta1: 'Xem thiết bị hỗ trợ',
    cta2: 'Đọc hướng dẫn'
  },
  builds: {
    kicker: 'BẢN BUILD',
    title: 'Xây trên nền ROM stock của hãng',
    items: {
      hyperos: { name: 'HyperOS', tag: 'Xiaomi' }
    }
  },
  guide: {
    kicker: 'HƯỚNG DẪN FLASH',
    title: 'Cài đặt trong 4 bước',
    steps: {
      s1: { title: 'Xác định thiết bị', desc: 'Xác nhận chính xác model, region và phiên bản Android nền trước khi flash.' },
      s2: { title: 'Tải bản build', desc: 'Chọn đúng bản stock-based cho Xiaomi.' },
      s3: { title: 'Kiểm tra & flash', desc: 'Kiểm tra hash, làm theo hướng dẫn clean/dirty flash trong thread của build.' },
      s4: { title: 'Khởi động & kiểm tra', desc: 'Boot lần đầu, kiểm tra camera, sóng, sạc nhanh, OTA và khôi phục dữ liệu.' }
    }
  },
  compare: {
    kicker: 'STOCK VS MOD',
    title: 'Có gì khác biệt?',
    stock: 'ROM Stock',
    mod: 'HyperUR',
    rows: {
      r1: { topic: 'Trải nghiệm hằng ngày', stock: 'Nặng, nhiều app rác', mod: 'Nhẹ & mượt' },
      r2: { topic: 'Camera & sóng', stock: 'Theo hãng', mod: 'Giữ nguyên như stock' },
      r3: { topic: 'Tùy biến', stock: 'Bị giới hạn', mod: 'Mở sâu, không giới hạn' },
      r4: { topic: 'Cập nhật', stock: 'Theo lịch hãng', mod: 'OTA cộng đồng thường xuyên' }
    }
  },
  faq: {
    kicker: 'FAQ',
    title: 'Câu hỏi thường gặp',
    items: {
      q1: { q: 'Đây có phải ROM AOSP không?', a: 'Không. ROM được build trực tiếp trên firmware stock của hãng (HyperOS), nên các tính năng phần cứng như camera, modem, sạc nhanh và vân tay đều hoạt động đúng.' },
      q2: { q: 'Có mất bảo hành hay cần mở khoá bootloader không?', a: 'Cần bootloader đã mở khoá để flash. Tuỳ region và hãng, điều này có thể ảnh hưởng bảo hành — hãy đọc kỹ hướng dẫn trước khi flash.' },
      q3: { q: 'App ngân hàng có chạy được sau khi flash không?', a: 'Có. Trạng thái mở khoá bootloader được ẩn mặc định, nên các app ngân hàng và ví điện tử chạy mượt ngay không cần thủ thuật.' },
      q4: { q: 'Máy tôi có được hỗ trợ không?', a: 'Hỗ trợ tuỳ theo bản stock base có sẵn cho từng model. Vào trang Tải ROM để kiểm tra chính xác model và Android nền.' }
    }
  },
  cta: {
    title: 'Sẵn sàng tinh chỉnh chiếc máy của bạn?',
    cta1: 'Tải ROM',
    cta2: 'Tham gia cộng đồng'
  },
  pages: {
    coming_soon: 'Tính năng đang phát triển',
    guide: { title: 'Hướng Dẫn Cài Đặt', desc: 'Hướng dẫn flash chi tiết cho từng hãng' },
    changelog: { title: 'Changelog', desc: 'Lịch sử build và các cập nhật gần đây' },
    donate: { title: 'Ủng Hộ', desc: 'Ủng hộ đội ngũ phát triển ROM' },
    serial: { title: 'Đăng Ký Serial Key', desc: 'Đăng ký serial để nhận thông báo cập nhật' },
    login: { title: 'Đăng Nhập / Đăng Ký', desc: 'Đăng nhập hoặc tạo tài khoản mới' }
  },
  footer: {
    brand: 'HyperUR',
    tagline: 'ROM custom stock-based tinh chỉnh từ Xiaomi.',
    cols: {
      nav: { title: 'Điều Hướng', home: 'Trang Chủ', download: 'Tải ROM', guide: 'Hướng Dẫn' },
      community: { title: 'Cộng Đồng', changelog: 'Changelog', donate: 'Ủng Hộ' },
      account: { title: 'Tài Khoản', login: 'Đăng Nhập', register: 'Đăng Ký' }
    },
    byline: 'BỞI ĐỘI NGŨ UR',
    copy: '© 2026 HYPERUR. BẢO LƯU MỌI QUYỀN.',
    social: {
      title: 'Cộng Đồng',
      channel: 'Kênh Cập Nhật',
      chat: 'Nhóm Chat',
      devs: 'Lập Trình Viên',
      dev1: 'Usagi',
      dev2: 'Rio'
    }
  }
}

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
const locale = saved || 'EN'

export const i18n = createI18n({
  legacy: false,
  locale: locale.toLowerCase(),
  fallbackLocale: 'en',
  messages: { en, vi }
})

export const setLocale = (loc) => {
  i18n.global.locale.value = loc.toLowerCase()
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', loc.toUpperCase())
  }
  document.documentElement.setAttribute('lang', loc.toLowerCase())
}

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', locale.toLowerCase())
}

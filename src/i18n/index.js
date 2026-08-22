import { createI18n } from 'vue-i18n'

const en = {
  nav: {
    menu: 'Menu',
    language: 'Language',
    home: 'Home',
    download: 'Download',
    guide: 'Guide',
    serial: 'Serial Key',
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
      s4: { title: 'Boot & verify', desc: 'First boot, check camera, signal, fast-charge and restore your data.' }
    },
    hero: {
      eyebrow: 'FLASH GUIDE',
      title: 'How to flash HyperUR ROM',
      desc: 'Detailed instructions for safely flashing HyperUR on Xiaomi, Redmi, and POCO devices. Please read carefully before proceeding.'
    },
    tocTitle: 'Table of contents',
    sections: {
      prep: 'Preparation',
      recovery: 'Install Recovery',
      flash: 'Flash via Recovery',
      fastboot: 'Flash via Fastboot',
      wipe: 'Wipe & Restore',
      errors: 'Common Errors',
      faq: 'FAQ'
    },
    prep: {
      title: 'Preparation before flashing',
      desc: 'Things you need to have before you start',
      deviceTitle: 'Device & Requirements',
      computerTitle: 'Computer setup',
      filesTitle: 'Files to download',
      backupTitle: 'Backup your data',
      backupWarn: 'Back up all your data before flashing. All data will be erased when you Wipe.',
      deviceItems: [
        'A supported Xiaomi / Redmi / POCO device',
        'Battery level above 50% (above 80% recommended)',
        'Charge the device fully before flashing to avoid bricking'
      ],
      computerItems: [
        'A Windows PC (Windows 10 / 11 recommended)',
        'A good-quality USB cable',
        'A USB port connected directly to the motherboard (avoid USB hubs)'
      ],
      filesItems: [
        'HyperUR ROM — download from the Download page',
        'ADB & Fastboot — Android SDK Platform Tools',
        'TWRP / OFRP — a Recovery image that matches your device'
      ],
      backupItems: [
        'Photos, videos and important files',
        'Contacts and SMS',
        'App data (if possible via Google Backup)',
        'Authenticator codes and 2FA seeds'
      ]
    },
    recovery: {
      title: 'Install Recovery (TWRP / OFRP)',
      desc: 'Recovery is the environment used to flash the ROM and perform advanced operations',
      twrpTitle: 'Install TWRP Recovery',
      ofrpTitle: 'Install OFRP Recovery',
      twrpSteps: [
        'Download the TWRP image that matches your device',
        'Rename the file to twrp.img and put it in your ADB folder',
        'Boot into Fastboot mode (power off, then Power + Volume Down)',
        'Connect the device to your PC via USB',
        'Open a CMD / Terminal in the ADB folder and run:'
      ],
      ofrpSteps: [
        'Download OFRP for your device from the official site',
        'Copy the .zip file to internal storage or an SD card',
        'Boot into the TWRP Recovery you installed above',
        'Tap Install → select the OFRP.zip file',
        'Swipe to confirm flash',
        'When the flash completes, reboot into OFRP'
      ]
    },
    flash: {
      title: 'Flash via Recovery',
      desc: 'Flash the HyperUR ROM using TWRP / OFRP',
      steps: [
        'Download the HyperUR ROM build that matches your device',
        'Copy the ROM file to internal storage or an SD card',
        'Boot into Recovery (TWRP / OFRP)',
        'IMPORTANT: Wipe first — see section 5',
        'Tap Install',
        'Select the HyperUR ROM file you copied',
        'Swipe the slider to start flashing',
        'Wait until the process completes (5–15 minutes)',
        'Reboot → System'
      ]
    },
    fastboot: {
      title: 'Flash via Fastboot',
      desc: 'Flash HyperUR using the Flashing Tool on your PC',
      steps: [
        'Download HyperUR (in .tgz or .zip format)',
        'Extract the ROM archive to any folder',
        'Open the extracted ROM folder',
        'Double-click Flashing_Tool_Windows_UR.bat',
        'The tool will auto-detect the device (if it is in Fastboot mode)',
        'If not in Fastboot yet: power off → Power + Volume Down',
        'Press Flash and wait until it finishes (5–15 minutes)'
      ],
      toolHint: 'Flashing_Tool_Windows_UR.bat — the tool flashes the correct partitions automatically.',
      warn: 'First boot of a freshly flashed ROM can take 5–15 minutes. Do not remove the battery or power off the device during this time.'
    },
    wipe: {
      title: 'Wipe Data & Restore',
      desc: 'Wipe correctly before flashing a new ROM',
      beforeTitle: 'Before flashing a new ROM (recommended)',
      switchTitle: 'When switching from another ROM to HyperUR (required)',
      beforeItems: [
        'Wipe → Advanced Wipe',
        'Select the following partitions:',
        'System',
        'Data',
        'Cache',
        'Dalvik Cache',
        'Swipe to wipe'
      ],
      switchItems: [
        'Wipe → Format Data',
        'Type "yes"',
        'Wait until formatting completes',
        'Go back and run Advanced Wipe as described above'
      ],
      restoreTitle: 'Restore data after flashing',
      restore: {
        title: 'Restore data after flashing'
      },
      items: [
        'After the first boot, do not sign in to Google immediately',
        'Connect to your PC via MTP',
        'Copy back the files you need (photos, videos, music)',
        'Reinstall apps from Google Play',
        'Restore from Google Drive if you have a backup'
      ],
      warn: 'Do not restore data from the previous ROM using a backup app (e.g. Titanium Backup) — it can cause conflicts.'
    },
    errors: {
      title: 'Common errors & fixes',
      desc: 'Solutions for the most common flashing issues',
      causeLabel: 'Cause',
      fixLabel: 'Fix',
      items: [
        {
          title: '"Failed to boot" or bootloop',
          cause: 'Incompatible ROM, or an insufficient wipe',
          fixes: [
            'Boot back into Recovery → Format Data again → Wipe everything (System, Data, Cache, Dalvik) → Flash the ROM again'
          ]
        },
        {
          title: '"Encryption Failed"',
          cause: 'Corrupt ROM file, or data was not formatted',
          fixes: [
            'Boot into Recovery → Wipe → Format Data → type "yes" → Flash the ROM again'
          ]
        },
        {
          title: '"Device encrypted unsuccessful"',
          cause: 'Data partition could not be mounted',
          fixes: [
            'Open TWRP → Wipe → Format Data → Reboot Recovery → Flash the ROM'
          ]
        },
        {
          title: 'Cannot enter Recovery',
          cause: 'Boot image is corrupted',
          fixes: [
            'Boot into Fastboot → re-flash the recovery via fastboot → or flash the stock ROM via MiFlash'
          ]
        }
      ]
    },
    faq: {
      title: 'Frequently asked questions',
      desc: 'Common questions about flashing HyperUR',
      items: [
        { q: 'Will flashing HyperUR void my warranty?', a: 'An unlocked bootloader is required to flash. Depending on your region and vendor, this may affect warranty. Check your local policy before flashing.' },
        { q: 'Do banking apps work after flashing?', a: 'Yes. The bootloader unlock status is hidden by default, so banking and e-wallet apps work out of the box.' },
        { q: 'How long does the first boot take?', a: 'The first boot of a freshly flashed ROM usually takes 5–15 minutes. Do not power off the device during this time.' },
        { q: 'Can I go back to the stock ROM?', a: 'Yes. You can flash the original stock ROM back via MiFlash in Fastboot mode.' }
      ]
    },
    cta: {
      title: 'Ready to flash?',
      desc: 'Download the build for your device and follow the guide step by step.',
      btn: 'Go to Download'
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
    guide: { title: 'Flash Guide', desc: 'Step-by-step flash instructions for each vendor' },
    changelog: { title: 'Changelog', desc: 'Build history and recent updates' },
    donate: { title: 'Donate', desc: 'Support the ROM development team' },
    serial: { title: 'Serial Key Registration', desc: 'Register your serial to receive update notifications' },
    login: { title: 'Login / Register', desc: 'Sign in or create a new account' }
  },
  auth: {
    tab: {
      login: 'Sign in',
      register: 'Create account'
    },
    aside: {
      title: 'Your HyperUR account',
      desc: 'Sign in to track downloads, register serial keys, and receive update notifications for your devices.',
      f1: { title: 'Lightning fast', desc: 'Save your device list and preferences once.' },
      f2: { title: 'Update alerts', desc: 'Get notified the moment a new build drops.' },
      f3: { title: 'Secure by design', desc: 'Your data is stored locally and never shared.' },
      foot: 'By signing in, you agree to follow community guidelines.'
    },
    divider: { or: 'or' },
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to continue managing your devices.',
      identifier: 'Email or username',
      identifier_ph: 'you@example.com',
      password: 'Password',
      password_ph: 'At least 6 characters',
      remember: 'Keep me signed in',
      forgot: 'Forgot password?',
      submit: 'Sign in',
      success: 'Signed in successfully. Redirecting...',
      no_account: "Don't have an account?",
      demo: 'Use demo credentials'
    },
    register: {
      title: 'Create your account',
      subtitle: 'It only takes a minute to get started.',
      username: 'Username',
      username_ph: '3–24 chars: letters, numbers, . _ -',
      displayName: 'Display name',
      displayName_ph: 'How others see you (optional)',
      email: 'Email',
      email_ph: 'you@example.com',
      password: 'Password',
      password_ph: 'At least 6 characters',
      confirmPassword: 'Confirm password',
      confirmPassword_ph: 'Re-enter your password',
      agree_prefix: 'I agree to the',
      agree_terms: 'Terms of Service',
      agree_and: 'and',
      agree_privacy: 'Privacy Policy',
      submit: 'Create account',
      success: 'Account created. Welcome aboard!',
      have_account: 'Already have an account?'
    },
    forgot: {
      title: 'Reset your password',
      subtitle: "We'll generate a recovery token for your account.",
      email: 'Registered email',
      email_ph: 'you@example.com',
      submit: 'Send reset token',
      sent: 'A reset token has been generated.',
      demo_token: 'Demo recovery token: {token} — copy this to reset your password.',
      back: 'Back to sign in'
    },
    strength: {
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong'
    }
  },
  account: {
    welcome: 'Hi, {name}',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Sign out'
  },
  footer: {
    brand: 'HyperUR',
    tagline: 'Stock-based custom ROM refined from Xiaomi.',
    cols: {
      nav: { title: 'Navigation', home: 'Home', download: 'Download', guide: 'Guide', serial: 'Serial Key' },
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
  },
  serial: {
    brand: 'HyperUR • Serial Keys',
    aside: {
      title: 'Manage your HyperUR serials',
      desc: 'Generate, look up, and manage serial keys for your devices. Each serial is tied to a username and unlocks update notifications.',
      f1: { title: 'One-tap generate', desc: 'Get a unique 16-character key in seconds.' },
      f2: { title: 'Device-bound', desc: 'Bind to a specific device and channel.' },
      f3: { title: 'Stay notified', desc: 'Receive OTA alerts when builds drop.' },
      logged_in_as: 'Signed in as {name}',
      you_have: 'You have {count} active serial(s).',
      login_first: 'Sign in to manage your serials'
    },
    tab: {
      lookup: 'Look up',
      register: 'Register',
      mine: 'My serials'
    },
    lookup: {
      title: 'Look up a serial',
      subtitle: 'Enter your 16-character HyperUR serial to view its details.',
      label: 'Serial key',
      placeholder: 'HUR1-XXXX-XXXX-XXXX',
      submit: 'Look up'
    },
    register: {
      title: 'Register a new serial',
      subtitle: 'Generate a fresh serial key bound to your account.',
      username: 'Owner username',
      device: 'Device model',
      device_ph: 'e.g. POCO F6 Pro',
      build: 'Build version',
      build_ph: 'e.g. HyperUR 1.4.2',
      channel: 'Update channel',
      notes: 'Notes (optional)',
      notes_ph: 'Anything we should know about this device?',
      submit: 'Generate serial',
      success: 'Serial generated: {serial}'
    },
    mine: {
      title: 'My serials',
      subtitle: 'All serials linked to your account.',
      empty_title: 'No serials yet',
      empty_desc: "You haven't registered any serials. Generate your first one to enable update notifications.",
      empty_cta: 'Generate serial'
    },
    result: {
      serial: 'Serial key',
      device: 'Device',
      build: 'Build',
      channel: 'Channel',
      owner: 'Owner',
      issued: 'Issued',
      expires: 'Expires',
      notes: 'Notes',
      copy: 'Copy',
      copied: 'Copied!',
      manage: 'Manage'
    },
    recent: {
      title: 'Recently generated',
      desc: 'You just created a serial — look it up to verify.',
      use: 'Look up now'
    },
    status: {
      active: 'Active',
      expired: 'Expired',
      revoked: 'Revoked'
    },
    channel: {
      stable: 'Stable',
      beta: 'Beta',
      canary: 'Canary'
    },
    action: {
      renew: 'Renew',
      revoke: 'Revoke'
    },
    confirm: {
      revoke: 'Revoke this serial? You can renew it later but device binding will be lost.'
    },
    errors: {
      not_found: 'No serial matches that key. Double-check the format.',
      need_login: 'You need to sign in first.',
      go_login: 'Sign in'
    }
  }
}

const vi = {
  nav: {
    menu: 'Trình đơn',
    language: 'Ngôn ngữ',
    home: 'Trang Chủ',
    download: 'Tải ROM',
    guide: 'Hướng Dẫn',
    serial: 'Serial Key',
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
      s4: { title: 'Khởi động & kiểm tra', desc: 'Boot lần đầu, kiểm tra camera, sóng, sạc nhanh và khôi phục dữ liệu.' }
    },
    hero: {
      eyebrow: 'HƯỚNG DẪN FLASH',
      title: 'Hướng dẫn Flash ROM HyperUR',
      desc: 'Hướng dẫn chi tiết cách flash ROM HyperUR an toàn trên thiết bị Xiaomi, Redmi, POCO. Vui lòng đọc kỹ trước khi thực hiện.'
    },
    tocTitle: 'Mục lục',
    sections: {
      prep: 'Chuẩn bị',
      recovery: 'Cài Recovery',
      flash: 'Flash qua Recovery',
      fastboot: 'Flash qua Fastboot',
      wipe: 'Wipe & Restore',
      errors: 'Lỗi thường gặp',
      faq: 'Câu hỏi thường gặp'
    },
    prep: {
      title: 'Chuẩn bị trước khi flash',
      desc: 'Những thứ bạn cần có trước khi bắt đầu',
      deviceTitle: 'Thiết bị & Yêu cầu',
      computerTitle: 'Thiết bị máy tính',
      filesTitle: 'Các file cần tải',
      backupTitle: 'Sao lưu toàn bộ dữ liệu',
      backupWarn: 'Sao lưu toàn bộ dữ liệu trước khi flash. Mọi dữ liệu sẽ bị xóa khi Wipe Data.',
      deviceItems: [
        'Thiết bị Xiaomi/Redmi/POCO đã được hỗ trợ',
        'Dung lượng pin trên 50% (khuyến nghị trên 80%)',
        'Sạc đầy pin trước khi flash để tránh brick máy'
      ],
      computerItems: [
        'Máy tính Windows (Windows 10/11 khuyến nghị)',
        'Cáp USB chất lượng tốt',
        'Cổng USB trực tiếp trên mainboard (tránh USB hub)'
      ],
      filesItems: [
        'ROM HyperUR — Tải từ trang Tải ROM',
        'ADB & Fastboot — Tải từ Android SDK Platform Tools',
        'TWRP / OFRP — Recovery phù hợp với thiết bị'
      ],
      backupItems: [
        'Ảnh, video và các file quan trọng',
        'Danh bạ và tin nhắn',
        'Dữ liệu ứng dụng (nếu được qua Google Backup)',
        'Mã Authenticator và các seed 2FA'
      ]
    },
    recovery: {
      title: 'Cài Recovery (TWRP / OFRP)',
      desc: 'Recovery là môi trường để flash ROM và thực hiện các thao tác nâng cao',
      twrpTitle: 'Cách cài TWRP Recovery',
      ofrpTitle: 'Cài OFRP Recovery',
      twrpSteps: [
        'Tải file TWRP img phù hợp với thiết bị',
        'Đổi tên file thành twrp.img và lưu vào thư mục ADB',
        'Vào chế độ Fastboot (tắt máy → Power + Volume Down)',
        'Kết nối USB với máy tính',
        'Mở CMD / Terminal trong thư mục ADB, chạy lệnh:'
      ],
      ofrpSteps: [
        'Tải OFRP từ trang chính thức phù hợp với thiết bị',
        'Đặt file .zip vào bộ nhớ trong hoặc thẻ SD',
        'Vào Recovery (TWRP) đã cài ở trên',
        'Install → Chọn file OFRP.zip',
        'Vuốt để xác nhận cài đặt',
        'Sau khi cài xong, khởi động lại vào OFRP'
      ]
    },
    flash: {
      title: 'Flash ROM qua Recovery',
      desc: 'Cách flash ROM HyperUR qua Recovery (TWRP / OFRP)',
      steps: [
        'Tải file ROM HyperUR phù hợp với thiết bị',
        'Copy file ROM vào bộ nhớ trong hoặc thẻ SD',
        'Vào Recovery (TWRP / OFRP)',
        'QUAN TRỌNG: Thực hiện Wipe trước khi cài (xem mục 5)',
        'Install',
        'Chọn file ROM HyperUR đã copy',
        'Vuốt thanh trượt để flash',
        'Đợi quá trình hoàn tất (5–15 phút)',
        'Reboot → System'
      ]
    },
    fastboot: {
      title: 'Flash ROM qua Fastboot',
      desc: 'Cách flash ROM HyperUR qua Flashing Tool trên máy tính',
      steps: [
        'Tải ROM HyperUR (định dạng .tgz hoặc .zip)',
        'Giải nén file ROM vào thư mục bất kỳ',
        'Mở thư mục ROM đã giải nén',
        'Double-click file Flashing_Tool_Windows_UR.bat',
        'Công cụ sẽ tự động nhận diện thiết bị (nếu đã vào Fastboot mode)',
        'Nếu chưa vào Fastboot: tắt máy → Power + Volume Down',
        'Nhấn Flash và đợi hoàn tất (5–15 phút)'
      ],
      toolHint: 'Flashing_Tool_Windows_UR.bat — tool sẽ tự động flash đúng các phân vùng cần thiết.',
      warn: 'Lần đầu khởi động ROM mới có thể mất 5–15 phút. Không tháo pin hay tắt nguồn trong quá trình này.'
    },
    wipe: {
      title: 'Wipe Data & Restore',
      desc: 'Hướng dẫn wipe đúng cách trước khi flash ROM mới',
      beforeTitle: 'Trước khi flash ROM mới (nên làm)',
      switchTitle: 'Chuyển từ ROM khác sang HyperUR (bắt buộc)',
      beforeItems: [
        'Wipe → Advanced Wipe',
        'Chọn các phân vùng sau:',
        'System',
        'Data',
        'Cache',
        'Dalvik Cache',
        'Vuốt để wipe'
      ],
      switchItems: [
        'Wipe → Format Data',
        'Gõ "yes"',
        'Đợi format hoàn tất',
        'Quay lại và thực hiện Advanced Wipe như trên'
      ],
      restoreTitle: 'Restore dữ liệu sau khi cài xong',
      restore: {
        title: 'Restore dữ liệu sau khi cài xong'
      },
      items: [
        'Sau khi boot vào hệ thống lần đầu, không đăng nhập Google ngay',
        'Kết nối với máy tính qua MTP',
        'Copy lại dữ liệu cần thiết (ảnh, video, nhạc)',
        'Cài đặt lại các ứng dụng từ Google Play',
        'Restore dữ liệu từ Google Drive nếu đã backup'
      ],
      warn: 'Không restore dữ liệu từ ROM cũ bằng backup app (ví dụ Titanium Backup) vì có thể gây xung đột.'
    },
    errors: {
      title: 'Lỗi thường gặp & cách khắc phục',
      desc: 'Giải đáp các lỗi phổ biến khi flash ROM',
      causeLabel: 'Nguyên nhân',
      fixLabel: 'Cách khắc phục',
      items: [
        {
          title: '"Failed to boot" hoặc bootloop',
          cause: 'ROM không tương thích hoặc wipe chưa đủ',
          fixes: [
            'Vào lại Recovery → Format Data lại → Wipe toàn bộ (System, Data, Cache, Dalvik) → Flash ROM lại'
          ]
        },
        {
          title: '"Encryption Failed"',
          cause: 'File ROM bị lỗi hoặc chưa format data',
          fixes: [
            'Vào Recovery → Wipe → Format Data → Gõ "yes" → Flash ROM lại'
          ]
        },
        {
          title: '"Device encrypted unsuccessful"',
          cause: 'Không mount được data partition',
          fixes: [
            'Vào TWRP → Wipe → Format Data → Reboot Recovery → Flash ROM'
          ]
        },
        {
          title: 'Không vào được Recovery',
          cause: 'Boot image bị hỏng',
          fixes: [
            'Vào Fastboot mode → Flash lại recovery qua fastboot → Hoặc flash ROM gốc qua MiFlash'
          ]
        }
      ]
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      desc: 'Các câu hỏi phổ biến về flash HyperUR',
      items: [
        { q: 'Flash HyperUR có mất bảo hành không?', a: 'Cần bootloader đã mở khoá để flash. Tuỳ region và hãng, điều này có thể ảnh hưởng bảo hành — hãy kiểm tra chính sách tại khu vực của bạn trước khi flash.' },
        { q: 'App ngân hàng có chạy được sau khi flash không?', a: 'Có. Trạng thái mở khoá bootloader được ẩn mặc định, nên các app ngân hàng và ví điện tử chạy mượt ngay không cần thủ thuật.' },
        { q: 'Lần đầu boot mất bao lâu?', a: 'Lần đầu boot của ROM mới flash thường mất 5–15 phút. Không tắt nguồn thiết bị trong thời gian này.' },
        { q: 'Có quay lại ROM gốc được không?', a: 'Được. Bạn có thể flash lại ROM stock qua MiFlash ở chế độ Fastboot.' }
      ]
    },
    cta: {
      title: 'Sẵn sàng flash?',
      desc: 'Tải bản build cho thiết bị của bạn và làm theo hướng dẫn từng bước.',
      btn: 'Đi tới trang Tải ROM'
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
    guide: { title: 'Hướng Dẫn Flash', desc: 'Hướng dẫn flash chi tiết cho từng hãng' },
    changelog: { title: 'Changelog', desc: 'Lịch sử build và các cập nhật gần đây' },
    donate: { title: 'Ủng Hộ', desc: 'Ủng hộ đội ngũ phát triển ROM' },
    serial: { title: 'Đăng Ký Serial Key', desc: 'Đăng ký serial để nhận thông báo cập nhật' },
    login: { title: 'Đăng Nhập / Đăng Ký', desc: 'Đăng nhập hoặc tạo tài khoản mới' }
  },
  auth: {
    tab: {
      login: 'Đăng nhập',
      register: 'Tạo tài khoản'
    },
    aside: {
      title: 'Tài khoản HyperUR của bạn',
      desc: 'Đăng nhập để theo dõi thiết bị đã tải, đăng ký serial và nhận thông báo khi có bản build mới.',
      f1: { title: 'Siêu nhanh', desc: 'Lưu danh sách thiết bị và tuỳ chọn chỉ một lần.' },
      f2: { title: 'Thông báo cập nhật', desc: 'Nhận thông báo ngay khi có build mới được phát hành.' },
      f3: { title: 'An toàn & riêng tư', desc: 'Dữ liệu lưu local, không chia sẻ cho bên thứ ba.' },
      foot: 'Bằng việc đăng nhập, bạn đồng ý tuân thủ nội quy cộng đồng.'
    },
    divider: { or: 'hoặc' },
    login: {
      title: 'Chào mừng quay lại',
      subtitle: 'Đăng nhập để tiếp tục quản lý thiết bị của bạn.',
      identifier: 'Email hoặc tên đăng nhập',
      identifier_ph: 'ban@example.com',
      password: 'Mật khẩu',
      password_ph: 'Tối thiểu 6 ký tự',
      remember: 'Duy trì đăng nhập',
      forgot: 'Quên mật khẩu?',
      submit: 'Đăng nhập',
      success: 'Đăng nhập thành công. Đang chuyển hướng...',
      no_account: 'Chưa có tài khoản?',
      demo: 'Dùng tài khoản demo'
    },
    register: {
      title: 'Tạo tài khoản của bạn',
      subtitle: 'Chỉ mất một phút để bắt đầu.',
      username: 'Tên đăng nhập',
      username_ph: '3–24 ký tự: chữ, số, . _ -',
      displayName: 'Tên hiển thị',
      displayName_ph: 'Tên người khác thấy (tuỳ chọn)',
      email: 'Email',
      email_ph: 'ban@example.com',
      password: 'Mật khẩu',
      password_ph: 'Tối thiểu 6 ký tự',
      confirmPassword: 'Xác nhận mật khẩu',
      confirmPassword_ph: 'Nhập lại mật khẩu',
      agree_prefix: 'Tôi đồng ý với',
      agree_terms: 'Điều khoản sử dụng',
      agree_and: 'và',
      agree_privacy: 'Chính sách bảo mật',
      submit: 'Tạo tài khoản',
      success: 'Tạo tài khoản thành công. Chào mừng bạn!',
      have_account: 'Đã có tài khoản?'
    },
    forgot: {
      title: 'Đặt lại mật khẩu',
      subtitle: 'Chúng tôi sẽ tạo mã khôi phục cho tài khoản của bạn.',
      email: 'Email đã đăng ký',
      email_ph: 'ban@example.com',
      submit: 'Gửi mã khôi phục',
      sent: 'Mã khôi phục đã được tạo.',
      demo_token: 'Mã khôi phục demo: {token} — copy để đặt lại mật khẩu.',
      back: 'Quay lại đăng nhập'
    },
    strength: {
      weak: 'Yếu',
      fair: 'Trung bình',
      good: 'Tốt',
      strong: 'Mạnh'
    }
  },
  account: {
    welcome: 'Chào, {name}',
    profile: 'Hồ sơ',
    settings: 'Cài đặt',
    logout: 'Đăng xuất'
  },
  footer: {
    brand: 'HyperUR',
    tagline: 'ROM custom stock-based tinh chỉnh từ Xiaomi.',
    cols: {
      nav: { title: 'Điều Hướng', home: 'Trang Chủ', download: 'Tải ROM', guide: 'Hướng Dẫn', serial: 'Serial Key' },
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
  },
  serial: {
    brand: 'HyperUR • Serial Keys',
    aside: {
      title: 'Quản lý serial HyperUR',
      desc: 'Tạo, tra cứu và quản lý serial key cho thiết bị của bạn. Mỗi serial gắn với một username và mở khoá thông báo cập nhật.',
      f1: { title: 'Tạo tức thì', desc: 'Lấy key 16 ký tự duy nhất chỉ trong vài giây.' },
      f2: { title: 'Gắn với thiết bị', desc: 'Liên kết với thiết bị và kênh cụ thể.' },
      f3: { title: 'Nhận thông báo', desc: 'Nhận alert OTA khi có bản build mới.' },
      logged_in_as: 'Đang đăng nhập: {name}',
      you_have: 'Bạn có {count} serial đang hoạt động.',
      login_first: 'Đăng nhập để quản lý serial'
    },
    tab: {
      lookup: 'Tra cứu',
      register: 'Đăng ký',
      mine: 'Serial của tôi'
    },
    lookup: {
      title: 'Tra cứu serial',
      subtitle: 'Nhập serial 16 ký tự HyperUR để xem chi tiết.',
      label: 'Serial key',
      placeholder: 'HUR1-XXXX-XXXX-XXXX',
      submit: 'Tra cứu'
    },
    register: {
      title: 'Đăng ký serial mới',
      subtitle: 'Tạo serial key mới gắn với tài khoản của bạn.',
      username: 'Username chủ sở hữu',
      device: 'Model thiết bị',
      device_ph: 'VD: POCO F6 Pro',
      build: 'Phiên bản build',
      build_ph: 'VD: HyperUR 1.4.2',
      channel: 'Kênh cập nhật',
      notes: 'Ghi chú (tuỳ chọn)',
      notes_ph: 'Điều gì chúng tôi nên biết về thiết bị này?',
      submit: 'Tạo serial',
      success: 'Đã tạo serial: {serial}'
    },
    mine: {
      title: 'Serial của tôi',
      subtitle: 'Tất cả serial gắn với tài khoản của bạn.',
      empty_title: 'Chưa có serial nào',
      empty_desc: 'Bạn chưa đăng ký serial nào. Tạo serial đầu tiên để nhận thông báo cập nhật.',
      empty_cta: 'Tạo serial'
    },
    result: {
      serial: 'Serial key',
      device: 'Thiết bị',
      build: 'Build',
      channel: 'Kênh',
      owner: 'Chủ sở hữu',
      issued: 'Ngày cấp',
      expires: 'Ngày hết hạn',
      notes: 'Ghi chú',
      copy: 'Sao chép',
      copied: 'Đã copy!',
      manage: 'Quản lý'
    },
    recent: {
      title: 'Vừa tạo gần đây',
      desc: 'Bạn vừa tạo một serial — tra cứu để kiểm tra.',
      use: 'Tra cứu ngay'
    },
    status: {
      active: 'Hoạt động',
      expired: 'Hết hạn',
      revoked: 'Đã thu hồi'
    },
    channel: {
      stable: 'Stable',
      beta: 'Beta',
      canary: 'Canary'
    },
    action: {
      renew: 'Gia hạn',
      revoke: 'Thu hồi'
    },
    confirm: {
      revoke: 'Thu hồi serial này? Bạn vẫn có thể gia hạn sau nhưng sẽ mất gắn với thiết bị.'
    },
    errors: {
      not_found: 'Không tìm thấy serial nào khớp. Kiểm tra lại định dạng.',
      need_login: 'Bạn cần đăng nhập trước.',
      go_login: 'Đăng nhập'
    }
  }
}

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
const locale = saved || 'VI'

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

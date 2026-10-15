import { useState, type FormEvent, type ReactNode } from "react"

type Role = "admin" | "peminjam"
type Page = "dashboard" | "books" | "genres" | "users" | "loans" | "history" | "notifications" | "home" | "search" | "wishlist" | "profile"

type Book = {
  id: number
  title: string
  author: string
  publisher: string
  year: number
  type: "novel" | "komik"
  stock: number
  genres: string[]
  tone: string
  rating: number
}

type Loan = {
  id: number
  borrower: string
  book: string
  loanDate: string
  dueDate: string
  returnDate?: string
  status: string
}

const books: Book[] = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    publisher: "Bentang Pustaka",
    year: 2005,
    type: "novel",
    stock: 3,
    genres: ["Slice of Life"],
    tone: "violet",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Dilan 1990",
    author: "Pidi Baiq",
    publisher: "Pastel Books",
    year: 2014,
    type: "novel",
    stock: 2,
    genres: ["Romansa"],
    tone: "coral",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    publisher: "KPG",
    year: 2017,
    type: "novel",
    stock: 3,
    genres: ["Fiksi"],
    tone: "blue",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    publisher: "Kompas",
    year: 2018,
    type: "novel",
    stock: 2,
    genres: ["Pengembangan Diri"],
    tone: "orange",
    rating: 4.7,
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    publisher: "Gramedia",
    year: 2018,
    type: "novel",
    stock: 4,
    genres: ["Pengembangan Diri"],
    tone: "green",
    rating: 4.9,
  },
  {
    id: 6,
    title: "One Piece Vol. 1",
    author: "Eiichiro Oda",
    publisher: "Elex Media",
    year: 2004,
    type: "komik",
    stock: 5,
    genres: ["Aksi", "Fantasi"],
    tone: "red",
    rating: 4.8,
  },
  {
    id: 7,
    title: "Detective Conan Vol. 1",
    author: "Gosho Aoyama",
    publisher: "Elex Media",
    year: 1994,
    type: "komik",
    stock: 0,
    genres: ["Misteri"],
    tone: "navy",
    rating: 4.6,
  },
  {
    id: 8,
    title: "Jujutsu Kaisen Vol. 5",
    author: "Gege Akutami",
    publisher: "Elex Media",
    year: 2020,
    type: "komik",
    stock: 4,
    genres: ["Aksi"],
    tone: "plum",
    rating: 4.8,
  },
]

const initialLoans: Loan[] = [
  {
    id: 1,
    borrower: "Nadya Safwa",
    book: "One Piece Vol. 1",
    loanDate: "22 Sep 2025",
    dueDate: "06 Okt 2025",
    status: "Dipinjam",
  },
  {
    id: 2,
    borrower: "Nadya Safwa",
    book: "Laut Bercerita",
    loanDate: "15 Sep 2025",
    dueDate: "29 Sep 2025",
    status: "Terlambat",
  },
  {
    id: 3,
    borrower: "Nadya Safwa",
    book: "Dilan 1990",
    loanDate: "10 Sep 2025",
    dueDate: "19 Sep 2025",
    returnDate: "19 Sep 2025",
    status: "Dikembalikan",
  },
]

const iconPaths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23z" />
      <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5a3.5 3.5 0 0 1 3.5 3z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  tag: (
    <>
      <path d="M20 12 12 20l-9-9V4h7z" />
      <circle cx="7.5" cy="8.5" r="1" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M15 3h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="m9 18 6-6-6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  alert: (
    <>
      <path d="M12 9v4" />
      <path d="M10.3 3.6 2.5 18a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0z" />
      <path d="M12 17h.01" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L8 20l-5 1 1-5z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  star: (
    <path d="m12 2.5 2.9 5.9 6.6 1-4.8 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.8-4.6 6.6-1z" />
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
}

function Icon({ name, size = 19 }: { name: string size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  icon?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={17} />}
      <span>{children}</span>
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: string
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function BookCover({ book, small = false }: { book: Book small?: boolean }) {
  return (
    <div
      className={`book-cover cover-${book.tone} ${
        small ? "book-cover-small" : ""
      }`}
    >
      <span>{book.title.charAt(0)}</span>
      <i></i>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Tersedia" || status === "Dikembalikan" || status === "Selesai"
      ? "success"
      : status === "Terlambat" || status === "Ditolak" || status === "Habis"
        ? "danger"
        : status === "Diajukan" || status === "Menunggu"
          ? "warning"
          : status === "Disetujui"
            ? "info"
            : "primary"
  return <Badge tone={tone}>{status}</Badge>
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

const adminNav = [
  ["dashboard", "grid", "Dashboard"],
  ["books", "book", "Kelola Buku"],
  ["genres", "tag", "Kategori"],
  ["loans", "clock", "Peminjaman"],
  ["users", "users", "Pengguna"],
  ["history", "clock", "Riwayat"],
] as const

const borrowerNav = [
  ["home", "home", "Beranda"],
  ["search", "search", "Cari Buku"],
  ["loans", "book", "Peminjaman"],
  ["history", "clock", "Riwayat"],
  ["wishlist", "heart", "Wishlist"],
  ["profile", "user", "Profil"],
] as const

function Sidebar({
  role,
  page,
  onNavigate,
  onLogout,
  open,
  setOpen,
}: {
  role: Role
  page: Page
  onNavigate: (page: Page) => void
  onLogout: () => void
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const items = role === "admin" ? adminNav : borrowerNav
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Icon name="book" size={24} />
          </div>
          <span>Buku.in</span>
          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
          >
            <Icon name="x" />
          </button>
        </div>
        <nav>
          <span className="nav-label">MENU UTAMA</span>
          {items.map(([key, icon, label]) => (
            <button
              key={key}
              className={`nav-item ${page === key ? "active" : ""}`}
              onClick={() => {
                onNavigate(key)
                setOpen(false)
              }}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={onLogout}>
            <Icon name="logout" />
            <span>Keluar</span>
          </button>
          <div className="sidebar-help">
            <span>BUTUH BANTUAN?</span>
            <strong>Pusat Bantuan Buku.in</strong>
          </div>
        </div>
      </aside>
      {open && (
        <button
          className="sidebar-overlay"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

function Topbar({
  role,
  onNotifications,
  onMenu,
}: {
  role: Role
  onNotifications: () => void
  onMenu: () => void
}) {
  const isAdmin = role === "admin"
  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu} aria-label="Buka menu">
        <Icon name="menu" />
      </button>
      <div className="top-search">
        <Icon name="search" size={17} />
        <input
          aria-label="Cari"
          placeholder="Cari buku, pengguna, atau aktivitas..."
        />
      </div>
      <div className="top-actions">
        <button
          className="icon-button notification-button"
          onClick={onNotifications}
          aria-label="Notifikasi"
        >
          <Icon name="bell" />
          <i></i>
        </button>
        <div className="avatar">{isAdmin ? "AD" : "NS"}</div>
        <div className="user-meta">
          <strong>{isAdmin ? "Admin Demo" : "Nadya Safwa"}</strong>
          <span>{isAdmin ? "Administrator" : "Peminjam"}</span>
        </div>
        <Icon name="chevron" size={16} />
      </div>
    </header>
  )
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [email, setEmail] = useState("peminjam@demo.com")
  const [password, setPassword] = useState("Peminjam123!")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (email === "admin@demo.com" && password === "Admin123!") onLogin("admin")
    else if (email === "peminjam@demo.com" && password === "Peminjam123!")
      onLogin("peminjam")
    else setError("Email atau kata sandi tidak sesuai dengan akun demo.")
  }

  function fill(role: Role) {
    setEmail(role === "admin" ? "admin@demo.com" : "peminjam@demo.com")
    setPassword(role === "admin" ? "Admin123!" : "Peminjam123!")
    setError("")
  }

  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="brand auth-brand">
          <div className="brand-mark">
            <Icon name="book" size={25} />
          </div>
          <span>Buku.in</span>
        </div>
        <div className="auth-copy">
          <Badge tone="primary">PERPUSTAKAAN DIGITAL</Badge>
          <h1>Temukan cerita yang akan kamu ingat.</h1>
          <p>
            Kelola koleksi, pinjam buku favorit, dan nikmati pengalaman membaca
            yang lebih mudah.
          </p>
        </div>
        <div className="auth-art" aria-hidden="true">
          <div className="moon"></div>
          <div className="shelf">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="open-book">
            <span></span>
            <span></span>
          </div>
          <div className="plant">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <div className="auth-quote">
          <Icon name="star" size={17} />
          <span>Ruang kecil untuk cerita-cerita besar.</span>
        </div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <span className="eyebrow">SELAMAT DATANG</span>
          <h2>Masuk ke Buku.in</h2>
          <p>Gunakan akun demo untuk menjelajahi aplikasi.</p>
          <label>
            Email atau username
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />
          </label>
          <label>
            Kata sandi
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
          </label>
          {error && (
            <div className="form-error">
              <Icon name="alert" size={16} />
              {error}
            </div>
          )}
          <div className="form-row">
            <label className="check-label">
              <input type="checkbox" /> Ingat saya
            </label>
            <button type="button" className="text-button">
              Lupa kata sandi?
            </button>
          </div>
          <Button type="submit" className="btn-block">
            Masuk ke Akun
          </Button>
          <div className="demo-divider">
            <span>Akun demo</span>
          </div>
          <div className="demo-accounts">
            <button
              type="button"
              onClick={() => fill("peminjam")}
              className={email.includes("peminjam") ? "selected" : ""}
            >
              <span className="mini-avatar">NS</span>
              <span>
                <strong>Peminjam</strong>
                <small>peminjam@demo.com</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
            <button
              type="button"
              onClick={() => fill("admin")}
              className={email.includes("admin") ? "selected" : ""}
            >
              <span className="mini-avatar admin-avatar">AD</span>
              <span>
                <strong>Admin</strong>
                <small>admin@demo.com</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
  tone,
  note,
}: {
  icon: string
  label: string
  value: string
  tone: string
  note: string
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-${tone}`}>
        <Icon name={icon} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  )
}

function AdminDashboard({ loans }: { loans: Loan[] }) {
  return (
    <div>
      <PageHeader
        eyebrow="RINGKASAN HARI INI"
        title="Dashboard"
        subtitle="Halo, selamat datang kembali, Admin."
      />
      <div className="stats-grid">
        <StatCard
          icon="book"
          label="Total koleksi"
          value="125"
          tone="purple"
          note="+8 bulan ini"
        />
        <StatCard
          icon="check"
          label="Buku tersedia"
          value="98"
          tone="green"
          note="78% dari koleksi"
        />
        <StatCard
          icon="clock"
          label="Sedang dipinjam"
          value="22"
          tone="yellow"
          note="4 jatuh tempo dekat"
        />
        <StatCard
          icon="alert"
          label="Terlambat"
          value="5"
          tone="red"
          note="Perlu ditindaklanjuti"
        />
      </div>
      <div className="dashboard-grid">
        <section className="card panel">
          <div className="panel-head">
            <div>
              <h3>Buku terpopuler</h3>
              <p>Paling sering dipinjam bulan ini</p>
            </div>
            <Button variant="ghost">
              Lihat semua <Icon name="arrow" size={15} />
            </Button>
          </div>
          <div className="popular-list">
            {books
              .slice(5, 8)
              .concat(books[2])
              .map((book, index) => (
                <div className="popular-row" key={book.id}>
                  <span className="rank">{index + 1}</span>
                  <BookCover book={book} small />
                  <div>
                    <strong>{book.title}</strong>
                    <span>{12 - index * 2} kali dipinjam</span>
                  </div>
                  <Badge tone={index === 0 ? "warning" : "neutral"}>
                    {book.type}
                  </Badge>
                </div>
              ))}
          </div>
        </section>
        <section className="card panel">
          <div className="panel-head">
            <div>
              <h3>Peminjaman terbaru</h3>
              <p>Aktivitas yang perlu dipantau</p>
            </div>
            <Button variant="ghost">
              Lihat semua <Icon name="arrow" size={15} />
            </Button>
          </div>
          <div className="activity-list">
            {loans.map((loan) => (
              <div className="activity-row" key={loan.id}>
                <div className="activity-icon">
                  <Icon name="book" size={17} />
                </div>
                <div>
                  <strong>{loan.borrower}</strong>
                  <span>{loan.book}</span>
                </div>
                <div className="activity-status">
                  <StatusBadge status={loan.status} />
                  <small>{loan.loanDate}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="card insight">
        <div>
          <span className="eyebrow">WAWASAN KOLEKSI</span>
          <h3>Genre pengembangan diri sedang diminati</h3>
          <p>Peminjaman meningkat 18% dibandingkan bulan lalu.</p>
        </div>
        <div className="insight-bars">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </section>
    </div>
  )
}

function AdminBooks() {
  const [query, setQuery] = useState("")
  const filtered = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div>
      <PageHeader
        eyebrow="MANAJEMEN KOLEKSI"
        title="Kelola Buku"
        subtitle="Kelola data koleksi novel dan komik di perpustakaan."
        action={<Button icon="plus">Tambah Buku</Button>}
      />
      <section className="card table-card">
        <div className="table-tools">
          <div className="search-input">
            <Icon name="search" size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul atau penulis..."
            />
          </div>
          <Button variant="secondary" icon="filter">
            Filter
          </Button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Buku</th>
                <th>Kategori</th>
                <th>Jenis</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book, index) => (
                <tr key={book.id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>
                    <div className="book-cell">
                      <BookCover book={book} small />
                      <div>
                        <strong>{book.title}</strong>
                        <span>
                          {book.author} · {book.year}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge>{book.genres[0]}</Badge>
                  </td>
                  <td className="capitalize">{book.type}</td>
                  <td>
                    <strong>{book.stock}</strong> eksemplar
                  </td>
                  <td>
                    <StatusBadge
                      status={book.stock > 0 ? "Tersedia" : "Habis"}
                    />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button aria-label="Ubah">
                        <Icon name="edit" size={17} />
                      </button>
                      <button className="danger-action" aria-label="Hapus">
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function GenresPage() {
  const genres = [
    ["Fantasi", 12, "violet"],
    ["Romansa", 18, "coral"],
    ["Misteri", 9, "blue"],
    ["Aksi", 16, "red"],
    ["Slice of Life", 14, "green"],
    ["Sejarah", 7, "orange"],
    ["Pengembangan Diri", 21, "plum"],
    ["Fiksi", 28, "navy"],
  ]
  return (
    <div>
      <PageHeader
        eyebrow="ORGANISASI KOLEKSI"
        title="Kategori & Genre"
        subtitle="Atur kategori agar koleksi lebih mudah ditemukan."
        action={<Button icon="plus">Tambah Kategori</Button>}
      />
      <div className="genre-grid">
        {genres.map(([name, count, tone]) => (
          <div className="card genre-card" key={name}>
            <div className={`genre-icon cover-${tone}`}>
              <Icon name="tag" />
            </div>
            <div>
              <strong>{name}</strong>
              <span>{count} buku</span>
            </div>
            <button aria-label={`Ubah ${name}`}>
              <Icon name="edit" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersPage() {
  const users = [
    ["Nadya Safwa", "nadya.safwa@email.com", "Peminjam", "Aktif", "NS"],
    ["Rara Putri", "rara.putri@email.com", "Peminjam", "Aktif", "RP"],
    ["Fadil Akbar", "fadil.akbar@email.com", "Peminjam", "Aktif", "FA"],
    ["Dimas Pratama", "dimas@email.com", "Peminjam", "Nonaktif", "DP"],
  ]
  return (
    <div>
      <PageHeader
        eyebrow="AKSES & KEANGGOTAAN"
        title="Kelola Pengguna"
        subtitle="Pantau akun dan hak akses seluruh anggota."
        action={<Button icon="plus">Tambah Pengguna</Button>}
      />
      <section className="card table-card">
        <div className="table-tools">
          <div className="search-input">
            <Icon name="search" size={17} />
            <input placeholder="Cari nama atau email..." />
          </div>
          <Button variant="secondary" icon="filter">
            Filter
          </Button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Pengguna</th>
                <th>Peran</th>
                <th>Total pinjam</th>
                <th>Status</th>
                <th>Bergabung</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user[1]}>
                  <td>
                    <div className="user-cell">
                      <span className="mini-avatar">{user[4]}</span>
                      <div>
                        <strong>{user[0]}</strong>
                        <span>{user[1]}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge tone="primary">{user[2]}</Badge>
                  </td>
                  <td>{24 - i * 4} buku</td>
                  <td>
                    <Badge tone={user[3] === "Aktif" ? "success" : "danger"}>
                      {user[3]}
                    </Badge>
                  </td>
                  <td>12 Jan 2024</td>
                  <td>
                    <div className="row-actions">
                      <button>
                        <Icon name="edit" size={17} />
                      </button>
                      <button>
                        <Icon name="arrow" size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function LoansPage({
  loans,
  admin = false,
  onApprove,
}: {
  loans: Loan[]
  admin?: boolean
  onApprove?: (id: number) => void
}) {
  const [filter, setFilter] = useState("Semua")
  const filters = ["Semua", "Dipinjam", "Menunggu", "Terlambat", "Selesai"]
  const visible = loans.filter(
    (loan) =>
      filter === "Semua" ||
      loan.status === filter ||
      (filter === "Selesai" && loan.status === "Dikembalikan") ||
      (filter === "Menunggu" && loan.status === "Diajukan"),
  )
  return (
    <div>
      <PageHeader
        eyebrow={admin ? "OPERASIONAL" : "AKTIVITAS SAYA"}
        title="Status Peminjaman"
        subtitle={
          admin
            ? "Tinjau dan kelola seluruh transaksi peminjaman."
            : "Pantau proses dan tenggat buku yang kamu pinjam."
        }
      />
      <div className="tabs">
        {filters.map((item) => (
          <button
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="card table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {admin && <th>Peminjam</th>}
                <th>Judul Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Batas Kembali</th>
                <th>Status</th>
                {admin && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {visible.map((loan) => {
                const book =
                  books.find((item) => item.title === loan.book) || books[0]
                return (
                  <tr key={loan.id}>
                    {admin && (
                      <td>
                        <strong>{loan.borrower}</strong>
                      </td>
                    )}
                    <td>
                      <div className="book-cell">
                        <BookCover book={book} small />
                        <div>
                          <strong>{loan.book}</strong>
                          <span>{book.author}</span>
                        </div>
                      </div>
                    </td>
                    <td>{loan.loanDate}</td>
                    <td>{loan.dueDate}</td>
                    <td>
                      <StatusBadge status={loan.status} />
                    </td>
                    {admin && (
                      <td>
                        {loan.status === "Diajukan" ? (
                          <Button onClick={() => onApprove?.(loan.id)}>
                            Setujui
                          </Button>
                        ) : (
                          <Button variant="secondary">Detail</Button>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <Icon name="book" size={28} />
            <strong>Belum ada data</strong>
            <span>Tidak ada peminjaman pada status ini.</span>
          </div>
        )}
      </section>
    </div>
  )
}

function HistoryPage({
  loans,
  admin = false,
}: {
  loans: Loan[]
  admin?: boolean
}) {
  return (
    <div>
      <PageHeader
        eyebrow="ARSIP PEMINJAMAN"
        title="Riwayat Peminjaman"
        subtitle={
          admin
            ? "Rekap seluruh transaksi buku yang telah selesai."
            : "Lihat kembali buku-buku yang pernah kamu pinjam."
        }
      />
      <section className="card table-card">
        <div className="table-tools">
          <div className="search-input">
            <Icon name="search" size={17} />
            <input placeholder="Cari dalam riwayat..." />
          </div>
          <Button variant="secondary" icon="filter">
            September 2025
          </Button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {admin && <th>Peminjam</th>}
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const book =
                  books.find((item) => item.title === loan.book) || books[0]
                return (
                  <tr key={loan.id}>
                    {admin && <td>{loan.borrower}</td>}
                    <td>
                      <div className="book-cell">
                        <BookCover book={book} small />
                        <div>
                          <strong>{loan.book}</strong>
                          <span>{book.author}</span>
                        </div>
                      </div>
                    </td>
                    <td>{loan.loanDate}</td>
                    <td>{loan.returnDate || "—"}</td>
                    <td>
                      <StatusBadge
                        status={loan.returnDate ? "Selesai" : loan.status}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function BorrowerHome({
  onDetail,
  onSearch,
}: {
  onDetail: (book: Book) => void
  onSearch: () => void
}) {
  const genres = [
    ["heart", "Romansa"],
    ["star", "Fantasi"],
    ["alert", "Aksi"],
    ["search", "Misteri"],
    ["book", "Komedi"],
    ["clock", "Sejarah"],
  ]
  return (
    <div>
      <section className="welcome-banner">
        <div>
          <span className="eyebrow">SELAMAT DATANG, NADYA</span>
          <h1>
            Baca lebih banyak,
            <br />
            rasakan lebih banyak.
          </h1>
          <p>Temukan novel dan komik favoritmu di Buku.in.</p>
          <Button onClick={onSearch}>
            Jelajahi Koleksi <Icon name="arrow" size={16} />
          </Button>
        </div>
        <div className="banner-art">
          <div className="banner-book b1"></div>
          <div className="banner-book b2"></div>
          <div className="banner-book b3"></div>
          <div className="banner-plant"></div>
        </div>
      </section>
      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">JELAJAHI BERDASARKAN</span>
            <h2>Kategori pilihan</h2>
          </div>
          <Button variant="ghost" onClick={onSearch}>
            Lihat semua <Icon name="arrow" size={15} />
          </Button>
        </div>
        <div className="category-row">
          {genres.map(([icon, label], index) => (
            <button key={label} onClick={onSearch}>
              <span className={`category-icon category-${index}`}>
                <Icon name={icon} />
              </span>
              <strong>{label}</strong>
              <small>{8 + index * 3} buku</small>
            </button>
          ))}
        </div>
      </section>
      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">BARU DITAMBAHKAN</span>
            <h2>Buku terbaru</h2>
          </div>
          <Button variant="ghost" onClick={onSearch}>
            Lihat semua <Icon name="arrow" size={15} />
          </Button>
        </div>
        <div className="book-grid">
          {books.slice(0, 5).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDetail={() => onDetail(book)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function BookCard({
  book,
  onDetail,
  wished = false,
  onWish,
}: {
  book: Book
  onDetail: () => void
  wished?: boolean
  onWish?: () => void
}) {
  return (
    <article className="book-card">
      <div className="cover-wrap">
        <BookCover book={book} />
        {onWish && (
          <button
            className={`wish-button ${wished ? "wished" : ""}`}
            onClick={onWish}
            aria-label="Wishlist"
          >
            <Icon name="heart" size={17} />
          </button>
        )}
        <StatusBadge status={book.stock > 0 ? "Tersedia" : "Habis"} />
      </div>
      <div className="book-info">
        <span>
          {book.genres[0]} · {book.type}
        </span>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="book-rating">
          <Icon name="star" size={14} />
          <strong>{book.rating}</strong>
          <span>({28 + book.id * 3})</span>
        </div>
        <Button variant="secondary" onClick={onDetail}>
          Lihat Detail
        </Button>
      </div>
    </article>
  )
}

function SearchPage({
  wishlist,
  setWishlist,
  onDetail,
}: {
  wishlist: number[]
  setWishlist: (ids: number[]) => void
  onDetail: (book: Book) => void
}) {
  const [query, setQuery] = useState("")
  const [genre, setGenre] = useState("Semua")
  const filtered = books.filter(
    (book) =>
      `${book.title} ${book.author}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (genre === "Semua" || book.genres.includes(genre)),
  )
  return (
    <div>
      <PageHeader
        eyebrow="JELAJAHI KOLEKSI"
        title="Cari Buku"
        subtitle="Temukan cerita berikutnya dari koleksi pilihan kami."
      />
      <div className="catalog-tools card">
        <div className="search-input">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul, penulis, atau penerbit..."
          />
        </div>
        <div className="filter-row">
          {[
            "Semua",
            "Fantasi",
            "Romansa",
            "Misteri",
            "Aksi",
            "Pengembangan Diri",
          ].map((item) => (
            <button
              className={genre === item ? "active" : ""}
              onClick={() => setGenre(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="result-meta">
        <strong>{filtered.length} buku ditemukan</strong>
        <span>Diurutkan: Terpopuler</span>
      </div>
      <div className="book-grid catalog-grid">
        {filtered.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDetail={() => onDetail(book)}
            wished={wishlist.includes(book.id)}
            onWish={() =>
              setWishlist(
                wishlist.includes(book.id)
                  ? wishlist.filter((id) => id !== book.id)
                  : [...wishlist, book.id],
              )
            }
          />
        ))}
      </div>
    </div>
  )
}

function DetailPage({
  book,
  isWished,
  onWish,
  onBack,
  onBorrow,
}: {
  book: Book
  isWished: boolean
  onWish: () => void
  onBack: () => void
  onBorrow: () => void
}) {
  return (
    <div>
      <button className="back-button" onClick={onBack}>
        ← Kembali ke koleksi
      </button>
      <section className="detail-card card">
        <div className="detail-cover">
          <BookCover book={book} />
        </div>
        <div className="detail-main">
          <div className="detail-tags">
            <Badge tone="primary">{book.type}</Badge>
            <Badge>{book.genres.join(" · ")}</Badge>
          </div>
          <h1>{book.title}</h1>
          <p className="detail-author">
            oleh <strong>{book.author}</strong>
          </p>
          <div className="rating-line">
            <span>
              <Icon name="star" size={17} />
              <strong>{book.rating}</strong> / 5
            </span>
            <span>128 ulasan pembaca</span>
          </div>
          <div className="book-facts">
            <div>
              <span>Penerbit</span>
              <strong>{book.publisher}</strong>
            </div>
            <div>
              <span>Tahun terbit</span>
              <strong>{book.year}</strong>
            </div>
            <div>
              <span>Ketersediaan</span>
              <StatusBadge
                status={book.stock > 0 ? `${book.stock} tersedia` : "Habis"}
              />
            </div>
          </div>
          <div className="detail-actions">
            <Button disabled={book.stock === 0} onClick={onBorrow}>
              Pinjam Buku
            </Button>
            <Button variant="secondary" icon="heart" onClick={onWish}>
              {isWished ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
            </Button>
          </div>
        </div>
      </section>
      <div className="detail-grid">
        <section className="card detail-section">
          <span className="eyebrow">TENTANG BUKU</span>
          <h2>Sinopsis</h2>
          <p>
            {book.title} menghadirkan kisah yang hangat, kuat, dan dekat dengan
            kehidupan. Ikuti perjalanan para tokohnya menghadapi pilihan,
            persahabatan, dan harapan dalam cerita yang terus tinggal bahkan
            setelah halaman terakhir.
          </p>
          <p>
            Ditulis dengan gaya yang jernih dan penuh rasa, buku ini cocok
            menemani waktu baca santaimu.
          </p>
        </section>
        <section className="card review-card">
          <span className="eyebrow">ULASAN PEMBACA</span>
          <div className="review-score">
            <strong>{book.rating}</strong>
            <div>
              <div className="stars">★★★★★</div>
              <span>Berdasarkan 128 ulasan</span>
            </div>
          </div>
          <blockquote>
            “Cerita yang sulit dilepaskan. Karakternya terasa dekat dan hidup.”
          </blockquote>
          <small>— Raka, pembaca terverifikasi</small>
        </section>
      </div>
    </div>
  )
}

function BorrowForm({
  book,
  onCancel,
  onSubmit,
}: {
  book: Book
  onCancel: () => void
  onSubmit: () => void
}) {
  return (
    <div>
      <button className="back-button" onClick={onCancel}>
        ← Kembali ke detail buku
      </button>
      <PageHeader
        eyebrow="PENGAJUAN BARU"
        title="Pinjam Buku"
        subtitle="Periksa kembali detail buku dan tanggal peminjamanmu."
      />
      <div className="borrow-layout">
        <section className="card borrow-summary">
          <span className="eyebrow">BUKU YANG DIPILIH</span>
          <div>
            <BookCover book={book} />
            <div>
              <Badge>{book.genres[0]}</Badge>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <StatusBadge status={`${book.stock} tersedia`} />
            </div>
          </div>
        </section>
        <section className="card borrow-form">
          <h2>Informasi Peminjaman</h2>
          <p>Maksimal durasi peminjaman adalah 14 hari.</p>
          <label>
            Tanggal pinjam
            <input type="date" defaultValue="2025-09-25" />
          </label>
          <label>
            Batas pengembalian
            <input type="date" defaultValue="2025-10-02" />
          </label>
          <div className="info-box">
            <Icon name="alert" size={18} />
            <span>Kamu sedang meminjam 2 dari maksimal 3 buku aktif.</span>
          </div>
          <Button className="btn-block" onClick={onSubmit}>
            Ajukan Peminjaman
          </Button>
        </section>
      </div>
    </div>
  )
}

function WishlistPage({
  wishlist,
  setWishlist,
  onDetail,
}: {
  wishlist: number[]
  setWishlist: (ids: number[]) => void
  onDetail: (book: Book) => void
}) {
  const items = books.filter((book) => wishlist.includes(book.id))
  return (
    <div>
      <PageHeader
        eyebrow="KOLEKSI SAYA"
        title="Wishlist"
        subtitle="Buku yang kamu simpan untuk dibaca nanti."
      />
      {items.length ? (
        <div className="wishlist-list">
          {items.map((book) => (
            <article className="card wishlist-item" key={book.id}>
              <BookCover book={book} small />
              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div>
                  <Badge>{book.genres[0]}</Badge>
                  <StatusBadge status={book.stock > 0 ? "Tersedia" : "Habis"} />
                </div>
              </div>
              <div className="wishlist-actions">
                <Button variant="secondary" onClick={() => onDetail(book)}>
                  Lihat Detail
                </Button>
                <button
                  onClick={() =>
                    setWishlist(wishlist.filter((id) => id !== book.id))
                  }
                  aria-label="Hapus dari wishlist"
                >
                  <Icon name="trash" size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card empty-state large">
          <Icon name="heart" size={34} />
          <h2>Wishlist masih kosong</h2>
          <p>Simpan buku menarik agar mudah kamu temukan lagi.</p>
        </div>
      )}
    </div>
  )
}

function ProfilePage() {
  return (
    <div>
      <PageHeader
        eyebrow="AKUN SAYA"
        title="Profil Saya"
        subtitle="Kelola informasi pribadi dan preferensi bacaanmu."
      />
      <section className="card profile-hero">
        <div className="profile-avatar">NS</div>
        <div>
          <h2>Nadya Safwa</h2>
          <p>nadya.safwa@email.com</p>
          <Badge tone="primary">Peminjam</Badge>
        </div>
        <Button variant="secondary" icon="edit">
          Edit Profil
        </Button>
      </section>
      <div className="profile-stats">
        <StatCard
          icon="book"
          label="Total Peminjaman"
          value="24"
          tone="purple"
          note="Sejak Januari 2024"
        />
        <StatCard
          icon="check"
          label="Buku Selesai"
          value="18"
          tone="green"
          note="75% selesai tepat waktu"
        />
        <StatCard
          icon="heart"
          label="Wishlist"
          value="4"
          tone="red"
          note="Tersimpan untuk nanti"
        />
      </div>
      <div className="profile-grid">
        <section className="card profile-panel">
          <h3>Informasi Pribadi</h3>
          <div className="info-row">
            <span>Username</span>
            <strong>@nadyasafwa</strong>
          </div>
          <div className="info-row">
            <span>Email</span>
            <strong>nadya.safwa@email.com</strong>
          </div>
          <div className="info-row">
            <span>Tanggal bergabung</span>
            <strong>12 Januari 2024</strong>
          </div>
        </section>
        <section className="card profile-panel">
          <h3>Preferensi</h3>
          <div className="info-row">
            <span>Genre favorit</span>
            <strong>Fiksi & Pengembangan Diri</strong>
          </div>
          <div className="info-row">
            <span>Bahasa bacaan</span>
            <strong>Bahasa Indonesia</strong>
          </div>
          <div className="info-row">
            <span>Pengingat tenggat</span>
            <Badge tone="success">Aktif</Badge>
          </div>
        </section>
      </div>
    </div>
  )
}

function Notifications({ role }: { role: Role }) {
  const notices =
    role === "admin"
      ? [
          [
            "alert",
            "Pengajuan peminjaman baru",
            "Nadya Safwa mengajukan peminjaman Atomic Habits.",
            "Baru saja",
            "warning",
          ],
          [
            "check",
            "Buku telah dikembalikan",
            "Dilan 1990 dikembalikan tepat waktu.",
            "2 jam lalu",
            "success",
          ],
          [
            "alert",
            "Peminjaman terlambat",
            "Laut Bercerita telah melewati batas pengembalian.",
            "1 hari lalu",
            "danger",
          ],
        ]
      : [
          [
            "alert",
            "Pengingat pengembalian",
            "One Piece Vol. 1 harus dikembalikan pada 6 Okt 2025.",
            "1 jam lalu",
            "warning",
          ],
          [
            "check",
            "Peminjaman berhasil",
            "Kamu berhasil meminjam Dilan 1990.",
            "2 hari lalu",
            "success",
          ],
          [
            "star",
            "Buku favoritmu tersedia",
            "Jujutsu Kaisen Vol. 5 sudah tersedia kembali.",
            "3 hari lalu",
            "info",
          ],
        ]
  return (
    <div>
      <PageHeader
        eyebrow="PUSAT INFORMASI"
        title="Notifikasi"
        subtitle="Semua kabar penting dari aktivitas Buku.in."
        action={<Button variant="secondary">Tandai semua dibaca</Button>}
      />
      <div className="notification-list">
        {notices.map(([icon, title, text, time, tone], i) => (
          <article
            className={`card notification-item ${i === 0 ? "unread" : ""}`}
            key={title}
          >
            <div className={`notice-icon notice-${tone}`}>
              <Icon name={icon} />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <span>{time}</span>
            {i === 0 && <i></i>}
          </article>
        ))}
      </div>
    </div>
  )
}

function Toast({ children }: { children: ReactNode }) {
  return (
    <div className="toast">
      <span>
        <Icon name="check" size={17} />
      </span>
      {children}
    </div>
  )
}

function AppShell({ role, onLogout }: { role: Role onLogout: () => void }) {
  const [page, setPage] = useState<Page>(
    role === "admin" ? "dashboard" : "home",
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [wishlist, setWishlist] = useState([3, 4, 5])
  const [loans, setLoans] = useState(initialLoans)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [borrowing, setBorrowing] = useState(false)
  const [toast, setToast] = useState("")
  function flash(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }

  function navigate(next: Page) {
    setSelectedBook(null)
    setBorrowing(false)
    setPage(next)
  }

  function submitLoan() {
    if (!selectedBook) return
    setLoans([
      {
        id: Date.now(),
        borrower: "Nadya Safwa",
        book: selectedBook.title,
        loanDate: "25 Sep 2025",
        dueDate: "02 Okt 2025",
        status: "Diajukan",
      },
      ...loans,
    ])
    setBorrowing(false)
    setSelectedBook(null)
    setPage("loans")
    flash("Pengajuan berhasil dikirim ke admin.")
  }

  function approveLoan(id: number) {
    setLoans(
      loans.map((loan) =>
        loan.id === id ? { ...loan, status: "Dipinjam" } : loan,
      ),
    )
    flash("Peminjaman disetujui dan stok telah diperbarui.")
  }

  let content: ReactNode
  if (selectedBook && borrowing)
    content = (
      <BorrowForm
        book={selectedBook}
        onCancel={() => setBorrowing(false)}
        onSubmit={submitLoan}
      />
    )
  else if (selectedBook)
    content = (
      <DetailPage
        book={selectedBook}
        isWished={wishlist.includes(selectedBook.id)}
        onWish={() => {
          setWishlist(
            wishlist.includes(selectedBook.id)
              ? wishlist.filter((id) => id !== selectedBook.id)
              : [...wishlist, selectedBook.id],
          )
          flash(
            wishlist.includes(selectedBook.id)
              ? "Buku dihapus dari wishlist."
              : "Buku ditambahkan ke wishlist.",
          )
        }}
        onBack={() => setSelectedBook(null)}
        onBorrow={() => setBorrowing(true)}
      />
    )
  else if (page === "notifications") content = <Notifications role={role} />
  else if (role === "admin") {
    if (page === "dashboard") content = <AdminDashboard loans={loans} />
    else if (page === "books") content = <AdminBooks />
    else if (page === "genres") content = <GenresPage />
    else if (page === "users") content = <UsersPage />
    else if (page === "loans")
      content = <LoansPage loans={loans} admin onApprove={approveLoan} />
    else content = <HistoryPage loans={loans} admin />
  } else {
    if (page === "home")
      content = (
        <BorrowerHome
          onSearch={() => navigate("search")}
          onDetail={setSelectedBook}
        />
      )
    else if (page === "search")
      content = (
        <SearchPage
          wishlist={wishlist}
          setWishlist={setWishlist}
          onDetail={setSelectedBook}
        />
      )
    else if (page === "loans") content = <LoansPage loans={loans} />
    else if (page === "history") content = <HistoryPage loans={loans} />
    else if (page === "wishlist")
      content = (
        <WishlistPage
          wishlist={wishlist}
          setWishlist={setWishlist}
          onDetail={setSelectedBook}
        />
      )
    else content = <ProfilePage />
  }

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        page={page}
        onNavigate={navigate}
        onLogout={onLogout}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <div className="app-main">
        <Topbar
          role={role}
          onMenu={() => setSidebarOpen(true)}
          onNotifications={() => navigate("notifications")}
        />
        <main className="content">{content}</main>
      </div>
      {toast && <Toast>{toast}</Toast>}
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null)
  return role ? (
    <AppShell role={role} onLogout={() => setRole(null)} />
  ) : (
    <Login onLogin={setRole} />
  )
}

diff --git a/logira-vercel/app/page.js b/logira-vercel/app/page.js
index f72310aad7ae2291f51691e4dd5d73986f9f7589..8a2f2ff33977c201347e68d7306538c1472623cf 100644
--- a/logira-vercel/app/page.js
+++ b/logira-vercel/app/page.js
@@ -1,57 +1,151 @@
 "use client";
 
 import { useEffect, useRef, useState } from "react";
 import { AnimatePresence, motion } from "framer-motion";
 
 export default function LogiraLandingPage() {
   const [open, setOpen] = useState(false);
   const [mag, setMag] = useState({ x: 0, y: 0 });
+  const [users, setUsers] = useState([]);
+  const [currentUser, setCurrentUser] = useState(null);
+  const [formData, setFormData] = useState({
+    fullName: "",
+    email: "",
+    password: "",
+    role: "user",
+  });
+  const [error, setError] = useState("");
   const dropdownRef = useRef(null);
 
   useEffect(() => {
     function handleClickOutside(event) {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setOpen(false);
       }
     }
 
     function handleEscape(event) {
       if (event.key === "Escape") {
         setOpen(false);
       }
     }
 
     document.addEventListener("mousedown", handleClickOutside);
     document.addEventListener("keydown", handleEscape);
 
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
       document.removeEventListener("keydown", handleEscape);
     };
   }, []);
 
+  useEffect(() => {
+    const storedUsers = localStorage.getItem("logira_users");
+    const storedCurrentUser = localStorage.getItem("logira_current_user");
+
+    if (storedUsers) {
+      setUsers(JSON.parse(storedUsers));
+    }
+
+    if (storedCurrentUser) {
+      setCurrentUser(JSON.parse(storedCurrentUser));
+    }
+  }, []);
+
+  function saveUsers(nextUsers) {
+    setUsers(nextUsers);
+    localStorage.setItem("logira_users", JSON.stringify(nextUsers));
+  }
+
+  function handleChange(event) {
+    const { name, value } = event.target;
+    setFormData((prev) => ({ ...prev, [name]: value }));
+    setError("");
+  }
+
+  function handleRegister(event) {
+    event.preventDefault();
+
+    const normalizedEmail = formData.email.trim().toLowerCase();
+    if (!formData.fullName.trim() || !normalizedEmail || formData.password.length < 6) {
+      setError("Заполните все поля. Пароль должен содержать минимум 6 символов.");
+      return;
+    }
+
+    const isDuplicate = users.some((user) => user.email === normalizedEmail);
+    if (isDuplicate) {
+      setError("Пользователь с такой почтой уже зарегистрирован.");
+      return;
+    }
+
+    const newUser = {
+      id: crypto.randomUUID(),
+      fullName: formData.fullName.trim(),
+      email: normalizedEmail,
+      password: formData.password,
+      role: formData.role,
+      createdAt: new Date().toISOString(),
+    };
+
+    const nextUsers = [...users, newUser];
+    saveUsers(nextUsers);
+    setCurrentUser(newUser);
+    localStorage.setItem("logira_current_user", JSON.stringify(newUser));
+    setFormData({ fullName: "", email: "", password: "", role: "user" });
+    setError("");
+  }
+
+  function handleLogout() {
+    setCurrentUser(null);
+    localStorage.removeItem("logira_current_user");
+  }
+
+  const roleLabels = {
+    teacher: "Преподаватель",
+    parent: "Родитель",
+    user: "Юзер",
+  };
+
+  const rolePanels = {
+    teacher: [
+      "Создание и редактирование учебных маршрутов",
+      "Проверка прогресса учеников и экспорт отчетов",
+      "Назначение домашних задач и турниров",
+    ],
+    parent: [
+      "Отслеживание успеваемости ребенка",
+      "Просмотр рекомендаций по развитию навыков",
+      "Получение уведомлений о дедлайнах и результатах",
+    ],
+    user: [
+      "Персональные задания и карта прогресса",
+      "Участие в турнирах и челленджах",
+      "Достижения, награды и статистика обучения",
+    ],
+  };
+
   const roadmap = [
     {
       title: "Mathematics",
       subtitle: "Open now",
       description:
         "Enter the first country — a world of patterns, logic, and elegant challenges where thinking becomes a natural skill.",
     },
     {
       title: "Physics",
       subtitle: "Coming later",
       description:
         "A future world of motion, forces, and discovery — experienced through interactive challenges and gameplay.",
     },
     {
       title: "Chemistry",
       subtitle: "Coming later",
       description:
         "Explore reactions, structures, and transformations through intuitive, visual problem-solving.",
     },
   ];
 
   const features = [
     {
       title: "A world, not just exercises",
       text: "Players don’t just solve problems — they move through a living world where each solution unlocks new paths.",
@@ -225,50 +319,182 @@ export default function LogiraLandingPage() {
               </div>
             </div>
           </div>
 
           <div className="relative">
             <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
               <div className="text-sm text-white/60">What’s New</div>
               <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                 <div>
                   <div className="text-xs uppercase tracking-[0.16em] text-white/45">Announcement</div>
                   <div className="mt-2 text-xl font-semibold">The Country of Mathematics is now open</div>
                 </div>
                 <p className="leading-relaxed text-white/72">
                   Start your first journey with logic-based challenges, discover the world step by step,
                   and prepare for upcoming mathematical tournaments.
                 </p>
                 <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                   <div className="text-sm text-white/55">Next release</div>
                   <div className="mt-1 text-white/82">Weekly tournament format and new challenge paths</div>
                 </div>
               </div>
             </div>
           </div>
         </section>
 
+        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
+          <div className="rounded-3xl border border-violet-300/20 bg-[#110d35]/80 p-6 md:p-8">
+            <div className="flex flex-wrap items-end justify-between gap-4">
+              <div>
+                <div className="text-sm uppercase text-violet-200/80">Accounts</div>
+                <h2 className="mt-2 text-3xl font-semibold">Регистрация и личный кабинет</h2>
+              </div>
+              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75">
+                Всего пользователей: {users.length}
+              </div>
+            </div>
+
+            <div className="mt-8 grid gap-6 lg:grid-cols-2">
+              <form
+                onSubmit={handleRegister}
+                className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6"
+              >
+                <h3 className="text-xl font-semibold">Создать аккаунт</h3>
+                <p className="mt-2 text-sm text-white/60">
+                  Поддерживаются три роли: преподаватель, родитель и юзер.
+                </p>
+
+                <div className="mt-5 space-y-4">
+                  <label className="block">
+                    <span className="mb-2 block text-sm text-white/70">ФИО</span>
+                    <input
+                      type="text"
+                      name="fullName"
+                      value={formData.fullName}
+                      onChange={handleChange}
+                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-300/60"
+                      placeholder="Например, Анна Иванова"
+                    />
+                  </label>
+
+                  <label className="block">
+                    <span className="mb-2 block text-sm text-white/70">Email</span>
+                    <input
+                      type="email"
+                      name="email"
+                      value={formData.email}
+                      onChange={handleChange}
+                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-300/60"
+                      placeholder="name@email.com"
+                    />
+                  </label>
+
+                  <label className="block">
+                    <span className="mb-2 block text-sm text-white/70">Пароль</span>
+                    <input
+                      type="password"
+                      name="password"
+                      value={formData.password}
+                      onChange={handleChange}
+                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-300/60"
+                      placeholder="Минимум 6 символов"
+                    />
+                  </label>
+
+                  <label className="block">
+                    <span className="mb-2 block text-sm text-white/70">Роль</span>
+                    <select
+                      name="role"
+                      value={formData.role}
+                      onChange={handleChange}
+                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-300/60"
+                    >
+                      <option value="teacher" className="text-black">
+                        Преподаватель
+                      </option>
+                      <option value="parent" className="text-black">
+                        Родитель
+                      </option>
+                      <option value="user" className="text-black">
+                        Юзер
+                      </option>
+                    </select>
+                  </label>
+                </div>
+
+                {error ? <div className="mt-4 text-sm text-rose-300">{error}</div> : null}
+
+                <button
+                  type="submit"
+                  className="mt-5 w-full rounded-xl border border-violet-300/30 bg-violet-400/20 px-5 py-3 font-medium transition hover:bg-violet-400/30"
+                >
+                  Зарегистрироваться
+                </button>
+              </form>
+
+              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6">
+                <h3 className="text-xl font-semibold">Личный кабинет</h3>
+                {!currentUser ? (
+                  <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-5 text-white/65">
+                    Зарегистрируйте пользователя, чтобы открыть персональный кабинет.
+                  </div>
+                ) : (
+                  <div className="mt-4 space-y-4">
+                    <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
+                      <div className="text-sm text-white/60">Текущий профиль</div>
+                      <div className="mt-1 text-lg font-semibold">{currentUser.fullName}</div>
+                      <div className="text-sm text-white/70">{currentUser.email}</div>
+                      <div className="mt-2 inline-flex rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-xs text-violet-100">
+                        {roleLabels[currentUser.role]}
+                      </div>
+                    </div>
+
+                    <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
+                      <div className="text-sm text-white/60">Возможности кабинета</div>
+                      <ul className="mt-3 space-y-2 text-sm text-white/80">
+                        {rolePanels[currentUser.role].map((item) => (
+                          <li key={item} className="flex gap-2">
+                            <span className="mt-[2px] text-violet-200">•</span>
+                            <span>{item}</span>
+                          </li>
+                        ))}
+                      </ul>
+                    </div>
+
+                    <button
+                      onClick={handleLogout}
+                      className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
+                    >
+                      Выйти из кабинета
+                    </button>
+                  </div>
+                )}
+              </div>
+            </div>
+          </div>
+        </section>
+
         <section id="about" className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
           <div className="grid gap-10 md:grid-cols-2">
             <div>
               <div className="text-sm uppercase text-white/60">About</div>
               <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Learning that feels like discovery</h2>
             </div>
             <div className="space-y-4 text-lg text-white/70">
               <p>
                 Logira is designed to make thinking intuitive. Instead of memorization, players explore,
                 experiment, and uncover patterns through play.
               </p>
               <p>
                 Mathematics is just the beginning — a foundation for a growing universe of knowledge built
                 around curiosity and exploration.
               </p>
             </div>
           </div>
         </section>
 
         <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
           <div className="grid gap-6 md:grid-cols-3">
             {features.map((feature) => (
               <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                 <div className="text-lg font-semibold">{feature.title}</div>
                 <p className="mt-3 text-white/65">{feature.text}</p>


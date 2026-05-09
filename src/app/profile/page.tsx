import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarClock,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  MapPin,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import profileImg from "@/assets/profile.jpeg";
import cityUniversityImg from "@/assets/city_uni.jpg";
import UniverseBackground from "@/components/UniverseBackground";

type GithubUser = {
  name: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  avatar_url: string;
};

type GithubRepo = {
  fork: boolean;
  stargazers_count: number;
};

type GithubEvent = {
  type: string;
  created_at: string;
};

const GITHUB_USERNAME = "biswass101";

const titles = ["Full Stack Developer", "Software Engineer", "MERN Stack Expert", "DevOps Enthusiast"];

const fallbackGithubUser: GithubUser = {
  name: "Naeem Biswass Niloy",
  bio: "Software Engineer || MERN || CPian",
  location: "Dhaka, Bangladesh",
  company: "Associate Software Engineer at ReturnHex",
  html_url: "https://github.com/biswass101",
  public_repos: 0,
  followers: 0,
  avatar_url: "",
};

const safeNumber = (value: number) => value.toLocaleString("en-US");

const toDateKey = (iso: string) => {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString().slice(0, 10);
};

const calculateRecentStreak = (events: GithubEvent[]) => {
  const uniquePushDays = Array.from(
    new Set(events.filter((event) => event.type === "PushEvent").map((event) => toDateKey(event.created_at)).filter(Boolean))
  ) as string[];

  if (uniquePushDays.length === 0) return 0;

  const sortedDays = uniquePushDays.sort((a, b) => b.localeCompare(a));
  let streak = 1;

  for (let index = 0; index < sortedDays.length - 1; index += 1) {
    const currentDay = new Date(`${sortedDays[index]}T00:00:00Z`);
    const nextDay = new Date(`${sortedDays[index + 1]}T00:00:00Z`);
    const diffInDays = Math.round((currentDay.getTime() - nextDay.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};

const getGithubData = async () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-profile-page",
  };

  try {
    const [userResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 1800 } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 1800 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
        headers,
        next: { revalidate: 1800 },
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok || !eventsResponse.ok) {
      throw new Error("GitHub API request failed");
    }

    const [user, repos, events] = (await Promise.all([
      userResponse.json(),
      reposResponse.json(),
      eventsResponse.json(),
    ])) as [GithubUser, GithubRepo[], GithubEvent[]];

    const ownedRepos = repos.filter((repo) => !repo.fork);
    const totalStars = ownedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const recentStreak = calculateRecentStreak(events);

    return {
      user,
      projectsBuilt: ownedRepos.length,
      totalStars,
      recentStreak,
    };
  } catch {
    return {
      user: fallbackGithubUser,
      projectsBuilt: 0,
      totalStars: 0,
      recentStreak: 0,
    };
  }
};

const ProfilePage = async () => {
  const { user, projectsBuilt, totalStars, recentStreak } = await getGithubData();

  const socialLinks = [
    {
      title: "GitHub",
      href: "https://github.com/biswass101",
      icon: Github,
      description: "Open source projects and daily development activity.",
    },
    {
      title: "LinkedIn",
      href: "https://linkedin.com/in/niloy097",
      icon: Linkedin,
      description: "Professional updates and career highlights.",
    },
    {
      title: "LeetCode",
      href: "https://leetcode.com/niloy097",
      icon: Trophy,
      description: "Problem solving journey and coding practice.",
    },
    {
      title: "HackerRank",
      href: "https://www.hackerrank.com/niloy097",
      icon: BookOpen,
      description: "Practice records and skill certificates.",
    },
    {
      title: "Instagram",
      href: "https://instagram.com/niloy097",
      icon: Instagram,
      description: "Behind the scenes and personal moments.",
    },
  ];

  const statCards = [
    {
      label: "Projects Built",
      value: safeNumber(projectsBuilt),
      hint: "Public non-fork repositories",
      icon: Sparkles,
    },
    {
      label: "GitHub Stars",
      value: safeNumber(totalStars),
      hint: "Total stars across owned repos",
      icon: Star,
    },
    {
      label: "GitHub Streak",
      value: `${safeNumber(recentStreak)} days`,
      hint: "Recent push streak from public activity",
      icon: CalendarClock,
    },
    {
      label: "LeetCode Solved",
      value: "250+",
      hint: "Competitive problem-solving milestones",
      icon: Trophy,
    },
    {
      label: "GitHub Followers",
      value: safeNumber(user.followers),
      hint: "Current followers on GitHub",
      icon: Github,
    },
  ];

  return (
    <main className="relative min-h-screen bg-background section-padding">
      <UniverseBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-xs font-mono text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <article className="glass rounded-2xl p-6 h-full flex items-center justify-center">
            <div className="relative h-64 w-64 rounded-2xl overflow-hidden border border-primary/30">
              <Image
                src={profileImg}
                alt="Naeem Biswass Niloy"
                fill
                sizes="256px"
                className="object-cover object-top"
                priority
              />
            </div>
          </article>

          <article className="glass rounded-2xl p-6 md:p-8 h-full">
            <p className="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3">Profile</p>
            <h1 className="text-3xl md:text-4xl font-bold font-mono mb-4">Hi, I&apos;am Naeem Biswass Niloy</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {titles.map((title) => (
                <span
                  key={title}
                  className="px-3 py-1.5 rounded-md border border-primary/25 bg-primary/10 text-primary text-xs font-mono"
                >
                  {title}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              I am currently in 4th Year (8th Semester), studying at City University, Dhaka, Bangladesh, with
              a CGPA of 3.50/4.00 and an expected graduation year of 2027.
            </p>
          </article>

          <div className="lg:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <article className="group relative overflow-hidden rounded-2xl glass p-6 md:p-8 h-full">
              <Image
                src={cityUniversityImg}
                alt="City University"
                fill
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/22 via-background/6 to-background/12" />

              <div className="relative z-10">
                <p className="inline-flex w-fit rounded-md bg-card/35 px-3 py-1.5 text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                  Education
                </p>
                <div className="space-y-3 text-sm">
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <GraduationCap size={14} className="text-primary" />
                    CSE
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <Building2 size={14} className="text-primary" />
                    City University, Dhaka
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <BookOpen size={14} className="text-primary" />
                    B.Sc. in Computer Science and Engineering
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <CalendarClock size={14} className="text-primary" />
                    2027 (Expected)
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <Star size={14} className="text-primary" />
                    3.50 / 4.00 CGPA
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-md bg-card/35 px-3 py-1.5 text-foreground font-mono backdrop-blur-sm transition-all duration-300 group-hover:bg-card/55">
                    <Sparkles size={14} className="text-primary" />
                    8th Semester, 4th Year
                  </p>
                </div>
              </div>
            </article>

            <article className="glass rounded-2xl p-6 md:p-8 h-full">
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Full Stack Developer with hands-on experience in MERN stack, DevOps fundamentals, and
                competitive programming, building scalable solutions from Dhaka, Bangladesh.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  {user.location || "Dhaka, Bangladesh"}
                </span>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Github size={14} className="text-primary" />@{GITHUB_USERNAME}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map(({ label, value, hint, icon: Icon }) => (
              <article key={label} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs uppercase tracking-[0.14em] font-mono text-muted-foreground">{label}</p>
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-semibold font-mono text-foreground mb-2">{value}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 glass rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-2">GitHub</p>
              <h2 className="text-2xl md:text-3xl font-bold font-mono">Contributions Graph</h2>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Open Profile
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/35 p-3">
            <img
              src={`https://ghchart.rshah.org/00e5ff/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME} GitHub contribution chart`}
              className="w-full rounded-md"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mt-12">
          <p className="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3">Connect</p>
          <h2 className="text-2xl md:text-3xl font-bold font-mono mb-6">Find Me On</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {socialLinks.map(({ title, href, icon: Icon, description }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-xl p-5 transition-all duration-300 hover:border-primary/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-base text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </p>
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;

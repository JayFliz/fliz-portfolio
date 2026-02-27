# fliz.co.uk — Setup Guide

## 1. Push to GitHub

```bash
cd fliz-portfolio
git init
git add .
git commit -m "Initial portfolio site"

# Create repo on GitHub (via CLI or web UI)
gh repo create fliz-portfolio --public --source=. --push
# Or manually:
git remote add origin git@github.com:jaygreasley/fliz-portfolio.git
git push -u origin main
```

## 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `fliz-portfolio` repo
4. Framework will auto-detect as Next.js — leave defaults
5. Click **Deploy**

Vercel will give you a URL like `fliz-portfolio-xxx.vercel.app`. Check it works.

## 3. Point fliz.co.uk to Vercel

In your **Vercel project settings** → **Domains**, add `fliz.co.uk`.

Vercel will tell you the DNS records to add. Go to your **viridio.net** DNS panel and set:

### Option A: Root domain (fliz.co.uk)
| Type  | Name | Value              |
|-------|------|--------------------|
| A     | @    | 76.76.21.21        |

### Option B: Also add www redirect
| Type  | Name | Value              |
|-------|------|--------------------|
| A     | @    | 76.76.21.21        |
| CNAME | www  | cname.vercel-dns.com |

> **Note**: The A record IP (76.76.21.21) is Vercel's standard IP. Vercel may show different values — always use what Vercel shows you in the domain settings panel.

### Verify
After adding DNS records:
- Go back to Vercel → Domains → click **Refresh** or **Verify**
- SSL certificate will be auto-provisioned (may take a few minutes)
- `https://fliz.co.uk` should be live

## 4. Adding New Experiments

### Step 1: Register in the config
Edit `src/lib/experiments.ts` and add an entry:

```typescript
{
  slug: "my-new-experiment",
  title: "My New Experiment",
  description: "What this experiment explores.",
  status: "wip",        // "planned" | "wip" | "live"
  tags: ["React", "API"],
  date: "2026-03-01",
},
```

### Step 2: Create the page
Create `src/app/experiments/my-new-experiment/page.tsx`:

```tsx
import Link from "next/link";

export default function MyNewExperiment() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Link
        href="/experiments"
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text"
      >
        ← Back to experiments
      </Link>

      <h1
        className="mb-6 text-4xl tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        My New Experiment
      </h1>

      {/* Your demo goes here */}
      <div className="rounded-lg border border-border-subtle bg-bg-surface p-8">
        <p>Interactive demo content...</p>
      </div>

      {/* What you learned */}
      <div className="mt-12 border-t border-border-subtle pt-12">
        <h2 className="mb-6 font-mono text-xs tracking-widest text-text-faint uppercase">
          What I learned
        </h2>
        <p className="text-text-muted">Notes go here.</p>
      </div>
    </div>
  );
}
```

### Step 3: Update status
When the experiment is ready, change `status` to `"live"` in the config. It becomes clickable on the index page automatically.

### For external experiments (e.g. Expo)
Just set `externalUrl` in the config — no page file needed. The card will link externally.

## 5. Subdomains for Separate Apps

If an experiment needs its own deployment (e.g., Expo web build):

1. Create a separate Vercel project for that app
2. In Vercel, add custom domain: `expo.fliz.co.uk`
3. In viridio.net DNS, add:

| Type  | Name | Value              |
|-------|------|--------------------|
| CNAME | expo | cname.vercel-dns.com |

## 6. Local Development

```bash
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Nav + footer
│   ├── page.tsx              # Landing page
│   ├── globals.css           # Theme + styles
│   └── experiments/
│       ├── page.tsx           # Experiments index
│       └── [slug]/
│           └── page.tsx       # Dynamic experiment template
├── lib/
│   └── experiments.ts         # Experiment registry
```

## Environment Variables (for future experiments)

When you add Resend, BetterStack, etc., add env vars in Vercel:
**Project Settings → Environment Variables**

```env
RESEND_API_KEY=re_xxxxx
BETTERSTACK_TOKEN=xxxxx
```

Access in code: `process.env.RESEND_API_KEY`

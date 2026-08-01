import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs text-primary border border-primary/20 px-2 py-0.5 mb-2 inline-block">
              Feb 2025 - Jun 2025
            </span>
            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
              Web Designer – Fellow Founder
            </h4>
            <p className="mt-1.5 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 font-light">
              Designed modern web interfaces and UI/UX assets for startup projects. Collaborated closely with founders, ensuring transparent design delivery and developer handoffs.
            </p>
          </div>
          <div className="border-t border-border/30 pt-4">
            <span className="font-mono text-xs text-primary border border-primary/20 px-2 py-0.5 mb-2 inline-block">
              Jan 2025 - Dec 2025
            </span>
            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
              Graphic Designer – Freelance
            </h4>
            <p className="mt-1.5 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 font-light">
              Created custom visual designs, promotional posters, banners, and digital marketing materials for diverse clients, applying modern grids and typography rules.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs text-primary border border-primary/20 px-2 py-0.5 mb-2 inline-block">
              Dec 2024
            </span>
            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
              UI/UX Designer Intern – Atlanwa Technologies Pvt. Ltd.
            </h4>
            <p className="mt-1.5 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 font-light">
              Designed branding logos and interface frames using Canva and Figma. Crafted standard project management tool wireframes and interactive prototypes.
            </p>
          </div>
          <div className="border-t border-border/30 pt-4">
            <span className="font-mono text-xs text-primary border border-primary/20 px-2 py-0.5 mb-2 inline-block">
              Jan 2024 - Mar 2024
            </span>
            <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
              Front-End Web Development Intern – Intrainz Innovation
            </h4>
            <p className="mt-1.5 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 font-light">
              Built interactive calculators and structured registration forms using HTML, CSS, and JavaScript, focusing on mobile responsiveness and layouts.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2022 - 2026",
      content: (
        <div>
          <span className="font-mono text-xs text-primary border border-primary/20 px-2 py-0.5 mb-2 inline-block">
            Sep 2022 - Apr 2026
          </span>
          <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
            B.E. Computer Science Engineering – Vel Tech HighTech Engineering College
          </h4>
          <p className="mt-1.5 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 font-light mb-4">
            Completed Bachelor of Engineering (B.E.) in Computer Science Engineering, focusing on database architectures, user interface design, and front-end web engineering. Graduated with a cumulative CGPA of **8.66 / 10.0**.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

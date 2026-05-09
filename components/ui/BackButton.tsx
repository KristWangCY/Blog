"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onClick?: () => void;
  href?: string;
  label?: string;
};

export default function BackButton({
  onClick,
  href,
  label = "Back",
}: BackButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="
          group
          mb-8
          inline-flex
          items-center
          gap-3
          text-zinc-500
          transition
          hover:text-white
        "
      >
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

        <span className="text-sm uppercase tracking-[0.25em]">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          window.history.back();
        }
      }}
      className="
        group
        mb-8
        inline-flex
        items-center
        gap-3
        text-zinc-500
        transition
        hover:text-white
      "
    >
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

      <span className="text-sm uppercase tracking-[0.25em]">
        {label}
      </span>
    </button>
  );
}
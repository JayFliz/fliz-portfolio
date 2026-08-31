"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const SHORTCODES_KEY = "jsx-playground-shortcodes";

export default function ShortcodeRedirect() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    let hash = "";
    try {
      const codes = JSON.parse(
        localStorage.getItem(SHORTCODES_KEY) || "{}"
      );
      hash = codes[id] || "";
    } catch {}
    router.replace(hash ? `/jsx#${hash}` : "/jsx");
  }, [id, router]);

  return null;
}

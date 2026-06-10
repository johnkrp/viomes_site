import App from "@/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const routeCases = [
  {
    path: "/quality",
    heading: /Ποιότητα/i,
    title: "Ποιότητα | VIOMES S.A.",
  },
  {
    path: "/industries",
    heading: /Κλάδοι Εφαρμογής/i,
    title: "Κλάδοι Εφαρμογής | VIOMES S.A.",
  },
  {
    path: "/news",
    heading: /Νέα & Άρθρα/i,
    title: "Νέα & Άρθρα | VIOMES S.A.",
  },
] as const;

describe("App route smoke tests", () => {
  it.each(routeCases)(
    "renders $path and updates SEO title",
    async ({ path, heading, title }) => {
      window.history.pushState({}, "", path);
      render(<App />);

      expect(
        await screen.findByRole("heading", { name: heading }),
      ).toBeVisible();
      expect(document.title).toBe(title);
    },
  );
});